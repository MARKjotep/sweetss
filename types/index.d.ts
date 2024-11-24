import { v } from "./core/v";
import { x } from "./core/x";
import { c } from "./core/colors";
import { ps } from "./core/ps";
import { f } from "./core/f";
import { _vars, RM, med, _var } from "./core/mvar";
import { obj } from "./core/@";
interface xtraCSS {
    src?: string;
    webkitBackdropFilter?: string;
    textFillColor?: string;
    lineClamp?: string;
    webkitTextFillColor?: string;
}
export declare class $$ {
    static set p(a: any);
    static rand(min?: number, max?: number): number;
}
export type CSSinR = {
    [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};
export declare class css {
    dom: CSS;
    id: CSS;
    cx: CSS;
    kf: obj<{
        from?: CSSinR;
        to?: CSSinR;
        "%"?: CSSinR;
    } | obj<CSSinR>>;
    at: {
        import: CSSinR | _vars | obj<RM>;
        charset: CSSinR | _vars | obj<RM>;
    };
    font: {
        face: CSSinR | _vars | obj<RM>;
    };
    save: ({ path, map, minify, }: {
        path: string;
        map?: string;
        minify?: boolean;
    }) => void;
    constructor({ name, prefix }: {
        name: string;
        prefix?: string;
    });
}
export type CSS = obj<CSSinR | CSSinR[]>;
export { med, _var, ps, f };
export { v, c, x };
