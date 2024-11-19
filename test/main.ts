import { $$, ps, f, med, _var, c, v, x, css } from "../dist";

const fxs = __filename.split("/").slice(-3);
const { dom, cx, id, kf, font, save } = new css({
  name: fxs[2].split(".")[0],
  prefix: "",
});

cx.hello = {
  color: "red",
};

save({
  path: "./test",
});
