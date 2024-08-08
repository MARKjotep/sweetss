import {
  mkdirSync,
  readFileSync,
  statSync,
  writeFile,
  writeFileSync,
} from "node:fs";
import { dirname } from "path";
/**
 * Chi2
 */

// TYPES --------------------------------------
type V = string | number | boolean | undefined;
type fun<E, T> = (e?: E) => T;
interface dict<T> {
  [Key: string]: T;
}
interface mtype {
  xs?: RM;
  sm?: RM;
  smd?: RM;
  md?: RM;
  lg?: RM;
  xl?: RM;
  xxl?: RM;
  no_hover?: RM;
}
type RM = V | _media | _vars | RM[];
interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  textFillColor?: string;
  webkitTextFillColor?: string;
}
export type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};
//   -----------
export class $$ {
  static set p(a: any) {
    if (Array.isArray(a)) {
      console.log(...a);
    } else {
      console.log(a);
    }
  }
  static get O() {
    return {
      vals: Object.values,
      keys: Object.keys,
      items: Object.entries,
      has: Object.hasOwn,
      assign: Object.assign,
    };
  }
  static is_number(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  static rand(min = 6, max?: number) {
    if (max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    const rndInt = Math.floor(Math.random() * min) + 1;
    return rndInt - 1;
  }
  static fill(count: number, fill: any = null) {
    return Array(count).fill(fill);
  }
}

// -----------------
const _ff = [];
const _cx: dict<string> = {};

function reCamel(_case: string) {
  if (_case.startsWith("webkit")) {
    _case = "-" + _case;
  }
  return _case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
const norems = [
  "zIndex",
  "opacity",
  "aspectRatio",
  "flexGrow",
  "order",
  "flexShrink",
  "flexBasis",
  "flex",
  "transitionDelay",
  "animationDelay",
  "fillOpacity",
];
function val_xxx(sel: string, val: V | _vars, kk = { rem: true, deg: false }) {
  const { rem, deg } = kk;

  if (val instanceof _vars) {
    return val.__();
  } else if (Array.isArray(val)) {
    return val
      .reduce<string[]>((vl, ky) => {
        vl.push(val_xxx(sel, ky));
        return vl;
      }, [])
      .join(" ");
  } else if (typeof val == "number") {
    let rval = String(val);
    if (rem && !norems.includes(sel)) {
      rval = `${val}rem`;
    }
    if (deg) {
      rval = `${val}deg`;
    }
    return String(rval);
  }

  val = String(val);
  if (val.indexOf("(") > -1) {
    return val;
  }
  return `${val}`;
}
const xs = new RegExp(/(\.|#).*?\w*/g);
let CNAME = "";
function _pseu(sel: string) {
  return function (...itm: (CSSinR | _vars | dict<RM>)[]) {
    const vals: any = itm.reduce((val, i) => {
      if (i instanceof _vars) {
        val = { ...val, ...{ [i._var]: i._val } };
      } else {
        val = { ...val, ...i };
      }
      return val;
    }, {});

    if (sel.startsWith("::before") || sel.startsWith("::after")) {
      if (!("content" in vals)) {
        vals.content = "";
      }
    }

    return {
      ...{
        [sel]: {
          ...vals,
        },
      },
    };
  };
}

class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: _media = {};
  constructor(vr: dict<RM> = {}) {
    if ($$.O.keys(vr).length) {
      const [k, v] = $$.O.items(vr)[0];
      this.k = k;
      this._var = "--" + reCamel(k);
      this._val = v instanceof _media ? v : med(v);
    }
  }
  __(fallback?: V): string {
    return `var(${this._var}${
      fallback ? "," + val_xxx(this._var, fallback) : ""
    })`;
  }
  new(val: RM) {
    return new _vars({ [this.k]: val });
  }
  not(val: RM) {
    return new _vars({ [this.k]: val });
  }
}
class _media {
  static readonly prop = {
    xs: "@media (width <= 480px)",
    sm: "@media (width >= 480px)",
    smd: "@media (width >= 624px)",
    md: "@media (width >=  768px)",
    lg: "@media (width >=  1024px)",
    xl: "@media (width >= 1280px)",
    xxl: "@media (width >= 1536px)",
    no_hover: "@media (pointer: coarse)",
  };
  static default = "xs";
  constructor(defValue: RM, g: dict<any> = {}) {
    const defM = _media.default;
    const DM: dict<RM> = {};
    DM[defM] = defValue;
    if (!(defM in g)) {
      g[defM] = defValue;
    }

    $$.O.items(g).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        DM[k] = tup_rst(v, false, false);
      } else {
        DM[k] = v;
      }
    });
    $$.O.assign(this, DM);
  }
  static setDefault(def: keyof typeof _media.prop) {
    _media.default = def;
  }
}
export const med = (defValue: RM, g: mtype = {}) => new _media(defValue, g);
export const _var = (vr: dict<RM>) => new _vars(vr);
export const { cx, id, dom, keyframes, at, font, _css } = (function () {
  class callBack {
    data: dict<any>;
    pre: string;
    constructor(pre: string = ".") {
      this.data = {};
      this.pre = pre;
    }
    set(target: any, prop: string, val: CSSinR) {
      const nme = this.pre + prop;
      target.data[nme] = val;
      return target;
    }
    get(target: any, prop: string) {
      const nme = this.pre + prop;
      if (nme in target) {
        return target[nme];
      } else if (prop == "data") {
        return target.data;
      }
      return target.data[nme];
    }
    has(target: any, prop: string) {
      const nme = this.pre + prop;
      if (nme in target.data) {
        return true;
      }
      return false;
    }
  }
  // --------------
  class cs extends callBack {
    constructor(pre: string = "") {
      super(pre);
    }
    get css(): dict<_css> {
      return new Proxy(this, this);
    }
  }

  class keyframes {
    data: dict<any>;
    pre: string;
    constructor(pre: string = "") {
      this.data = {};
      this.pre = pre;
    }
    set(target: any, prop: string, val: dict<any>) {
      const nme = this.pre + prop;
      target.data[nme] = val;
      return target;
    }
    get(target: any, prop: string) {
      const nme = this.pre + prop;
      if (nme in target) {
        return target[nme];
      } else if (prop == "data") {
        return target.data;
      }
      return target.data[nme];
    }
    get css(): dict<
      { from?: CSSinR; to?: CSSinR; "%"?: CSSinR } | dict<CSSinR>
    > {
      return new Proxy(this, this);
    }
  }

  class ats {
    data: dict<any>;
    pre: string;
    constructor(pre: string = "@") {
      this.data = {};
      this.pre = pre;
    }
    set(target: any, prop: string, val: dict<any>) {
      const nme = this.pre + prop;
      target.data[nme] = val;
      return target;
    }
    get(target: any, prop: string) {
      const nme = this.pre + prop;
      if (nme in target) {
        return target[nme];
      } else if (prop == "data") {
        return target.data;
      }
      return target.data[nme];
    }
    get css(): dict<string> {
      return new Proxy(this, this);
    }
  }

  class FontFace {
    dataarr: dict<any>[];
    pre: string;
    constructor(pre: string = "@font-face") {
      this.dataarr = [];
      this.pre = pre;
    }
    set(target: any, prop: string, val: CSSinR) {
      target.dataarr.push(val);
      return target;
    }

    get css(): { face: CSSinR | _vars | dict<RM> } {
      return new Proxy(this, this);
    }
  }

  const domx = new cs("").css;

  const fv = {
    dom: domx,
    id: new cs("#").css,
    cx: new cs(".").css,
    keyframes: new keyframes().css,
    at: new ats().css,
    font: new FontFace().css,
  };

  // --------------
  function props(prp: dict<_media>) {
    const _pr: dict<any> = {};
    $$.O.items(prp).forEach(([k, v]) => {
      _pr[k] = {};
      $$.O.items(v).forEach(([mk, mv]) => {
        _pr[k][mk] = val_xxx(k, mv);
      });
    });
    return _pr;
  }

  const isFile = (path: string) => {
    try {
      return statSync(path).isFile();
    } catch (err) {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, Buffer.from(""));
      return true;
    }
  };

  class _css {
    itms: (CSSinR | _vars)[];
    constructor(...itm: (CSSinR | _vars)[]) {
      this.itms = itm;
    }
    static get __css() {
      const medias: dict<dict<string[]>> = {};
      const kfs: dict<dict<dict<string[]>>> = {};
      const def = _media.default;
      const mprops: dict<any> = _media.prop;
      const fin: string[] = [];

      fin.push(`/* ------------------- */`);
      $$.O.keys(mprops).forEach((kh) => {
        medias[kh] = {};
        kfs[kh] = {};
      });

      $$.O.vals(fv).forEach((xx) => {
        if (xx instanceof callBack) {
          $$.O.items(xx.data).forEach(([k, v]) => {
            if (k.startsWith("#") || k.startsWith(".")) {
              if (k.slice(1).startsWith("root")) {
              } else {
                const ks = k.slice(1);
                _cx[ks] = CNAME + "_" + ks;
              }
            }
            if (v instanceof _css) {
              $$.O.items(v.get(k)).forEach(([pkey, y]) => {
                let XPKEY = pkey;
                const xxs = pkey.match(xs);
                xxs?.forEach((kx) => {
                  const ks = kx.slice(1);
                  if (!(ks in _cx)) {
                    _cx[ks] = CNAME + "_" + ks;
                  }
                });

                if (k.slice(1).startsWith("root")) {
                } else {
                  if (pkey.indexOf(".") > -1) {
                    XPKEY = pkey.replaceAll(".", "." + CNAME + "_");
                  }
                  if (pkey.indexOf("#") > -1) {
                    XPKEY = pkey.replaceAll("#", "#" + CNAME + "_");
                  }
                }

                // $$.p = XPKEY;

                $$.O.items(y).forEach(([pprop, yv]) => {
                  $$.O.items(yv).forEach(([pk, pv]) => {
                    if (!(XPKEY in medias[pk])) {
                      medias[pk][XPKEY] = [];
                    }
                    let isCtx = pprop == "content" && !(pv.indexOf("(") > -1);
                    let pvp = isCtx ? `'${pv}'` : pv;
                    medias[pk][XPKEY].push(`${reCamel(pprop)} : ${pvp} ;`);
                  });
                });
              });
            }
          });
        } else if (xx instanceof keyframes) {
          $$.O.items(xx.data).forEach(([k, v]) => {
            const kfKEY = `@keyframes ${k}`;
            // $$.p = [kfKEY, "{}"];
            $$.O.items(v as dict<dict<RM>>).forEach(([kfX, y]) => {
              const yk = $$.O.items(y).reduce((vl, [rk, rv]) => {
                vl[rk] = _css.__reVAL(rv);
                return vl;
              }, {} as dict<_media>);

              $$.O.items(props(yk)).forEach(([pk, pv]) => {
                $$.O.items(pv).forEach(([pkk, pvv]) => {
                  if (!(kfKEY in kfs[pkk])) {
                    kfs[pkk][kfKEY] = {};
                  }
                  if (!(kfX in kfs[pkk][kfKEY])) {
                    kfs[pkk][kfKEY][kfX] = [];
                  }
                  kfs[pkk][kfKEY][kfX].push(`${reCamel(pk)} : ${pvv} ;`);
                });
              });
            });
          });
        } else if (xx instanceof ats) {
          $$.O.items(xx.data).forEach(([k, v]) => {
            const ch: string = v.indexOf("(") > -1 ? v : `"${v}"`;
            fin.push(`${k} ${ch.trim()};`);
          });
        } else if (xx instanceof FontFace) {
          const fkey = `@font-face`;

          xx.dataarr.forEach((k) => {
            const yk = $$.O.items(k).reduce((vl, [rk, rv]) => {
              vl[rk] = _css.__reVAL(rv);
              return vl;
            }, {} as dict<_media>);
            const FRP: string[] = [];
            $$.O.items(props(yk)).forEach(([pk, pv]) => {
              FRP.push(`${reCamel(pk)} : ${pv.xs} ;`);
            });
            const FFG = fkey + "{\n\t" + FRP.join("\n\t") + "\n}";
            fin.push(FFG);
          });
        }
      });

      fin.push(`\n/* default : ${def} -------- */`);

      $$.O.items(medias[def]).forEach(([k, v]) => {
        fin.push(`${k}\t{\n\t${v.join("\n\t")}\n}`);
      });
      $$.O.items(kfs[def]).forEach(([k, v]) => {
        const mxt: string[] = [];
        $$.O.items(v).forEach(([kk, vv]) => {
          mxt.push(`${kk}\t{\n\t\t${vv.join("\n\t\t")}\n\t}`);
        });
        fin.push(`${k}\t{\n\t${mxt.join("\n\t")}\n}`);
      });
      delete medias[def];
      delete kfs[def];

      $$.O.items(medias).forEach(([k, v]) => {
        const mitm: string[] = [];
        $$.O.items(v).forEach(([kk, vv]) => {
          mitm.push(`${kk}\t{\n\t\t${vv.join("\n\t\t")}\n\t}`);
        });

        $$.O.items(kfs[k]).forEach(([k, v]) => {
          const mxt: string[] = [];
          $$.O.items(v).forEach(([kk, vv]) => {
            mxt.push(`${kk}\t{\n\t\t\t${vv.join("\n\t\t\t")}\n\t\t}`);
          });
          mitm.push(`${k}\t{\n\t\t${mxt.join("\n\t\t")}\n\t}`);
        });

        if (mitm.length) {
          fin.push(`/* ------------------------ ${k} */`);
          fin.push(`${mprops[k]}\t{\n\t${mitm.join("\n\t")}\n}`);
        }
      });

      return fin.join("\n");
    }
    static __reVAL(val: RM): _media {
      if (val instanceof _media) {
        return val;
      } else if (val instanceof _vars) {
        return med(val.__());
      } else {
        return med(val);
      }
    }
    __reCSS(sel: string, xcs: dict<RM>) {
      const fin: dict<dict<V>> = {};
      const xfin: dict<dict<V>> = {};
      const mainx: dict<_media> = {};
      const isArr = (k: string, v: RM): string[] => {
        if (Array.isArray(v)) {
          return v.reduce<string[]>((vs, kk) => {
            if (kk instanceof _vars) {
              vs.push(val_xxx(k, kk.__()));
            } else if (Array.isArray(kk)) {
              vs.push(isArr(k, kk).join(" "));
            } else {
              vs.push(val_xxx(k, kk));
            }
            return vs;
          }, []);
        }
        return [];
      };

      $$.O.items(xcs).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          let avx;
          if (Array.isArray(v[0])) {
            avx = isArr(k, v).join(", ");
          } else {
            avx = isArr(k, v).join(" ");
          }

          mainx[k] = _css.__reVAL(avx);
        } else if (typeof v == "object") {
          if (v instanceof _media) {
            mainx[k] = v;
          } else if (v instanceof _vars) {
            mainx[k] = _css.__reVAL(v);
          } else {
            $$.O.assign(xfin, this.__reCSS(sel + k, v as any));
          }
        } else {
          if (k == "content" && v == "") {
            mainx[k] = _css.__reVAL("");
          } else {
            mainx[k] = _css.__reVAL(v);
          }
        }
      });
      fin[sel] = props(mainx);
      $$.O.assign(fin, xfin);
      return fin;
    }
    get(sel: string) {
      const xx: dict<dict<_media>> = {};
      const zz: dict<dict<_media>> = {};
      const mainx: dict<_media> = {};
      this.itms.forEach((dc) => {
        if (dc instanceof _vars) {
          mainx[dc._var] = dc._val;
        } else {
          $$.O.items(dc).forEach(([k, v]) => {
            if (k.startsWith(":")) {
              let vv = v as dict<any>;

              $$.O.assign(zz, this.__reCSS(`${sel}${k}`, vv));
            } else if (k.indexOf(" ") > -1) {
              $$.O.assign(zz, this.__reCSS(`${sel}${k}`, v as dict<any>));
            } else {
              if (Array.isArray(v)) {
                const a1 = Array.isArray(v[0]);
                const avx = v.reduce<string[]>((vl, ky) => {
                  vl.push(val_xxx(k, ky));
                  return vl;
                }, []);

                mainx[k] = _css.__reVAL(avx.join(a1 ? ", " : " "));
              } else {
                mainx[k] = _css.__reVAL(v);
              }
            }
          });
        }
      });
      xx[sel] = props(mainx);
      $$.O.assign(xx, zz);
      return xx;
    }
    static save({
      name,
      path = "./",
      map,
    }: {
      name: string;
      path: string;
      map?: string;
    }) {
      CNAME = name;

      // ------
      const ce = this.__css;
      const cfl = path + name + ".css";
      if (isFile(cfl)) {
        // --
        writeFileSync(cfl, Buffer.from(ce));
      }

      if (map) {
        const mapcss = map + "css.js";

        if (isFile(mapcss)) {
          const RFS = readFileSync(mapcss).toString();
          const cxstr = JSON.stringify(_cx);
          const prep = `export const ${name} = `;
          const rmm = RFS.match(prep);
          const fnal = prep + cxstr + ";";
          if (rmm) {
            const rg = new RegExp(`${prep}.*?};`, "gm");
            const RFX = RFS.replace(/\n/gm, "");
            const _rr = RFX.replace(rg, fnal);
            writeFileSync(mapcss, Buffer.from(_rr));
          } else {
            const _rr = RFS + fnal;
            writeFileSync(mapcss, Buffer.from(_rr));
          }
        }
      }
    }
  }

  return {
    ...fv,
    _css,
  };
})();

export function css(...itm: (CSSinR | _vars | dict<RM>)[]) {
  return new _css(...itm);
}

export const v = {
  important: " !important",
  visible: "visible",
  hidden: "hidden",
  auto: "auto",
  none: "none",
  clip: "clip",
  scroll: "scroll",
  initial: "initial",
  inherit: "inherit",

  // # FLEXS -----------------------
  flex: "flex",
  center: "center",
  flex_start: "flex-start",
  flex_end: "flex-end",
  stretch: "stretch",
  wrap: "wrap",
  column: "column",
  column_reverse: "column-reverse",
  row: "row",
  row_reverse: "row-reverse",
  space_between: "space-between",
  space_around: "space-around",

  // # 100s -----------------------
  pr100: "100%",
  pr50: "50%",
  i100vh: "100vh",
  i100vw: "100vw",

  // # Display -----------------------
  block: "block",

  // # Position -----------------------
  sticky: "sticky",
  fixed: "fixed",
  absolute: "absolute",
  relative: "relative",

  // # Cursors -----------------------
  pointer: "pointer",
  grabbing: "grabbing",

  // # Inputs -----------------------
  checkbox: "checkbox",

  // # borders ------
  solid: "solid",
  inset: "inset",

  // # Fonts -----------------------
  bold: "bold",
  currentColor: "currentColor",

  forwards: "forwards",
  text: "text",
  // # posi -----------------------
  norepeat: "no-repeat",
  nowrap: "nowrap",

  // # Blend -----------------------
  difference: "difference",

  // # Transform -----------------------
  preserve3d: "preserve-3d",
};

/**
 * COLORS
 */
export const c = {
  aliceBlue: "#F0F8FF",
  antiqueWhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedAlmond: "#FFEBCD",
  blue: "#0000FF",
  blueViolet: "#8A2BE2",
  brown: "#A52A2A",
  burlyWood: "#DEB887",
  cadetBlue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerBlue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkBlue: "#00008B",
  darkCyan: "#008B8B",
  darkGoldenrod: "#B8860B",
  darkGray: "#A9A9A9",
  darkGreen: "#006400",
  darkKhaki: "#BDB76B",
  darkMagenta: "#8B008B",
  darkOliveGreen: "#556B2F",
  darkOrange: "#FF8C00",
  darkOrchid: "#9932CC",
  darkRed: "#8B0000",
  darkSalmon: "#E9967A",
  darkSeaGreen: "#8FBC8B",
  darkSlateBlue: "#483D8B",
  darkSlateGray: "#2F4F4F",
  darkTurquoise: "#00CED1",
  darkViolet: "#9400D3",
  deepPink: "#FF1493",
  deepSkyBlue: "#00BFFF",
  dimGray: "#696969",
  dodgerBlue: "#1E90FF",
  fireBrick: "#B22222",
  floralWhite: "#FFFAF0",
  forestGreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostWhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  green: "#008000",
  greenYellow: "#ADFF2F",
  honeyDew: "#F0FFF0",
  hotPink: "#FF69B4",
  indianRed: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderBlush: "#FFF0F5",
  lawnGreen: "#7CFC00",
  lemonChiffon: "#FFFACD",
  lightBlue: "#ADD8E6",
  lightCoral: "#F08080",
  lightCyan: "#E0FFFF",
  lightGoldenrodYellow: "#FAFAD2",
  lightGray: "#D3D3D3",
  lightGreen: "#90EE90",
  lightPink: "#FFB6C1",
  lightSalmon: "#FFA07A",
  lightSeaGreen: "#20B2AA",
  lightSkyBlue: "#87CEFA",
  lightSlateGray: "#778899",
  lightSteelBlue: "#B0C4DE",
  lightYellow: "#FFFFE0",
  lime: "#00FF00",
  limeGreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumAquamarine: "#66CDAA",
  mediumBlue: "#0000CD",
  mediumOrchid: "#BA55D3",
  mediumPurple: "#9370DB",
  mediumSeaGreen: "#3CB371",
  mediumSlateBlue: "#7B68EE",
  mediumSpringGreen: "#00FA9A",
  mediumTurquoise: "#48D1CC",
  mediumVioletRed: "#C71585",
  midnightBlue: "#191970",
  mintCream: "#F5FFFA",
  mistyRose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajoWhite: "#FFDEAD",
  navy: "#000080",
  oldLace: "#FDF5E6",
  olive: "#808000",
  oliveDrab: "#6B8E23",
  orange: "#FFA500",
  orangeRed: "#FF4500",
  orchid: "#DA70D6",
  paleGoldenrod: "#EEE8AA",
  paleGreen: "#98FB98",
  paleTurquoise: "#AFEEEE",
  paleVioletRed: "#DB7093",
  papayaWhip: "#FFEFD5",
  peachPuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderBlue: "#B0E0E6",
  purple: "#800080",
  rebeccaPurple: "#663399",
  red: "#FF0000",
  rosyBrown: "#BC8F8F",
  royalBlue: "#4169E1",
  saddleBrown: "#8B4513",
  salmon: "#FA8072",
  sandyBrown: "#F4A460",
  seaGreen: "#2E8B57",
  seaShell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyBlue: "#87CEEB",
  slateBlue: "#6A5ACD",
  slateGray: "#708090",
  snow: "#FFFAFA",
  springGreen: "#00FF7F",
  steelBlue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whiteSmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowGreen: "#9ACD32",
  transparent: "transparent",
  /**
   * currentColor
   */
  color: "currentColor",
  rbga: (r = 0, g = 0, b = 0, a: number = 1) => {
    const _rgb = [r, g, b, a];
    return `rgba(${_rgb.join(",")})`;
  },
  rand: () => {
    const rit = $$.O.items(c);
    const rnd = $$.rand(0, rit.length - 1);
    const xmp = ["transparent", "rgba", "rand", "color", "hex2rbga"];
    let [kk, vv] = rit[rnd];

    while (xmp.includes(kk)) {
      const rnd = $$.rand(0, rit.length - 1);
      [kk, vv] = rit[rnd];
    }
    return vv;
  },
  hex2rbga: (hexCode: string, opacity: number = 1.0) => {
    let hex = hexCode.replace("#", "");
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};

// --------------
function tup_rst(
  sfs: RM[],
  noRem: boolean = true,
  wcom: boolean = true,
  ideg: boolean = false,
  qt: boolean = false,
) {
  const fnal: string[] = [];
  sfs.forEach((ff) => {
    if (typeof ff == "string") {
      if (qt) {
        fnal.push(`'${ff}'`);
      } else {
        fnal.push(`${ff}`);
      }
    } else if (ff instanceof _vars) {
      fnal.push(ff.__());
    } else {
      if ($$.is_number(ff)) {
        const eff = String(ff);
        fnal.push(eff + (noRem ? "" : ideg ? "deg" : "rem"));
      } else {
      }
    }
  });

  return fnal.join(wcom ? ", " : " ");
}
export class f {
  static attr(...sfs: RM[]) {
    return `attr(${tup_rst(sfs)}) `;
  }
  static blur(...sfs: RM[]) {
    return `blur(${tup_rst(sfs, false, false, false)}) `;
  }
  static brightness(...sfs: RM[]) {
    return `brightness(${tup_rst(sfs)}) `;
  }
  static calc(...sfs: RM[]) {
    return `calc(${tup_rst(sfs, false, false, false, false)}) `;
  }
  static circle(...sfs: RM[]) {
    return `circle(${tup_rst(sfs, false, false, false, false)}) `;
  }
  static colorMix(...sfs: RM[]) {
    return `color-mix(${tup_rst(sfs)}) `;
  }
  static conicGradient(...sfs: RM[]) {
    return `conic-gradient(${tup_rst(sfs)}) `;
  }
  static contrast(...sfs: RM[]) {
    return `contrast(${tup_rst(sfs)}) `;
  }
  static cubicBezier(...sfs: RM[]) {
    return `cubic-bezier(${tup_rst(sfs)}) `;
  }
  static dropShadow(...sfs: RM[]) {
    return `drop-shadow(${tup_rst(sfs, false, false, false, false)}) `;
  }
  static env(...sfs: RM[]) {
    return `env(${tup_rst(sfs, false)}) `;
  }
  static grayscale(...sfs: RM[]) {
    return `grayscale(${tup_rst(sfs)}) `;
  }
  static hsl(...sfs: RM[]) {
    return `hsl(${tup_rst(sfs)}) `;
  }
  static hsla(...sfs: RM[]) {
    return `hsla(${tup_rst(sfs)}) `;
  }
  static hueRotate(...sfs: RM[]) {
    return `hue-rotate(${tup_rst(sfs, false, false, true)}) `;
  }
  static inset(...sfs: RM[]) {
    return `inset(${tup_rst(sfs)}) `;
  }
  static invert(...sfs: RM[]) {
    return `invert(${tup_rst(sfs)}) `;
  }
  static linearGradient(...sfs: RM[]) {
    return `linear-gradient(${tup_rst(sfs)}) `;
  }
  static matrix(...sfs: RM[]) {
    return `matrix(${tup_rst(sfs)}) `;
  }
  static matrix3d(...sfs: RM[]) {
    return `matrix3d(${tup_rst(sfs)}) `;
  }
  static max(...sfs: RM[]) {
    return `max(${tup_rst(sfs)}) `;
  }
  static min(...sfs: RM[]) {
    return `min(${tup_rst(sfs)}) `;
  }
  static opacity(...sfs: RM[]) {
    return `opacity(${tup_rst(sfs)}) `;
  }
  static path(...sfs: RM[]) {
    return `path(${tup_rst(sfs, true, true, false, true)}) `;
  }
  static perspective(...sfs: RM[]) {
    return `perspective(${tup_rst(sfs, false, false, false, false)}) `;
  }
  static polygon(...sfs: RM[]) {
    return `polygon(${tup_rst(sfs)}) `;
  }
  static radialGradient(...sfs: RM[]) {
    return `radial-gradient(${tup_rst(sfs)}) `;
  }
  static repeatingConicFunction(...sfs: RM[]) {
    return `repeating-conic-function(${tup_rst(sfs)}) `;
  }
  static repeatingLinearGradient(...sfs: RM[]) {
    return `repeating-linear-gradient(${tup_rst(sfs)}) `;
  }
  static repeatingRadialGradient(...sfs: RM[]) {
    return `repeating-radial-gradient(${tup_rst(sfs)}) `;
  }
  static rgb(...sfs: RM[]) {
    return `rgb(${tup_rst(sfs)}) `;
  }
  static rgba(...sfs: RM[]) {
    return `rgba(${tup_rst(sfs)}) `;
  }
  static rotate(...sfs: RM[]) {
    return `rotate(${tup_rst(sfs, false, false, true)}) `;
  }
  static rotate3d(x: number, y: number, z: number, angle: string) {
    return `rotate3d(${x},${x},${x},${angle}) `;
  }
  static rotateX(...sfs: RM[]) {
    return `rotateX(${tup_rst(sfs, false, false, true)}) `;
  }
  static rotateY(...sfs: RM[]) {
    return `rotateY(${tup_rst(sfs, false, false, true)}) `;
  }
  static rotateZ(...sfs: RM[]) {
    return `rotateZ(${tup_rst(sfs, false, false, true)}) `;
  }
  static saturate(...sfs: RM[]) {
    return `saturate(${tup_rst(sfs)}) `;
  }
  static scale(...sfs: RM[]) {
    return `scale(${tup_rst(sfs)}) `;
  }
  static scale3d(...sfs: RM[]) {
    return `scale3d(${tup_rst(sfs)}) `;
  }
  static scaleX(...sfs: RM[]) {
    return `scaleX(${tup_rst(sfs)}) `;
  }
  static scaleY(...sfs: RM[]) {
    return `scaleY(${tup_rst(sfs)}) `;
  }
  static scaleZ(...sfs: RM[]) {
    return `scaleZ(${tup_rst(sfs)}) `;
  }
  static sepia(...sfs: RM[]) {
    return `sepia(${tup_rst(sfs)}) `;
  }
  static skew(...sfs: RM[]) {
    return `skew(${tup_rst(sfs, false, true, true)}) `;
  }
  static skewX(...sfs: RM[]) {
    return `skewX(${tup_rst(sfs, false, false, true)}) `;
  }
  static skewY(...sfs: RM[]) {
    return `skewY(${tup_rst(sfs, false, false, true)}) `;
  }
  /**
   * Translate(X,Y)
   */
  static translate(...sfs: RM[]) {
    return `translate(${tup_rst(sfs, false, true)}) `;
  }
  static translate3d(...sfs: RM[]) {
    return `translate3d(${tup_rst(sfs, false, false)}) `;
  }
  static translateX(...sfs: RM[]) {
    return `translateX(${tup_rst(sfs, false, false)}) `;
  }
  static translateY(...sfs: RM[]) {
    return `translateY(${tup_rst(sfs, false, false)}) `;
  }
  static translateZ(...sfs: RM[]) {
    return `translateZ(${tup_rst(sfs, false, false)}) `;
  }
  static url(...sfs: RM[]) {
    return `url(${tup_rst(sfs)}) `;
  }
  static var(st: string, opt: RM = "") {
    st = "--" + reCamel(st);
    let _opt = opt ? ", " + tup_rst([opt], false, false) : "";
    return `var(${tup_rst([st], false)}${_opt})`;
  }
}
export class ps {
  static attr(d: dict<string>) {
    const [k, v] = $$.O.items(d)[0];
    return _pseu(`[${k}="${v}"]`);
  }
  //# Pseudo Elements -----------------------
  static after(xx: V = "") {
    return _pseu("::after" + xx);
  }
  static before(xx: V = "") {
    return _pseu("::before" + xx);
  }
  static backdrop(xx: V = "") {
    return _pseu("::backdrop" + xx);
  }
  static cue(xx: V = "") {
    return _pseu("::cue" + xx);
  }
  static cueRegion(xx: V = "") {
    return _pseu("::cue-region" + xx);
  }
  static firstLetter(xx: V = "") {
    return _pseu("::first-letter" + xx);
  }
  static firstLine(xx: V = "") {
    return _pseu("::first-line" + xx);
  }
  static marker(xx: V = "") {
    return _pseu("::marker" + xx);
  }
  static part(xx: V = "") {
    return _pseu("::part" + xx);
  }
  static placeholder(xx: V = "") {
    return _pseu("::placeholder" + xx);
  }
  static selection(xx: V = "") {
    return _pseu("::selection" + xx);
  }
  static slotted(xx: V = "") {
    return _pseu("::slotted" + xx);
  }
  static spellingError(xx: V = "") {
    return _pseu("::spelling-error" + xx);
  }
  static targetText(xx: V = "") {
    return _pseu("::target-text" + xx);
  }
  static viewTransition(xx: V = "") {
    return _pseu("::view-transition" + xx);
  }
  static viewTransitionGroup(xx: V = "") {
    return _pseu("::view-transition-group" + xx);
  }
  static viewTransitionImagePair(xx: V = "") {
    return _pseu("::view-transition-image-pair" + xx);
  }
  static viewTransitionNew(xx: V = "") {
    return _pseu("::view-transition-new" + xx);
  }
  static viewTransitionOld(xx: V = "") {
    return _pseu("::view-transition-old" + xx);
  }

  //# Scrollbar -----------------------
  static scrollbar(xx: V = "") {
    return _pseu("::-webkit-scrollbar" + xx);
  }
  static scrollbarThumb(xx: V = "") {
    return _pseu("::-webkit-scrollbar-thumb" + xx);
  }
  static scrollbarTrack(xx: V = "") {
    return _pseu("::-webkit-scrollbar-track" + xx);
  }

  static scrollbarCorner(xx: V = "") {
    return _pseu("::-webkit-scrollbar-corner" + xx);
  }
  //# Pseudo Classes -----------------------
  static active(xx: V = "") {
    return _pseu(":active" + xx);
  }
  static anyLink(xx: V = "") {
    return _pseu(":any-link" + xx);
  }
  static autofill(xx: V = "") {
    return _pseu(":autofill" + xx);
  }
  static blank(xx: V = "") {
    return _pseu(":blank" + xx);
  }
  static checked(xx: V = "") {
    return _pseu(":checked" + xx);
  }
  static current(xx: V = "") {
    return _pseu(":current" + xx);
  }
  static default(xx: V = "") {
    return _pseu(":default" + xx);
  }
  static defined(xx: V = "") {
    return _pseu(":defined" + xx);
  }
  static disabled(xx: V = "") {
    return _pseu(":disabled" + xx);
  }
  static empty(xx: V = "") {
    return _pseu(":empty" + xx);
  }
  static enabled(xx: V = "") {
    return _pseu(":enabled" + xx);
  }
  static first(xx: V = "") {
    return _pseu(":first" + xx);
  }
  static firstChild(xx: V = "") {
    return _pseu(":first-child" + xx);
  }
  static firstOfType(xx: V = "") {
    return _pseu(":first-of-type" + xx);
  }
  static fullscreen(xx: V = "") {
    return _pseu(":fullscreen" + xx);
  }
  static future(xx: V = "") {
    return _pseu(":future" + xx);
  }
  static focus(xx: V = "") {
    return _pseu(":focus" + xx);
  }
  static focusVisible(xx: V = "") {
    return _pseu(":focus-visible" + xx);
  }
  static focusWithin(xx: V = "") {
    return _pseu(":focus-within" + xx);
  }
  static host(xx: V = "") {
    return _pseu(":host" + xx);
  }
  static hover(xx: V = "") {
    return _pseu(":hover" + xx);
  }
  static indeterminate(xx: V = "") {
    return _pseu(":indeterminate" + xx);
  }
  static inRange(xx: V = "") {
    return _pseu(":in-range" + xx);
  }
  static invalid(xx: V = "") {
    return _pseu(":invalid" + xx);
  }
  static lastChild(xx: V = "") {
    return _pseu(":last-child" + xx);
  }
  static lastOfType(xx: V = "") {
    return _pseu(":last-of-type" + xx);
  }
  static left(xx: V = "") {
    return _pseu(":left" + xx);
  }
  static link(xx: V = "") {
    return _pseu(":link" + xx);
  }
  static localLink(xx: V = "") {
    return _pseu(":local-link" + xx);
  }
  static modal(xx: V = "") {
    return _pseu(":modal" + xx);
  }
  static onlyChild(xx: V = "") {
    return _pseu(":only-child" + xx);
  }
  static onlyOfType(xx: V = "") {
    return _pseu(":only-of-type" + xx);
  }
  static optional(xx: V = "") {
    return _pseu(":optional" + xx);
  }
  static outOfRange(xx: V = "") {
    return _pseu(":out-of-range" + xx);
  }
  static past(xx: V = "") {
    return _pseu(":past" + xx);
  }
  static pictureInPicture(xx: V = "") {
    return _pseu(":picture-in-picture" + xx);
  }
  static placeholderShown(xx: V = "") {
    return _pseu(":placeholder-shown" + xx);
  }
  static paused(xx: V = "") {
    return _pseu(":paused" + xx);
  }
  static playing(xx: V = "") {
    return _pseu(":playing" + xx);
  }
  static readOnly(xx: V = "") {
    return _pseu(":read-only" + xx);
  }
  static readWrite(xx: V = "") {
    return _pseu(":read-write" + xx);
  }
  static required(xx: V = "") {
    return _pseu(":required" + xx);
  }
  static right(xx: V = "") {
    return _pseu(":right" + xx);
  }
  static root(xx: V = "") {
    return _pseu(":root" + xx);
  }
  static scope(xx: V = "") {
    return _pseu(":scope" + xx);
  }
  static target(xx: V = "") {
    return _pseu(":target" + xx);
  }
  static targetWithin(xx: V = "") {
    return _pseu(":target-within" + xx);
  }
  static userInvalid(xx: V = "") {
    return _pseu(":user-invalid" + xx);
  }
  static valid(xx: V = "") {
    return _pseu(":valid" + xx);
  }
  static visited(xx: V = "") {
    return _pseu(":visited" + xx);
  }
  //   Functions ---------------
  static dir(xx: V) {
    return _pseu(`:dir(${xx})`);
  }
  static has(xx: V) {
    return _pseu(`:has(${xx})`);
  }
  static host_(xx: V) {
    return _pseu(`:host(${xx})`);
  }
  static hostContext(xx: V) {
    return _pseu(`:host-context(${xx})`);
  }
  static is(xx: V) {
    return _pseu(`:is(${xx})`);
  }
  static lang(xx: V) {
    return _pseu(`:lang(${xx})`);
  }
  static not(xx: V) {
    return _pseu(`:not(${xx})`);
  }
  static nthChild(xx: V) {
    return _pseu(`:nth-child(${xx})`);
  }
  static nthCol(xx: V) {
    return _pseu(`:nth-col(${xx})`);
  }
  static nthLastChild(xx: V) {
    return _pseu(`:nth-last-child(${xx})`);
  }
  static nthLastCol(xx: V) {
    return _pseu(`:nth-last-col(${xx})`);
  }
  static nthLastOfType(xx: V) {
    return _pseu(`:nth-last-of-type(${xx})`);
  }
  static nthOfType(xx: V) {
    return _pseu(`:nth-of-type(${xx})`);
  }
  static state(xx: V) {
    return _pseu(`:state(${xx})`);
  }
  static where(xx: V) {
    return _pseu(`:where(${xx})`);
  }

  // Combinators  -------------

  static and(str: string) {
    return _pseu(", " + str);
  }
  static child(str: string) {
    return _pseu(" > " + str);
  }
  static desc(str: string) {
    return _pseu(" " + str);
  }

  static next(str: string) {
    return _pseu(" + " + str);
  }
  static general(str: string) {
    return _pseu(" ~ " + str);
  }
}

export const x = {
  DGRAY: {
    background: "#2f2f2f",
  },
  MSIZES: ps.after()({
    position: v.absolute,
    right: 4.3,
    top: 1.3,
    content: med("xs", {
      sm: "sm",
      smd: "smd",
      md: "md",
      lg: "lg",
      xl: "xl",
      xxl: "xxl",
    }),
    color: c.orange,
    fontSize: 1.5,
    zIndex: 1000,
    pointerEvents: v.none,
  }),
  BORDER1: {
    border: "1px dashed #80808070",
  },
  TRANS25: { transition: "all 0.25s" },
  SCROLL2: (thumb: any, bg: any = v.inherit) => [
    ps.scrollbar()({
      width: med(0.8, { no_hover: 0 }),
      height: med(0.8, { no_hover: 0 }),
    }),
    ps.scrollbarTrack()({
      background: bg,
    }),
    ps.scrollbarThumb()(
      {
        background: thumb,
        borderRadius: 2,
        backgroundClip: "content-box",
        border: "2.5px solid transparent",
      },
      ps.hover()({
        border: "1px solid transparent",
        cursor: v.grabbing,
      }),
    ),
    ps.scrollbarCorner()({
      background: bg,
    }),
  ],

  BACKDROP: (blur = 0.8) => {
    return {
      backdropFilter: f.blur(blur),
      webkitBackdropFilter: f.blur(blur),
    };
  },
  MASK: (gradient: string) => {
    return {
      mask: gradient,
      webkitMask: gradient,
    };
  },
};
