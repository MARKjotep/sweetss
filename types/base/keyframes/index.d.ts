import { obj } from "../../@";
import { Base, CSSinR } from "../util";
export declare class Keyframes extends Base {
    constructor(pre?: string);
    set(target: any, prop: string, val: obj<any>): boolean;
    get css(): obj<{
        from?: CSSinR;
        to?: CSSinR;
        "%"?: CSSinR;
    } | obj<CSSinR>>;
}
