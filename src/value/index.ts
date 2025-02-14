import { isArr, isNum, isStr } from "../@";
import { RM } from "../css";
import { _vars } from "../var";

const secs = new Set([
  "transitionDuration",
  "transitionDelay",
  "animationDelay",
  "animationDuration",
]);
const norems = new Set([
  ...secs,
  "zIndex",
  "opacity",
  "aspectRatio",
  "order",
  "flexShrink",
  "flexGrow",
  "flex",
  "fillOpacity",
  "lineClamp",
  "order",
  "webkitLineClamp",
  //
  "animationIterationCount",
  //
  "columnCount",
]);

const toQuote = new Set(["content"]);

const ARRcomma = new Set(["transitionProperty"]);

export function val_xxx(sel: string, val: RM): string {
  //
  const _vl = isArr(val) ? val : [val];

  return fix_value(_vl, {
    rem: !norems.has(sel),
    second: secs.has(sel),
    quote: toQuote.has(sel),
    delimeter: ARRcomma.has(sel) ? ", " : " ",
  });
}

export function fix_value(
  sfs: (RM | undefined)[],
  {
    rem = false,
    degree = false,
    percent = false,
    quote = false,
    second = false,
    delimeter = " ",
    delim_arr = true,
    perc_arr = false,
  } = {},
) {
  const fnal: string[] = sfs
    .filter((mf) => mf !== undefined)
    .map((ff) => {
      if (isArr(ff)) {
        return fix_value(ff, {
          rem: perc_arr ? false : rem,
          degree: perc_arr ? false : degree,
          percent: perc_arr ? perc_arr : percent,
          delimeter: delim_arr ? delimeter : " ",
          quote,
        });
      }
      if (ff instanceof _vars) return ff.__();

      if (quote) {
        ff = String(ff);
      }
      //
      if (isNum(ff)) {
        if (rem) {
          return `${ff}rem`;
        } else if (degree) {
          return `${ff}deg`;
        } else if (percent) {
          return `${ff}%`;
        } else if (second) {
          return `${ff}s`;
        } else {
          return String(ff);
        }
        //
      }
      //
      if (isStr(ff)) {
        if (ff.includes("(")) {
          return ff;
        } else if (quote) {
          return `'${ff}'`;
        } else {
          return ff;
        }
      }
      return "";
    });

  return fnal.join(delimeter);
}
