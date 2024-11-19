import { writeFileSync } from "node:fs";
import { is, str, O } from "../_misc/__";
import { file, write } from "bun";
import { v } from "./v";
import { c } from "./colors";
type V = string | number | boolean;
type RM = V | media | _vars | RM[];
export interface obj<T> {
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
type PMtype = keyof mtype;
type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

export class $$ {
  static set p(a: any) {
    if (is.arr(a)) {
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

class Mapper<K, V> extends Map<K, V> {
  obj(obj?: object | null) {
    obj && O.items(obj).forEach(([k, v]) => this.set(k as K, v));
  }
  map(map: Map<K, V>) {
    map.forEach((v, k) => {
      this.set(k, v);
    });
  }
  ass<T>(key: K, obj: T) {
    if (!this.has(key)) this.set(key, {} as any);
    O.ass(this.get(key)!, obj);
  }
}

export type CSSinTS = obj<CSSinR | CSSinR[]>;

const _is = {
  file: (path: string, data?: string) => {
    try {
      writeFileSync(path, data ?? "", { flag: "wx" });
    } catch (error) {
      //
    }
    return true;
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

//
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

/*
-------------------------
Clas ID KF process
-------------------------
*/

type CMapper = Mapper<string, Mapper<string, media>>;
function CIK(
  sel: string,
  vv: any,
  medias: CMapper,
  cid: Mapper<string, string>,
  fix: string,
) {
  if (!is.obj(vv)) return;
  const props: Mapper<string, media> = new Mapper();
  if (vv instanceof _vars) {
    props.ass(vv._var, vv._val);
  } else {
    O.items(vv).forEach(([k, v]) => {
      if (v)
        if (k.startsWith(":") || k.startsWith(",")) {
          CIK(sel + k, v, medias, cid, fix);
        } else if (k.startsWith(" ")) {
          const slc = k.match(/^.*?\./gm);
          const islc = slc?.[0].slice(0, -1);
          const lk = k
            .replaceAll(/, *?\./gm, `, ${sel}${islc}.`)
            .replaceAll(/, *?\#/gm, `, ${sel}${islc}#`);
          CIK(sel + lk, v, medias, cid, fix);
        } else if (is.classOrId(k)) {
          $$.p = [k, v];
        } else {
          props.set(k, _props(k, reval(v)));
        }
    });
  }

  const { classes, ids } = xselect(sel);
  [classes, ids].flat().forEach((cl) => {
    cid.set(cl, fix + cl);
  });

  sel = fix ? applyPrefix(sel, fix) : sel;
  if (medias.has(sel)) {
    medias.get(sel)?.map(props);
  } else {
    medias.set(sel, props);
  }
}

class CB {
  fix: string;
  data: obj<any[]> = {};
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, CMapper> = new Mapper();
  constructor(
    private pre: string = "",
    fix: string = "",
  ) {
    this.fix = fix ? fix + "_" : fix;
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = is.arr(val) ? val : [val];
    VL.forEach((vv) => {
      CIK(nme, vv, this.datax, this.cid, this.fix);
    });
    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string): string | undefined {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "datax") {
      return this.datax as any;
    } else if (prop == "cid") {
      return this.cid as any;
    }
    return undefined;
  }
  get css(): CSSinTS {
    return new Proxy(this, this);
  }
}

class keyframes {
  data: obj<any[]> = {};
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, Mapper<string, CMapper>> = new Mapper();
  constructor() {
    this.data = {};
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = prop;
    const VL = is.arr(val) ? val : [val];
    const kfKEY = `@keyframes ${nme}`;
    const kfKWebkit = `@-webkit-keyframes ${nme}`;
    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      O.items(vv).forEach(([x, y]) => {
        CIK(x, y as CSSinR, dx, this.cid, "");
      });
    });
    this.datax.set(kfKEY, dx);
    this.datax.set(kfKWebkit, dx);

    this.data[nme] = VL;
    return true;
  }
  get(target: any, prop: string) {
    const nme = prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "datax") {
      return this.datax as any;
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

/*
-------------------------

-------------------------
*/

const applyPrefix = (sel: string, prefix: string) => {
  return sel.replaceAll(/\.|\#/g, (m) => m + prefix);
};
const reval = (val: RM): media => {
  if (val instanceof media) return val;
  else if (val instanceof _vars) return med(val.__());
  else return med(val);
};
const xselect = (cssContent: string) => {
  const xmatch = (regex: RegExp) =>
    Array.from(cssContent.matchAll(regex), (match) => match[1]);
  const classRegex = /\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches .className
  const idRegex = /#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches #idName
  return {
    classes: [...new Set(xmatch(classRegex))],
    ids: [...new Set(xmatch(idRegex))],
  };
};
const xscc = (sel: string, vals: obj<string>) => {
  const oit = O.items(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
};

class __css {
  css: string = "";
  cid: obj<string> = {};
  constructor() {}
  processCB(az: CB, props: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        O.items(vv).forEach(([x, y]) => {
          const xx = x as PMtype;
          let pvp = kk == "content" && !y.includes("(") ? `'${y}'` : y;
          const stn = str.ngify({ [str.camel(kk)]: pvp });
          if (!props[xx]![stn]) props[xx]![stn] = [];
          props[xx]![stn].push(...k.split(",").map((s) => s.trim()));
        });
      });
    });
    az.cid.forEach((v, k) => {
      this.cid[k] = v;
    });
  }
  processKF(az: keyframes, kprops: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        const vls: obj<obj<string>> = {};
        vv.forEach((y, x) => {
          O.items(y).forEach(([xx, yy]) => {
            const xs = xx as PMtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][x] = yy;
          });
        });
        O.items(vls).forEach(([x, y]) => {
          const xs = x as PMtype;
          if (!kprops[xs]![k]) kprops[xs]![k] = [];
          kprops[xs]![k].push(xscc(kk, y));
        });
      });
    });
  }
  processAT(az: ats, fin: string[]) {
    O.items(az.data).forEach(([k, v]) => {
      v.forEach((vv: string) => {
        const ch: string = vv.includes("(") ? vv : `"${vv}"`;
        fin.push(`${k} ${ch.trim()};`);
      });
    });
  }
  processFF(az: FontFace, fin: string[]) {
    const fkey = `@font-face`;
    az.data.forEach((k) => {
      const FF: obj<obj<{ [P in PMtype]: any }>> = {};
      if (!FF[fkey]) FF[fkey] = {};
      const ffs = O.items(k)
        .map(([k, v]) => `${str.camel(k)} : ${val_xxx(k, v)}`)
        .join("; \n\t");
      fin.push(`${fkey}\t{\n\t${ffs}\n}`);
    });
  }
  load(CSS: css) {
    const mprops = media.prop;
    const def = media.default as mtype;
    const props: { [P in PMtype]?: obj<string[]> } = {};
    const kprops: { [P in PMtype]?: obj<string[]> } = {};
    const cs2: obj<obj<obj<string>>> = {};
    const fin: string[] = [];
    //
    O.keys(mprops).forEach((kh) => {
      props[kh as PMtype] = {};
      kprops[kh as PMtype] = {};
      cs2[kh as PMtype] = {};
    });

    O.vals(CSS).forEach((az) => {
      if (az instanceof CB) this.processCB(az, props);
      else if (az instanceof keyframes) this.processKF(az, kprops);
      else if (az instanceof ats) this.processAT(az, fin);
      else if (az instanceof FontFace) this.processFF(az, fin);
    });
    /*
    -------------------------
    
    -------------------------
    */
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
      O.items(vv).forEach(([k, v]) => mitm.push(xscc(k, v)));
      O.items(kprops[kk as PMtype]!).forEach(([k, v]) => {
        mitm.push(`${k} {\n${v.join("\n")}\n}`);
      });
      if (mitm.length) {
        fin.push(
          `/* ------------------------ ${kk + (kk == def ? " ( default )" : "")} */`,
        );
        if (kk == def) {
          fin.push(mitm.join("\n"));
        } else {
          fin.push(`${mprops[kk as PMtype]}\t{\n${mitm.join("\n")}\n}`);
        }
      }
    });
    this.css = fin.join("\n");
    return this;
  }
}
interface saver {
  path: string;
  map?: string;
  minify?: boolean;
}
export class css {
  dom: CSSinTS;
  id: CSSinTS;
  cx: CSSinTS;
  kf = new keyframes().css;
  at = new ats().css;
  font = new FontFace().css;
  save: ({ path, map }: saver) => void;
  constructor({ name, prefix }: { name: string; prefix?: string }) {
    //
    const pref = prefix ?? name;
    this.dom = new CB("", pref).css;
    this.id = new CB("#", pref).css;
    this.cx = new CB(".", pref).css;

    this.save = async ({ path, map, minify = false }: saver) => {
      const ce = new __css().load(this);
      //
      ce.cid;
      const cfl = path + name + ".css";
      _is.file(cfl);
      let rr = minify ? parseCSS(ce.css) : ce.css;
      await write(cfl, rr);

      if ((map ??= path)) {
        const mapcss = map + "css.js";
        if (_is.file(mapcss)) {
          const RFS = await file(mapcss).text();

          const cxstr = JSON.stringify(ce.cid);
          const prep = `export const ${name} = `;
          const rmm = RFS.match(prep);
          const fnal = prep + cxstr + ";";
          if (rmm) {
            const rg = new RegExp(`${prep}.*?};`, "gm");
            const RFX = RFS.replace(/\n/gm, "");
            const _rr = RFX.replace(rg, fnal);
            await write(mapcss, _rr);
          } else {
            const _rr = RFS + fnal;
            await write(mapcss, _rr);
          }
        }
      }
    };
  }
}

export { v, c };

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
