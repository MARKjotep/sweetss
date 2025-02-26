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
import { __css, atCSS, CSSinR as CinR, RM } from "./css";
import { At, Cid, FontFace, Keyframes } from "./props";
import { _vars } from "./var";
import { Medyas } from "./media";

export * from "./@misc/v";
export * from "./@misc/ps";
export * from "./@misc/f";

export { $$, __ };
export { med, media, Medyas } from "./media";
export { Var } from "./var";
export { value, join } from "./value";

export type CSSProps = CinR | CinR[];
export type CSSValue = RM;

export type VarType = _vars;

export type CSS = obj<
  CSSProps | { [key: `.${string}` | `#${string}`]: CSSProps } | Medyas<any>
>;

type KFX = CSSProps | Medyas<any, {}>;

export type KFCSS = obj<
  | {
      from?: KFX;
      to?: KFX;
      "%"?: KFX;
    }
  | Record<any, CSSProps>
  | obj<CSSProps>
  | Medyas<any>
>;

interface saveCSS {
  dir?: string | string[];
  mapDir?: string;
  mapName?: string;
  minify?: boolean;
  shaker?: string[];
  include?: string[];
  includeAnimation?: string[];
}

interface sweetCFG {
  __filename: string;
  name?: string;
  prefix?: string;
  sweetSS?: SweetSS | SweetSS[];
  exportMap?: boolean;
  webkitKeyframes?: boolean;
}

export class SweetSS {
  [k: string]: any;
  path: string;
  protected _imported = new Set<string>();
  name: string;
  prefix: string;
  declare dom: CSS;
  declare id: CSS;
  declare cx: CSS;
  declare kf: KFCSS;
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
  declare sweet: this;
  constructor({
    __filename,
    name,
    prefix,
    sweetSS = [],
    exportMap = true,
    webkitKeyframes,
  }: sweetCFG) {
    //
    this.path = __filename;
    this.name = name || fileName(__filename);
    this.prefix = prefix ?? "";
    this.exportMap = exportMap;
    const importSS = isArr(sweetSS) ? sweetSS : [sweetSS];

    loader.call(this, this.prefix, importSS, webkitKeyframes, exportMap);
    const TH = this;
    Object.assign(this, {
      get sweet() {
        return TH;
      },
    });

    this.save = ({
      dir,
      mapDir,
      mapName = "index",
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
        const cssFilePath = dd + pathEnd + this.name + ".css";

        isDir(dd + pathEnd);
        isFile(cssFilePath);

        writeFileSync(cssFilePath, cssContent);
      });

      const _md = mapDir ? mapDir : (_DIR[0] ?? "");
      if (_md) {
        const mapEnd = _md.endsWith("/") ? "" : "/";

        const mapFilePath = _md + mapEnd + mapName + ".js";

        isDir(_md + mapEnd);
        isFile(mapFilePath);

        this.cids.init(this.name, {});
        const ccd = this.cids.get(this.name)!;

        const FCID = exportMap ? css.cid : css.cidz;

        oItems(FCID).forEach(([k, v]) => {
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
  get imported() {
    return [...this._imported];
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
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  writeFileSync(filePath, NITEM.length ? `export const ${NITEM.join()};` : "");

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
  webkf: boolean = false,
  exMap: boolean = false,
) {
  const props: Record<string, Cid | At | FontFace> = {
    dom: new Cid("", pref, exMap),
    id: new Cid("#", pref, exMap),
    cx: new Cid(".", pref, exMap),
    kf: new Keyframes(pref, webkf),
    at: new At(),
    font: new FontFace(),
  };

  loads.forEach((l) => {
    this._imported.add(l.path);

    l._imported.forEach((fr) => {
      this._imported.add(fr);
    });

    oKeys(props).forEach((pr) => {
      props[pr].load(l[pr]);
    });
  });

  oKeys(props).forEach((pr) => {
    props[pr] = props[pr].css as any;
  });

  oAss(this, props);
}

export function fileName(path: string) {
  return path.split("/").slice(-1)[0].split(".")[0];
}
