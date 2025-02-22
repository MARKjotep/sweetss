import { ps, f, med, Var, SweetSS, $$ } from "../src";

export const cc = new SweetSS({
  __filename,
  prefix: "g",
  // exportMap: false,
});

const { dom, cx, id, kf, save } = cc;

cx.ok = {
  color: "red",
  clipPath: f.clipPath(
    "evenodd",
    "M40 0H50V10H40V0Z M60 20H40V10H30V20H20V30H10V20H0V40H60V20Z",
  ),
};
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
