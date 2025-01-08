import { med, media, RM } from "../media";
import { obj, oItems, oLen, reCamel, V } from "../@";
import { val_xxx } from "../css";

export class _vars {
  _var = "";
  k = "";
  _cvar = "";
  _val: media = {};
  constructor(vr: obj<RM> = {}) {
    if (oLen(vr)) {
      const [k, v] = oItems(vr)[0];
      this.k = k;
      this._var = "--" + reCamel(k);
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
}

export const _var = (vr: obj<RM>) => new _vars(vr);
