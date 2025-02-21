import { CSSinR, CMapper, atCSS } from "../css";
import { $$, isArr, isNum, isNumber, Mapper, obj, oItems } from "../@";
import { ProcSelector } from "./process";
import { CSS, KFCSS } from "..";

type dataType = Mapper<string, Mapper<string, CMapper>>;

class Base {
  pre: string;
  data: Mapper<string, any[]> = new Mapper();
  cid: Mapper<string, string> = new Mapper();
  cidz: Mapper<string, string> = new Mapper();
  animCLS: Mapper<string, Set<string>> = new Mapper();
  DATAX: dataType = new Mapper();
  DATAZ: dataType = new Mapper();
  prefix: string;
  DATA: Mapper<string, CMapper>;
  constructor(
    pre: string,
    prefix: string = "",
    public exportMap: boolean = true,
  ) {
    this.pre = pre;
    this.prefix = prefix ? prefix + "_" : prefix;

    this.DATA = this.exportMap
      ? this.DATAX.init(this.prefix, new Mapper())
      : this.DATAZ.init(this.prefix, new Mapper());
  }
  get(target: any, prop: string): string | undefined {
    const nme = this.pre + prop;
    if (nme in this.data) {
      return nme;
    } else if (prop == "data") {
      return this.data as any;
    } else if (prop == "DATAX") {
      return this.DATAX as any;
    } else if (prop == "DATAZ") {
      return this.DATAZ as any;
    } else if (prop == "cid") {
      return this.cid as any;
    } else if (prop == "cidz") {
      return this.cidz as any;
    } else if (prop == "prefix") {
      return this.prefix as any;
    } else if (prop == "animCLS") {
      return this.animCLS as any;
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
    if (css.DATAX.size) {
      css.DATAX.forEach((dt, prefix) => {
        this.DATAX.init(prefix, new Mapper()).map(dt);
      });
    }
    if (css.DATAZ.size) {
      css.DATAZ.forEach((dt, prefix) => {
        this.DATAZ.init(prefix, new Mapper()).map(dt);
      });
    }

    if (css.animCLS.size) {
      css.animCLS.forEach((e, key) => {
        const KK = this.animCLS.init(key, new Set());
        e.forEach((ee) => {
          KK.add(ee);
        });
      });
    }

    css.data.size && this.data.map(css.data);

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
  constructor(
    pre: string = "",
    prefix: string = "",
    exportMap: boolean = true,
  ) {
    super(pre, prefix, exportMap);
    this.PS = new ProcSelector(this.prefix, this.animCLS);
  }
  set(target: any, prop: string, val: CSSinR | CSSinR[]) {
    const nme = this.pre + prop;
    const VL = isArr(val) ? val : [val];
    VL.forEach((vv) => {
      this.PS.set(nme, vv, this.DATA);
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
  constructor(
    prefix: string = "",
    private webkit: boolean = true,
  ) {
    super("", prefix, false);

    this.PS = new ProcSelector(this.prefix);
  }
  set(target: any, prop: string, val: obj<any>) {
    const nme = this.prefix + prop;
    const VL = isArr(val) ? val : [val];

    const dx: Mapper<string, CMapper> = new Mapper();
    VL.forEach((vv) => {
      oItems(vv).forEach(([x, y]) => {
        let xx = isNumber(x) ? `${x}%` : x;
        this.PS.set(xx, y as CSSinR, dx);
      });
    });
    //
    this.animCLS.init(nme, new Set());

    const kfKEY = `@keyframes ${nme}`;
    this.DATA.set(kfKEY, dx);
    if (this.webkit) {
      const kfKWebkit = `@-webkit-keyframes ${nme}`;
      this.DATA.set(kfKWebkit, dx);
    }

    return true;
  }
  get css(): KFCSS {
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
