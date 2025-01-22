import { CSSinR, CMapper, atCSS } from "../css";
import { isArr, Mapper, obj, oItems } from "../@";
import { ProcSelector } from "./process";
import { CSS } from "..";

class Base {
  pre: string;
  data: Mapper<string, any[]> = new Mapper();
  cid: Mapper<string, string> = new Mapper();
  datax: Mapper<string, CMapper> = new Mapper();
  prefix: string;
  constructor(pre: string, prefix: string = "") {
    this.pre = pre;
    this.prefix = prefix ? prefix + "_" : prefix;
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
  set(target: any, prop: string, val: any): boolean {
    return false;
  }
  get css() {
    return new Proxy(this, this);
  }
  load(css: Base) {
    css.datax.size && this.datax.map(css.datax);
    css.data.size && this.data.map(css.data);
    // css.cid.size && this.cid.map(css.cid);
    return this;
  }
}

/*
-------------------------
DOM CLASS ID
-------------------------
*/
export class Cid extends Base {
  PS: ProcSelector;
  constructor(pre: string = "", prefix: string = "") {
    super(pre, prefix);
    this.PS = new ProcSelector(this.cid, this.prefix);
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = isArr(val) ? val : [val];
    VL.forEach((vv) => {
      this.PS.set(nme, vv, this.datax);
    });

    return true;
  }
  get css(): CSS {
    return new Proxy(this, this);
  }
}

/*
-------------------------
@Keyframes
-------------------------
*/

export class Keyframes extends Base {
  PS: ProcSelector;
  constructor(prefix: string = "") {
    super("", prefix);
    this.PS = new ProcSelector(this.cid, this.prefix);
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = prop;
    const VL = isArr(val) ? val : [val];
    const kfKEY = `@keyframes ${nme}`;
    const kfKWebkit = `@-webkit-keyframes ${nme}`;
    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      oItems(vv).forEach(([x, y]) => {
        this.PS.set(x, y as CSSinR, dx);
      });
    });
    this.datax.set(kfKEY, dx);
    this.datax.set(kfKWebkit, dx);
    return true;
  }
  get css(): obj<{ from?: CSSinR; to?: CSSinR; "%"?: CSSinR } | obj<CSSinR>> {
    return new Proxy(this, this);
  }
}

/*
-------------------------
@
-------------------------
*/
export class At extends Base {
  constructor(prefix: string = "") {
    super("@", prefix);
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.pre + prop;
    if (nme in target.data) {
      this.data.get(nme)?.push(val);
    } else {
      this.data.set(nme, [val]);
    }
    return target;
  }
  get css(): {
    import: atCSS;
    charset: atCSS;
  } {
    return new Proxy(this, this);
  }
}

/*
-------------------------
@FontFace
-------------------------
*/
export class FontFace extends Base {
  constructor(prefix: string = "") {
    super("@font-face", prefix);
    this.data.set("@font", []);
  }
  set(target: any, prop: string, val: CSSinR) {
    this.data.get("@font")?.push(val);
    return true;
  }
  get css(): { face: atCSS } {
    return new Proxy(this, this);
  }
}
