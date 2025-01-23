import { ensurePropsInitialized, PMtype, val_xxx } from "..";
import { $$, ngify, obj, oItems, reCamel } from "../../@";
import { At, Cid, Keyframes, FontFace } from "../../props";

const formatContentValue = (key: string, value: string): string => {
  return key === "content" && !value.includes("(") ? `'${value}'` : value;
};

const addPropertyValues = (
  props: { [P in PMtype]?: obj<string[]> },
  type: PMtype,
  key: string,
  values: string,
) => {
  props[type]![key].push(...values.split(",").map((s) => s.trim()));
};

export const toProperty = (sel: string, vals: obj<string>) => {
  const oit = oItems(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
};

// Basic DOM - CLASS - ID
export function CB(az: Cid, props: { [P in PMtype]?: obj<string[]> }) {
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

  return az;
}

// KEYFRAMES
export function KF(az: Keyframes, kprops: { [P in PMtype]?: obj<string[]> }) {
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

// At attributes
export function AT(az: At, fin: string[]) {
  for (const [key, values] of az.data) {
    for (const value of values) {
      const formattedValue = value.includes("(") ? value : `"${value}"`;
      fin.push(`${key} ${formattedValue.trim()};`);
    }
  }
}

// FONT FACE
export function FONT(az: FontFace, fin: string[]) {
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
