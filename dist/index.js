// @bun
var Z={important:" !important",visible:"visible",hidden:"hidden",auto:"auto",none:"none",clip:"clip",scroll:"scroll",initial:"initial",inherit:"inherit",flex:"flex",center:"center",flex_start:"flex-start",flex_end:"flex-end",space_evenly:"space-evenly",stretch:"stretch",wrap:"wrap",column:"column",column_reverse:"column-reverse",row:"row",row_reverse:"row-reverse",space_between:"space-between",space_around:"space-around",pr100:"100%",pr50:"50%",i100vh:"100vh",i100vw:"100vw",block:"block",sticky:"sticky",fixed:"fixed",absolute:"absolute",relative:"relative",pointer:"pointer",grabbing:"grabbing",checkbox:"checkbox",solid:"solid",inset:"inset",bold:"bold",currentColor:"currentColor",forwards:"forwards",text:"text",norepeat:"no-repeat",nowrap:"nowrap",difference:"difference",preserve3d:"preserve-3d"};class K{static set p(n){if(Array.isArray(n))console.log(...n);else console.log(n)}}class f extends Map{obj(n){n&&E(n).forEach(([F,t])=>this.set(F,t))}map(n){n.forEach((F,t)=>{this.set(t,F)})}ass(n,F){if(!this.has(n))this.set(n,{});o(this.get(n),F)}}var r0=(n)=>Array.from({length:n},(F,t)=>t);var g0=r0(10).join(""),C0=new RegExp(/(\d+)(\d*)/,"m");var P=(n)=>{return!isNaN(parseFloat(n))&&isFinite(n)};var I=(n)=>{return n.startsWith(".")||n.startsWith("#")};var a=(n)=>typeof n==="string",Y=(n)=>Array.isArray(n),H=(n)=>typeof n==="object";var{values:y,keys:z,entries:E,hasOwn:o0}=Object;var o=Object.assign,m=(n)=>{return Object.keys(n).length};var _=(n)=>JSON.stringify(n),k=(n)=>{return JSON.parse(n)},w=(n)=>{if(n.startsWith("webkit"))n="--"+n;return n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()};var d=(n=6,F)=>{if(!F)return Math.floor(Math.random()*n);return Math.round(Math.random()*(F-n)+n)};var L={aliceBlue:"#F0F8FF",antiqueWhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedAlmond:"#FFEBCD",blue:"#0000FF",blueViolet:"#8A2BE2",brown:"#A52A2A",burlyWood:"#DEB887",cadetBlue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerBlue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkBlue:"#00008B",darkCyan:"#008B8B",darkGoldenrod:"#B8860B",darkGray:"#A9A9A9",darkGreen:"#006400",darkKhaki:"#BDB76B",darkMagenta:"#8B008B",darkOliveGreen:"#556B2F",darkOrange:"#FF8C00",darkOrchid:"#9932CC",darkRed:"#8B0000",darkSalmon:"#E9967A",darkSeaGreen:"#8FBC8B",darkSlateBlue:"#483D8B",darkSlateGray:"#2F4F4F",darkTurquoise:"#00CED1",darkViolet:"#9400D3",deepPink:"#FF1493",deepSkyBlue:"#00BFFF",dimGray:"#696969",dodgerBlue:"#1E90FF",fireBrick:"#B22222",floralWhite:"#FFFAF0",forestGreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostWhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",green:"#008000",greenYellow:"#ADFF2F",honeyDew:"#F0FFF0",hotPink:"#FF69B4",indianRed:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderBlush:"#FFF0F5",lawnGreen:"#7CFC00",lemonChiffon:"#FFFACD",lightBlue:"#ADD8E6",lightCoral:"#F08080",lightCyan:"#E0FFFF",lightGoldenrodYellow:"#FAFAD2",lightGray:"#D3D3D3",lightGreen:"#90EE90",lightPink:"#FFB6C1",lightSalmon:"#FFA07A",lightSeaGreen:"#20B2AA",lightSkyBlue:"#87CEFA",lightSlateGray:"#778899",lightSteelBlue:"#B0C4DE",lightYellow:"#FFFFE0",lime:"#00FF00",limeGreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumAquamarine:"#66CDAA",mediumBlue:"#0000CD",mediumOrchid:"#BA55D3",mediumPurple:"#9370DB",mediumSeaGreen:"#3CB371",mediumSlateBlue:"#7B68EE",mediumSpringGreen:"#00FA9A",mediumTurquoise:"#48D1CC",mediumVioletRed:"#C71585",midnightBlue:"#191970",mintCream:"#F5FFFA",mistyRose:"#FFE4E1",moccasin:"#FFE4B5",navajoWhite:"#FFDEAD",navy:"#000080",oldLace:"#FDF5E6",olive:"#808000",oliveDrab:"#6B8E23",orange:"#FFA500",orangeRed:"#FF4500",orchid:"#DA70D6",paleGoldenrod:"#EEE8AA",paleGreen:"#98FB98",paleTurquoise:"#AFEEEE",paleVioletRed:"#DB7093",papayaWhip:"#FFEFD5",peachPuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderBlue:"#B0E0E6",purple:"#800080",rebeccaPurple:"#663399",red:"#FF0000",rosyBrown:"#BC8F8F",royalBlue:"#4169E1",saddleBrown:"#8B4513",salmon:"#FA8072",sandyBrown:"#F4A460",seaGreen:"#2E8B57",seaShell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyBlue:"#87CEEB",slateBlue:"#6A5ACD",slateGray:"#708090",snow:"#FFFAFA",springGreen:"#00FF7F",steelBlue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whiteSmoke:"#F5F5F5",yellow:"#FFFF00",yellowGreen:"#9ACD32",transparent:"transparent",color:"currentColor",rbga:(n=0,F=0,t=0,i=1)=>{return`rgba(${[n,F,t,i].join(",")})`},rand:()=>{let n=Object.entries(L),F=d(0,n.length-1),t=["transparent","rgba","rand","color","hex2rbga"],[i,$]=n[F];while(t.includes(i)){let l=d(0,n.length-1);[i,$]=n[l]}return $},hex2rbga:(n,F=1)=>{let t=n.replace("#","");if(t.length===3)t=`${t[0]}${t[0]}${t[1]}${t[1]}${t[2]}${t[2]}`;let i=parseInt(t.substring(0,2),16),$=parseInt(t.substring(2,4),16),l=parseInt(t.substring(4,6),16);if(F>1&&F<=100)F=F/100;return`rgba(${i}, ${$}, ${l}, ${F})`}};var i0=["zIndex","opacity","aspectRatio","flexGrow","order","flexShrink","flexBasis","flex","transitionDelay","animationDelay","fillOpacity","lineClamp","webkitLineClamp"];function W(n,F,t={rem:!0,deg:!1}){let{rem:i,deg:$}=t;if(F instanceof b)return F.__();if(Y(F))return F.map((M)=>W(n,M)).join(" ");if(typeof F==="number"){let M=F.toString();if(i&&!i0.includes(n))M+="rem";if($)M+="deg";return M}let l=F.toString();return l.includes("(")?l:`${l}`}function R(n,F=!0,t=!0,i=!1,$=!1){return n.map((M)=>{if(a(M))return $?`'${M}'`:M;if(M instanceof b)return M.__();if(P(M))return`${M}${F?"":i?"deg":"rem"}`;return""}).join(t?", ":" ")}class c{static prop={xs:"@media (width <= 480px)",sm:"@media (width >= 480px)",smd:"@media (width >= 624px)",md:"@media (width >=  768px)",lg:"@media (width >=  1024px)",xl:"@media (width >= 1280px)",xxl:"@media (width >= 1536px)",no_hover:"@media (pointer: coarse)",print:"@media print"};static default="xs";constructor(n,F={}){let t=c.default,i={};if(i[t]=n,!(t in F))F[t]=n;E(F).forEach(([$,l])=>{i[$]=Y(l)?R(l,!1,!1):l}),o(this,i)}static setDefault(n){c.default=n}}class b{_var="";k="";_cvar="";_val={};constructor(n={}){if(m(n)){let[F,t]=E(n)[0];this.k=F,this._var="--"+w(F),this._val=t instanceof c?t:g(t)}}__(n){return`var(${this._var}${n?","+W(this._var,n):""})`}new(n){return new b({[this.k]:n})}}var g=(n,F={})=>new c(n,F),R0=(n)=>new b(n);class J{static attr(...n){return`attr(${R(n)}) `}static blur(...n){return`blur(${R(n,!1,!1,!1)}) `}static brightness(...n){return`brightness(${R(n)}) `}static calc(...n){return`calc(${R(n,!1,!1,!1,!1)}) `}static circle(...n){return`circle(${R(n,!1,!1,!1,!1)}) `}static colorMix(...n){return`color-mix(${R(n)}) `}static conicGradient(...n){return`conic-gradient(${R(n)}) `}static contrast(...n){return`contrast(${R(n)}) `}static cubicBezier(...n){return`cubic-bezier(${R(n)}) `}static dropShadow(...n){return`drop-shadow(${R(n,!1,!1,!1,!1)}) `}static env(...n){return`env(${R(n,!1)}) `}static grayscale(...n){return`grayscale(${R(n)}) `}static hsl(...n){return`hsl(${R(n)}) `}static hsla(...n){return`hsla(${R(n)}) `}static hueRotate(...n){return`hue-rotate(${R(n,!1,!1,!0)}) `}static inset(...n){return`inset(${R(n)}) `}static invert(...n){return`invert(${R(n)}) `}static linearGradient(...n){return`linear-gradient(${R(n)}) `}static matrix(...n){return`matrix(${R(n)}) `}static matrix3d(...n){return`matrix3d(${R(n)}) `}static max(...n){return`max(${R(n,!1)}) `}static min(...n){return`min(${R(n,!1)}) `}static opacity(...n){return`opacity(${R(n)}) `}static path(...n){return`path(${R(n,!0,!0,!1,!0)}) `}static perspective(...n){return`perspective(${R(n,!1,!1,!1,!1)}) `}static polygon(...n){return`polygon(${R(n)}) `}static radialGradient(...n){return`radial-gradient(${R(n)}) `}static repeatingConicFunction(...n){return`repeating-conic-function(${R(n)}) `}static repeatingLinearGradient(...n){return`repeating-linear-gradient(${R(n)}) `}static repeatingRadialGradient(...n){return`repeating-radial-gradient(${R(n)}) `}static rgb(...n){return`rgb(${R(n)}) `}static rgba(...n){return`rgba(${R(n)}) `}static rotate(...n){return`rotate(${R(n,!1,!1,!0)}) `}static rotate3d(n,F,t,i){return`rotate3d(${n},${n},${n},${i}) `}static rotateX(...n){return`rotateX(${R(n,!1,!1,!0)}) `}static rotateY(...n){return`rotateY(${R(n,!1,!1,!0)}) `}static rotateZ(...n){return`rotateZ(${R(n,!1,!1,!0)}) `}static saturate(...n){return`saturate(${R(n)}) `}static scale(...n){return`scale(${R(n)}) `}static scale3d(...n){return`scale3d(${R(n)}) `}static scaleX(...n){return`scaleX(${R(n)}) `}static scaleY(...n){return`scaleY(${R(n)}) `}static scaleZ(...n){return`scaleZ(${R(n)}) `}static sepia(...n){return`sepia(${R(n)}) `}static skew(...n){return`skew(${R(n,!1,!0,!0)}) `}static skewX(...n){return`skewX(${R(n,!1,!1,!0)}) `}static skewY(...n){return`skewY(${R(n,!1,!1,!0)}) `}static translate(...n){return`translate(${R(n,!1,!0)}) `}static translate3d(...n){return`translate3d(${R(n,!1,!1)}) `}static translateX(...n){return`translateX(${R(n,!1,!1)}) `}static translateY(...n){return`translateY(${R(n,!1,!1)}) `}static translateZ(...n){return`translateZ(${R(n,!1,!1)}) `}static url(...n){return`url(${R(n)}) `}static var(n,F=""){n="--"+w(n);let t=F?", "+R([F],!1,!1):"";return`var(${R([n],!1)}${t})`}}function r(n){return function(...F){let t=F.reduce((i,$)=>{if($ instanceof b)i[$._var]=$._val;else if(H($))o(i,$);return i},{});if(n.startsWith("::before")||n.startsWith("::after")){let i=t.content;t.content=i?`"${i}"`:"''"}return{[n]:t}}}class C{static attr(n){let[F,t]=E(n)[0];return r(`[${F}="${t}"]`)}static after(n=""){return r("::after"+n)}static before(n=""){return r("::before"+n)}static backdrop(n=""){return r("::backdrop"+n)}static cue(n=""){return r("::cue"+n)}static cueRegion(n=""){return r("::cue-region"+n)}static firstLetter(n=""){return r("::first-letter"+n)}static firstLine(n=""){return r("::first-line"+n)}static marker(n=""){return r("::marker"+n)}static part(n=""){return r("::part"+n)}static placeholder(n=""){return r("::placeholder"+n)}static selection(n=""){return r("::selection"+n)}static slotted(n=""){return r("::slotted"+n)}static spellingError(n=""){return r("::spelling-error"+n)}static targetText(n=""){return r("::target-text"+n)}static viewTransition(n=""){return r("::view-transition"+n)}static viewTransitionGroup(n=""){return r("::view-transition-group"+n)}static viewTransitionImagePair(n=""){return r("::view-transition-image-pair"+n)}static viewTransitionNew(n=""){return r("::view-transition-new"+n)}static viewTransitionOld(n=""){return r("::view-transition-old"+n)}static scrollbar(n=""){return r("::-webkit-scrollbar"+n)}static scrollbarThumb(n=""){return r("::-webkit-scrollbar-thumb"+n)}static scrollbarTrack(n=""){return r("::-webkit-scrollbar-track"+n)}static scrollbarCorner(n=""){return r("::-webkit-scrollbar-corner"+n)}static active(n=""){return r(":active"+n)}static anyLink(n=""){return r(":any-link"+n)}static autofill(n=""){return r(":autofill"+n)}static blank(n=""){return r(":blank"+n)}static checked(n=""){return r(":checked"+n)}static current(n=""){return r(":current"+n)}static default(n=""){return r(":default"+n)}static defined(n=""){return r(":defined"+n)}static disabled(n=""){return r(":disabled"+n)}static empty(n=""){return r(":empty"+n)}static enabled(n=""){return r(":enabled"+n)}static first(n=""){return r(":first"+n)}static firstChild(n=""){return r(":first-child"+n)}static firstOfType(n=""){return r(":first-of-type"+n)}static fullscreen(n=""){return r(":fullscreen"+n)}static future(n=""){return r(":future"+n)}static focus(n=""){return r(":focus"+n)}static focusVisible(n=""){return r(":focus-visible"+n)}static focusWithin(n=""){return r(":focus-within"+n)}static host(n=""){return r(":host"+n)}static hover(n=""){return r(":hover"+n)}static indeterminate(n=""){return r(":indeterminate"+n)}static inRange(n=""){return r(":in-range"+n)}static invalid(n=""){return r(":invalid"+n)}static lastChild(n=""){return r(":last-child"+n)}static lastOfType(n=""){return r(":last-of-type"+n)}static left(n=""){return r(":left"+n)}static link(n=""){return r(":link"+n)}static localLink(n=""){return r(":local-link"+n)}static modal(n=""){return r(":modal"+n)}static onlyChild(n=""){return r(":only-child"+n)}static onlyOfType(n=""){return r(":only-of-type"+n)}static optional(n=""){return r(":optional"+n)}static outOfRange(n=""){return r(":out-of-range"+n)}static past(n=""){return r(":past"+n)}static pictureInPicture(n=""){return r(":picture-in-picture"+n)}static placeholderShown(n=""){return r(":placeholder-shown"+n)}static paused(n=""){return r(":paused"+n)}static playing(n=""){return r(":playing"+n)}static readOnly(n=""){return r(":read-only"+n)}static readWrite(n=""){return r(":read-write"+n)}static required(n=""){return r(":required"+n)}static right(n=""){return r(":right"+n)}static root(n=""){return r(":root"+n)}static scope(n=""){return r(":scope"+n)}static target(n=""){return r(":target"+n)}static targetWithin(n=""){return r(":target-within"+n)}static userInvalid(n=""){return r(":user-invalid"+n)}static valid(n=""){return r(":valid"+n)}static visited(n=""){return r(":visited"+n)}static dir(n){return r(`:dir(${n})`)}static has(n){return r(`:has(${n})`)}static host_(n){return r(`:host(${n})`)}static hostContext(n){return r(`:host-context(${n})`)}static is(n){return r(`:is(${n})`)}static lang(n){return r(`:lang(${n})`)}static not(n){return r(`:not(${n})`)}static nthChild(n){return r(`:nth-child(${n})`)}static nthCol(n){return r(`:nth-col(${n})`)}static nthLastChild(n){return r(`:nth-last-child(${n})`)}static nthLastCol(n){return r(`:nth-last-col(${n})`)}static nthLastOfType(n){return r(`:nth-last-of-type(${n})`)}static nthOfType(n){return r(`:nth-of-type(${n})`)}static state(n){return r(`:state(${n})`)}static where(n){return r(`:where(${n})`)}static and(n){return r(", "+n)}static child(n){return r(" > "+n)}static desc(n){return r(" "+n)}static next(n){return r(" + "+n)}static general(n){return r(" ~ "+n)}static with(n){if(!(n.startsWith(".")||n.startsWith("#")))throw Error("should start with . or # - class / id");return r(n)}}var a0={DGRAY:{background:"#2f2f2f"},MSIZES:C.after()({position:Z.absolute,right:4.3,top:1.3,content:g("xs",{sm:"sm",smd:"smd",md:"md",lg:"lg",xl:"xl",xxl:"xxl"}),color:L.orange,fontSize:1.5,zIndex:1000,pointerEvents:Z.none}),BORDER1:{border:"1px dashed #80808070"},TRANS25:{transition:"all 0.25s"},SCROLL2:(n,F=Z.inherit)=>[C.scrollbar()({width:g(1,{no_hover:0}),height:g(1,{no_hover:0})}),C.scrollbarTrack()({background:F}),C.scrollbarThumb()({background:n,borderRadius:2,backgroundClip:"content-box",border:"2.5px solid transparent"},C.hover()({border:"1px solid transparent",cursor:Z.grabbing})),C.scrollbarCorner()({background:F})],BACKDROP:(n=0.8)=>{return{backdropFilter:J.blur(n),webkitBackdropFilter:J.blur(n)}},MASK:(n)=>{return{mask:n,webkitMask:n}}};import{readFileSync as B0,writeFileSync as N}from"fs";import{mkdirSync as $0,writeFileSync as l0}from"fs";var U=(n,F="")=>{try{return l0(n,F,{flag:"wx"}),!0}catch(t){return!1}},V=(n)=>{return $0(n,{recursive:!0}),!0};var s=(n,F)=>{return E(F).forEach(([t,i])=>{F[t]=W(n,i)}),F},M0=(n)=>{return n.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").trim()},O=(n,F,t,i,$)=>{if(!H(F))return;let l=new f,M=(D,A)=>{if(D.startsWith(":")||D.startsWith(","))O(n+D,A,t,i,$);else if(D.startsWith(" ")){let q=D.match(/^.*?\w/gm)?.[0].slice(0,-1),X=D.replaceAll(/, /gm,`, ${n}${q}`);O(n+X,A,t,i,$)}else if(I(D))console.log(n+D,A),O(n+D,A,t,i,$);else l.set(D,s(D,v(A)))};if(F instanceof b)l.ass(F._var,s(F._var,v(F._val)));else E(F).forEach(([D,A])=>M(D,A));let{classes:B,ids:u}=A0(n);if([B,u].flat().forEach((D)=>{i.set(D,$+D)}),n=$?D0(n,$):n,t.has(n))t.get(n)?.map(l);else t.set(n,l)};class j{pre;fix;data={};cid=new f;datax=new f;constructor(n="",F=""){this.pre=n;this.fix=F?F+"_":F}set(n,F,t){let i=this.pre+F,$=Y(t)?t:[t];return $.forEach((l)=>{O(i,l,this.datax,this.cid,this.fix)}),this.data[i]=$,!0}get(n,F){let t=this.pre+F;if(t in this.data)return t;else if(F=="data")return this.data;else if(F=="datax")return this.datax;else if(F=="cid")return this.cid;return}get css(){return new Proxy(this,this)}}class S{data={};cid=new f;datax=new f;constructor(){this.data={}}set(n,F,t){let i=F,$=Y(t)?t:[t],l=`@keyframes ${i}`,M=`@-webkit-keyframes ${i}`,B=new f;return $.forEach((u)=>{E(u).forEach(([D,A])=>{O(D,A,B,this.cid,"")})}),this.datax.set(l,B),this.datax.set(M,B),this.data[i]=$,!0}get(n,F){let t=F;if(t in this.data)return t;else if(F=="data")return this.data;else if(F=="datax")return this.datax;return}get css(){return new Proxy(this,this)}}class e{data;pre;constructor(n="@"){this.data={},this.pre=n}set(n,F,t){let i=this.pre+F;if(i in n.data)n.data[i].push(t);else n.data[i]=[t];return n}get(n,F){let t=this.pre+F;if(t in n)return n[t];else if(F=="data")return n.data;return n.data[t]}get css(){return new Proxy(this,this)}}class T{data;pre;constructor(n="@font-face"){this.data=[],this.pre=n}set(n,F,t){return this.data.push(t),!0}get css(){return new Proxy(this,this)}}var D0=(n,F)=>{return n.replaceAll(/\.|\#/g,(t)=>t+F)},v=(n)=>{if(n instanceof c)return n;if(n instanceof b)return g(n.__());return g(n)},A0=(n)=>{let F=($)=>Array.from(n.matchAll($),(l)=>l[1]),t=/\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g,i=/#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g;return{classes:[...new Set(F(t))],ids:[...new Set(F(i))]}},p=(n,F)=>{let t=E(F).map(([i,$])=>`${i}: ${$};`).join(` 
  `);return`${n} {
  ${t}
}`},E0=(n,F)=>{return n==="content"&&!F.includes("(")?`'${F}'`:F},x=(n,F,t)=>{if(!n[F][t])n[F][t]=[]},u0=(n,F,t,i)=>{n[F][t].push(...i.split(",").map(($)=>$.trim()))};class n0{css="";cid={};constructor(){}updateCid(n){n.forEach((F,t)=>{this.cid[t]=F})}processCB(n,F){n.datax.forEach((t,i)=>{t.forEach(($,l)=>{E($).forEach(([M,B])=>{let u=M,D=E0(u,B),A=_({[w(l)]:D});x(F,u,A),u0(F,u,A,i)})})}),this.updateCid(n.cid)}processKF(n,F){n.datax.forEach((t,i)=>{t.forEach(($,l)=>{let M={};$.forEach((B,u)=>{E(B).forEach(([D,A])=>{let G=D;if(!M[G])M[G]={};M[G][u]=A})}),E(M).forEach(([B,u])=>{let D=B;x(F,D,i),F[D][i].push(p(l,u))})})})}processAT(n,F){for(let[t,i]of E(n.data))for(let $ of i){let l=$.includes("(")?$:`"${$}"`;F.push(`${t} ${l.trim()};`)}}processFF(n,F){n.data.forEach((i)=>{let $=E(i).map(([l,M])=>`${w(l)}: ${W(l,M)}`).join(`;
\t`);F.push(`@font-face {
\t${$}
}`)})}load(n){let F=c.prop,t=c.default,i={},$={},l={},M=[];return z(F).forEach((B)=>{i[B]={},$[B]={},l[B]={}}),y(n).forEach((B)=>{if(B instanceof j)this.processCB(B,i);else if(B instanceof S)this.processKF(B,$);else if(B instanceof e)this.processAT(B,M);else if(B instanceof T)this.processFF(B,M)}),E(i).forEach(([B,u])=>{if(!l[B])l[B]={};E(u).forEach(([D,A])=>{let G=A.join(", ");if(!l[B][G])l[B][G]={};o(l[B][G],k(D))})}),E(l).forEach(([B,u])=>{let D=[];if(E(u).forEach(([A,G])=>D.push(p(A,G))),E($[B]).forEach(([A,G])=>{D.push(`${A} {
${G.join(`
`)}
}`)}),D.length)if(M.push(`/* -------------- ${B+(B==t?" ( default )":"")} */`),B==t)M.push(D.join(`
`));else M.push(`${F[B]}\t{
${D.join(`
`)}
}`)}),this.css=M.join(`
`),this}}class G0{dom;id;cx;kf=new S().css;at=new e().css;font=new T().css;save;constructor({name:n,prefix:F}){let t=F??n;this.dom=new j("",t).css,this.id=new j("#",t).css,this.cx=new j(".",t).css,this.save=({path:i,map:$,minify:l})=>{let M=new n0().load(this),B=i.endsWith("/")?"":"/",u=i+B+n+".css";V(i+B),U(u);let D=l?M0(M.css):M.css;if(N(u,D),$??=i){let A=$.endsWith("/")?"":"/",G=$+A+"css.js";V($+A),U(G);let q=B0(G).toString(),X=`export const ${n} = `,F0=JSON.stringify(M.cid),h=X+F0+";";if(q.match(X)){let Q=new RegExp(`${X}.*?};`,"gm"),t0=q.replace(/\n/gm,"").replace(Q,h);N(G,t0)}else{let Q=q+h;N(G,Q)}}}}}export{a0 as x,Z as v,C as ps,g as med,J as f,G0 as css,L as c,R0 as _var,K as $$};
