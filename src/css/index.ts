import {
  isArr,
  isClassOrId,
  isNumber,
  isObj,
  isStr,
  Mapper,
  oItems,
  V,
} from "../@";
import { CMapper } from "../base";
import { med, media, RM } from "../media";
import { _vars } from "../var";

export { __css } from "./__";

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

-------------------------
*/
const _props = (sel: string, prp: media) => {
  oItems(prp).forEach(([mk, mv]) => {
    prp[mk] = val_xxx(sel, mv);
  });
  return prp;
};

const valToMedia = (val: RM): media => {
  if (val instanceof media) return val;
  if (val instanceof _vars) return med(val.__());
  return med(val);
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
/*
-------------------------
Clas ID KF process
-------------------------
*/
export const processCIK = (
  sel: string,
  vv: any,
  medias: CMapper,
  cid: Mapper<string, string>,
  fix: string,
) => {
  if (!isObj(vv)) return;
  const props: Mapper<string, media> = new Mapper();

  const processProps = (k: string, v: any) => {
    if (k.startsWith(":") || k.startsWith(",")) {
      processCIK(sel + k, v, medias, cid, fix);
    } else if (k.startsWith(" ")) {
      const slc = k.match(/^.*?\w/gm);
      const islc = slc?.[0].slice(0, -1);
      const lk = k.replaceAll(/, /gm, `, ${sel}${islc}`);
      processCIK(sel + lk, v, medias, cid, fix);
    } else if (isClassOrId(k)) {
      console.log(sel + k, v);
      processCIK(sel + k, v, medias, cid, fix);
      //
    } else {
      props.set(k, _props(k, valToMedia(v)));
    }
  };

  if (vv instanceof _vars) {
    props.ass(vv._var, _props(vv._var, valToMedia(vv._val)));
  } else {
    oItems(vv).forEach(([k, v]) => processProps(k, v));
  }

  const { classes, ids } = mapIDClass(sel);
  [classes, ids].flat().forEach((cl) => {
    cid.set(cl, fix + cl);
  });

  sel = fix ? applyPrefix(sel, fix) : sel;
  if (medias.has(sel)) {
    medias.get(sel)?.map(props);
  } else {
    medias.set(sel, props);
  }
};
