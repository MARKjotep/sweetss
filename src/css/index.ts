import {
  $$,
  isArr,
  isNumber,
  isStr,
  Mapper,
  oAss,
  obj,
  oItems,
  oKeys,
  oVals,
  sparse,
  V,
} from "../@";
import { SweetSS } from "../";
import { At, Cid, FontFace, Keyframes } from "../props";
import { media, mtype } from "../media";
import { _vars } from "../var";

import { CB, KF, AT, FONT, toProperty } from "./process";

export type RM = V | media | _vars | RM[];
export type atCSS = CSSinR | _vars | obj<RM>;

export type CMapper = Mapper<string, Mapper<string, media>>;

interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  textFillColor?: string;
  lineClamp?: string;
  webkitTextFillColor?: string;
}

export type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

export type kfT = obj<
  | {
      from?: CSSinR;
      to?: CSSinR;
      "%"?: CSSinR;
    }
  | obj<CSSinR>
>;

const secs = [
  "transitionDuration",
  "transitionDelay",
  "animationDelay",
  "animationDuration",
];
const norems = [
  ...secs,
  "zIndex",
  "opacity",
  "aspectRatio",
  "flexGrow",
  "order",
  "flexShrink",
  "flexBasis",
  "flex",
  "fillOpacity",
  "lineClamp",
  "webkitLineClamp",
];
const ARRcomma = ["transitionProperty"];

export function val_xxx(
  sel: string,
  val: RM,
  options = { rem: true, deg: false, quote: false },
): string {
  const { rem, deg, quote } = options;
  if (val instanceof _vars) return val.__();
  if (isArr(val)) {
    const fval = val.map((item) => val_xxx(sel, item));
    return fval.join(ARRcomma.includes(sel) ? ", " : " ");
  }
  if (typeof val === "number") {
    let valueStr = val.toString();
    if (rem && !norems.includes(sel)) valueStr += "rem";
    if (secs.includes(sel)) valueStr += "s";
    if (deg) valueStr += "deg";
    return valueStr;
  }

  if (isStr(val)) {
    if (val.includes("(")) {
      return val;
    } else if (quote) {
      return `'${val}'`;
    } else {
      return val;
    }
  }

  return "";
}

export function tup_rst(
  sfs: RM[],
  noRem: boolean = true,
  comma: boolean = true,
  degree: boolean = false,
  quote: boolean = false,
) {
  const fnal: string[] = sfs.map((ff) => {
    if (isArr(ff)) {
      return tup_rst(ff, noRem, false, degree, quote);
    }
    if (ff instanceof _vars) return ff.__();
    if (isNumber(ff)) return `${ff}${noRem ? "" : degree ? "deg" : "rem"}`;

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

  return fnal.join(comma ? ", " : " ");
}

/*
-------------------------
 KEYFRAMES SHOULD HAVE THE SAME
-------------------------
*/

export type PMtype = keyof mtype;

export const ensurePropsInitialized = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
) => {
  try {
    if (!props[type]![key]) props[type]![key] = [];
  } catch (e) {
    console.error(`property "${type}" not found!`);
  }
};

export class __css {
  css: string = "";
  cid: obj<string> = {};
  constructor() {}
  private updateCid(cid: Map<string, string>) {
    cid.forEach((v, k) => {
      this.cid[k] = v;
    });
  }

  load(CSS: SweetSS, shaker: string[] = [], include: string[] = []) {
    const mprops = media.prop;
    oAss(mprops, media.extra);
    const def = media.default;

    const props: { [P in PMtype]?: obj<string[]> } = {};
    const kprops: { [P in PMtype]?: obj<string[]> } = {};
    const cs2: obj<obj<obj<string>>> = {};
    const fin: string[] = [];
    //
    oKeys(mprops).forEach((kh) => {
      props[kh as PMtype] = {};
      kprops[kh as PMtype] = {};
      cs2[kh as PMtype] = {};
    });

    const animCLSS = new Set<string>();

    oVals(CSS).forEach((az) => {
      if (az instanceof Cid) {
        const CC = CB(az, props, shaker, include);
        az.animCLS.forEach((an) => {
          animCLSS.add(an);
        });
        this.updateCid(CC.cid);
      } else if (az instanceof Keyframes) {
        KF(az, kprops, animCLSS);
      } else if (az instanceof At) {
        AT(az, fin);
      } else if (az instanceof FontFace) {
        FONT(az, fin);
      }
    });
    /*
    -------------------------
    
    -------------------------
    */
    oItems(props).forEach(([kk, vv]) => {
      if (!cs2[kk]) cs2[kk] = {};
      if (vv !== undefined)
        oItems(vv).forEach(([k, v]) => {
          const ct = v.join(", ");
          if (!cs2[kk][ct]) cs2[kk][ct] = {};
          oAss(cs2[kk][ct], sparse(k));
        });
    });

    oItems(cs2).forEach(([kk, vv]) => {
      const mitm: string[] = [];
      oItems(vv).forEach(([k, v]) => mitm.push(toProperty(k, v)));
      oItems(kprops[kk as PMtype]!).forEach(([k, v]) => {
        mitm.push(`${k} {\n${v.join("\n")}\n}`);
      });
      if (mitm.length) {
        fin.push(
          `/* -------------- ${kk + (kk == def ? " ( default )" : "")} */`,
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
