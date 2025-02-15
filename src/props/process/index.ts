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
import { med, media } from "../../media";
import { fix_value, join, val_xxx, value } from "../../value";
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
    private anim = new Set<string>(),
  ) {}
  set(name: string, css: CSSinR, data: CMapper) {
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
        props.set(k, this.props(k, valToMedia(v)));
      }
    };

    if (css instanceof _vars) {
      this.saveAnim(css);

      props.ass(css._var, this.props(css._var, valToMedia(css._val)));
    } else {
      oItems(css).forEach(([k, v]) => processProps(k, v));
    }

    data.init(name, props).map(props);
  }

  props(sel: string, prp: media) {
    const isAnim = ["animation", "animationName"].includes(sel);
    oItems(prp).forEach(([mk, mv]) => {
      if (isAnim) {
        prp[mk] = val_xxx(sel, this.addPrefixToAnimation(mv));
      } else {
        prp[mk] = val_xxx(sel, mv);
      }
      //
    });
    return prp;
  }
  // Get the value from variable and add it to the list if it's used as value for animations
  addPrefixToAnimation(val: RM | RM[]) {
    if (val instanceof _vars) {
      this.saveAnim(val);
    } else if (isArr(val)) {
      val[0] = this.addPrefixToAnimation(val[0]);
      return val;
    } else if (isStr(val) && !val.includes("(")) {
      const animations = val.split(", ");
      const modifiedAnimations = animations.map((animation) => {
        const parts = animation.split(" ");
        const name = parts[0];
        const rest = parts.slice(1).join(" "); // Rejoin the duration and easing
        this.anim.add(`${this.prefix}${name}`);
        return `${this.prefix}${name} ${rest}`.trim();
      });
      return modifiedAnimations.join(", ");
    }

    return val;
  }

  saveAnim(val: _vars) {
    getAnim(val).forEach((vv) => {
      this.anim.add(`${this.prefix}${vv}`);
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
