export * from "./core/v";
export * from "./core/x";
export * from "./core/colors";
export * from "./core/ps";
export * from "./core/f";
import { $$ } from "./@";
import { CSS, CSSinR } from "./base";
export { $$, CSS, CSSinR };
export { _var, med } from "./media";
export declare class css {
    dom: CSS;
    id: CSS;
    cx: CSS;
    kf: import("./@").obj<{
        from?: CSSinR;
        to?: CSSinR;
        "%"?: CSSinR;
    } | import("./@").obj<CSSinR>>;
    at: {
        import: CSSinR | import("./media")._vars | import("./@").obj<import("./media").RM>;
        charset: CSSinR | import("./media")._vars | import("./@").obj<import("./media").RM>;
    };
    font: {
        face: CSSinR | import("./media")._vars | import("./@").obj<import("./media").RM>;
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
