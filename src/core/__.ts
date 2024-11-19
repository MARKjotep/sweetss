export const is = {
  bool: (v: any) => typeof v === "boolean",
  str: (v: any) => typeof v === "string",
  arr: (v: any) => Array.isArray(v),
  obj: (v: any): v is object => typeof v === "object",
  num: (v: any): v is number => typeof v === "number",
  fn: (v: any): v is Function => typeof v === "function",
  number: (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  dict: (val: object) => {
    return typeof val === "object" && val !== null && !Array.isArray(val);
  },
  classOrId(k: string): boolean {
    return k.startsWith(".") || k.startsWith("#");
  },
};

export const gen8 = {
  numSequence: (length: number) => Array.from({ length }, (_, ind) => ind),
};

export const str = {
  charU: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  charL: "abcdefghijklmnopqrstuvwxyz",
  nums: gen8.numSequence(10).join(""),
  rbytes: new RegExp(/(\d+)(\d*)/, "m"),
  strip: (char: string, tostrip: string) =>
    char.replace(new RegExp(`^${tostrip}|${tostrip}$`, "g"), ""),

  buffer(str: string): Buffer {
    return Buffer.from(str);
  },
  ngify: (str: object) => JSON.stringify(str),
  parse(str: string) {
    return JSON.parse(str);
  },
  camel: (_case: string) => {
    if (_case.startsWith("webkit")) {
      _case = "--" + _case;
    }
    return _case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  },
};

export const O = {
  vals: Object.values,
  keys: Object.keys,
  items: Object.entries,
  has: Object.hasOwn,
  define: Object.defineProperty,
  ass: Object.assign,
  length: (ob: Object) => {
    return Object.keys(ob).length;
  },
};



export type V = string | number | boolean;
export interface obj<T> {
  [Key: string]: T;
}
