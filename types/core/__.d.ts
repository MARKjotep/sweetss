export declare const is: {
    bool: (v: any) => v is boolean;
    str: (v: any) => v is string;
    arr: (v: any) => v is any[];
    obj: (v: any) => v is object;
    num: (v: any) => v is number;
    fn: (v: any) => v is Function;
    number: (value: any) => boolean;
    dict: (val: object) => boolean;
    classOrId(k: string): boolean;
};
export declare const gen8: {
    numSequence: (length: number) => number[];
};
export declare const str: {
    charU: string;
    charL: string;
    nums: string;
    rbytes: RegExp;
    strip: (char: string, tostrip: string) => string;
    buffer(str: string): Buffer;
    ngify: (str: object) => string;
    parse(str: string): any;
    camel: (_case: string) => string;
};
export declare const O: {
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
    define: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
    ass: {
        <T extends {}, U>(target: T, source: U): T & U;
        <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
        <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
        (target: object, ...sources: any[]): any;
    };
    length: (ob: Object) => number;
};
export type V = string | number | boolean;
export interface obj<T> {
    [Key: string]: T;
}
