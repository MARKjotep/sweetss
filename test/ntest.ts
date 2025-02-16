import { ps, f, med, Var, SweetSS, $$ } from "../src";

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
    animation: "bounce 2s ease",
  },
  _fheight,
];

kf.bounce = {
  from: {
    color: "red",
  },
};

kf.bouncer = {
  from: {
    color: "red",
  },
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
