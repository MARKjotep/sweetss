import { ps, f, med, _var, c, v, x, css } from "../dist";

const fxs = __filename.split("/").slice(-3);
const { dom, cx, id, kf, font, save } = new css({
  name: fxs[2].split(".")[0],
  prefix: "",
});

const _fheight = _var({ _fheight: 10 });

cx.hello = [
  {
    color: "red",
    margin: 0,
    transform: f.translateX(2),
  },
  _fheight,
];

save({
  path: "./test",
});
