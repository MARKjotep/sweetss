import { med, media } from "../media";
import { $$, isArr, obj, oItems, oLen, reCamel, V } from "../@";
import { RM } from "../css";
import { fix_value } from "../value";

export class _vars {
  _var = "";
  k = "";
  _cvar = "";
  fallback?: RM;
  _val: media;
  constructor(vr: obj<RM | RM[]> = {}, fallback?: RM) {
    if (oLen(vr)) {
      const [k, v] = oItems(vr)[0];
      this.k = k;
      this._var = "--" + reCamel(k);
      this._val = v instanceof media ? v : med(v, {});
      this.fallback = fallback;
    } else {
      this._val = med({});
    }
  }
  __(fallback?: RM): string {
    if (fallback) {
      this.fallback = fallback;
    }
    const fb = this.fallback;
    if (fb) {
      return `var(${this._var}, ${fix_value(isArr(fb) ? fb : [fb])})`;
    } else {
      return `var(${this._var})`;
    }
  }
  new(val: RM) {
    return new _vars({
      [this.k]: val instanceof media ? val : fix_value([val]),
    });
  }
  prefix(pre?: string) {
    if (pre) {
      oItems(this._val).forEach(([k, v]) => {
        //
        $$.p = [k, v];
      });
    }
  }
}

export const Var = (vr: obj<RM>, fallback?: RM) => {
  return new _vars(vr, fallback);
};
