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

interface obj<T> {
    [Key: string]: T;
}
type V = string | number | boolean;
declare class $$ {
    static set p(a: any);
}

declare const x: {
    DGRAY: {
        background: string;
    };
    MSIZES: {
        [x: string]: obj<any>;
    };
    BORDER1: {
        border: string;
    };
    TRANS25: {
        transition: string;
    };
    SCROLL2: (thumb: any, bg?: any) => {
        [x: string]: obj<any>;
    }[];
    BACKDROP: (blur?: number) => {
        backdropFilter: string;
        webkitBackdropFilter: string;
    };
    MASK: (gradient: string) => {
        mask: string;
        webkitMask: string;
    };
};

declare const c: {
    aliceBlue: string;
    antiqueWhite: string;
    aqua: string;
    aquamarine: string;
    azure: string;
    beige: string;
    bisque: string;
    black: string;
    blanchedAlmond: string;
    blue: string;
    blueViolet: string;
    brown: string;
    burlyWood: string;
    cadetBlue: string;
    chartreuse: string;
    chocolate: string;
    coral: string;
    cornflowerBlue: string;
    cornsilk: string;
    crimson: string;
    cyan: string;
    darkBlue: string;
    darkCyan: string;
    darkGoldenrod: string;
    darkGray: string;
    darkGreen: string;
    darkKhaki: string;
    darkMagenta: string;
    darkOliveGreen: string;
    darkOrange: string;
    darkOrchid: string;
    darkRed: string;
    darkSalmon: string;
    darkSeaGreen: string;
    darkSlateBlue: string;
    darkSlateGray: string;
    darkTurquoise: string;
    darkViolet: string;
    deepPink: string;
    deepSkyBlue: string;
    dimGray: string;
    dodgerBlue: string;
    fireBrick: string;
    floralWhite: string;
    forestGreen: string;
    fuchsia: string;
    gainsboro: string;
    ghostWhite: string;
    gold: string;
    goldenrod: string;
    gray: string;
    green: string;
    greenYellow: string;
    honeyDew: string;
    hotPink: string;
    indianRed: string;
    indigo: string;
    ivory: string;
    khaki: string;
    lavender: string;
    lavenderBlush: string;
    lawnGreen: string;
    lemonChiffon: string;
    lightBlue: string;
    lightCoral: string;
    lightCyan: string;
    lightGoldenrodYellow: string;
    lightGray: string;
    lightGreen: string;
    lightPink: string;
    lightSalmon: string;
    lightSeaGreen: string;
    lightSkyBlue: string;
    lightSlateGray: string;
    lightSteelBlue: string;
    lightYellow: string;
    lime: string;
    limeGreen: string;
    linen: string;
    magenta: string;
    maroon: string;
    mediumAquamarine: string;
    mediumBlue: string;
    mediumOrchid: string;
    mediumPurple: string;
    mediumSeaGreen: string;
    mediumSlateBlue: string;
    mediumSpringGreen: string;
    mediumTurquoise: string;
    mediumVioletRed: string;
    midnightBlue: string;
    mintCream: string;
    mistyRose: string;
    moccasin: string;
    navajoWhite: string;
    navy: string;
    oldLace: string;
    olive: string;
    oliveDrab: string;
    orange: string;
    orangeRed: string;
    orchid: string;
    paleGoldenrod: string;
    paleGreen: string;
    paleTurquoise: string;
    paleVioletRed: string;
    papayaWhip: string;
    peachPuff: string;
    peru: string;
    pink: string;
    plum: string;
    powderBlue: string;
    purple: string;
    rebeccaPurple: string;
    red: string;
    rosyBrown: string;
    royalBlue: string;
    saddleBrown: string;
    salmon: string;
    sandyBrown: string;
    seaGreen: string;
    seaShell: string;
    sienna: string;
    silver: string;
    skyBlue: string;
    slateBlue: string;
    slateGray: string;
    snow: string;
    springGreen: string;
    steelBlue: string;
    tan: string;
    teal: string;
    thistle: string;
    tomato: string;
    turquoise: string;
    violet: string;
    wheat: string;
    white: string;
    whiteSmoke: string;
    yellow: string;
    yellowGreen: string;
    transparent: string;
    color: string;
    rbga: (r?: number, g?: number, b?: number, a?: number) => string;
    rand: () => string | ((r?: number, g?: number, b?: number, a?: number) => string) | any | ((hexCode: string, opacity?: number) => string);
    hex2rbga: (hexCode: string, opacity?: number) => string;
};

interface mtype {
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
declare class media {
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
declare class _vars {
    _var: string;
    k: string;
    _cvar: string;
    _val: media;
    constructor(vr?: obj<RM>);
    __(fallback?: V): string;
    new(val: RM): _vars;
}
type RM = V | media | _vars | RM[];
declare const med: (defValue: RM, g?: mtype) => media;
declare const _var: (vr: obj<RM>) => _vars;

declare class ps {
    static attr(d: obj<string>): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static after(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static before(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static backdrop(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static cue(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static cueRegion(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static firstLetter(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static firstLine(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static marker(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static part(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static placeholder(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static selection(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static slotted(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static spellingError(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static targetText(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransition(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionGroup(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionImagePair(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionNew(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static viewTransitionOld(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbar(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarThumb(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarTrack(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static scrollbarCorner(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static active(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static anyLink(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static autofill(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static blank(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static checked(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static current(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static default(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static defined(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static disabled(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static empty(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static enabled(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static first(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static firstChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static firstOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static fullscreen(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static future(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static focus(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static focusVisible(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static focusWithin(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static host(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static hover(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static indeterminate(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static inRange(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static invalid(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static lastChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static lastOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static left(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static link(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static localLink(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static modal(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static onlyChild(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static onlyOfType(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static optional(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static outOfRange(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static past(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static pictureInPicture(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static placeholderShown(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static paused(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static playing(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static readOnly(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static readWrite(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static required(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static right(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static root(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static scope(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static target(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static targetWithin(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static userInvalid(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static valid(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static visited(xx?: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static dir(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static has(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static host_(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static hostContext(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static is(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static lang(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static not(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthChild(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthCol(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastChild(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastCol(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthLastOfType(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static nthOfType(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static state(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static where(xx: V): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static and(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static child(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static desc(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static next(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static general(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
    static with(str: string): (...itm: (CSSinR | _vars | obj<RM>)[]) => {
        [x: string]: obj<any>;
    };
}

declare class f {
    static attr(...sfs: RM[]): string;
    static blur(...sfs: RM[]): string;
    static brightness(...sfs: RM[]): string;
    static calc(...sfs: RM[]): string;
    static circle(...sfs: RM[]): string;
    static colorMix(...sfs: RM[]): string;
    static conicGradient(...sfs: RM[]): string;
    static contrast(...sfs: RM[]): string;
    static cubicBezier(...sfs: RM[]): string;
    static dropShadow(...sfs: RM[]): string;
    static env(...sfs: RM[]): string;
    static grayscale(...sfs: RM[]): string;
    static hsl(...sfs: RM[]): string;
    static hsla(...sfs: RM[]): string;
    static hueRotate(...sfs: RM[]): string;
    static inset(...sfs: RM[]): string;
    static invert(...sfs: RM[]): string;
    static linearGradient(...sfs: RM[]): string;
    static matrix(...sfs: RM[]): string;
    static matrix3d(...sfs: RM[]): string;
    static max(...sfs: RM[]): string;
    static min(...sfs: RM[]): string;
    static opacity(...sfs: RM[]): string;
    static path(...sfs: RM[]): string;
    static perspective(...sfs: RM[]): string;
    static polygon(...sfs: RM[]): string;
    static radialGradient(...sfs: RM[]): string;
    static repeatingConicFunction(...sfs: RM[]): string;
    static repeatingLinearGradient(...sfs: RM[]): string;
    static repeatingRadialGradient(...sfs: RM[]): string;
    static rgb(...sfs: RM[]): string;
    static rgba(...sfs: RM[]): string;
    static rotate(...sfs: RM[]): string;
    static rotate3d(x: number, y: number, z: number, angle: string): string;
    static rotateX(...sfs: RM[]): string;
    static rotateY(...sfs: RM[]): string;
    static rotateZ(...sfs: RM[]): string;
    static saturate(...sfs: RM[]): string;
    static scale(...sfs: RM[]): string;
    static scale3d(...sfs: RM[]): string;
    static scaleX(...sfs: RM[]): string;
    static scaleY(...sfs: RM[]): string;
    static scaleZ(...sfs: RM[]): string;
    static sepia(...sfs: RM[]): string;
    static skew(...sfs: RM[]): string;
    static skewX(...sfs: RM[]): string;
    static skewY(...sfs: RM[]): string;
    static translate(...sfs: RM[]): string;
    static translate3d(...sfs: RM[]): string;
    static translateX(...sfs: RM[]): string;
    static translateY(...sfs: RM[]): string;
    static translateZ(...sfs: RM[]): string;
    static url(...sfs: RM[]): string;
    static var(st: string, opt?: RM): string;
}

interface xtraCSS {
    src?: string;
    webkitBackdropFilter?: string;
    textFillColor?: string;
    lineClamp?: string;
    webkitTextFillColor?: string;
}
type CSSinR = {
    [P in keyof CSSStyleDeclaration | keyof xtraCSS]?: RM;
};
declare class css {
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
type CSS = obj<CSSinR | CSSinR[]>;

export { $$, type CSS, type CSSinR, _var, c, css, f, med, ps, v, x };
