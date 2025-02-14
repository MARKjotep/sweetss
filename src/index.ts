import { readFileSync, writeFileSync } from "node:fs";
import {
  $$,
  __,
  isArr,
  Mapper,
  oAss,
  obj,
  oFItems,
  oItems,
  oKeys,
  oLen,
} from "./@";
import { isDir, isFile } from "./@/bun";
import { __css, atCSS, CSSinR as CinR, kfT } from "./css";
import { At, Cid, FontFace, Keyframes } from "./props";
import { _vars } from "./var";

export * from "./@misc/v";
export * from "./@misc/x";
export * from "./@misc/colors";
export * from "./@misc/ps";
export * from "./@misc/f";

export { $$, __ };
export { med, media } from "./media";
export { Var } from "./var";

export type CSSinR = CinR | CinR[];

export type VarType = _vars;
export type CSS = obj<CSSinR | { [key: `.${string}` | `#${string}`]: CSSinR }>;

export type KFCSS = obj<{ from?: CinR; to?: CinR; "%"?: CinR } | obj<CinR>>;

interface saveCSS {
  dir?: string | string[];
  mapDir?: string;
  mapName?: string;
  minify?: boolean;
  shaker?: string[];
  include?: string[];
}

interface sweetCFG {
  name: string;
  prefix?: string;
  sweetSS?: SweetSS | SweetSS[];
  exportMap?: boolean;
  webkitKeyframes?: boolean;
}

export class SweetSS {
  [k: string]: any;
  name: string;
  prefix: string;
  declare dom: CSS;
  declare id: CSS;
  declare cx: CSS;
  declare kf: kfT;
  declare at: {
    import: atCSS;
    charset: atCSS;
  };
  declare font: {
    face: atCSS;
  };
  save: ({ dir, mapDir, mapName, minify }: saveCSS) => void;
  exportMap: boolean = false;
  cids: Mapper<string, obj<string>> = new Mapper();
  constructor({
    name,
    prefix,
    sweetSS = [],
    exportMap = false,
    webkitKeyframes,
  }: sweetCFG) {
    //
    this.name = name;
    this.prefix = prefix ?? "";
    this.exportMap = exportMap;
    const importSS = isArr(sweetSS) ? sweetSS : [sweetSS];

    loader.call(this, this.prefix, importSS, webkitKeyframes);

    this.save = ({
      dir,
      mapDir,
      mapName,
      minify = true,
      shaker = [],
      include = [],
    }: saveCSS) => {
      const css = new __css().load(this, shaker, include);
      const _DIR = isArr(dir) ? dir : [dir];

      const cssContent = minify ? parseCSS(css.css) : css.css;

      _DIR.forEach((dd) => {
        if (!dd) return;
        const pathEnd = dd.endsWith("/") ? "" : "/";
        const cssFilePath = dd + pathEnd + name + ".css";

        isDir(dd + pathEnd);
        isFile(cssFilePath);

        writeFileSync(cssFilePath, cssContent);
      });

      const _md = mapDir ? mapDir : (_DIR[0] ?? "");
      if (_md) {
        const mapEnd = _md.endsWith("/") ? "" : "/";
        const _mapName = mapName ? mapName : "css";
        const mapFilePath = _md + mapEnd + _mapName + ".js";

        isDir(_md + mapEnd);
        isFile(mapFilePath);

        this.cids.init(name, {});
        const ccd = this.cids.get(name)!;

        oItems(css.cid).forEach(([k, v]) => {
          if (ccd[k]) {
            ccd[k] = v + " " + ccd[k];
          } else {
            ccd[k] = v;
          }
        });

        mapWriter2(mapFilePath, this.cids);
      }
    };
  }
}

const mapWriter2 = (filePath: string, cids: Mapper<string, obj<string>>) => {
  //
  const consol: obj<string[]> = {};

  cids.values().forEach((v) => {
    oItems(v).forEach(([x, y]) => {
      if (!consol[x]) {
        consol[x] = [y];
      } else {
        consol[x].push(y);
      }
    });
  });

  const NITEM = oItems(consol)
    .map(([x, y]) => {
      return `${x}="${y.join(" ")}"`;
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .join();

  writeFileSync(filePath, `export const ${NITEM};`);

  return;
};

const parseCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};

function loader(
  this: SweetSS,
  pref: string,
  loads: SweetSS[],
  webkf: boolean = true,
) {
  const props: Record<string, Cid | At | FontFace> = {
    dom: new Cid("", pref),
    id: new Cid("#", pref),
    cx: new Cid(".", pref),
    kf: new Keyframes(pref, webkf),
    at: new At(),
    font: new FontFace(),
  };

  loads.forEach((l) => {
    const xport = l.exportMap;
    const cids: obj<string> = {};

    oKeys(props).forEach((pr) => {
      //
      props[pr].load(l[pr]);
      if (xport) {
        oAss(cids, oFItems(l[pr].cid));
      }
    });

    if (xport && oLen(cids)) {
      this.cids.set(l.name, {});
      const cg = this.cids.get(l.name)!;
      oAss(cg, cids);
    }
  });

  oKeys(props).forEach((pr) => {
    props[pr] = props[pr].css as any;
  });

  oAss(this, props);
}

export function fileName(path: string) {
  return path.split("/").slice(-1)[0].split(".")[0];
}

export function Join(delimeter: string, ...val: any[]) {
  return;
}
