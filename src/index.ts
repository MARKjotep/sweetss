import { readFileSync, watch, writeFileSync } from "node:fs";
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
export { med } from "./media";
export { _var } from "./var";

export type CSS = obj<
  CSSinR | CSSinR[] | { [key: `.${string}` | `#${string}`]: CSSinR | CSSinR[] }
>;

interface saveCSS {
  dir: string | string[];
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

  cids: Mapper<string, obj<string>> = new Mapper();
  constructor({
    name,
    prefix,
    importCSS = [],
  }: {
    name: string;
    prefix?: string;
    importCSS?: css | css[];
  }) {
    //
    this.name = name;
    this.prefix = prefix ?? name;
    loader.call(this, this.prefix, isArr(importCSS) ? importCSS : [importCSS]);

    this.save = ({ dir, mapDir, mapName, minify }: saveCSS) => {
      const css = new __css().load(this);

      const _DIR = isArr(dir) ? dir : [dir];
      const cssContent = !minify ? parseCSS(css.css) : css.css;

      _DIR.forEach((dd) => {
        const pathEnd = dd.endsWith("/") ? "" : "/";
        const cssFilePath = dd + pathEnd + name + ".css";

        isDir(dd + pathEnd);
        isFile(cssFilePath);

        writeFileSync(cssFilePath, cssContent);
      });

      if (dir[0] && (mapDir ??= dir[0])) {
        const mapEnd = mapDir.endsWith("/") ? "" : "/";
        const _mapName = mapName ? mapName : "css";
        const mapFilePath = mapDir + mapEnd + _mapName + ".js";

        isDir(mapDir + mapEnd);
        isFile(mapFilePath);

        this.cids.set(name, css.cid);

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
    kf: new Keyframes(),
    at: new At(),
    font: new FontFace(),
  };

  loads.forEach((l) => {
    this.cids.set(l.name, {});
    const cg = this.cids.get(l.name)!;
    const cids: obj<string> = {};
    oKeys(props).forEach((pr) => {
      props[pr].load(l[pr]);
      oAss(cids, Object.fromEntries(l[pr].cid));
    });
    oLen(cids) && oAss(cg, cids);
  });

  oKeys(props).forEach((pr) => {
    props[pr] = props[pr].css as any;
  });

  oAss(this, props);
}

export function fileName(path: string) {
  return path.split("/").slice(-1)[0].split(".")[0];
}
