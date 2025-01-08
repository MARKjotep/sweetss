import { obj } from "../../@";
import { _vars, RM } from "../../media";
import { Base, CSSinR } from "../util";
export declare class At extends Base {
    constructor();
    set(target: any, prop: string, val: obj<any>): any;
    get css(): {
        import: CSSinR | _vars | obj<RM>;
        charset: CSSinR | _vars | obj<RM>;
    };
}
