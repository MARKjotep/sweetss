import { ps, f, med, Var, value, c, v, x, SweetSS, $$ } from "../src";
import { cc } from "./ntest";

const fxs = __filename.split("/").slice(-3);

const basic = med("#000", { dark: "#fff" });

const gc = new SweetSS({
  name: fxs[2].split(".")[0],
});

const { cx: cx2, save } = gc;

const v2 = Var({ V2: 5 });

export const aname = Var({
  anim: "bounce",
});
export const anim = Var({
  anim: ["okay", "1s", "infinite"],
});

cx2[`sm_animation_${"bounce"}`] = [
  {
    animationName: med([aname, "1s", "infinite"], {
      sm: ["pop", "1s", "infinite"],
      lg: anim,
    }),
  },
  anim,
];

cx2.lol = [
  ps.after()({
    color: "red",
    content: "ss",
  }),
  {
    width: 3,
    transitionDuration: 43,
    zIndex: 1,
    background: [
      //
      f.blur(0.5),
      f.attr(1),
      f.brightness("20%"),
      f.calc(1, "+", v2.__("orange")),
      f.circle("40%", "left"),
      f.colorMix("srgb", ["red", "10%"], ["salmon", "10%"]),
      f.conicGradient(["red", "45"], "blue"),
      f.contrast("20%"),
      f.cubicBezier(1, 2, 3, 4),
      f.dropShadow(0.8, 0.8, 0.1, "grey"),
      f.hsl(120, "100%", "50%"),
      f.hueRotate(20),
      f.inset("10%", "round", 2),
      f.invert("50%"),
      f.translateX(20),
      f.translateY(20),
      f.var("hello"),
      f.skewY(20),
      f.skew(-5, 6),
      f.rotate(20),
      f.rotate3d(1, 2, 5, 40),
      f.scale3d(1, 2, 3),
      f.scaleX(2),
      f.rgba(1, 3, 4, "40%"),
      f.linearGradient("to right", ["red", "17%"], ["orange", "30%", "50%"]),
      f.matrix(1, 0, 0, 0, 2, 3),
      f.perspective("2cm"),
      f.polygon(100, 0, 0, 50, 50),
      f.radialGradient(["closest-side at", 60, 50], "red", ["green", 15]),
      f.repeatingLinearGradient(45, ["red", 30], ["green", 50]),
      f.matrix3d(
        //
        [1, 0, 0, 0],
        [0, 1, 6, 0],
        [0, 0, 1, 0],
        [50, 100, 0, 1.1],
      ),
    ],
  },
];

cx2.okay = [{}];

save({
  dir: __dirname,
  minify: false,
});
