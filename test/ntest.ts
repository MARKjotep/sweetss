import { ps, f, med, _var, c, v, x, css, $$ } from "../dist";

const fxs = __filename.split("/").slice(-3);

export const cc = new css({
  name: fxs[2].split(".")[0],
  prefix: "g",
});

const { dom, cx, id, kf, font } = cc;

const _fheight = _var({ _fheight: 10 });

cx.okay = [
  {
    color: "red",
    border: [1, "red", "dashed"],
  },
  _fheight,
];
