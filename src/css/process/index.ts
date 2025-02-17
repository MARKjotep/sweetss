import { CMapper, ensurePropsInitialized, PMtype, RM } from "..";
import { $$, Mapper, ngify, obj, oItems, reCamel } from "../../@";
import { med, media } from "../../media";
import { At, Cid, Keyframes, FontFace } from "../../props";
import { val_xxx } from "../../value";
import { _vars } from "../../var";

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
  if (!props[type]) {
    props[type] = { [key]: values.split(",").map((s) => s.trim()) };
  } else {
    props[type]![key].push(...values.split(",").map((s) => s.trim()));
  }
};

export const toProperty = (sel: string, vals: obj<string>) => {
  const oit = oItems(vals)
    .map(([kk, vv]) => `${kk}: ${vv};`)
    .join(" \n  ");
  return `${sel} {\n  ${oit}\n}`;
};

type dataType = Mapper<string, Mapper<string, CMapper>>;

// Basic DOM - CLASS - ID
export function CB(
  az: Cid,
  props: { [P in PMtype]?: obj<string[]> },
  shaker: string[] = [],
  include: string[] = [],
) {
  const DATA = (data: dataType, exportMap: boolean = false) => {
    data.forEach((data2, prefix) => {
      data2.forEach((v, name) => {
        v.forEach((vv, kk) => {
          oItems(vv).forEach(([x, y]) => {
            const xx = x;

            const stn = ngify({ [reCamel(kk)]: y });

            const { classes, ids } = mapIDClass(name);

            [classes, ids].flat().forEach((cl) => {
              if (exportMap) {
                if (az.cid.lacks(cl)) {
                  az.cid.set(cl, prefix + cl);
                }
              } else {
                if (az.cidz.lacks(cl)) {
                  az.cidz.set(cl, prefix + cl);
                }
              }
            });

            //
            const prefixedName = prefix ? applyPrefix(name, prefix) : name;

            if (
              (shaker.length && prefixedName.startsWith(".")) ||
              prefixedName.startsWith("#")
            ) {
              const hasC = [...classes, ...ids].some(
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
  };

  DATA(az.DATAX, true);
  DATA(az.DATAZ);

  return az;
}

// KEYFRAMES
export function KF(
  az: Keyframes,
  kprops: { [P in PMtype]?: obj<string[]> },
  anims: Mapper<string, Set<string>>,
  shaker: string[] = [],
  include: string[] = [],
) {
  az.DATAZ.forEach((data, prefix) => {
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
          if (shaker.length) {
            const slc = k.split(" ")[1];

            if (anims.has(slc)) {
              const anim_g = [...anims.get(slc)!];
              const hasC = anim_g.some((s) => {
                const { classes, ids } = mapIDClass(s);
                return [...classes, ...ids].some(
                  (c) =>
                    shaker.includes(c) ||
                    (include.length && include.includes(c)),
                );
              });
              if (hasC) {
                const xs = x as PMtype;
                ensurePropsInitialized(kprops, xs, k);
                kprops[xs]![k].push(toProperty(kk, y));
              }
            }
          } else {
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
