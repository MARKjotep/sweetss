import { med, media } from "../media";
import { obj, oItems, oLen, reCamel, V } from "../@";
import { RM } from "../css";
import { fix_value } from "../value";

export class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: media = {};
  constructor(
    vr: obj<RM> = {},
    public cfg = {
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
    return new _vars({ [this.k]: val }, this.cfg);
  }
}

export const Var = (
  vr: obj<RM>,
  cfg = {
    rem: false,
    degree: false,
    percent: false,
    quote: false,
    delimeter: " ",
  },
) => new _vars(vr, cfg);
