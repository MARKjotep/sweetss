import { RM } from "../css";
import { $$, ngify, oAss, obj, oItems, sparse, V } from "../@";
import { _vars } from "../var";
import { CSSProps } from "..";

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

function CX(this: Medyas<any>, pref: string) {
  return [...this["_prefix"], pref];
}
function VAL(this: Medyas<any>, val: any) {
  if (this["_prefix"].size) {
    const prefs = [...this["_prefix"]].reduce<Record<string, string>>(
      (a, b) => {
        a[b] = val;
        return a;
      },
      {},
    );
    return med(prefs);
  } else {
    return med({ xs: val });
  }
}
function NEW<T extends Medyas<T>, Q extends Record<string, any>>(
  this: Medyas<T, Q>,
  mda: string,
) {
  return new (this.constructor as new (
    prefix: string[],
    _values: Record<string, media>,
    data: Q,
  ) => T)(CX.call(this, mda), this["_values"], this["data"]);
}

export class Medyas<T extends Medyas<T>, Q = Record<string, any>> {
  private _prefix: Set<string> = new Set();
  constructor(
    prefix: string[] = [],
    private _values: Record<string, media> = {},
    public data: Q = {} as Q,
  ) {
    prefix.forEach((pr) => {
      pr && this._prefix.add(pr);
    });
    oItems(_values).forEach(([k, v]) => {
      if (!this._values[k]) {
        this._values[k] = med({});
      }
      oAss(this._values[k], v);
    });

    this.data = data;
  }
  get XS() {
    return <Medyas<T, Q>>NEW.call(this as any, "xs");
  }
  get SM() {
    return <T>NEW.call(this, "sm");
  }
  get SMD() {
    return <T>NEW.call(this, "smd");
  }
  get MD() {
    return <T>NEW.call(this, "md");
  }
  get LG() {
    return <T>NEW.call(this, "lg");
  }
  get XL() {
    return <T>NEW.call(this, "xl");
  }
  get XXL() {
    return <T>NEW.call(this, "xxl");
  }
  get NO_HOVER() {
    return <T>NEW.call(this, "no_hover");
  }
  get PRINT() {
    return <T>NEW.call(this, "print");
  }
  get SCREEN() {
    return <T>NEW.call(this, "screen");
  }
  get DARK() {
    return <T>NEW.call(this, "dark");
  }
  set _value(val: CSSProps) {
    oItems(val).forEach(([k, v]) => {
      if (!this._values[k]) {
        this._values[k] = med({});
      }
      oAss(this._values[k], VAL.call(this as any, v));
    });
  }
  get _value() {
    //
    return this._values;
  }
}
