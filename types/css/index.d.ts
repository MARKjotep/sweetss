import { css } from "..";
import { Mapper, obj } from "../@";
import { At, Cid, Keyframes, FontFace, CMapper } from "../base";
import { PMtype } from "../media";
export declare const processCIK: (sel: string, vv: any, medias: CMapper, cid: Mapper<string, string>, fix: string) => void;
export declare class __css {
    css: string;
    cid: obj<string>;
    constructor();
    private updateCid;
    processCB(az: Cid, props: {
        [P in PMtype]?: obj<string[]>;
    }): void;
    processKF(az: Keyframes, kprops: {
        [P in PMtype]?: obj<string[]>;
    }): void;
    processAT(az: At, fin: string[]): void;
    processFF(az: FontFace, fin: string[]): void;
    load(CSS: css): this;
}
