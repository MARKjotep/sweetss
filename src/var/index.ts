import { med, media } from "../media";
import { val_xxx } from "../css";
import { obj, oItems, oLen, reCamel, V } from "../@";
import { RM } from "../css";
import { fix_value } from "../@misc/f";

export class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: media = {};
  constructor(
    vr: obj<RM> = {},
    private cfg = {
      rem: false,
      degree: false,
      percent: false,
      quote: false,
      delimeter: " ",
    },
  ) {
    if (oLen(vr)) {
      const [k, v] = oItems(vr)[0];
      this.k = k;
      this._var = "--" + reCamel(k);
      this._val = v instanceof media ? v : med(v, {});
    }
  }
  __(fallback?: RM): string {
    //
    return `var(${this._var}${fallback ? "," + fix_value([fallback], this.cfg) : ""})`;
  }
  new(val: RM) {
    return new _vars({ [this.k]: val });
  }
}

export const Var = (
  vr: obj<RM>,
  {
    rem = false,
    degree = false,
    percent = false,
    quote = false,
    delimeter = " ",
  } = {},
) => new _vars(vr, { rem, degree, percent, quote, delimeter });
