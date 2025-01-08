import { isArr, obj } from "../../@";
import { processCIK } from "../../css";
import { Base, CSSinR, CSS } from "../util";

export class Cid extends Base {
  prefix: string;
  constructor(pre: string = "", prefix: string = "") {
    super(pre);
    this.prefix = prefix ? prefix + "_" : prefix;
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = isArr(val) ? val : [val];
    VL.forEach((vv) => {
      processCIK(nme, vv, this.datax, this.cid, this.prefix);
    });
    this.data.set(nme, VL);
    return true;
  }
  get css(): CSS {
    return new Proxy(this, this);
  }
}
