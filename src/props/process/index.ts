import { $$, isArr, isClassOrId, isObj, Mapper, oItems } from "../../@";
import { CMapper, CSSinR, RM, tup_rst, val_xxx } from "../../css";
import { med, media } from "../../media";
import { _vars } from "../../var";

const ARRcomma = ["transitionProperty"];

const valToMedia = (sel: string, val: RM): media => {
  if (val instanceof media) return val;
  if (val instanceof _vars) return med(val.__(), {});
  return med(val_xxx(sel, val), {});
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
        props.set(k, this.props(k, valToMedia(k, v)));
      }
    };

    if (css instanceof _vars) {
      props.ass(css._var, this.props(css._var, valToMedia(css._var, css._val)));
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
    });
    return prp;
  }
  addPrefixToAnimation(value: string) {
    const animations = value.split(", ");

    const modifiedAnimations = animations.map((animation) => {
      const parts = animation.split(" ");
      const name = parts[0];
      const rest = parts.slice(1).join(" "); // Rejoin the duration and easing
      this.anim.add(`${this.prefix}${name}`);
      return `${this.prefix}${name} ${rest}`;
    });

    return modifiedAnimations.join(", ");
  }
}
