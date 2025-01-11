import { ps, f, med, _var, c, v, x, css, $$ } from "../dist";
import { cc } from "./ntest";

const fxs = __filename.split("/").slice(-3);

const gc = new css({
  name: fxs[2].split(".")[0],
  prefix: "",
  importCSS: cc,
});

const { cx: cx2, save } = gc;

cx2.okay = [
  {
    color: "#29e38d",
    margin: 1,
    transform: [f.translateX(2), f.scale(1)],
    border: [1, "red", "dashed"],
  },
];

save({
  path: "./test",
});
