import { readFileSync, writeFileSync } from "node:fs";
import { $$, isArr, Mapper, oAss, obj, oItems, oKeys, oLen } from "./@";
import { isDir, isFile } from "./@/bun";
import { __css, atCSS, CSSinR, kfT } from "./css";
import { At, Cid, FontFace, Keyframes } from "./props";
import { _vars } from "./var";

export * from "./@misc/v";
export * from "./@misc/x";
export * from "./@misc/colors";
export * from "./@misc/ps";
export * from "./@misc/f";

export { $$ };
export { med, media } from "./media";
export { _var } from "./var";

export type CSS = obj<
  CSSinR | CSSinR[] | { [key: `.${string}` | `#${string}`]: CSSinR | CSSinR[] }
>;

interface saveCSS {
  dir?: string | string[];
  mapDir?: string;
  mapName?: string;
  minify?: boolean;
}

export class css {
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
    importCSS = [],
    exportMap = false,
  }: {
    name: string;
    prefix?: string;
    importCSS?: css | css[];
    exportMap?: boolean;
  }) {
    //
    this.name = name;
    this.prefix = prefix ?? "";
    this.exportMap = exportMap;
    loader.call(this, this.prefix, isArr(importCSS) ? importCSS : [importCSS]);

    this.save = ({ dir, mapDir, mapName, minify = true }: saveCSS) => {
      const css = new __css().load(this);
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
        oAss(ccd, css.cid);

        mapWriter(mapFilePath, this.cids);
      }
    };
  }
}

const mapWriter = (filePath: string, cids: Mapper<string, obj<string>>) => {
  let mapFileContent = readFileSync(filePath).toString();

  cids.forEach((v, key) => {
    const exportPrefix = `export const ${key} = `;
    const cssIdString = JSON.stringify(v);
    const newExport = exportPrefix + cssIdString + ";";
    const hasExistingExport = mapFileContent.match(exportPrefix);

    if (hasExistingExport) {
      const exportRegex = new RegExp(`${exportPrefix}.*?};`, "gm");
      const singleLineContent = mapFileContent.replace(/\n/gm, "");
      const updatedContent = singleLineContent.replace(exportRegex, newExport);
      writeFileSync(filePath, updatedContent);
      mapFileContent = updatedContent;
    } else {
      const updatedContent = mapFileContent + newExport;
      writeFileSync(filePath, updatedContent);
      mapFileContent = updatedContent;
    }
  });
};

const parseCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};

function loader(this: css, pref: string, loads: css[]) {
  const props: Record<string, Cid | At | FontFace> = {
    dom: new Cid("", pref),
    id: new Cid("#", pref),
    cx: new Cid(".", pref),
    kf: new Keyframes(pref),
    at: new At(),
    font: new FontFace(),
  };

  loads.forEach((l) => {
    const xp = l.exportMap;
    const cids: obj<string> = {};

    oKeys(props).forEach((pr) => {
      props[pr].load(l[pr]);
      if (xp) oAss(cids, Object.fromEntries(l[pr].cid));
    });

    if (xp && oLen(cids)) {
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
