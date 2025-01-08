import { Base, CSSinR, CSS } from "../util";
export declare class Cid extends Base {
    prefix: string;
    constructor(pre?: string, prefix?: string);
    set(target: any, prop: string, val: CSSinR | CSSinR[]): boolean;
    get css(): CSS;
}
