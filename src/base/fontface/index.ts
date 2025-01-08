import { obj } from "../../@";
import { Base, CSSinR } from "../util";
import { _vars, RM } from "../../media";

export class FontFace extends Base {
  constructor() {
    super("@font-face");
    this.data.set("@font", []);
  }
  set(target: any, prop: string, val: CSSinR) {
    this.data.get("@font")?.push(val);
    return true;
  }
  get css(): { face: CSSinR | _vars | obj<RM> } {
    return new Proxy(this, this);
  }
}
