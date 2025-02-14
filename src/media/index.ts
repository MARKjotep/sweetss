import { RM } from "../css";
import { $$, isArr, ngify, oAss, obj, oItems, oKeys, sparse, V } from "../@";
import { _vars } from "../var";

export interface mtype {
  [k: string]: RM | undefined;
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
  screen?: RM;
}

const breakpoints = {
  xs: "480px",
  sm: "480px",
  smd: "624px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px",
};

export class media {
  [key: string]: any;
  static default: Exclude<keyof mtype, "no_hover" | "print"> = "xs";
  static readonly prop: mtype = oItems(breakpoints).reduce<obj<string>>(
    (r, [k, v], ind) => {
      r[k] = `(${ind == 0 ? "max-width" : "min-width"}: ${v})`;
      return r;
    },
    {},
  );
  static readonly extra: mtype = {
    no_hover: "(pointer: coarse)",
    print: "print",
    screen: "screen",
    dark: "(prefers-color-scheme: dark)",
  };

  constructor(defValue?: RM, g: obj<any> = {}) {
    const defM = media.default;
    const DM: obj<RM> = {};

    if (defValue !== undefined) {
      reMedia(DM, defM, defValue);
    }

    oItems(g).forEach(([k, v]) => {
      reMedia(DM, k, v);
    });
    oAss(this, DM);
  }
  static new(prop: obj<string>) {
    oItems(prop).forEach(([k, v]) => {
      if (!this.extra[k]) {
        this.extra[k] = `(${v})`;
      }
    });
  }
  static get breakpoints() {
    return sparse(ngify(breakpoints));
  }
}

const defM = media.default;
const reMedia = (DM: obj<RM>, k: keyof mtype, v: RM | media) => {
  if (v !== undefined) {
    if (v instanceof media) {
      oItems(v).forEach(([k2, v2]) => {
        if (k !== k2) {
          const nm = defM === k2 ? k : `${k}-${k2}`;
          reMedia(DM, nm, v2);
        }
      });
    } else {
      DM[k] = v;
    }
  }
};

// export type PMtype = keyof mtype;

export function med(g: mtype & { [k: string]: undefined | RM }): media;
export function med(
  defValue: RM,
  g: mtype & { [k: string]: undefined | RM },
): media;
export function med(
  defValueOrG: RM | (mtype & { [k: string]: undefined | RM }),
  g?: mtype & { [k: string]: undefined | RM },
) {
  if (g) {
    return new media(defValueOrG as RM, g);
  }
  return new media(
    undefined,
    defValueOrG as mtype & { [k: string]: undefined | RM },
  );
}
