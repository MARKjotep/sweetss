import {
  $$,
  isArr,
  isNum,
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
import { media, Medyas, mtype } from "../media";
import { _vars } from "../var";

import { CB, KF, AT, FONT, toProperty } from "./process";

export type RM = V | media | _vars | RM[];
export type atCSS = CSSinR | _vars | obj<RM>;

export type CMapper = Mapper<string, Mapper<string, media>>;

interface xtraCSS {
  src?: string;
  webkitBackdropFilter?: string;
  webkitTextFillColor?: string;
  webkitFontSmoothing?: string;
  webkitTapHighlightColor?: string;
  textFillColor?: string;
  lineClamp?: string;
  textJustify?: string;
  //
  webkitBoxDecorationBreak: string;
  boxDecorationBreak: string;
  webkitBoxReflect: string;
}

export type CSSinR = {
  [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

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
    if (!props[type]) {
      props[type] = {};
      props[type][key] = [];
    }
    if (!props[type]![key]) props[type]![key] = [];
  } catch (e) {
    console.error(`property "${type}" not found!`);
  }
};

export class __css {
  css: string = "";
  cid: obj<string> = {};
  cidz: obj<string> = {};
  constructor() {}
  private updateCid(cid: Map<string, string>) {
    cid.forEach((v, k) => {
      this.cid[k] = v;
    });
  }
  private updateCidZ(cid: Map<string, string>) {
    cid.forEach((v, k) => {
      this.cidz[k] = v;
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

    const animCLSS: Mapper<string, Set<string>> = new Mapper();

    oVals(CSS).forEach((az) => {
      if (az instanceof Cid) {
        const CC = CB(az, props, shaker, include);
        az.animCLS.forEach((an, ky) => {
          an.forEach((aa) => {
            animCLSS.init(ky, new Set()).add(aa);
          });
        });
        this.updateCid(CC.cid);
        this.updateCidZ(CC.cidz);
      } else if (az instanceof Keyframes) {
        KF(az, kprops, animCLSS, shaker, include);
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
      const anims: string[] = [];
      oItems(vv).forEach(([k, v]) => {
        if (v.animation || v.transition) {
          anims.push(toProperty(k, v));
        } else {
          mitm.push(toProperty(k, v));
        }
      });
      if (anims.length) {
        mitm.unshift(...anims);
      }
      //
      if (kprops[kk as PMtype]) {
        oItems(kprops[kk as PMtype]!).forEach(([k, v]) => {
          mitm.push(`${k} {\n${v.join("\n")}\n}`);
        });
      }

      if (mitm.length) {
        fin.push(
          `/* -------------- ${kk + (kk == def ? " ( default )" : "")} */`,
        );
        if (kk == def) {
          fin.push(mitm.join("\n"));
        } else {
          const fmedia = kk
            .split("-")
            .map((mp) => mprops[mp])
            .join(" and ");

          fin.push(`@media ${fmedia}\t{\n${mitm.join("\n")}\n}`);
        }
      }
    });
    this.css = fin.join("\n");
    return this;
  }
}
