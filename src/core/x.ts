import { med } from "..";
import { c } from "./colors";
import { f } from "./f";
import { ps } from "./ps";
import { v } from "./v";

/*
-------------------------

-------------------------
*/
export const x = {
  DGRAY: {
    background: "#2f2f2f",
  },
  MSIZES: ps.after()({
    position: v.absolute,
    right: 4.3,
    top: 1.3,
    content: med("xs", {
      sm: "sm",
      smd: "smd",
      md: "md",
      lg: "lg",
      xl: "xl",
      xxl: "xxl",
    }),
    color: c.orange,
    fontSize: 1.5,
    zIndex: 1000,
    pointerEvents: v.none,
  }),
  BORDER1: {
    border: "1px dashed #80808070",
  },
  TRANS25: { transition: "all 0.25s" },
  SCROLL2: (thumb: any, bg: any = v.inherit) => [
    ps.scrollbar()({
      width: med(1, { no_hover: 0 }),
      height: med(1, { no_hover: 0 }),
    }),
    ps.scrollbarTrack()({
      background: bg,
    }),
    ps.scrollbarThumb()(
      {
        background: thumb,
        borderRadius: 2,
        backgroundClip: "content-box",
        border: "2.5px solid transparent",
      },
      ps.hover()({
        border: "1px solid transparent",
        cursor: v.grabbing,
      }),
    ),
    ps.scrollbarCorner()({
      background: bg,
    }),
  ],
  BACKDROP: (blur = 0.8) => {
    return {
      backdropFilter: f.blur(blur),
      webkitBackdropFilter: f.blur(blur),
    };
  },
  MASK: (gradient: string) => {
    return {
      mask: gradient,
      webkitMask: gradient,
    };
  },
};
