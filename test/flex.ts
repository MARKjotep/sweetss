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

//

export class cancr extends Medyas<cancr> {
  private flexDirection: string = "row";
  get center() {
    let val = "justifyContent";
    if (this.flexDirection === "row") {
      this._value = {
        alignItems: "center",
      };
    } else {
      this._value = {
        justifyContent: "center",
      };
      val = "alignItems";
    }

    const TH = this;

    return {
      get center(): cancr {
        TH._value = {
          [val]: "center",
        };
        return TH;
      },
      get start(): cancr {
        TH._value = {
          [val]: "flex-start",
        };
        return TH;
      },
      get end(): cancr {
        TH._value = {
          [val]: "flex-end",
        };
        return TH;
      },
    };
  }
  get start() {
    let val = "justifyContent";
    const def = "flex-start";

    if (this.flexDirection === "row") {
      this._value = {
        alignItems: def,
      };
    } else {
      this._value = {
        justifyContent: def,
      };
      val = "alignItems";
    }
    const TH = this;

    return {
      get center(): cancr {
        TH._value = {
          [val]: "center",
        };
        return TH;
      },
      get start(): cancr {
        TH._value = {
          [val]: def,
        };
        return TH;
      },
      get end(): cancr {
        TH._value = {
          [val]: "flex-end",
        };
        return TH;
      },
    };
  }
  get end() {
    let val = "justifyContent";
    const def = "flex-end";

    if (this.flexDirection === "row") {
      this._value = {
        alignItems: def,
      };
    } else {
      this._value = {
        justifyContent: def,
      };
      val = "alignItems";
    }
    const TH = this;

    return {
      get center(): cancr {
        TH._value = {
          [val]: "center",
        };
        return TH;
      },
      get start(): cancr {
        TH._value = {
          [val]: "flex-start",
        };
        return TH;
      },
      get end(): cancr {
        TH._value = {
          [val]: def,
        };
        return TH;
      },
    };
  }
  get column() {
    this.flexDirection = "column";
    this._value = {
      flexDirection: "column",
    };
    return this;
  }
  get row() {
    this.flexDirection = "row";
    this._value = {
      flexDirection: "row",
    };
    return this;
  }
  get shrink() {
    this._value = {
      flexShrink: 1,
    };
    return this;
  }
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
}

export const flex = new cancr();
