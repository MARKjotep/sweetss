import { ensurePropsInitialized, PMtype, val_xxx } from "..";
import { $$, ngify, obj, oItems, reCamel } from "../../@";
import { At, Cid, Keyframes, FontFace } from "../../props";

const formatContentValue = (key: string, value: string): string => {
  return key === "content" && !value.includes("(") ? `'${value}'` : value;
};

const mapIDClass = (cssContent: string) => {
  const xmatch = (regex: RegExp) =>
    Array.from(cssContent.matchAll(regex), (match) => match[1]);
  const classRegex = /\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches .className
  const idRegex = /#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g; // Matches #idName
  return {
    classes: [...new Set(xmatch(classRegex))],
    ids: [...new Set(xmatch(idRegex))],
  };
};

const applyPrefix = (sel: string, prefix: string) => {
  return sel.replaceAll(/\.|\#/g, (m) => m + prefix);
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
export function CB(
  az: Cid,
  props: { [P in PMtype]?: obj<string[]> },
  shaker: string[] = [],
  include: string[] = [],
) {
  az.DATAX.forEach((data, prefix) => {
    data.forEach((v, name) => {
      v.forEach((vv, kk) => {
        oItems(vv).forEach(([x, y]) => {
          const xx = x as PMtype;
          let pvp = formatContentValue(xx, y);
          const stn = ngify({ [reCamel(kk)]: pvp });

          const { classes, ids } = mapIDClass(name);

          [classes, ids].flat().forEach((cl) => {
            az.cid.set(cl, prefix + cl);
          });
          //
          const prefixedName = prefix ? applyPrefix(name, prefix) : name;

          if (shaker.length && prefixedName.startsWith(".")) {
            const hasC = classes.some(
              (s) =>
                shaker.includes(s) || (include.length && include.includes(s)),
            );
            if (hasC) {
              ensurePropsInitialized(props, xx, stn);
              addPropertyValues(props, xx, stn, prefixedName);
            }
          } else {
            ensurePropsInitialized(props, xx, stn);
            addPropertyValues(props, xx, stn, prefixedName);
          }
        });
      });
    });
  });

  return az;
}

// KEYFRAMES
export function KF(
  az: Keyframes,
  kprops: { [P in PMtype]?: obj<string[]> },
  anims: Set<string>,
) {
  az.DATAX.forEach((data, prefix) => {
    data.forEach((v, k) => {
      v.forEach((vv, kk) => {
        const vls: obj<obj<string>> = {};
        vv.forEach((y, x) => {
          oItems(y).forEach(([xx, yy]) => {
            const xs = xx as PMtype;
            if (!vls[xs]) vls[xs] = {};
            vls[xs][reCamel(x)] = yy;
          });
        });
        oItems(vls).forEach(([x, y]) => {
          const slc = k.split(" ")[1];
          if (anims.has(slc)) {
            const xs = x as PMtype;
            ensurePropsInitialized(kprops, xs, k);
            kprops[xs]![k].push(toProperty(kk, y));
          }
        });
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
