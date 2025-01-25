import { RM } from "../css";
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
  dark?: RM;
}

export class media {
  [key: string]: any;
  static default: Exclude<keyof mtype, "no_hover" | "print"> = "xs";
  static readonly prop: obj<string> = {
    xs: "@media (width <= 480px)",
    sm: "@media (width >= 480px)",
    smd: "@media (width >= 624px)",
    md: "@media (width >=  768px)",
    lg: "@media (width >=  1024px)",
    xl: "@media (width >= 1280px)",
    xxl: "@media (width >= 1536px)",
    no_hover: "@media (pointer: coarse)",
    print: "@media print",
    screen: "@media screen",
    dark: "@media (prefers-color-scheme: dark)",
  };
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
  static new(prop: obj<string>) {
    oItems(prop).forEach(([k, v]) => {
      if (!this.prop[k]) {
        this.prop[k] = `@media (${v})`;
      }
    });
  }
}

// export type PMtype = keyof mtype;

export const med = (
  defValue: RM,
  g: mtype & { [k: string]: undefined | RM } = {},
) => new media(defValue, g);
