import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
type V = string | number | boolean;
type RM = V | media | _vars | RM[];
interface obj<T> {
  [Key: string]: T;
}
interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  textFillColor?: string;
  lineClamp?: string;
  webkitTextFillColor?: string;
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
  print?: RM;
}
type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

export type CSSinTS = obj<CSSinR | CSSinR[]>;

export class $$ {
  static set p(a: any) {
    if (Array.isArray(a)) {
      console.log(...a);
    } else {
      console.log(a);
    }
  }
  static rand(min = 6, max?: number) {
    if (max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    const rndInt = Math.floor(Math.random() * min) + 1;
    return rndInt - 1;
  }
}
const is = {
  bool: (v: any): v is boolean => typeof v === "boolean",
  str: (v: any): v is string => typeof v === "string",
  arr: (v: any) => Array.isArray(v),
  fn: (v: any): v is Function => typeof v === "function",
  obj: (v: any): v is object => typeof v === "object",
  num: (v: any): v is number => typeof v === "number",
  number: (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  dict: (val: object) => {
    return is.obj(val) && val !== null && !is.arr(val);
  },
  arraybuff: (val: any) => {
    return (
      val instanceof Uint8Array || val instanceof ArrayBuffer || is.str(val)
    );
  },
  file: (path: string) => {
    try {
      return statSync(path).isFile();
    } catch (err) {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, Buffer.from(""));
      return true;
    }
  },
  classOrId(k: string): boolean {
    return k.startsWith(".") || k.startsWith("#");
  },
};
const str = {
  strip: (char: string, tostrip: string) => {
    let _char = char;
    if (_char.startsWith(tostrip)) {
      _char = _char.slice(1);
    }
    if (_char.endsWith(tostrip)) {
      _char = _char.slice(0, -1);
    }
    return _char;
  },
  ngify: (str: object) => JSON.stringify(str),
  parse: (str: string) => JSON.parse(str),
  camel: (_case: string) => {
    if (_case.startsWith("webkit")) {
      _case = "--" + _case;
    }
    return _case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  },
};
const O = {
  vals: Object.values,
  keys: Object.keys,
  items: Object.entries,
  has: Object.hasOwn,
  define: Object.defineProperty,
  ass: Object.assign,
  length: (ob: Object) => {
    return Object.keys(ob).length;
  },
};
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
  "lineClamp",
  "webkitLineClamp",
];

//
function val_xxx(
  sel: string,
  val: V | _vars,
  options = { rem: true, deg: false },
): string {
  const { rem, deg } = options;
  if (val instanceof _vars) return val.__();
  if (is.arr(val)) {
    return val.map((item) => val_xxx(sel, item)).join(" ");
  }
  if (typeof val === "number") {
    let valueStr = val.toString();
    if (rem && !norems.includes(sel)) valueStr += "rem";
    if (deg) valueStr += "deg";
    return valueStr;
  }
  const valStr = val.toString();
  return valStr.includes("(") ? valStr : `${valStr}`;
}
function tup_rst(
  sfs: RM[],
  noRem: boolean = true,
  wcom: boolean = true,
  ideg: boolean = false,
  qt: boolean = false,
) {
  const fnal: string[] = sfs.map((ff) => {
    if (is.str(ff)) return qt ? `'${ff}'` : ff;
    if (ff instanceof _vars) return ff.__();
    if (is.number(ff)) return `${ff}${noRem ? "" : ideg ? "deg" : "rem"}`;
    return "";
  });

  return fnal.join(wcom ? ", " : " ");
}

function _props(sel: string, prp: media) {
  O.items(prp).forEach(([mk, mv]) => {
    prp[mk] = val_xxx(sel, mv);
  });
  return prp;
}
const parseCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};
function _pseu(sel: string) {
  return function (...itm: (CSSinR | _vars | obj<RM>)[]) {
    const vals = itm.reduce<obj<any>>((val, i) => {
      if (i instanceof _vars) {
        val[i._var] = i._val;
      } else if (is.obj(i)) {
        Object.assign(val, i);
      }
      return val;
    }, {});

    if (sel.startsWith("::before") || sel.startsWith("::after")) {
      vals.content ??= ""; // Ensure `content` is set for `::before` and `::after` pseudo-elements.
    }

    return { [sel]: vals };
  };
}
export class ps {
  static attr(d: obj<string>) {
    const [k, v] = O.items(d)[0];
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
  static with(str: string) {
    if (!(str.startsWith(".") || str.startsWith("#"))) {
      throw Error("should start with . or # - class / id");
    }
    return _pseu(str);
  }
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
    return `max(${tup_rst(sfs, false)}) `;
  }
  static min(...sfs: RM[]) {
    return `min(${tup_rst(sfs, false)}) `;
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
    st = "--" + str.camel(st);
    let _opt = opt ? ", " + tup_rst([opt], false, false) : "";
    return `var(${tup_rst([st], false)}${_opt})`;
  }
}

class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: media = {};
  constructor(vr: obj<RM> = {}) {
    if (O.length(vr)) {
      const [k, v] = O.items(vr)[0];
      this.k = k;
      this._var = "--" + str.camel(k);
      this._val = v instanceof media ? v : med(v);
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

export const med = (defValue: RM, g: mtype = {}) => new media(defValue, g);
export const _var = (vr: obj<RM>) => new _vars(vr);

export class media {
  [key: string]: any;
  static readonly prop = {
    xs: "@media (width <= 480px)",
    sm: "@media (width >= 480px)",
    smd: "@media (width >= 624px)",
    md: "@media (width >=  768px)",
    lg: "@media (width >=  1024px)",
    xl: "@media (width >= 1280px)",
    xxl: "@media (width >= 1536px)",
    no_hover: "@media (pointer: coarse)",
    print: "@media print",
  };
  static default = "xs";
  constructor(defValue: RM, g: obj<any> = {}) {
    const defM = media.default;
    const DM: obj<RM> = {};
    DM[defM] = defValue;
    if (!(defM in g)) {
      g[defM] = defValue;
    }

    O.items(g).forEach(([k, v]) => {
      if (is.arr(v)) {
        DM[k] = tup_rst(v, false, false);
      } else {
        DM[k] = v;
      }
    });
    O.ass(this, DM);
  }
  static setDefault(def: keyof typeof media.prop) {
    media.default = def;
  }
}

// const _cx: obj<string> = {};

class CB {
  data: obj<any[]> = {};
  constructor(private pre: string = "") {}
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = is.arr(val) ? val : [val];
    if (!(nme in this.data)) {
      this.data[nme] = [];
    }
    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string): string | undefined {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    }
    return undefined;
  }
  get css(): CSSinTS {
    return new Proxy(this, this);
  }
}

class keyframes {
  data: obj<any[]>;
  pre: string;
  constructor(pre: string = "") {
    this.data = {};
    this.pre = pre;
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.pre + prop;
    const VL = is.arr(val) ? val : [val];
    if (!(nme in this.data)) {
      this.data[nme] = [];
    }
    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string) {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    }
    return undefined;
  }
  get css(): obj<{ from?: CSSinR; to?: CSSinR; "%"?: CSSinR } | obj<CSSinR>> {
    return new Proxy(this, this);
  }
}

class ats {
  data: obj<any[]>;
  pre: string;
  constructor(pre: string = "@") {
    this.data = {};
    this.pre = pre;
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.pre + prop;
    if (nme in target.data) {
      target.data[nme].push(val);
    } else {
      target.data[nme] = [val];
    }

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
  get css(): {
    import: CSSinR | _vars | obj<RM>;
    charset: CSSinR | _vars | obj<RM>;
  } {
    return new Proxy(this, this);
  }
}

class FontFace {
  data: obj<any>[];
  pre: string;
  constructor(pre: string = "@font-face") {
    this.data = [];
    this.pre = pre;
  }
  set(target: any, prop: string, val: CSSinR) {
    this.data.push(val);
    return true;
  }
  get css(): { face: CSSinR | _vars | obj<RM> } {
    return new Proxy(this, this);
  }
}

interface saver {
  name: string;
  path: string;
  map?: string;
  prefix?: string;
  minify?: boolean;
}

class __css {
  private static __reval(val: RM): media {
    if (val instanceof media) {
      return val;
    } else if (val instanceof _vars) {
      return med(val.__());
    } else {
      return med(val);
    }
  }
  private static xSelector(cssContent: string) {
    const extractMatches = (regex: RegExp) =>
      Array.from(cssContent.matchAll(regex), (match) => match[1]);

    const classRegex = /\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches .className
    const idRegex = /#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches #idName

    return {
      classes: [...new Set(extractMatches(classRegex))],
      ids: [...new Set(extractMatches(idRegex))],
    };
  }
  private static xscc(
    sel: string,
    vals: obj<string>,
    prefix?: string,
    _cxp: obj<string> = {},
  ) {
    const xname = prefix ? prefix + "_" : "";
    const oit = O.items(vals)
      .map(([kk, vv]) => `${kk}: ${vv};`)
      .join(" \n  ");
    const { classes, ids } = this.xSelector(sel);
    [classes, ids].flat().forEach((cl) => {
      _cxp[cl] = xname + cl;
    });
    sel = sel.replaceAll(/\.|\#/g, (m) => m + xname);
    return `${sel} {\n  ${oit}\n}`;
  }
  private static processVars(vv: _vars, props: obj<media>): void {
    if (!props[vv._var]) props[vv._var] = {};
    O.ass(props[vv._var], vv._val);
  }
  private static get(sel: string, vv: any, medias: obj<obj<media>>) {
    const props: obj<media> = {};
    if (!is.obj(vv)) return;
    //
    if (vv instanceof _vars) {
      this.processVars(vv, props);
    } else {
      O.items(vv).forEach(([k, v]) => {
        if (k.startsWith(":") || k.startsWith(",")) {
          const selk = sel + k;
          if (!medias[selk]) medias[selk] = {};
          this.get(selk, v, medias);
        } else if (k.startsWith(" ")) {
          //
          const slc = k.match(/^.*?\./gm);
          const islc = slc?.[0].slice(0, -1);
          const lk = k
            .replaceAll(/, *?\./gm, `, ${sel}${islc}.`)
            .replaceAll(/, *?\#/gm, `, ${sel}${islc}#`);

          const selk = sel + lk;
          if (!medias[selk]) medias[selk] = {};
          this.get(selk, v, medias);
        } else if (is.classOrId(k)) {
          $$.p = [k, v];
        } else {
          if (!props[k]) props[k] = {};
          if (is.arr(v)) {
            const avx = v
              .reduce<string[]>((vl, ky) => {
                vl.push(val_xxx(k, ky));
                return vl;
              }, [])
              .join(is.arr(v[0]) ? ", " : " ");
            O.ass(props[k], _props(k, this.__reval(avx)));
          } else {
            O.ass(props[k], _props(k, this.__reval(v)));
          }
        }
      });
    }
    if (O.length(props)) O.ass(medias[sel], props);
  }
  static load(CSS: css, prefix: string = "", _cxp: obj<string> = {}) {
    const mprops = media.prop;
    type mtype = keyof typeof mprops;
    const def = media.default as mtype;
    const medias: obj<obj<{ [P in mtype]: any }>> = {};
    const KFm: obj<obj<obj<{ [P in mtype]: any }>>> = {};
    const props: { [P in mtype]?: obj<string[]> } = {};
    const kprops: { [P in mtype]?: obj<string[]> } = {};
    const cs2: obj<obj<obj<string>>> = {};
    const fin: string[] = [];

    //

    O.keys(mprops).forEach((kh) => {
      props[kh as mtype] = {};
      kprops[kh as mtype] = {};
      cs2[kh as mtype] = {};
    });

    O.vals(CSS).forEach((az) => {
      if (az instanceof CB) {
        O.items(az.data).forEach(([k, v]) => {
          if (!medias[k]) medias[k] = {};
          v.forEach((vv) => {
            this.get(k, vv, medias);
          });
        });
      } else if (az instanceof keyframes) {
        O.items(az.data).forEach(([k, v]) => {
          const kfKEY = `@keyframes ${k}`;
          const kfKWebkit = `@-webkit-keyframes ${k}`;
          v.forEach((vv) => {
            const KM: obj<obj<{ [P in mtype]: any }>> = {};
            O.items(vv).forEach(([x, y]) => {
              if (!KM[x]) KM[x] = {};
              this.get(x, y, KM);
            });
            O.ass(KFm, { [kfKEY]: KM, [kfKWebkit]: KM });
          });
        });
      } else if (az instanceof ats) {
        O.items(az.data).forEach(([k, v]) => {
          v.forEach((vv) => {
            const ch: string = vv.indexOf("(") > -1 ? vv : `"${vv}"`;
            fin.push(`${k} ${ch.trim()};`);
          });
        });
      } else if (az instanceof FontFace) {
        const fkey = `@font-face`;
        az.data.forEach((k) => {
          const FF: obj<obj<{ [P in mtype]: any }>> = {};
          if (!FF[fkey]) FF[fkey] = {};
          const ffs = O.items(k)
            .map(([k, v]) => `${str.camel(k)} : ${val_xxx(k, v)}`)
            .join("; \n\t");
          fin.push(`${fkey}\t{\n\t${ffs}\n}`);
        });
      }
    });

    O.items(medias).forEach(([k, v]) => {
      O.items(v).forEach(([kk, vv]) => {
        O.items(vv).forEach(([x, y]) => {
          const xx = x as mtype;
          let pvp = kk == "content" && !y.includes("(") ? `'${y}'` : y;
          const stn = str.ngify({ [str.camel(kk)]: pvp });
          if (!props[xx]![stn]) props[xx]![stn] = [];
          props[xx]![stn].push(...k.split(",").map((s) => s.trim()));
        });
      });
    });

    O.items(KFm).forEach(([k, v]) => {
      O.items(v).forEach(([kk, vv]) => {
        const vls: obj<obj<string>> = {};
        O.items(vv).forEach(([x, y]) => {
          O.items(y).forEach(([xx, yy]) => {
            const xs = xx as mtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][x] = yy;
          });
        });
        O.items(vls).forEach(([x, y]) => {
          const xs = x as mtype;
          if (!kprops[xs]![k]) kprops[xs]![k] = [];
          kprops[xs]![k].push(this.xscc(kk, y, prefix, _cxp));
        });
      });
    });

    O.items(props).forEach(([kk, vv]) => {
      if (!cs2[kk]) cs2[kk] = {};
      O.items(vv).forEach(([k, v]) => {
        const ct = v.join(", ");
        if (!cs2[kk][ct]) cs2[kk][ct] = {};
        O.ass(cs2[kk][ct], str.parse(k));
      });
    });

    O.items(cs2).forEach(([kk, vv]) => {
      const mitm: string[] = [];
      O.items(vv).forEach(([k, v]) => mitm.push(this.xscc(k, v, prefix, _cxp)));

      O.items(kprops[kk as mtype]!).forEach(([k, v]) => {
        mitm.push(`${k} {\n${v.join("\n")}\n}`);
      });

      if (mitm.length) {
        fin.push(
          `/* ------------------------ ${kk + (kk == def ? " ( default )" : "")} */`,
        );
        if (kk == def) {
          fin.push(mitm.join("\n"));
        } else {
          fin.push(`${mprops[kk as mtype]}\t{\n${mitm.join("\n")}\n}`);
        }
      }
    });

    return fin.join("\n");
  }
}

export class css {
  dom = new CB("").css;
  id = new CB("#").css;
  cx = new CB(".").css;
  kf = new keyframes().css;
  at = new ats().css;
  font = new FontFace().css;
  save: ({ name, path }: saver) => void;
  constructor() {
    this.save = ({ name, path, map, prefix = "", minify = false }: saver) => {
      const _ccx: obj<string> = {};
      const ce = __css.load(this, prefix ?? name, _ccx);
      //
      const cfl = path + name + ".css";
      is.file(cfl);
      let rr = minify ? parseCSS(ce) : ce;
      writeFileSync(cfl, Buffer.from(rr));
      if ((map ??= path)) {
        const mapcss = map + "css.js";
        if (is.file(mapcss)) {
          const RFS = readFileSync(mapcss).toString();
          const cxstr = JSON.stringify(_ccx);
          const prep = `export const ${name} = `;
          const rmm = RFS.match(prep);
          const fnal = prep + cxstr + ";";
          if (rmm) {
            const rg = new RegExp(`${prep}.*?};`, "gm");
            const RFX = RFS.replace(/\n/gm, "");
            const _rr = RFX.replace(rg, fnal);
            writeFileSync(mapcss, _rr);
          } else {
            const _rr = RFS + fnal;
            writeFileSync(mapcss, _rr);
          }
        }
      }
    };
  }
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
  space_evenly: "space-evenly",
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
 *
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
    const rit = O.items(c);
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
      width: med(1, { no_hover: 0 }),
      height: med(1, { no_hover: 0 }),
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
