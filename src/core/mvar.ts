import { O, str, is, V, obj } from "./__";

export interface mtype {
  xs?: RM;
  sm?: RM;
  smd?: RM;
  md?: RM;
  lg?: RM;
  xl?: RM;
  xxl?: RM;
  no_hover?: RM;
  print?: RM;
}
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
  if (is.arr(val)) {
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

function tup_rst(
  sfs: RM[],
  noRem: boolean = true,
  wcom: boolean = true,
  ideg: boolean = false,
  qt: boolean = false,
) {
  const fnal: string[] = sfs.map((ff) => {
    if (is.str(ff)) return qt ? `'${ff}'` : ff;
    if (ff instanceof _vars) return ff.__();
    if (is.number(ff)) return `${ff}${noRem ? "" : ideg ? "deg" : "rem"}`;
    return "";
  });

  return fnal.join(wcom ? ", " : " ");
}

export class media {
  [key: string]: any;
  static readonly prop = {
    xs: "@media (width <= 480px)",
    sm: "@media (width >= 480px)",
    smd: "@media (width >= 624px)",
    md: "@media (width >=  768px)",
    lg: "@media (width >=  1024px)",
    xl: "@media (width >= 1280px)",
    xxl: "@media (width >= 1536px)",
    no_hover: "@media (pointer: coarse)",
    print: "@media print",
  };
  static default = "xs";
  constructor(defValue: RM, g: obj<any> = {}) {
    const defM = media.default;
    const DM: obj<RM> = {};
    DM[defM] = defValue;
    if (!(defM in g)) {
      g[defM] = defValue;
    }

    O.items(g).forEach(([k, v]) => {
      if (is.arr(v)) {
        DM[k] = tup_rst(v, false, false);
      } else {
        DM[k] = v;
      }
    });
    O.ass(this, DM);
  }
  static setDefault(def: keyof typeof media.prop) {
    media.default = def;
  }
}

export class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: media = {};
  constructor(vr: obj<RM> = {}) {
    if (O.length(vr)) {
      const [k, v] = O.items(vr)[0];
      this.k = k;
      this._var = "--" + str.camel(k);
      this._val = v instanceof media ? v : med(v);
    }
  }
  __(fallback?: V): string {
    return `var(${this._var}${
      fallback ? "," + val_xxx(this._var, fallback) : ""
    })`;
  }
  new(val: RM) {
    return new _vars({ [this.k]: val });
  }
  not(val: RM) {
    return new _vars({ [this.k]: val });
  }
}
export type PMtype = keyof mtype;
export type RM = V | media | _vars | RM[];

export const med = (defValue: RM, g: mtype = {}) => new media(defValue, g);
export const _var = (vr: obj<RM>) => new _vars(vr);
