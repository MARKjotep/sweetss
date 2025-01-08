import { obj } from "../../@";
import { _vars, RM } from "../../media";
import { Base, CSSinR } from "../util";

export class At extends Base {
  constructor() {
    super("@");
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.pre + prop;
    if (nme in target.data) {
      this.data.get(nme)?.push(val);
    } else {
      this.data.set(nme, [val]);
    }
    return target;
  }
  get css(): {
    import: CSSinR | _vars | obj<RM>;
    charset: CSSinR | _vars | obj<RM>;
  } {
    return new Proxy(this, this);
  }
}
