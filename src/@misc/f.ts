import { $$, isArr, isNum, isNumber, isStr, reCamel } from "../@";
import { RM } from "../css";
import { fix_value } from "../value";
import { _vars } from "../var";

export class f {
  static attr(name: RM, type?: RM, fallback?: RM) {
    return `attr(${fix_value([name, type, fallback])})`;
  }
  static blur(blur: RM) {
    return `blur(${fix_value([blur], { rem: true })})`;
  }
  static brightness(brightness: RM) {
    return `brightness(${fix_value([brightness])})`;
  }
  static calc(...calc: RM[]) {
    return `calc(${fix_value(calc, { rem: true })})`;
  }
  static circle(radius: RM, position?: RM) {
    return `circle(${fix_value([radius, position], { rem: true })})`;
  }

  static clamp(min: RM, preferred: RM, max: RM) {
    return `clamp(${fix_value([min, preferred, max], { rem: true, delimeter: ", " })})`;
  }
  /**
   *
   * @param colorInterpolation in + srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, lab, oklab, xyz, xyz-d50, xyz-d65, hsl, hwb, lch, and oklch
   * @param color1 color, mix%
   * @param color2 color,  mix%
   */
  static colorMix(colorInterpolation: RM, color1: RM[], color2: RM[]) {
    return `color-mix(${fix_value([colorInterpolation, fix_value(color1), fix_value(color2)], { delimeter: ", " })})`;
  }

  static conicGradient(...sfs: RM[]) {
    return `conic-gradient(${fix_value(sfs, {
      delimeter: ", ",
      delim_arr: false,
    })})`;
  }
  static contrast(contrast: RM) {
    return `contrast(${fix_value([contrast])})`;
  }

  /**
   * Numeric values. x1 and x2 must be a number from 0 to 1
   */
  static cubicBezier(x1: RM, y1: RM, x2: RM, y2: RM) {
    return `cubic-bezier(${fix_value([x1, y1, x2, y2], { delimeter: ", " })})`;
  }
  /**
   * @param sfs h-shadow v-shadow blur spread color
   */
  static dropShadow(...sfs: RM[]) {
    return `drop-shadow(${fix_value(sfs, { rem: true })})`;
  }

  static grayscale(grayscale: RM) {
    return `grayscale(${fix_value([grayscale])})`;
  }

  static hsl(hue: RM, saturation: RM, lightness: RM) {
    return `hsl(${fix_value([hue, saturation, lightness])})`;
  }
  static hsla(hue: RM, saturation: RM, lightness: RM, A?: RM) {
    return `hsl(${fix_value([hue, saturation, lightness, A ? ["/", A] : A])})`;
  }

  static hueRotate(degree: RM) {
    return `hue-rotate(${fix_value([degree], {
      degree: true,
    })})`;
  }
  static inset(...sfs: RM[]) {
    return `inset(${fix_value(sfs, { rem: true })})`;
  }
  static invert(percent: RM) {
    return `invert(${fix_value([percent])})`;
  }
  static linearGradient(...sfs: RM[]) {
    return `linear-gradient(${fix_value(sfs, {
      delim_arr: false,
      delimeter: ", ",
    })})`;
  }
  static matrix(
    scaleX: RM,
    skewY: RM,
    skewX: RM,
    scaleY: RM,
    translateX: RM,
    translateY: RM,
  ) {
    return `matrix(${fix_value(
      [scaleX, skewY, skewX, scaleY, translateX, translateY],
      {
        delimeter: ", ",
      },
    )})`;
  }
  static matrix3d(a1: RM[], a2: RM[], a3: RM[], t4: RM[]) {
    return `matrix3d(${fix_value([a1, a2, a3, t4], {
      delimeter: ", ",
    })})`;
  }
  static max(...sfs: RM[]) {
    return `max(${fix_value(sfs, {
      rem: true,
      delimeter: ", ",
    })})`;
  }
  static min(...sfs: RM[]) {
    return `min(${fix_value(sfs, {
      rem: true,
      delimeter: ", ",
    })})`;
  }
  static opacity(percent: RM) {
    return `opacity(${fix_value([percent])})`;
  }

  static path(path: RM): string {
    return `path(${fix_value([path], { quote: true })})`;
  }
  static clipPath(fillRule: RM, path: RM): string {
    return `path(${fix_value([fillRule, fix_value([path], { quote: true })], { delimeter: ", " })})`;
  }
  static perspective(value: RM) {
    return `perspective(${fix_value([value])})`;
  }
  static polygon(...lengths: RM[]) {
    return `polygon(${fix_value(lengths, {
      percent: true,
      delimeter: ", ",
    })})`;
  }

  static ray(...sfs: RM[]): string {
    return `ray(${fix_value(sfs, { degree: true })})`;
  }

  static radialGradient(...sfs: RM[]) {
    return `radial-gradient(${fix_value(sfs, {
      delim_arr: false,
      perc_arr: true,
      delimeter: ", ",
    })})`;
  }
  static repeatingConicGradient(...sfs: RM[]) {
    return `repeating-conic-gradient(${fix_value(sfs, {
      delim_arr: false,
      degree: true,
      perc_arr: true,
      delimeter: ", ",
    })})`;
  }
  static repeatingLinearGradient(...sfs: RM[]) {
    return `repeating-linear-gradient(${fix_value(sfs, {
      delim_arr: false,
      degree: true,
      perc_arr: true,
      delimeter: ", ",
    })})`;
  }
  static repeatingRadialGradient(...sfs: RM[]) {
    return `repeating-radial-gradient(${fix_value(sfs, {
      delim_arr: false,
      degree: true,
      perc_arr: true,
      delimeter: ", ",
    })})`;
  }

  //
  static rgb(R: RM, G: RM, B: RM) {
    return `rgb(${fix_value([R, G, B])})`;
  }
  static rgba(R: RM, G: RM, B: RM, A?: RM) {
    return `rgba(${fix_value([R, G, B, A ? ["/", A] : A])})`;
  }
  static rotate(R: RM) {
    return `rotate(${fix_value([R], {
      degree: true,
    })})`;
  }
  static rotate3d(x: RM, y: RM, z: RM, angle: RM) {
    const r3 = fix_value(
      [
        fix_value([x, y, z], {
          delimeter: ", ",
        }),
        angle,
      ],
      {
        degree: true,
        delimeter: ", ",
      },
    );
    return `rotate3d(${r3})`;
  }
  static rotateX(X: RM) {
    return `rotateX(${fix_value([X], {
      degree: true,
    })})`;
  }
  static rotateY(Y: RM) {
    return `rotateY(${fix_value([Y], {
      degree: true,
    })})`;
  }
  static rotateZ(Z: RM) {
    return `rotateZ(${fix_value([Z], {
      degree: true,
    })})`;
  }
  static saturate(...sfs: RM[]) {
    return `saturate(${fix_value(sfs)})`;
  }
  static scale(sx: RM, sy?: RM) {
    return `scale(${fix_value([sx, sy], { delimeter: ", " })})`;
  }
  static scale3d(sx: RM, sy: RM, sz: RM) {
    return `scale3d(${fix_value([sx, sy, sz], {
      delimeter: ", ",
    })})`;
  }
  static scaleX(X: RM) {
    return `scaleX(${fix_value([X])})`;
  }
  static scaleY(Y: RM) {
    return `scaleY(${fix_value([Y])})`;
  }
  static scaleZ(Z: RM) {
    return `scaleZ(${fix_value([Z])})`;
  }
  static sepia(percent: RM) {
    return `sepia(${fix_value([percent])})`;
  }
  static skew(...sfs: RM[]) {
    return `skew(${fix_value(sfs, {
      degree: true,
      delimeter: ", ",
    })})`;
  }
  static skewX(X: RM) {
    return `skewX(${fix_value([X], {
      degree: true,
    })})`;
  }
  static skewY(Y: RM) {
    return `skewY(${fix_value([Y], {
      degree: true,
    })})`;
  }

  static steps(
    n: RM,
    position:
      | "start"
      | "end"
      | "no"
      | "jump-start"
      | "jump-end"
      | "jump-none"
      | "jump-both",
  ) {
    return `steps(${fix_value([n, position], {})})`;
  }
  /**
   * Translate(X,Y)
   */
  static translate(...sfs: RM[]) {
    return `translate(${fix_value(sfs, {
      rem: true,
      delimeter: ", ",
    })})`;
  }
  static translate3d(...sfs: RM[]) {
    return `translate3d(${fix_value(sfs, {
      rem: true,
      delimeter: ", ",
    })})`;
  }
  static translateX(X: RM) {
    return `translateX(${fix_value([X], {
      rem: true,
    })})`;
  }
  static translateY(Y: RM) {
    return `translateY(${fix_value([Y], {
      rem: true,
    })})`;
  }
  static translateZ(...sfs: RM[]) {
    return `translateZ(${fix_value(sfs, {
      rem: true,
      delimeter: ", ",
    })})`;
  }
  static url(url: RM) {
    return `url(${fix_value([url], { quote: true })})`;
  }
  static var(st: string, opt: RM = "") {
    st = "--" + reCamel(st);
    let _opt = opt
      ? ", " +
        fix_value([opt], {
          rem: true,
          delimeter: ", ",
        })
      : "";
    return `var(${fix_value([st], { rem: true })}${_opt})`;
  }
}
