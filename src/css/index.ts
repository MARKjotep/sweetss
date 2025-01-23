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
import { css } from "../";
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

export function val_xxx(
  sel: string,
  val: V | _vars,
  options = { rem: true, deg: false },
): string {
  const { rem, deg } = options;
  if (val instanceof _vars) return val.__();
  if (isArr(val)) {
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

export function tup_rst(
  sfs: RM[],
  noRem: boolean = true,
  wcom: boolean = true,
  ideg: boolean = false,
  qt: boolean = false,
) {
  const fnal: string[] = sfs.map((ff) => {
    if (isStr(ff)) return qt ? `'${ff}'` : ff;
    if (ff instanceof _vars) return ff.__();
    if (isNumber(ff)) return `${ff}${noRem ? "" : ideg ? "deg" : "rem"}`;
    return "";
  });

  return fnal.join(wcom ? ", " : " ");
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
  if (!props[type]![key]) props[type]![key] = [];
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

  load(CSS: css) {
    const mprops = media.prop;
    const def = media.default as mtype;
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

    oVals(CSS).forEach((az) => {
      if (az instanceof Cid) {
        const CC = CB(az, props);
        this.updateCid(CC.cid);
      } else if (az instanceof Keyframes) {
        KF(az, kprops);
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
