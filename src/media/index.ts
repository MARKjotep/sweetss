import { isArr, oAss, obj, oItems, V } from "../@";
import { tup_rst } from "../css";
import { _vars } from "../var";

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

    oItems(g).forEach(([k, v]) => {
      DM[k] = isArr(v) ? tup_rst(v, false, false) : v;
    });
    oAss(this, DM);
  }
  static setDefault(def: keyof typeof media.prop) {
    media.default = def;
  }
}

export type PMtype = keyof mtype;
export type RM = V | media | _vars | RM[];

export const med = (defValue: RM, g: mtype = {}) => new media(defValue, g);
