import { $$, isClassOrId, isObj, Mapper, oItems } from "../../@";
import { CMapper, CSSinR, RM, val_xxx } from "../../css";
import { med, media } from "../../media";
import { _vars } from "../../var";

const replaceAnim = /\b(_[a-zA-Z]+)\b(?:\s+\d.*)?/g;

const _props = (sel: string, prp: media, prefix: string = "") => {
  const isAnim = ["animation", "animationName"].includes(sel);

  oItems(prp).forEach(([mk, mv]) => {
    if (isAnim) {
      const _mv = mv.replace(
        replaceAnim,
        (match: string) => `${prefix}${match.slice(1)}`,
      );
      prp[mk] = val_xxx(sel, _mv);
    } else {
      prp[mk] = val_xxx(sel, mv);
    }
  });
  return prp;
};

const valToMedia = (val: RM): media => {
  if (val instanceof media) return val;
  if (val instanceof _vars) return med(val.__());
  return med(val);
};

/*
-------------------------
Clas ID KF process
-------------------------
*/

export class ProcSelector {
  constructor(private prefix: string) {}
  set(name: string, css: CSSinR, data: CMapper) {
    if (!isObj(css)) return;

    const props: Mapper<string, media> = new Mapper();

    const Push = (prefix: string) => {
      if (data.has(prefix)) {
        data.get(prefix)?.map(props);
      } else {
        data.set(prefix, props);
      }
    };

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
        props.set(k, _props(k, valToMedia(v), this.prefix));
      }
    };

    if (css instanceof _vars) {
      props.ass(css._var, _props(css._var, valToMedia(css._val), this.prefix));
    } else {
      oItems(css).forEach(([k, v]) => processProps(k, v));
    }

    // const prefixedName = this.prefix ? applyPrefix(name, this.prefix) : name;

    // if classes -- use some to get true if one is true
    // if (this.shaker.length && prefixedName.startsWith(".")) {
    //   const hasC = classes.some(
    //     (s) =>
    //       this.shaker.includes(s) ||
    //       (this.include.length && this.include.includes(s)),
    //   );
    //   if (hasC) {
    //     Push(prefixedName);
    //   }
    // } else {
    // }
    Push(name);
  }
}
