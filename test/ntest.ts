import { ps, f, med, Var, SweetSS, $$ } from "../src";

const fxs = __filename.split("/").slice(-3);

export const cc = new SweetSS({
  name: fxs[2].split(".")[0],
  prefix: "g",
  // exportMap: false,
});

const { dom, cx, id, kf, save } = cc;

/*
-------------------------

-------------------------
*/
if (require.main === module) {
  save({
    dir: "./test",
    mapName: "lol",
    mapDir: __dirname,
  });
}
