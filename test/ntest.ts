import { ps, f, med, Var, c, v, x, SweetSS, $$ } from "../src";

const fxs = __filename.split("/").slice(-3);

export const cc = new SweetSS({
  name: fxs[2].split(".")[0],
  prefix: "g",
});

const { dom, cx, id, kf, save } = cc;

const _fheight = Var({ _fheight: 10 });

cx.okay = [
  {
    color: "red",
    border: [1, "red", "dashed"],
  },
  _fheight,
];

/*
-------------------------

-------------------------
*/
if (require.main === module) {
  save({
    dir: "./test",
  });
}
