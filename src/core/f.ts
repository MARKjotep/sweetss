import { is, str } from "./__";
import { _vars, RM } from "./mvar";

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
