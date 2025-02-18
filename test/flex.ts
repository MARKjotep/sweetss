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

const startEnd = (
  TH: cancr,
  values: [string, string],
  isRow: boolean,
  isReversed: boolean,
  sce: [string, string, string] = ["flex-start", "center", "flex-end"],
) => {
  //
  let prop = "justifyContent";
  if (isRow) {
    TH._value = {
      alignItems: values[0],
    };
  } else {
    if (isReversed) {
      values.reverse();
    }
    TH._value = {
      justifyContent: values[0],
    };
    prop = "alignItems";
  }

  if (isRow && isReversed) {
    sce.reverse();
  }
  return {
    get start(): cancr {
      TH._value = {
        [prop]: sce[0],
      };
      return TH;
    },
    get center(): cancr {
      TH._value = {
        [prop]: sce[1],
      };
      return TH;
    },
    get end(): cancr {
      TH._value = {
        [prop]: sce[2],
      };
      return TH;
    },
  };
};

export class cancr extends Medyas<
  cancr,
  {
    direction: string;
    reversed: boolean;
  }
> {
  private flexDirection: string = "row";
  private isReversed: boolean = false;
  get center() {
    return startEnd(
      this,
      ["center", "center"],
      this.flexDirection === "row",
      this.isReversed,
    );
  }
  get start() {
    return startEnd(
      this,
      ["flex-start", "flex-end"],
      this.flexDirection === "row",
      this.isReversed,
    );
  }
  get end() {
    return startEnd(
      this,
      ["flex-end", "flex-start"],
      this.flexDirection === "row",
      this.isReversed,
    );
  }
  get column() {
    this.data.direction = "column";
    this.data.reversed = false;
    this.flexDirection = "column";
    this.isReversed = false;
    this._value = {
      flexDirection: "column",
    };
    return this;
  }
  get columnReverse() {
    this.data.direction = "column";
    this.data.reversed = true;
    this.flexDirection = "column";
    this.isReversed = true;
    this._value = {
      flexDirection: "column-reverse",
    };
    return this;
  }
  get row() {
    this.flexDirection = "row";
    this.isReversed = false;
    this._value = {
      flexDirection: "row",
    };
    return this;
  }
  get rowReverse() {
    this.flexDirection = "row";
    this.isReversed = true;
    this._value = {
      flexDirection: "row-reverse",
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
