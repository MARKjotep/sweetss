import { readdirSync, statSync, watch } from "node:fs";
import { dirname, join } from "node:path";
import { BunPlugin, plugin, resolve } from "bun";

// changes import
// sylveon

const dir = __dirname;
const pdir = dirname(dir);
const out = "./DIST/";
const bun = true;

const packages = bun ? ["sweetss"] : ["hellmo"];

const findTSX = (dir: string): string[] => {
  let tsxFiles: string[] = [];
  const files = readdirSync(dir);
  files.forEach((file) => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      tsxFiles = tsxFiles.concat(findTSX(filePath));
    } else if (
      !file.endsWith("d.ts") &&
      file.startsWith("index") &&
      (file.endsWith(".tsx") || file.endsWith(".ts"))
    ) {
      tsxFiles.push(filePath);
    }
  });

  return tsxFiles;
};

const Builder = async () => {
  packages.forEach((ff) => {
    const TXX = findTSX(dir + "/" + ff);
    TXX.length &&
      Bun.build({
        entrypoints: TXX,
        outdir: out + ff,
        splitting: true,
        minify: {
          identifiers: true,
          whitespace: true,
          syntax: true,
        },
        // root: dir + "/" + ff,
        packages: "external",
        target: bun ? "bun" : "browser",
        naming: {
          // chunk: "fsyt-s.js",
          entry: "[dir]/[name].[ext]",
          chunk: "[name]-[hash].[ext]",
          asset: "[name]-[hash].[ext]",
        },
        experimentalCss: true,
      }).then((e) => {
        if (e.success) {
          //
          console.log(`${ff} : success - ${new Date().getTime()}`);
        } else {
          console.log(e.logs);
        }
      });
  });
};

// bun build ./src/index.ts --outdir ./dist --minify --packages external --target bun
await Builder();
// const watchFolder = "/sweetss";
// const watcher = watch(
//   __dirname + watchFolder,
//   { recursive: true },
//   async (event, filename) => {
//     if (filename && (filename.endsWith("tsx") || filename.endsWith("ts"))) {
//       await Builder();
//       // console.log(`Triggered in ${filename}`);
//     }
//   },
// );

// process.on("SIGINT", () => {
//   console.log("\nwatcher closed...");
//   watcher.close();
//   process.exit(0);
// });
