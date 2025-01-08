import { Mapper, obj } from "../../@";
import { media, RM } from "../../media";
interface xtraCSS {
    src?: string;
    webkitBackdropFilter?: string;
    textFillColor?: string;
    lineClamp?: string;
    webkitTextFillColor?: string;
}
export type CSSinR = {
    [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};
export type CMapper = Mapper<string, Mapper<string, media>>;
export type CSS = obj<CSSinR | CSSinR[] | {
    [key: `.${string}` | `#${string}`]: CSSinR | CSSinR[];
}>;
export declare class Base {
    pre: string;
    data: Mapper<string, any[]>;
    cid: Mapper<string, string>;
    datax: Mapper<string, CMapper>;
    constructor(pre: string);
    get(target: any, prop: string): string | undefined;
    set(target: any, prop: string, val: CSSinR | CSSinR[]): boolean;
    get css(): any;
}
export {};
