import { v } from "./core/v";
import { x } from "./core/x";
import { c } from "./core/colors";
import { ps } from "./core/ps";
import { f } from "./core/f";
import { readFileSync, writeFileSync } from "node:fs";
import {
  media,
  _vars,
  val_xxx,
  mtype,
  PMtype,
  RM,
  med,
  _var,
} from "./core/mvar";
import {
  $$,
  isArr,
  isClassOrId,
  isObj,
  Mapper,
  ngify,
  oAss,
  obj,
  oItems,
  oKeys,
  oVals,
  reCamel,
  sparse,
} from "./core/@";
import { isFile } from "./core/@n";

type CMapper = Mapper<string, Mapper<string, media>>;

interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  textFillColor?: string;
  lineClamp?: string;
  webkitTextFillColor?: string;
}

export type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

function _props(sel: string, prp: media) {
  oItems(prp).forEach(([mk, mv]) => {
    prp[mk] = val_xxx(sel, mv);
  });
  return prp;
}
const parseCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};

//

/*
-------------------------
Clas ID KF process
-------------------------
*/

function CIK(
  sel: string,
  vv: any,
  medias: CMapper,
  cid: Mapper<string, string>,
  fix: string,
) {
  if (!isObj(vv)) return;
  const props: Mapper<string, media> = new Mapper();

  const processProps = (k: string, v: any) => {
    if (k.startsWith(":") || k.startsWith(",")) {
      CIK(sel + k, v, medias, cid, fix);
    } else if (k.startsWith(" ")) {
      const slc = k.match(/^.*?\./gm);
      const islc = slc?.[0].slice(0, -1);
      const lk = k
        .replaceAll(/, *?\./gm, `, ${sel}${islc}.`)
        .replaceAll(/, *?\#/gm, `, ${sel}${islc}#`);
      CIK(sel + lk, v, medias, cid, fix);
    } else if (isClassOrId(k)) {
      console.log(k, v);
    } else {
      props.set(k, _props(k, reval(v)));
    }
  };

  if (vv instanceof _vars) {
    props.ass(vv._var, _props(vv._var, reval(vv._val)));
  } else {
    oItems(vv).forEach(([k, v]) => processProps(k, v));
  }

  const { classes, ids } = xselect(sel);
  [classes, ids].flat().forEach((cl) => {
    cid.set(cl, fix + cl);
  });

  sel = fix ? applyPrefix(sel, fix) : sel;
  if (medias.has(sel)) {
    medias.get(sel)?.map(props);
  } else {
    medias.set(sel, props);
  }
}
class CB {
  fix: string;
  data: obj<any[]> = {};
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, CMapper> = new Mapper();
  constructor(
    private pre: string = "",
    fix: string = "",
  ) {
    this.fix = fix ? fix + "_" : fix;
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = isArr(val) ? val : [val];
    VL.forEach((vv) => {
      CIK(nme, vv, this.datax, this.cid, this.fix);
    });
    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string): string | undefined {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "datax") {
      return this.datax as any;
    } else if (prop == "cid") {
      return this.cid as any;
    }
    return undefined;
  }
  get css(): CSS {
    return new Proxy(this, this);
  }
}

class keyframes {
  data: obj<any[]> = {};
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, Mapper<string, CMapper>> = new Mapper();
  constructor() {
    this.data = {};
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = prop;
    const VL = isArr(val) ? val : [val];
    const kfKEY = `@keyframes ${nme}`;
    const kfKWebkit = `@-webkit-keyframes ${nme}`;
    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      oItems(vv).forEach(([x, y]) => {
        CIK(x, y as CSSinR, dx, this.cid, "");
      });
    });
    this.datax.set(kfKEY, dx);
    this.datax.set(kfKWebkit, dx);

    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string) {
    const nme = prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "datax") {
      return this.datax as any;
    }
    return undefined;
  }
  get css(): obj<{ from?: CSSinR; to?: CSSinR; "%"?: CSSinR } | obj<CSSinR>> {
    return new Proxy(this, this);
  }
}

class ats {
  data: obj<any[]>;
  pre: string;
  constructor(pre: string = "@") {
    this.data = {};
    this.pre = pre;
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.pre + prop;
    if (nme in target.data) {
      target.data[nme].push(val);
    } else {
      target.data[nme] = [val];
    }

    return target;
  }
  get(target: any, prop: string) {
    const nme = this.pre + prop;
    if (nme in target) {
      return target[nme];
    } else if (prop == "data") {
      return target.data;
    }
    return target.data[nme];
  }
  get css(): {
    import: CSSinR | _vars | obj<RM>;
    charset: CSSinR | _vars | obj<RM>;
  } {
    return new Proxy(this, this);
  }
}

class FontFace {
  data: obj<any>[];
  pre: string;
  constructor(pre: string = "@font-face") {
    this.data = [];
    this.pre = pre;
  }
  set(target: any, prop: string, val: CSSinR) {
    this.data.push(val);
    return true;
  }
  get css(): { face: CSSinR | _vars | obj<RM> } {
    return new Proxy(this, this);
  }
}

/*
-------------------------

-------------------------
*/

const applyPrefix = (sel: string, prefix: string) => {
  return sel.replaceAll(/\.|\#/g, (m) => m + prefix);
};
const reval = (val: RM): media => {
  if (val instanceof media) return val;
  if (val instanceof _vars) return med(val.__());
  return med(val);
};
const xselect = (cssContent: string) => {
  const xmatch = (regex: RegExp) =>
    Array.from(cssContent.matchAll(regex), (match) => match[1]);
  const classRegex = /\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches .className
  const idRegex = /#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches #idName
  return {
    classes: [...new Set(xmatch(classRegex))],
    ids: [...new Set(xmatch(idRegex))],
  };
};
const xscc = (sel: string, vals: obj<string>) => {
  const oit = oItems(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
};
const formatContentValue = (key: string, value: string): string => {
  return key === "content" && !value.includes("(") ? `'${value}'` : value;
};
const ensurePropsInitialized = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
) => {
  if (!props[type]![key]) props[type]![key] = [];
};
const addPropertyValues = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
  values: string,
) => {
  props[type]![key].push(...values.split(",").map((s) => s.trim()));
};

class __css {
  css: string = "";
  cid: obj<string> = {};
  constructor() {}
  private updateCid(cid: Map<string, string>) {
    cid.forEach((v, k) => {
      this.cid[k] = v;
    });
  }
  processCB(az: CB, props: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        oItems(vv).forEach(([x, y]) => {
          const xx = x as PMtype;
          let pvp = formatContentValue(xx, y);
          const stn = ngify({ [reCamel(kk)]: pvp });
          ensurePropsInitialized(props, xx, stn);
          addPropertyValues(props, xx, stn, k);
        });
      });
    });
    this.updateCid(az.cid);
  }

  processKF(az: keyframes, kprops: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        const vls: obj<obj<string>> = {};
        vv.forEach((y, x) => {
          oItems(y).forEach(([xx, yy]) => {
            const xs = xx as PMtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][x] = yy;
          });
        });
        oItems(vls).forEach(([x, y]) => {
          const xs = x as PMtype;
          ensurePropsInitialized(kprops, xs, k);
          kprops[xs]![k].push(xscc(kk, y));
        });
      });
    });
  }
  processAT(az: ats, fin: string[]) {
    for (const [key, values] of oItems(az.data)) {
      for (const value of values) {
        const formattedValue = value.includes("(") ? value : `"${value}"`;
        fin.push(`${key} ${formattedValue.trim()};`);
      }
    }
  }
  processFF(az: FontFace, fin: string[]) {
    const FONT_FACE = "@font-face";
    az.data.forEach((fontData) => {
      const fontProperties = oItems(fontData)
        .map(
          ([property, value]) =>
            `${reCamel(property)}: ${val_xxx(property, value)}`,
        )
        .join(";\n\t");
      fin.push(`${FONT_FACE} {\n\t${fontProperties}\n}`);
    });
  }
  load(CSS: css) {
    const mprops = media.prop;
    const def = media.default as mtype;
    const props: { [P in PMtype]?: obj<string[]> } = {};
    const kprops: { [P in PMtype]?: obj<string[]> } = {};
    const cs2: obj<obj<obj<string>>> = {};
    const fin: string[] = [];
    //
    oKeys(mprops).forEach((kh) => {
      props[kh as PMtype] = {};
      kprops[kh as PMtype] = {};
      cs2[kh as PMtype] = {};
    });

    oVals(CSS).forEach((az) => {
      if (az instanceof CB) this.processCB(az, props);
      else if (az instanceof keyframes) this.processKF(az, kprops);
      else if (az instanceof ats) this.processAT(az, fin);
      else if (az instanceof FontFace) this.processFF(az, fin);
    });
    /*
    -------------------------
    
    -------------------------
    */
    oItems(props).forEach(([kk, vv]) => {
      if (!cs2[kk]) cs2[kk] = {};
      oItems(vv).forEach(([k, v]) => {
        const ct = v.join(", ");
        if (!cs2[kk][ct]) cs2[kk][ct] = {};
        oAss(cs2[kk][ct], sparse(k));
      });
    });
    oItems(cs2).forEach(([kk, vv]) => {
      const mitm: string[] = [];
      oItems(vv).forEach(([k, v]) => mitm.push(xscc(k, v)));
      oItems(kprops[kk as PMtype]!).forEach(([k, v]) => {
        mitm.push(`${k} {\n${v.join("\n")}\n}`);
      });
      if (mitm.length) {
        fin.push(
          `/* -------------- ${kk + (kk == def ? " ( default )" : "")} */`,
        );
        if (kk == def) {
          fin.push(mitm.join("\n"));
        } else {
          fin.push(`${mprops[kk as PMtype]}\t{\n${mitm.join("\n")}\n}`);
        }
      }
    });
    this.css = fin.join("\n");
    return this;
  }
}

export class css {
  dom: CSS;
  id: CSS;
  cx: CSS;
  kf = new keyframes().css;
  at = new ats().css;
  font = new FontFace().css;
  save: ({
    path,
    map,
    minify,
  }: {
    path: string;
    map?: string;
    minify?: boolean;
  }) => void;
  constructor({ name, prefix }: { name: string; prefix?: string }) {
    //
    const pref = prefix ?? name;
    this.dom = new CB("", pref).css;
    this.id = new CB("#", pref).css;
    this.cx = new CB(".", pref).css;

    this.save = ({
      path,
      map,
      minify,
    }: {
      path: string;
      map?: string;
      minify?: boolean;
    }) => {
      const css = new __css().load(this);
      const pathEnd = path.endsWith("/") ? "" : "/";
      const cssFilePath = path + pathEnd + name + ".css";

      isFile(cssFilePath);
      const cssContent = minify ? parseCSS(css.css) : css.css;
      writeFileSync(cssFilePath, cssContent);

      if ((map ??= path)) {
        const mapEnd = map.endsWith("/") ? "" : "/";
        const mapFilePath = map + mapEnd + "css.js";

        isFile(mapFilePath);

        const mapFileContent = readFileSync(mapFilePath).toString();
        const exportPrefix = `export const ${name} = `;
        const cssIdString = JSON.stringify(css.cid);
        const newExport = exportPrefix + cssIdString + ";";

        const hasExistingExport = mapFileContent.match(exportPrefix);
        if (hasExistingExport) {
          const exportRegex = new RegExp(`${exportPrefix}.*?};`, "gm");
          const singleLineContent = mapFileContent.replace(/\n/gm, "");
          const updatedContent = singleLineContent.replace(
            exportRegex,
            newExport,
          );
          writeFileSync(mapFilePath, updatedContent);
        } else {
          const updatedContent = mapFileContent + newExport;
          writeFileSync(mapFilePath, updatedContent);
        }
      }
    };
  }
}
export type CSS = obj<CSSinR | CSSinR[]>;
export { $$, med, _var, ps, f };
export { v, c, x };
