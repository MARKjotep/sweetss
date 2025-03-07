declare const isFN: (v: any) => v is Function;
declare const isAsync: (v: any) => v is Function;
declare const isNumber: (value: any) => boolean;
declare const isDict: (val: any) => boolean;
declare const isPlainObject: (value: any) => boolean;
declare const isArraybuff: (val: any) => val is string | ArrayBuffer | Uint8Array<ArrayBufferLike>;
declare const isClassOrId: (k: string) => boolean;
declare const isBool: (v: any) => v is boolean;
declare const isStr: (v: any) => v is string;
declare const isArr: (v: any) => v is any[];
declare const isObj: (v: any) => v is object;
declare const isNum: (v: any) => v is number;
declare const isNull: (v: any) => v is null;
declare const isUndefined: (v: any) => v is undefined;
declare const isInt: (str: string) => boolean;
declare const isWindow: boolean;
declare const isNotWindow: boolean;

declare const is_isArr: typeof isArr;
declare const is_isArraybuff: typeof isArraybuff;
declare const is_isAsync: typeof isAsync;
declare const is_isBool: typeof isBool;
declare const is_isClassOrId: typeof isClassOrId;
declare const is_isDict: typeof isDict;
declare const is_isFN: typeof isFN;
declare const is_isInt: typeof isInt;
declare const is_isNotWindow: typeof isNotWindow;
declare const is_isNull: typeof isNull;
declare const is_isNum: typeof isNum;
declare const is_isNumber: typeof isNumber;
declare const is_isObj: typeof isObj;
declare const is_isPlainObject: typeof isPlainObject;
declare const is_isStr: typeof isStr;
declare const is_isUndefined: typeof isUndefined;
declare const is_isWindow: typeof isWindow;
declare namespace is {
  export { is_isArr as isArr, is_isArraybuff as isArraybuff, is_isAsync as isAsync, is_isBool as isBool, is_isClassOrId as isClassOrId, is_isDict as isDict, is_isFN as isFN, is_isInt as isInt, is_isNotWindow as isNotWindow, is_isNull as isNull, is_isNum as isNum, is_isNumber as isNumber, is_isObj as isObj, is_isPlainObject as isPlainObject, is_isStr as isStr, is_isUndefined as isUndefined, is_isWindow as isWindow };
}

type V = string | number | boolean;
type obj<T> = Record<string, T>;

/**
 * A custom Map implementation that provides additional utility methods for working with objects and maps.
 *
 * @template K - The type of the keys in the map.
 * @template V - The type of the values in the map.
 */
declare class Mapper<K, V> extends Map<K, V> {
    obj(obj?: object | null): void;
    map(map: Mapper<K, V>): void;
    ass<T>(key: K, obj: T): void;
    lacks(key: K): boolean;
    init(key: K, val: V): V;
}

declare class $$ {
    static set p(a: any);
}

declare class __ {
    static rand(min?: number, max?: number): number;
    static fill(count: number, fill?: any): any[];
    static new({ dom, id, inner, }: {
        dom: keyof HTMLElementTagNameMap;
        id?: string;
        inner?: any;
    }): HTMLElement;
    static randFrom(arr: any[] | Object): any;
    static makeID: (length: number) => string;
    static class(a: obj<any>, classes: string[]): void;
    static get O(): {
        vals: {
            <T>(o: {
                [s: string]: T;
            } | ArrayLike<T>): T[];
            (o: {}): any[];
        };
        keys: {
            (o: object): string[];
            (o: {}): string[];
        };
        items: {
            <T>(o: {
                [s: string]: T;
            } | ArrayLike<T>): [string, T][];
            (o: {}): [string, any][];
        };
        has: (o: object, v: PropertyKey) => boolean;
        ass: {
            <T extends {}, U>(target: T, source: U): T & U;
            <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
            <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
            (target: object, ...sources: any[]): any;
        };
        len: (obj?: {}) => number;
    };
    static get is(): typeof is;
    static get return(): typeof returner;
}
declare class returner {
    static array(val: any): any[];
}

interface mtype {
    [k: string]: RM | undefined;
    xs?: RM;
    sm?: RM;
    smd?: RM;
    md?: RM;
    lg?: RM;
    xl?: RM;
    xxl?: RM;
    no_hover?: RM;
    print?: RM;
    dark?: RM;
    screen?: RM;
}
declare class media {
    [key: string]: any;
    static default: Exclude<keyof mtype, "no_hover" | "print">;
    static readonly prop: mtype;
    static readonly extra: mtype;
    constructor(defValue?: RM, g?: obj<any>);
    static new(prop: obj<string>): void;
    static get breakpoints(): any;
}
declare function med(g: mtype & {
    [k: string]: undefined | RM;
}): media;
declare function med(defValue: RM, g: mtype & {
    [k: string]: undefined | RM;
}): media;
interface MedCFG<Q = Record<string, any>> {
    prefix?: string;
    data: Q;
    values: Record<string, media>;
}
declare class Medyas<T extends Medyas<T>, Q = Record<string, any>> {
    [k: number]: this;
    _prefix?: string;
    data: Q;
    _values: Record<string, media>;
    constructor({ prefix, data, values }?: MedCFG);
    get XS(): Medyas<T, Q>;
    get SM(): T;
    get SMD(): T;
    get MD(): T;
    get LG(): T;
    get XL(): T;
    get XXL(): T;
    get NO_HOVER(): T;
    get PRINT(): T;
    get SCREEN(): T;
    get DARK(): T;
    set _value(val: CSSProps);
    get _value(): CSSProps;
}

declare class _vars {
    _var: string;
    k: string;
    _cvar: string;
    fallback?: RM;
    _val: media;
    constructor(vr?: obj<RM | RM[]>, fallback?: RM);
    __(fallback?: RM): string;
    new(val: RM): _vars;
    prefix(pre?: string): void;
}
declare const Var: (vr: obj<RM>, fallback?: RM) => _vars;

type RM = V | media | _vars | RM[];
type atCSS = CSSinR | _vars | obj<RM>;
interface xtraCSS {
    src?: string;
    webkitBackdropFilter?: string;
    webkitTextFillColor?: string;
    webkitFontSmoothing?: string;
    webkitTapHighlightColor?: string;
    textFillColor?: string;
    lineClamp?: string;
    textJustify?: string;
    webkitBoxDecorationBreak: string;
    boxDecorationBreak: string;
    webkitBoxReflect: string;
}
type CSSinR = {
    [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};

declare const v: {
    important: string;
    visible: string;
    hidden: string;
    auto: string;
    none: string;
    clip: string;
    scroll: string;
    initial: string;
    inherit: string;
    flex: string;
    center: string;
    flex_start: string;
    flex_end: string;
    space_evenly: string;
    stretch: string;
    wrap: string;
    column: string;
    column_reverse: string;
    row: string;
    row_reverse: string;
    space_between: string;
    space_around: string;
    pr100: string;
    pr50: string;
    i100vh: string;
    i100vw: string;
    block: string;
    sticky: string;
    fixed: string;
    absolute: string;
    relative: string;
    pointer: string;
    grabbing: string;
    checkbox: string;
    solid: string;
    inset: string;
    bold: string;
    currentColor: string;
    forwards: string;
    text: string;
    norepeat: string;
    nowrap: string;
    difference: string;
    preserve3d: string;
};

declare class ps {
    static attr(d: obj<string>): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static after(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static before(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static backdrop(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static cue(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static cueRegion(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static firstLetter(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static firstLine(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static marker(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static part(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static placeholder(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static selection(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static slotted(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static spellingError(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static targetText(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransition(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionGroup(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionImagePair(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionNew(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionOld(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbar(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarThumb(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarTrack(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarCorner(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static active(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static anyLink(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static autofill(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static blank(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static checked(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static current(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static default(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static defined(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static disabled(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static empty(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static enabled(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static first(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static firstChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static firstOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static fullscreen(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static future(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static focus(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static focusVisible(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static focusWithin(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static host(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static hover(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static indeterminate(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static inRange(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static invalid(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static lastChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static lastOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static left(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static link(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static localLink(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static modal(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static onlyChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static onlyOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static optional(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static outOfRange(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static past(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static pictureInPicture(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static placeholderShown(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static paused(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static playing(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static readOnly(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static readWrite(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static required(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static right(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static root(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static scope(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static target(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static targetWithin(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static userInvalid(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static valid(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static visited(xx?: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static dir(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static has(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static host_(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static hostContext(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static is(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static lang(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static not(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthChild(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthCol(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastChild(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastCol(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastOfType(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static nthOfType(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static state(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static where(xx: V): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static and(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static child(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static desc(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static next(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static general(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
    static _with(str: string): (...itm: (CSSinR | _vars | obj<RM> | Medyas<any>)[]) => {
        [x: string]: obj<any>;
    };
}

declare class g {
    static minmax(min: RM, max: RM): string;
    static fitContent(len: RM): string;
    static repeat(count: RM, ...tracks: RM[]): string;
}
declare class f extends g {
    static attr(name: RM, type?: RM, fallback?: RM): string;
    static blur(blur: RM): string;
    static brightness(brightness: RM): string;
    static calc(...calc: RM[]): string;
    static circle(radius: RM, position?: RM): string;
    static clamp(min: RM, preferred: RM, max: RM): string;
    /**
     *
     * @param colorInterpolation in + srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, lab, oklab, xyz, xyz-d50, xyz-d65, hsl, hwb, lch, and oklch
     * @param color1 color, mix%
     * @param color2 color,  mix%
     */
    static colorMix(colorInterpolation: RM, color1: RM | RM[], color2: RM | RM[]): string;
    static conicGradient(...sfs: RM[]): string;
    static contrast(contrast: RM): string;
    /**
     * Numeric values. x1 and x2 must be a number from 0 to 1
     */
    static cubicBezier(x1: RM, y1: RM, x2: RM, y2: RM): string;
    /**
     * @param sfs h-shadow v-shadow blur spread color
     */
    static dropShadow(...sfs: RM[]): string;
    static grayscale(grayscale: RM): string;
    static hsl(hue: RM, saturation: RM, lightness: RM): string;
    static hsla(hue: RM, saturation: RM, lightness: RM, A?: RM): string;
    static hueRotate(degree: RM): string;
    static inset(...sfs: RM[]): string;
    static invert(percent: RM): string;
    static linearGradient(...sfs: RM[]): string;
    static matrix(scaleX: RM, skewY: RM, skewX: RM, scaleY: RM, translateX: RM, translateY: RM): string;
    static matrix3d(a1: RM[], a2: RM[], a3: RM[], t4: RM[]): string;
    static max(...sfs: RM[]): string;
    static min(...sfs: RM[]): string;
    static opacity(percent: RM): string;
    static path(path: RM): string;
    static clipPath(fillRule: RM, path: RM): string;
    static perspective(value: RM): string;
    static polygon(...lengths: RM[]): string;
    static ray(...sfs: RM[]): string;
    static radialGradient(...sfs: RM[]): string;
    static repeatingConicGradient(...sfs: RM[]): string;
    static repeatingLinearGradient(...sfs: RM[]): string;
    static repeatingRadialGradient(...sfs: RM[]): string;
    static rgb(R: RM, G: RM, B: RM): string;
    static rgba(R: RM, G: RM, B: RM, A?: RM): string;
    static rotate(R: RM): string;
    static rotate3d(x: RM, y: RM, z: RM, angle: RM): string;
    static rotateX(X: RM): string;
    static rotateY(Y: RM): string;
    static rotateZ(Z: RM): string;
    static saturate(...sfs: RM[]): string;
    static scale(sx: RM, sy?: RM): string;
    static scale3d(sx: RM, sy: RM, sz: RM): string;
    static scaleX(X: RM): string;
    static scaleY(Y: RM): string;
    static scaleZ(Z: RM): string;
    static sepia(percent: RM): string;
    static skew(...sfs: RM[]): string;
    static skewX(X: RM): string;
    static skewY(Y: RM): string;
    static steps(n: RM, position: "start" | "end" | "no" | "jump-start" | "jump-end" | "jump-none" | "jump-both"): string;
    /**
     * Translate(X,Y)
     */
    static translate(...sfs: RM[]): string;
    static translate3d(...sfs: RM[]): string;
    static translateX(X: RM): string;
    static translateY(Y: RM): string;
    static translateZ(...sfs: RM[]): string;
    static url(url: RM): string;
    static var(st: string, opt?: RM): string;
}

declare function value(val: RM | RM[], config?: {
    rem?: boolean;
    degree?: boolean;
    percent?: boolean;
    second?: boolean;
    quote?: boolean;
    delimeter?: string;
    delimeter_arr?: boolean;
    percent_arr?: boolean;
}): string;
declare function join(...val: (RM | RM[])[]): string;

type CSSProps = CSSinR | CSSinR[];
type CSSValue = RM;
type VarType = _vars;
type CSS = obj<CSSProps | {
    [key: `.${string}` | `#${string}`]: CSSProps;
} | Medyas<any>>;
type KFX = CSSProps | Medyas<any, {}>;
type KFCSS = obj<{
    from?: KFX;
    to?: KFX;
    "%"?: KFX;
} | Record<any, CSSProps> | obj<CSSProps> | Medyas<any>>;
interface saveCSS {
    dir?: string | string[];
    mapDir?: string;
    mapName?: string;
    minify?: boolean;
    shaker?: string[];
    include?: string[];
    includeAnimation?: string[];
}
interface sweetCFG {
    __filename: string;
    name?: string;
    prefix?: string;
    sweetSS?: SweetSS | SweetSS[];
    exportMap?: boolean;
    webkitKeyframes?: boolean;
}
declare class SweetSS {
    [k: string]: any;
    path: string;
    protected _imported: Set<string>;
    name: string;
    prefix: string;
    dom: CSS;
    id: CSS;
    cx: CSS;
    kf: KFCSS;
    at: {
        import: atCSS;
        charset: atCSS;
    };
    font: {
        face: atCSS;
    };
    save: ({}: saveCSS) => void;
    exportMap: boolean;
    cids: Mapper<string, obj<string>>;
    sweet: this;
    constructor({ __filename, name, prefix, sweetSS, exportMap, webkitKeyframes, }: sweetCFG);
    get imported(): string[];
}
declare function fileName(path: string): string;

export { $$, type CSS, type CSSProps, type CSSValue, type KFCSS, Medyas, SweetSS, Var, type VarType, __, f, fileName, join, med, media, ps, v, value };
