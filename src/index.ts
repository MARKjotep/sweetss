import { readFileSync, writeFileSync } from "node:fs";
import { $$ } from "./@";
import { isDir, isFile } from "./@/bun";
import { At, CSS, CSSinR, Cid, Keyframes, FontFace } from "./base";
import { __css } from "./css";

const parseCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};

export class css {
  dom: CSS;
  id: CSS;
  cx: CSS;
  kf = new Keyframes().css;
  at = new At().css;
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

    this.dom = new Cid("", pref).css;
    this.id = new Cid("#", pref).css;
    this.cx = new Cid(".", pref).css;

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

      isDir(path + pathEnd);
      isFile(cssFilePath);
      const cssContent = minify ? parseCSS(css.css) : css.css;
      writeFileSync(cssFilePath, cssContent);

      if ((map ??= path)) {
        const mapEnd = map.endsWith("/") ? "" : "/";
        const mapFilePath = map + mapEnd + "css.js";

        isDir(map + mapEnd);
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

export * from "./misc/v";
export * from "./misc/x";
export * from "./misc/colors";
export * from "./misc/ps";
export * from "./misc/f";
//
export { $$, CSS, CSSinR };
export { med } from "./media";
export { _var } from "./var";
