import {
  SweetSS,
  fileName,
  Var,
  v,
  med,
  ps,
  __,
  $$,
  f,
  CSS,
  media,
  Medyas,
  CSSProps,
} from "../src";

class SCB {
  constructor(
    protected TH: Flex,
    protected prop: string,
    protected startEnd: [string, string] = ["flex-start", "flex-end"],
    protected _none: string = "flex-start",
    protected _auto: string = "auto",
  ) {}
  get start(): Flex {
    this.TH._value = {
      [this.prop]: this.startEnd[0],
    };
    return this.TH;
  }
  get center(): Flex {
    this.TH._value = {
      [this.prop]: "center",
    };
    return this.TH;
  }
  get end(): Flex {
    this.TH._value = {
      [this.prop]: this.startEnd[1],
    };
    return this.TH;
  }
  get none(): Flex {
    this.TH._value = {
      [this.prop]: this._none,
    };
    return this.TH;
  }
}

class SPACE extends SCB {
  get around(): Flex {
    this.TH._value = {
      [this.prop]: "space-around",
    };
    return this.TH;
  }
  get between(): Flex {
    this.TH._value = {
      [this.prop]: "space-between",
    };
    return this.TH;
  }
  get even(): Flex {
    this.TH._value = {
      [this.prop]: "space-evenly",
    };
    return this.TH;
  }
}

class STRECHED extends SCB {
  get stretch(): Flex {
    this.TH._value = {
      [this.prop]: "stretch",
    };
    return this.TH;
  }
  get baseline(): Flex {
    this.TH._value = {
      [this.prop]: "baseline",
    };
    return this.TH;
  }
  get auto(): Flex {
    this.TH._value = {
      [this.prop]: this._auto,
    };
    return this.TH;
  }
}

//
const startEnd = (
  TH: Flex,
  value: string,
  prop = "justifyContent",
  sce: [string, string] = ["flex-start", "flex-end"],
) => {
  //
  const { direction, reversed } = TH["data"];

  const isRow = direction === "row";

  if (isRow) {
    TH._value = {
      alignItems: value,
    };
  } else {
    if (reversed) {
      sce.reverse();
    }
    TH._value = {
      alignItems: value,
    };
  }

  if (isRow && reversed) {
    sce.reverse();
  }

  return new SPACE(TH, prop, sce, sce[0]);
};

export class Flex extends Medyas<
  Flex,
  { direction: string; reversed: boolean }
> {
  constructor({
    prefix = "",
    data = {
      direction: "row",
      reversed: false,
    },
    values = {},
  } = {}) {
    super({ prefix, data, values });
    if (!prefix.length) {
      this._value = {
        display: "flex",
      };
    }
  }
  get BASELINE() {
    return startEnd(this, "baseline");
  }
  get STRETCH() {
    return startEnd(this, "stretch");
  }
  get CENTER() {
    return startEnd(this, "center");
  }
  get START() {
    return startEnd(this, "flex-start");
  }
  get END() {
    return startEnd(this, "flex-end");
  }
  //
  get column() {
    this.data.direction = "column";
    this.data.reversed = false;
    this._value = {
      flexDirection: "column",
    };
    return this;
  }
  get columnReverse() {
    this.data.direction = "column";
    this.data.reversed = true;
    this._value = {
      flexDirection: "column-reverse",
    };
    return this;
  }
  get row() {
    this.data.direction = "row";
    this.data.reversed = false;
    this._value = {
      flexDirection: "row",
    };
    return this;
  }
  get rowReverse() {
    this.data.direction = "row";
    this.data.reversed = true;
    this._value = {
      flexDirection: "row-reverse",
    };
    return this;
  }
  //
  get wrap() {
    this._value = {
      flexWrap: "wrap",
    };
    return this;
  }
  get noWrap() {
    this._value = {
      flexWrap: "nowrap",
    };
    return this;
  }
  get wrapReverse() {
    this._value = {
      flexWrap: "wrap-reverse",
    };
    return this;
  }
  //
  get WRAPPED() {
    return new SPACE(
      //
      this,
      "alignContent",
      ["flex-start", "flex-end"],
      "stretch",
    );
  }
  get SELF() {
    return new STRECHED(
      //
      this,
      "alignSelf",
      ["flex-start", "flex-end"],
      "auto",
    );
  }
  //
  shrink(value: number = 1) {
    this._value = {
      flexShrink: value,
    };
    return this;
  }
  grow(value: number = 1) {
    this._value = {
      flexGrow: value,
    };
    return this;
  }
  basis(value: number = 1) {
    this._value = {
      flexBasis: value,
    };
    return this;
  }
  flex(grow: number, shrink: number, basis: string) {
    this._value = {
      flex: [String(grow), String(shrink), basis.toString()],
    };
    return this;
  }
  //
  static get flex() {
    return new Flex();
  }
}
