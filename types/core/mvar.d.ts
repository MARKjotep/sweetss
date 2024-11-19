import { obj, V } from "./@";
export interface mtype {
    xs?: RM;
    sm?: RM;
    smd?: RM;
    md?: RM;
    lg?: RM;
    xl?: RM;
    xxl?: RM;
    no_hover?: RM;
    print?: RM;
}
export declare function val_xxx(sel: string, val: V | _vars, options?: {
    rem: boolean;
    deg: boolean;
}): string;
export declare class media {
    [key: string]: any;
    static readonly prop: {
        xs: string;
        sm: string;
        smd: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        no_hover: string;
        print: string;
    };
    static default: string;
    constructor(defValue: RM, g?: obj<any>);
    static setDefault(def: keyof typeof media.prop): void;
}
export declare class _vars {
    _var: string;
    k: string;
    _cvar: string;
    _val: media;
    constructor(vr?: obj<RM>);
    __(fallback?: V): string;
    new(val: RM): _vars;
    not(val: RM): _vars;
}
export type PMtype = keyof mtype;
export type RM = V | media | _vars | RM[];
export declare const med: (defValue: RM, g?: mtype) => media;
export declare const _var: (vr: obj<RM>) => _vars;
