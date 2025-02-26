import {
  $$,
  isArr,
  isClassOrId,
  isObj,
  isStr,
  Mapper,
  oItems,
  oVals,
} from "../../@";
import { CMapper, CSSinR, RM } from "../../css";
import { med, media, Medyas } from "../../media";
import { val_xxx } from "../../value";
import { _vars } from "../../var";

const valToMedia = (val: RM): media => {
  if (val instanceof media) return val;
  if (val instanceof _vars) return med(val.__(), {});

  return med(val, {});
};

/*
-------------------------
Clas ID KF process
-------------------------
*/

export class ProcSelector {
  constructor(
    private prefix: string,
    private anim: Mapper<string, Set<string>> = new Mapper(),
  ) {}
  set(name: string, css: CSSinR | CSSinR[], data: CMapper) {
    if (!isObj(css)) return;

    const props: Mapper<string, media> = new Mapper();

    const processProps = (k: string, v: any) => {
      if (k.startsWith(":") || k.startsWith(",")) {
        this.set(name + k, v, data);
      } else if (k.startsWith(" ")) {
        const slc = k.match(/^.*?\w/gm);
        const islc = slc?.[0].slice(0, -1);
        const lk = k.replaceAll(/, /gm, `, ${name}${islc}`);
        this.set(name + lk, v, data);
      } else if (isClassOrId(k)) {
        this.set(name + k, v, data);
      } else {
        props.set(k, this.props(name, k, valToMedia(v)));
      }
    };

    if (css instanceof _vars) {
      this.saveAnim(name, css);
      props.ass(css._var, this.props(name, css._var, valToMedia(css._val)));
    } else if (css instanceof Medyas) {
      oItems(css["_values"]).forEach(([k, v]) => {
        props.set(k, this.props(name, k, valToMedia(v)));
      });
    } else if (isArr(css)) {
      css.forEach((cc) => {
        this.set(name, cc, data);
      });
    } else {
      oItems(css).forEach(([k, v]) => processProps(k, v));
    }

    data.init(name, props).map(props);
  }

  props(selector: string, sel: string, prp: media) {
    const isAnim = ["animation", "animationName"].includes(sel);
    oItems(prp).forEach(([mk, mv]) => {
      if (isAnim) {
        prp[mk] = val_xxx(sel, this.addPrefixToAnimation(selector, mv));
      } else {
        prp[mk] = val_xxx(sel, mv);
      }
      //
    });
    return prp;
  }
  // Get the value from variable and add it to the list if it's used as value for animations
  addPrefixToAnimation(sel: string, val: RM | RM[]) {
    if (val instanceof _vars) {
      this.saveAnim(sel, val);
    } else if (isArr(val)) {
      val[0] = this.addPrefixToAnimation(sel, val[0]);
      return val;
    } else if (isStr(val) && !val.includes("(")) {
      const animations = val.split(", ");
      const modifiedAnimations = animations.map((animation) => {
        const parts = animation.split(" ");
        const name = parts[0];
        const rest = parts.slice(1).join(" "); // Rejoin the duration and easing
        const pname = `${this.prefix}${name}`;
        this.anim.init(pname, new Set()).add(sel);
        return `${this.prefix}${name} ${rest}`.trim();
      });
      return modifiedAnimations.join(", ");
    }

    return val;
  }

  saveAnim(sel: string, val: _vars) {
    getAnim(val).forEach((vv) => {
      this.anim.init(`${this.prefix}${vv}`, new Set()).add(sel);
    });
  }
}

const getAnim = (val: RM | RM[], an: string[] = []) => {
  const _an: string[] = [];
  //
  if (isArr(val)) {
    return getAnim(val[0], _an);
  }
  if (val instanceof _vars) {
    return getAnim(oVals(val._val), _an);
  }

  _an.push(String(val));

  return _an;
};
