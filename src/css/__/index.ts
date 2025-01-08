import { val_xxx } from "..";
import { css } from "../..";
import {
  ngify,
  oAss,
  obj,
  oItems,
  oKeys,
  oVals,
  reCamel,
  sparse,
} from "../../@";
import { At, Cid, Keyframes, FontFace } from "../../base";
import { media, mtype, PMtype } from "../../media";

const formatContentValue = (key: string, value: string): string => {
  return key === "content" && !value.includes("(") ? `'${value}'` : value;
};

const ensurePropsInitialized = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
) => {
  if (!props[type]![key]) props[type]![key] = [];
};

const addPropertyValues = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
  values: string,
) => {
  props[type]![key].push(...values.split(",").map((s) => s.trim()));
};

const toProperty = (sel: string, vals: obj<string>) => {
  const oit = oItems(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
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
  processCB(az: Cid, props: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        oItems(vv).forEach(([x, y]) => {
          const xx = x as PMtype;
          let pvp = formatContentValue(xx, y);
          const stn = ngify({ [reCamel(kk)]: pvp });
          ensurePropsInitialized(props, xx, stn);
          addPropertyValues(props, xx, stn, k);
        });
      });
    });
    this.updateCid(az.cid);
  }
  processKF(az: Keyframes, kprops: { [P in PMtype]?: obj<string[]> }) {
    az.datax.forEach((v, k) => {
      v.forEach((vv, kk) => {
        const vls: obj<obj<string>> = {};
        vv.forEach((y, x) => {
          oItems(y).forEach(([xx, yy]) => {
            const xs = xx as PMtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][x] = yy;
          });
        });
        oItems(vls).forEach(([x, y]) => {
          const xs = x as PMtype;
          ensurePropsInitialized(kprops, xs, k);
          kprops[xs]![k].push(toProperty(kk, y));
        });
      });
    });
  }
  processAT(az: At, fin: string[]) {
    for (const [key, values] of az.data) {
      for (const value of values) {
        const formattedValue = value.includes("(") ? value : `"${value}"`;
        fin.push(`${key} ${formattedValue.trim()};`);
      }
    }
  }
  processFF(az: FontFace, fin: string[]) {
    const FONT_FACE = "@font-face";

    az.data.get("@font")?.forEach((fontData) => {
      const fontProperties = oItems(fontData)
        .map(
          ([property, value]) =>
            `${reCamel(property)}: ${val_xxx(property, value as any)}`,
        )
        .join(";\n\t");
      fin.push(`${FONT_FACE} {\n\t${fontProperties}\n}`);
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
      if (az instanceof Cid) this.processCB(az, props);
      else if (az instanceof Keyframes) this.processKF(az, kprops);
      else if (az instanceof At) this.processAT(az, fin);
      else if (az instanceof FontFace) this.processFF(az, fin);
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
