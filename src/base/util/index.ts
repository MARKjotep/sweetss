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

export type CSS = obj<
  CSSinR | CSSinR[] | { [key: `.${string}` | `#${string}`]: CSSinR | CSSinR[] }
>;

export class Base {
  pre: string;
  data: Mapper<string, any[]> = new Mapper();
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, CMapper> = new Mapper();
  constructor(pre: string) {
    this.pre = pre;
  }
  get(target: any, prop: string): string | undefined {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "datax") {
      return this.datax as any;
    } else if (prop == "cid") {
      return this.cid as any;
    }
    return undefined;
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]): boolean {
    return false;
  }
  get css() {
    return new Proxy(this, this);
  }
}
