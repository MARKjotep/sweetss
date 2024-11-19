import { v } from "./core/v";
import { x } from "./core/x";
import { c } from "./core/colors";
import { ps } from "./core/ps";
import { f } from "./core/f";
import { readFileSync, writeFileSync } from "node:fs";
import { is, str, O, V, obj } from "../src/core/__";
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

class Mapper<K, V> extends Map<K, V> {
  obj(obj?: object | null) {
    obj && O.items(obj).forEach(([k, v]) => this.set(k as K, v));
  }
  map(map: Map<K, V>) {
    map.forEach((v, k) => {
      this.set(k, v);
    });
  }
  ass<T>(key: K, obj: T) {
    if (!this.has(key)) this.set(key, {} as any);
    O.ass(this.get(key)!, obj);
  }
}
type CMapper = Mapper<string, Mapper<string, media>>;

interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  textFillColor?: string;
  lineClamp?: string;
  webkitTextFillColor?: string;
}

export class $$ {
  static set p(a: any) {
    if (is.arr(a)) {
      console.log(...a);
    } else {
      console.log(a);
    }
  }
  static rand(min = 6, max?: number) {
    if (max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    const rndInt = Math.floor(Math.random() * min) + 1;
    return rndInt - 1;
  }
}

export type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

const _is = {
  file: (path: string, data?: string) => {
    try {
      writeFileSync(path, data ?? "", { flag: "wx" });
    } catch (error) {
      //
    }
    return true;
  },
};

//

function _props(sel: string, prp: media) {
  O.items(prp).forEach(([mk, mv]) => {
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
  if (!is.obj(vv)) return;
  const props: Mapper<string, media> = new Mapper();
  if (vv instanceof _vars) {
    props.ass(vv._var, vv._val);
  } else {
    O.items(vv).forEach(([k, v]) => {
      if (v)
        if (k.startsWith(":") || k.startsWith(",")) {
          CIK(sel + k, v, medias, cid, fix);
        } else if (k.startsWith(" ")) {
          const slc = k.match(/^.*?\./gm);
          const islc = slc?.[0].slice(0, -1);
          const lk = k
            .replaceAll(/, *?\./gm, `, ${sel}${islc}.`)
            .replaceAll(/, *?\#/gm, `, ${sel}${islc}#`);
          CIK(sel + lk, v, medias, cid, fix);
        } else if (is.classOrId(k)) {
          $$.p = [k, v];
        } else {
          props.set(k, _props(k, reval(v)));
        }
    });
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
    const VL = is.arr(val) ? val : [val];
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
  get css(): CSSinTS {
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
    const VL = is.arr(val) ? val : [val];
    const kfKEY = `@keyframes ${nme}`;
    const kfKWebkit = `@-webkit-keyframes ${nme}`;
    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      O.items(vv).forEach(([x, y]) => {
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
  else if (val instanceof _vars) return med(val.__());
  else return med(val);
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
  const oit = O.items(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
};

class __css {
  css: string = "";
  cid: obj<string> = {};
  constructor() {}
  processCB(az: CB, props: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        O.items(vv).forEach(([x, y]) => {
          const xx = x as PMtype;
          let pvp = kk == "content" && !y.includes("(") ? `'${y}'` : y;
          const stn = str.ngify({ [str.camel(kk)]: pvp });
          if (!props[xx]![stn]) props[xx]![stn] = [];
          props[xx]![stn].push(...k.split(",").map((s) => s.trim()));
        });
      });
    });
    az.cid.forEach((v, k) => {
      this.cid[k] = v;
    });
  }
  processKF(az: keyframes, kprops: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        const vls: obj<obj<string>> = {};
        vv.forEach((y, x) => {
          O.items(y).forEach(([xx, yy]) => {
            const xs = xx as PMtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][x] = yy;
          });
        });
        O.items(vls).forEach(([x, y]) => {
          const xs = x as PMtype;
          if (!kprops[xs]![k]) kprops[xs]![k] = [];
          kprops[xs]![k].push(xscc(kk, y));
        });
      });
    });
  }
  processAT(az: ats, fin: string[]) {
    O.items(az.data).forEach(([k, v]) => {
      v.forEach((vv: string) => {
        const ch: string = vv.includes("(") ? vv : `"${vv}"`;
        fin.push(`${k} ${ch.trim()};`);
      });
    });
  }
  processFF(az: FontFace, fin: string[]) {
    const fkey = `@font-face`;
    az.data.forEach((k) => {
      const FF: obj<obj<{ [P in PMtype]: any }>> = {};
      if (!FF[fkey]) FF[fkey] = {};
      const ffs = O.items(k)
        .map(([k, v]) => `${str.camel(k)} : ${val_xxx(k, v)}`)
        .join("; \n\t");
      fin.push(`${fkey}\t{\n\t${ffs}\n}`);
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
    O.keys(mprops).forEach((kh) => {
      props[kh as PMtype] = {};
      kprops[kh as PMtype] = {};
      cs2[kh as PMtype] = {};
    });

    O.vals(CSS).forEach((az) => {
      if (az instanceof CB) this.processCB(az, props);
      else if (az instanceof keyframes) this.processKF(az, kprops);
      else if (az instanceof ats) this.processAT(az, fin);
      else if (az instanceof FontFace) this.processFF(az, fin);
    });
    /*
    -------------------------
    
    -------------------------
    */
    O.items(props).forEach(([kk, vv]) => {
      if (!cs2[kk]) cs2[kk] = {};
      O.items(vv).forEach(([k, v]) => {
        const ct = v.join(", ");
        if (!cs2[kk][ct]) cs2[kk][ct] = {};
        O.ass(cs2[kk][ct], str.parse(k));
      });
    });
    O.items(cs2).forEach(([kk, vv]) => {
      const mitm: string[] = [];
      O.items(vv).forEach(([k, v]) => mitm.push(xscc(k, v)));
      O.items(kprops[kk as PMtype]!).forEach(([k, v]) => {
        mitm.push(`${k} {\n${v.join("\n")}\n}`);
      });
      if (mitm.length) {
        fin.push(
          `/* ------------------------ ${kk + (kk == def ? " ( default )" : "")} */`,
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
  dom: CSSinTS;
  id: CSSinTS;
  cx: CSSinTS;
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

    this.save = async ({
      path,
      map,
      minify,
    }: {
      path: string;
      map?: string;
      minify?: boolean;
    }) => {
      const ce = new __css().load(this);
      //

      const pe = path.endsWith("/") ? "" : "/";

      const cfl = path + pe + name + ".css";
      _is.file(cfl);
      let rr = minify ? parseCSS(ce.css) : ce.css;
      writeFileSync(cfl, rr);

      if ((map ??= path)) {
        const mp = map.endsWith("/") ? "" : "/";
        const mapcss = map + mp + "css.js";
        if (_is.file(mapcss)) {
          const RFS = readFileSync(mapcss).toString();

          const cxstr = JSON.stringify(ce.cid);
          const prep = `export const ${name} = `;
          const rmm = RFS.match(prep);
          const fnal = prep + cxstr + ";";
          if (rmm) {
            const rg = new RegExp(`${prep}.*?};`, "gm");
            const RFX = RFS.replace(/\n/gm, "");
            const _rr = RFX.replace(rg, fnal);
            writeFileSync(mapcss, _rr);
          } else {
            const _rr = RFS + fnal;
            writeFileSync(mapcss, _rr);
          }
        }
      }
    };
  }
}
export type CSSinTS = obj<CSSinR | CSSinR[]>;
export { med, _var, ps, f };
export { v, c, x };
