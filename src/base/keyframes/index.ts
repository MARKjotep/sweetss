import { isArr, Mapper, obj, oItems } from "../../@";
import { Base, CMapper, CSSinR } from "../util";
import { processCIK } from "../../css";

export class Keyframes extends Base {
  constructor(pre: string = "") {
    super(pre);
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = prop;
    const VL = isArr(val) ? val : [val];
    const kfKEY = `@keyframes ${nme}`;
    const kfKWebkit = `@-webkit-keyframes ${nme}`;
    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      oItems(vv).forEach(([x, y]) => {
        processCIK(x, y as CSSinR, dx, this.cid, "");
      });
    });
    this.datax.set(kfKEY, dx);
    this.datax.set(kfKWebkit, dx);
    this.data.set(nme, VL);
    return true;
  }
  get css(): obj<{ from?: CSSinR; to?: CSSinR; "%"?: CSSinR } | obj<CSSinR>> {
    return new Proxy(this, this);
  }
}
