import { obj } from "../../@";
import { RM } from "../../media";
import { _vars } from "../../var";
import { Base, CSSinR } from "../__";

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
