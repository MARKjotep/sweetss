import { obj } from "../../@";
import { Base, CSSinR } from "../util";
import { _vars, RM } from "../../media";
export declare class FontFace extends Base {
    constructor();
    set(target: any, prop: string, val: CSSinR): boolean;
    get css(): {
        face: CSSinR | _vars | obj<RM>;
    };
}
