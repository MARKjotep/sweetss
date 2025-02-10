// @bun
import{readFileSync as k0,writeFileSync as Ut}from"fs";var j=(t)=>{return!isNaN(parseFloat(t))&&isFinite(t)};var Dt=(t)=>{return t.startsWith(".")||t.startsWith("#")};var I=(t)=>typeof t==="string",C=(t)=>Array.isArray(t),V=(t)=>typeof t==="object";var Et=(t)=>{return Number.isInteger(Number(t))};class ft{static set p(t){if(Array.isArray(t))console.log(...t);else console.log(t)}}class tt{_c=0;_id="";constructor(t){if(this._c=0,this._id=t??d(5),t?.includes("-")){let[n,r]=[t.split("-").slice(0,-1).join("-"),t.split("-").slice(-1)[0]];this._id=n,this._c=j(r)?parseInt(r):0}}get id(){return this._id+"-"+this._c}get mid(){return this._id+"-"+ ++this._c}}var Gn=new RegExp(/(\d+)(\d*)/,"m"),Ht=(t)=>Array.from({length:t},(n,r)=>r),Lt="ABCDEFGHIJKLMNOPQRSTUVWXYZ",Ot="abcdefghijklmnopqrstuvwxyz",jt=Ht(10).join("");var H=(t)=>JSON.stringify(t),a=(t)=>{return JSON.parse(t)},b=(t)=>{if(t.startsWith("webkit"))t="-"+t;return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},d=(t)=>{let n=Lt+Ot;return Array.from({length:t},(r,F)=>n+(F?jt:"")).reduce((r,F)=>{return r+=F.charAt(Math.floor(Math.random()*F.length))},"")},nt=(t=6,n)=>{if(!n)return Math.floor(Math.random()*t);return Math.round(Math.random()*(n-t)+t)};class G extends Map{obj(t){t&&f(t).forEach(([n,r])=>this.set(n,r))}map(t){t.forEach((n,r)=>{if(n instanceof G)this.set(r,n);else if(C(n)){if(this.lacks(r))this.set(r,[]);this.get(r).push(...n)}else if(V(n))this.ass(r,n);else this.set(r,n)})}ass(t,n){if(!this.has(t))this.set(t,{});Y(this.get(t),n)}lacks(t){return!this.has(t)}init(t,n){return this.has(t)?this.get(t):this.set(t,n).get(t)}}var{values:P,keys:K,entries:f,fromEntries:gt,hasOwn:Vt}=Object;var Y=Object.assign,k=(t)=>{return Object.keys(t).length};var L=(t,n)=>{return{name:t,content:n}},Kt=(t,n)=>{return{property:t,content:n}},zt=(t,n)=>{return{"http-equiv":t,content:n}};class rt{metas=[];constructor(t){t&&this.metas.push(L("description",t))}author(t){return this.meta=L("author",t),this}charset(t){return this.meta={charset:t},this}keywords(...t){return this.meta=L("keywords",t.join(", ")),this}viewport(t){let n=f(t).map(([r,F])=>[b(r),String(F)].join("="));return this.meta=L("viewport",n.join(", ")),this}httpEquiv(t){return f(t).forEach(([n,r])=>{this.meta=zt(b(n),String(r))}),this}robots(...t){return this.meta=L("robots",t.join(", ")),this}themeColor(t){return this.meta=L("theme-color",t),this}openGraph(t){return f(t).forEach(([n,r])=>{this.meta=Kt("og:"+n,String(r))}),this}twitter(t){return f(t).forEach(([n,r])=>{this.meta=L("twitter:"+n,String(r))}),this}and(t){return this}set meta(t){this.metas.push(t)}}var It=["charset","name","property","http-equiv"],ut=(t,n)=>{n.forEach((r)=>{for(let F of It)if(F in r){let B=r[F];t[`${F}_${F==="charset"?"":B}`]=r}})},Pt=(t,n)=>{n.forEach((r)=>{if("href"in r){let F=r.href;t[`${F}`]=r}})};class Gt{_head;idm;constructor(t){this._head=new G(t)}set head(t){f(t).forEach(([n,r])=>{if(n==="title"||n==="base"){if(r!==void 0)this._head.set(n,r);return}if(r instanceof rt)return ut(this._head.init("meta",{}),r.metas);if(!C(r))return;switch(n){case"meta":return ut(this._head.init("meta",{}),r);case"link":return Pt(this._head.init("link",{}),r);case"script":if(r.length){this._head.init(n,[]);let F=r.map((B)=>{if(!B.yid&&this.idm)B.yid="sc"+this.idm.mid;return B});this._head.get(n).push(...F)}return}})}get head(){return this._head}set id(t){this.idm=new tt(t)}}class Nt{lang="en";htmlHead=new G;head;constructor(){this.head=(t={})=>{let n=new Gt(this.htmlHead);n.head=t,this.htmlHead=n.head}}}var Ct=(t,n=!1)=>{if(j(t))return[+t,Et(t)?"int":"float"];if(n&&/\.\w+$/.test(t))return[t,"file"];if(t==="/")return[t,"-"];if(t.length===36&&t.match(/\-/g)?.length===4)return[t,"uuid"];return[t,"string"]},Ft=(t)=>{let n=t.startsWith("/")?t:"/"+t,r=n.match(/(?<=\/)[^/].*?(?=\/|$)/g)??["/"],[F,B]=r.reduce(([$,R],M)=>{if(M.includes("<")){let E=M.match(/(?<=<)[^/].*?(?=>|$)/g);if(E?.length){let[D,g]=E[0].split(":");if(D&&g)$.push(D),R.push(g)}}else $.push(M===">"?"/":M);return[$,R]},[[],[]]);if(n.endsWith("/")&&n.length>1)F.push("/");return{parsed:F,args:B}};class s{storage=new G;cache(t,n){if(this.storage.lacks(t))this.storage.set(t,n());return this.storage.get(t)}}var St=["int","float","file","uuid","string"],yt=new s;class At{_storage=new G;set(t){let{parsed:n,path:r}=t,F=H(n);if(!this._storage.get(F))this._storage.set(F,t);else throw`path: ${r} already used.`}get(t){let{parsed:n}=yt.cache(t,()=>Ft(t)),r={},F=this._storage.get(H(n));if(!F&&t!=="/")for(let B of this._storage.keys()){let $=[],R=a(B);if(n.length===R.length){let M=R.map((g,u)=>{let A=Ct(n[u],n.length-1===u);if(g===A[0])return A[0];if(St.includes(A[1]))return $.push(A[0]),A[1];return g}),E=H(M);if(this._storage.has(E)){F=this._storage.get(E),F?.args.forEach((g,u)=>{r[g]=$[u]});break}}}return[F,r]}}import{mkdirSync as ht,writeFileSync as lt,existsSync as bt}from"fs";var v=(t,n="")=>{if(bt(t))return!0;return lt(t,n,{flag:"wx"}),!0},e=(t)=>{if(bt(t))return!0;return ht(t,{recursive:!0}),!0};class w{static default="xs";static prop={xs:"@media (width <= 480px)",sm:"@media (width >= 480px)",smd:"@media (width >= 624px)",md:"@media (width >=  768px)",lg:"@media (width >=  1024px)",xl:"@media (width >= 1280px)",xxl:"@media (width >= 1536px)",no_hover:"@media (pointer: coarse)",print:"@media print",screen:"@media screen",dark:"@media (prefers-color-scheme: dark)"};constructor(t,n={}){let r=w.default,F={};if(F[r]=t,!(r in n))n[r]=t;f(n).forEach(([B,$])=>{F[B]=C($)?o($,!1,!1):$}),Y(this,F)}static new(t){f(t).forEach(([n,r])=>{if(!this.prop[n])this.prop[n]=`@media (${r})`})}}var X=(t,n={})=>new w(t,n);class J{_var="";k="";_cvar="";_val={};constructor(t={}){if(k(t)){let[n,r]=f(t)[0];this.k=n,this._var="--"+b(n),this._val=r instanceof w?r:X(r)}}__(t){return`var(${this._var}${t?","+Z(this._var,t):""})`}new(t){return new J({[this.k]:t})}}var ct=(t)=>new J(t);var _t=/\b(_[a-zA-Z]+)\b(?:\s+\d.*)?/g,Yt=(t,n,r="")=>{let F=["animation","animationName"].includes(t);return f(n).forEach(([B,$])=>{if(F){let R=$.replace(_t,(M)=>`${r}${M.slice(1)}`);n[B]=Z(t,R)}else n[B]=Z(t,$)}),n},wt=(t)=>{if(t instanceof w)return t;if(t instanceof J)return X(t.__());return X(t)},mt=(t)=>{let n=(B)=>Array.from(t.matchAll(B),($)=>$[1]),r=/\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g,F=/#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g;return{classes:[...new Set(n(r))],ids:[...new Set(n(F))]}},dt=(t,n)=>{return t.replaceAll(/\.|\#/g,(r)=>r+n)};class p{cid;prefix;shaker;include;constructor(t,n,r=[],F=[]){this.cid=t;this.prefix=n;this.shaker=r;this.include=F}set(t,n,r){if(!V(n))return;let F=new G,B=(D)=>{if(r.has(D))r.get(D)?.map(F);else r.set(D,F)},$=(D,g)=>{if(D.startsWith(":")||D.startsWith(","))this.set(t+D,g,r);else if(D.startsWith(" ")){let A=D.match(/^.*?\w/gm)?.[0].slice(0,-1),q=D.replaceAll(/, /gm,`, ${t}${A}`);this.set(t+q,g,r)}else if(Dt(D))this.set(t+D,g,r);else F.set(D,Yt(D,wt(g),this.prefix))};if(n instanceof J)F.ass(n._var,Yt(n._var,wt(n._val),this.prefix));else f(n).forEach(([D,g])=>$(D,g));let{classes:R,ids:M}=mt(t);[R,M].flat().forEach((D)=>{this.cid.set(D,this.prefix+D)});let E=this.prefix?dt(t,this.prefix):t;if(this.shaker.length&&E.startsWith(".")){if(R.some((g)=>this.shaker.includes(g)||this.include.length&&this.include.includes(g)))B(E)}else B(E)}}class N{pre;data=new G;cid=new G;datax=new G;prefix;constructor(t,n=""){this.pre=t,this.prefix=n?n+"_":n}get(t,n){let r=this.pre+n;if(r in this.data)return r;else if(n=="data")return this.data;else if(n=="datax")return this.datax;else if(n=="cid")return this.cid;return}set(t,n,r){return!1}get css(){return new Proxy(this,this)}load(t){return t.datax.size&&this.datax.map(t.datax),t.data.size&&this.data.map(t.data),this}}class O extends N{PS;constructor(t="",n="",r=[],F=[]){super(t,n);this.PS=new p(this.cid,this.prefix,r,F)}set(t,n,r){let F=this.pre+n;return(C(r)?r:[r]).forEach(($)=>{this.PS.set(F,$,this.datax)}),!0}get css(){return new Proxy(this,this)}}class S extends N{PS;constructor(t=""){super("",t);this.PS=new p(this.cid,this.prefix)}set(t,n,r){let F=this.prefix+n,B=C(r)?r:[r],$=`@keyframes ${F}`,R=`@-webkit-keyframes ${F}`,M=new G;return B.forEach((E)=>{f(E).forEach(([D,g])=>{this.PS.set(D,g,M)})}),this.datax.set($,M),this.datax.set(R,M),!0}get css(){return new Proxy(this,this)}}class y extends N{constructor(t=""){super("@",t)}set(t,n,r){let F=this.pre+n;if(F in t.data)this.data.get(F)?.push(r);else this.data.set(F,[r]);return t}get css(){return new Proxy(this,this)}}class h extends N{constructor(t=""){super("@font-face",t);this.data.set("@font",[])}set(t,n,r){return this.data.get("@font")?.push(r),!0}get css(){return new Proxy(this,this)}}var at=(t,n)=>{return t==="content"&&!n.includes("(")?`'${n}'`:n},kt=(t,n,r,F)=>{t[n][r].push(...F.split(",").map((B)=>B.trim()))},it=(t,n)=>{let r=f(n).map(([F,B])=>`${F}: ${B};`).join(` 
  `);return`${t} {
  ${r}
}`};function Jt(t,n){return t.datax.forEach((r,F)=>{r.forEach((B,$)=>{f(B).forEach(([R,M])=>{let E=R,D=at(E,M),g=H({[b($)]:D});$t(n,E,g),kt(n,E,g,F)})})}),t}function Xt(t,n){t.datax.forEach((r,F)=>{r.forEach((B,$)=>{let R={};B.forEach((M,E)=>{f(M).forEach(([D,g])=>{let u=D;if(!R[u])R[u]={};R[u][b(E)]=g})}),f(R).forEach(([M,E])=>{let D=M;$t(n,D,F),n[D][F].push(it($,E))})})})}function qt(t,n){for(let[r,F]of t.data)for(let B of F){let $=B.includes("(")?B:`"${B}"`;n.push(`${r} ${$.trim()};`)}}function Zt(t,n){t.data.get("@font")?.forEach((F)=>{let B=f(F).map(([$,R])=>`${b($)}: ${Z($,R)}`).join(`;
	`);n.push(`@font-face {
	${B}
}`)})}var Tt=["transitionDuration","transitionDelay","animationDelay","animationDuration"],st=[...Tt,"zIndex","opacity","aspectRatio","flexGrow","order","flexShrink","flexBasis","flex","fillOpacity","lineClamp","webkitLineClamp"];function Z(t,n,r={rem:!0,deg:!1}){let{rem:F,deg:B}=r;if(n instanceof J)return n.__();if(C(n))return n.map((R)=>Z(t,R)).join(" ");if(typeof n==="number"){let R=n.toString();if(F&&!st.includes(t))R+="rem";if(Tt.includes(t))R+="s";if(B)R+="deg";return R}let $=n.toString();return $.includes("(")?$:`${$}`}function o(t,n=!0,r=!0,F=!1,B=!1){return t.map((R)=>{if(C(R))return o(R,n,!1,F,B);if(I(R))return B?`'${R}'`:R;if(R instanceof J)return R.__();if(j(R))return`${R}${n?"":F?"deg":"rem"}`;return""}).join(r?", ":" ")}var $t=(t,n,r)=>{try{if(!t[n][r])t[n][r]=[]}catch(F){console.error(`property "${n}" not found!`)}};class Bt{css="";cid={};constructor(){}updateCid(t){t.forEach((n,r)=>{this.cid[r]=n})}load(t){let n=w.prop,r=w.default,F={},B={},$={},R=[];return K(n).forEach((M)=>{F[M]={},B[M]={},$[M]={}}),P(t).forEach((M)=>{if(M instanceof O){let E=Jt(M,F);this.updateCid(E.cid)}else if(M instanceof S)Xt(M,B);else if(M instanceof y)qt(M,R);else if(M instanceof h)Zt(M,R)}),f(F).forEach(([M,E])=>{if(!$[M])$[M]={};f(E).forEach(([D,g])=>{let u=g.join(", ");if(!$[M][u])$[M][u]={};Y($[M][u],a(D))})}),f($).forEach(([M,E])=>{let D=[];if(f(E).forEach(([g,u])=>D.push(it(g,u))),f(B[M]).forEach(([g,u])=>{D.push(`${g} {
${u.join(`
`)}
}`)}),D.length)if(R.push(`/* -------------- ${M+(M==r?" ( default )":"")} */`),M==r)R.push(D.join(`
`));else R.push(`${n[M]}	{
${D.join(`
`)}
}`)}),this.css=R.join(`
`),this}}var l={important:" !important",visible:"visible",hidden:"hidden",auto:"auto",none:"none",clip:"clip",scroll:"scroll",initial:"initial",inherit:"inherit",flex:"flex",center:"center",flex_start:"flex-start",flex_end:"flex-end",space_evenly:"space-evenly",stretch:"stretch",wrap:"wrap",column:"column",column_reverse:"column-reverse",row:"row",row_reverse:"row-reverse",space_between:"space-between",space_around:"space-around",pr100:"100%",pr50:"50%",i100vh:"100vh",i100vw:"100vw",block:"block",sticky:"sticky",fixed:"fixed",absolute:"absolute",relative:"relative",pointer:"pointer",grabbing:"grabbing",checkbox:"checkbox",solid:"solid",inset:"inset",bold:"bold",currentColor:"currentColor",forwards:"forwards",text:"text",norepeat:"no-repeat",nowrap:"nowrap",difference:"difference",preserve3d:"preserve-3d"};var Rt={aliceBlue:"#F0F8FF",antiqueWhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedAlmond:"#FFEBCD",blue:"#0000FF",blueViolet:"#8A2BE2",brown:"#A52A2A",burlyWood:"#DEB887",cadetBlue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerBlue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkBlue:"#00008B",darkCyan:"#008B8B",darkGoldenrod:"#B8860B",darkGray:"#A9A9A9",darkGreen:"#006400",darkKhaki:"#BDB76B",darkMagenta:"#8B008B",darkOliveGreen:"#556B2F",darkOrange:"#FF8C00",darkOrchid:"#9932CC",darkRed:"#8B0000",darkSalmon:"#E9967A",darkSeaGreen:"#8FBC8B",darkSlateBlue:"#483D8B",darkSlateGray:"#2F4F4F",darkTurquoise:"#00CED1",darkViolet:"#9400D3",deepPink:"#FF1493",deepSkyBlue:"#00BFFF",dimGray:"#696969",dodgerBlue:"#1E90FF",fireBrick:"#B22222",floralWhite:"#FFFAF0",forestGreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostWhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",green:"#008000",greenYellow:"#ADFF2F",honeyDew:"#F0FFF0",hotPink:"#FF69B4",indianRed:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderBlush:"#FFF0F5",lawnGreen:"#7CFC00",lemonChiffon:"#FFFACD",lightBlue:"#ADD8E6",lightCoral:"#F08080",lightCyan:"#E0FFFF",lightGoldenrodYellow:"#FAFAD2",lightGray:"#D3D3D3",lightGreen:"#90EE90",lightPink:"#FFB6C1",lightSalmon:"#FFA07A",lightSeaGreen:"#20B2AA",lightSkyBlue:"#87CEFA",lightSlateGray:"#778899",lightSteelBlue:"#B0C4DE",lightYellow:"#FFFFE0",lime:"#00FF00",limeGreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumAquamarine:"#66CDAA",mediumBlue:"#0000CD",mediumOrchid:"#BA55D3",mediumPurple:"#9370DB",mediumSeaGreen:"#3CB371",mediumSlateBlue:"#7B68EE",mediumSpringGreen:"#00FA9A",mediumTurquoise:"#48D1CC",mediumVioletRed:"#C71585",midnightBlue:"#191970",mintCream:"#F5FFFA",mistyRose:"#FFE4E1",moccasin:"#FFE4B5",navajoWhite:"#FFDEAD",navy:"#000080",oldLace:"#FDF5E6",olive:"#808000",oliveDrab:"#6B8E23",orange:"#FFA500",orangeRed:"#FF4500",orchid:"#DA70D6",paleGoldenrod:"#EEE8AA",paleGreen:"#98FB98",paleTurquoise:"#AFEEEE",paleVioletRed:"#DB7093",papayaWhip:"#FFEFD5",peachPuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderBlue:"#B0E0E6",purple:"#800080",rebeccaPurple:"#663399",red:"#FF0000",rosyBrown:"#BC8F8F",royalBlue:"#4169E1",saddleBrown:"#8B4513",salmon:"#FA8072",sandyBrown:"#F4A460",seaGreen:"#2E8B57",seaShell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyBlue:"#87CEEB",slateBlue:"#6A5ACD",slateGray:"#708090",snow:"#FFFAFA",springGreen:"#00FF7F",steelBlue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whiteSmoke:"#F5F5F5",yellow:"#FFFF00",yellowGreen:"#9ACD32",transparent:"transparent",color:"currentColor",rbga:(t=0,n=0,r=0,F=1)=>{return`rgba(${[t,n,r,F].join(",")})`},rand:()=>{let t=Object.entries(Rt),n=nt(0,t.length-1),r=["transparent","rgba","rand","color","hex2rbga"],[F,B]=t[n];while(r.includes(F)){let $=nt(0,t.length-1);[F,B]=t[$]}return B},hex2rbga:(t,n=1)=>{let r=t.replace("#","");if(r.length===3)r=`${r[0]}${r[0]}${r[1]}${r[1]}${r[2]}${r[2]}`;let F=parseInt(r.substring(0,2),16),B=parseInt(r.substring(2,4),16),$=parseInt(r.substring(4,6),16);if(n>1&&n<=100)n=n/100;return`rgba(${F}, ${B}, ${$}, ${n})`}};class x{static attr(...t){return`attr(${o(t)})`}static blur(...t){return`blur(${o(t,!1,!1,!1)})`}static brightness(...t){return`brightness(${o(t)})`}static calc(...t){return`calc(${o(t,!1,!1,!1,!1)})`}static circle(...t){return`circle(${o(t,!1,!1,!1,!1)})`}static colorMix(...t){return`color-mix(${o(t)})`}static conicGradient(...t){return`conic-gradient(${o(t)})`}static contrast(...t){return`contrast(${o(t)})`}static cubicBezier(...t){return`cubic-bezier(${o(t)})`}static dropShadow(...t){return`drop-shadow(${o(t,!1,!1,!1,!1)})`}static env(...t){return`env(${o(t,!1)})`}static grayscale(...t){return`grayscale(${o(t)})`}static hsl(...t){return`hsl(${o(t)})`}static hsla(...t){return`hsla(${o(t)})`}static hueRotate(...t){return`hue-rotate(${o(t,!1,!1,!0)})`}static inset(...t){return`inset(${o(t)})`}static invert(...t){return`invert(${o(t)})`}static linearGradient(...t){return`linear-gradient(${o(t)})`}static matrix(...t){return`matrix(${o(t)})`}static matrix3d(...t){return`matrix3d(${o(t)})`}static max(...t){return`max(${o(t,!1)})`}static min(...t){return`min(${o(t,!1)})`}static opacity(...t){return`opacity(${o(t)})`}static path(...t){return`path(${o(t,!0,!0,!1,!0)})`}static perspective(...t){return`perspective(${o(t,!1,!1,!1,!1)})`}static polygon(...t){return`polygon(${o(t)})`}static radialGradient(...t){return`radial-gradient(${o(t)})`}static repeatingConicFunction(...t){return`repeating-conic-function(${o(t)})`}static repeatingLinearGradient(...t){return`repeating-linear-gradient(${o(t)})`}static repeatingRadialGradient(...t){return`repeating-radial-gradient(${o(t)})`}static rgb(...t){return`rgb(${o(t)})`}static rgba(...t){return`rgba(${o(t)})`}static rotate(...t){return`rotate(${o(t,!1,!1,!0)})`}static rotate3d(t,n,r,F){return`rotate3d(${t},${t},${t},${F})`}static rotateX(...t){return`rotateX(${o(t,!1,!1,!0)})`}static rotateY(...t){return`rotateY(${o(t,!1,!1,!0)})`}static rotateZ(...t){return`rotateZ(${o(t,!1,!1,!0)})`}static saturate(...t){return`saturate(${o(t)})`}static scale(...t){return`scale(${o(t)})`}static scale3d(...t){return`scale3d(${o(t)})`}static scaleX(...t){return`scaleX(${o(t)})`}static scaleY(...t){return`scaleY(${o(t)})`}static scaleZ(...t){return`scaleZ(${o(t)})`}static sepia(...t){return`sepia(${o(t)})`}static skew(...t){return`skew(${o(t,!1,!0,!0)})`}static skewX(...t){return`skewX(${o(t,!1,!1,!0)})`}static skewY(...t){return`skewY(${o(t,!1,!1,!0)})`}static translate(...t){return`translate(${o(t,!1,!0)})`}static translate3d(...t){return`translate3d(${o(t,!1,!1)})`}static translateX(...t){return`translateX(${o(t,!1,!1)})`}static translateY(...t){return`translateY(${o(t,!1,!1)})`}static translateZ(...t){return`translateZ(${o(t,!1,!1)})`}static url(...t){return`url(${o(t)})`}static var(t,n=""){t="--"+b(t);let r=n?", "+o([n],!1,!1):"";return`var(${o([t],!1)}${r})`}}function i(t){return function(...n){let r=n.reduce((F,B)=>{if(B instanceof J)F[B._var]=B._val;else if(V(B))Y(F,B);return F},{});if(t.startsWith("::before")||t.startsWith("::after")){let F=r.content;if(I(F))F=F.includes("(")?F:`"${F}"`;r.content=F?F:"''"}return{[t]:r}}}class T{static attr(t){let[n,r]=f(t)[0];return i(`[${n}="${r}"]`)}static after(t=""){return i("::after"+t)}static before(t=""){return i("::before"+t)}static backdrop(t=""){return i("::backdrop"+t)}static cue(t=""){return i("::cue"+t)}static cueRegion(t=""){return i("::cue-region"+t)}static firstLetter(t=""){return i("::first-letter"+t)}static firstLine(t=""){return i("::first-line"+t)}static marker(t=""){return i("::marker"+t)}static part(t=""){return i("::part"+t)}static placeholder(t=""){return i("::placeholder"+t)}static selection(t=""){return i("::selection"+t)}static slotted(t=""){return i("::slotted"+t)}static spellingError(t=""){return i("::spelling-error"+t)}static targetText(t=""){return i("::target-text"+t)}static viewTransition(t=""){return i("::view-transition"+t)}static viewTransitionGroup(t=""){return i("::view-transition-group"+t)}static viewTransitionImagePair(t=""){return i("::view-transition-image-pair"+t)}static viewTransitionNew(t=""){return i("::view-transition-new"+t)}static viewTransitionOld(t=""){return i("::view-transition-old"+t)}static scrollbar(t=""){return i("::-webkit-scrollbar"+t)}static scrollbarThumb(t=""){return i("::-webkit-scrollbar-thumb"+t)}static scrollbarTrack(t=""){return i("::-webkit-scrollbar-track"+t)}static scrollbarCorner(t=""){return i("::-webkit-scrollbar-corner"+t)}static active(t=""){return i(":active"+t)}static anyLink(t=""){return i(":any-link"+t)}static autofill(t=""){return i(":autofill"+t)}static blank(t=""){return i(":blank"+t)}static checked(t=""){return i(":checked"+t)}static current(t=""){return i(":current"+t)}static default(t=""){return i(":default"+t)}static defined(t=""){return i(":defined"+t)}static disabled(t=""){return i(":disabled"+t)}static empty(t=""){return i(":empty"+t)}static enabled(t=""){return i(":enabled"+t)}static first(t=""){return i(":first"+t)}static firstChild(t=""){return i(":first-child"+t)}static firstOfType(t=""){return i(":first-of-type"+t)}static fullscreen(t=""){return i(":fullscreen"+t)}static future(t=""){return i(":future"+t)}static focus(t=""){return i(":focus"+t)}static focusVisible(t=""){return i(":focus-visible"+t)}static focusWithin(t=""){return i(":focus-within"+t)}static host(t=""){return i(":host"+t)}static hover(t=""){return i(":hover"+t)}static indeterminate(t=""){return i(":indeterminate"+t)}static inRange(t=""){return i(":in-range"+t)}static invalid(t=""){return i(":invalid"+t)}static lastChild(t=""){return i(":last-child"+t)}static lastOfType(t=""){return i(":last-of-type"+t)}static left(t=""){return i(":left"+t)}static link(t=""){return i(":link"+t)}static localLink(t=""){return i(":local-link"+t)}static modal(t=""){return i(":modal"+t)}static onlyChild(t=""){return i(":only-child"+t)}static onlyOfType(t=""){return i(":only-of-type"+t)}static optional(t=""){return i(":optional"+t)}static outOfRange(t=""){return i(":out-of-range"+t)}static past(t=""){return i(":past"+t)}static pictureInPicture(t=""){return i(":picture-in-picture"+t)}static placeholderShown(t=""){return i(":placeholder-shown"+t)}static paused(t=""){return i(":paused"+t)}static playing(t=""){return i(":playing"+t)}static readOnly(t=""){return i(":read-only"+t)}static readWrite(t=""){return i(":read-write"+t)}static required(t=""){return i(":required"+t)}static right(t=""){return i(":right"+t)}static root(t=""){return i(":root"+t)}static scope(t=""){return i(":scope"+t)}static target(t=""){return i(":target"+t)}static targetWithin(t=""){return i(":target-within"+t)}static userInvalid(t=""){return i(":user-invalid"+t)}static valid(t=""){return i(":valid"+t)}static visited(t=""){return i(":visited"+t)}static dir(t){return i(`:dir(${t})`)}static has(t){return i(`:has(${t})`)}static host_(t){return i(`:host(${t})`)}static hostContext(t){return i(`:host-context(${t})`)}static is(t){return i(`:is(${t})`)}static lang(t){return i(`:lang(${t})`)}static not(t){return i(`:not(${t})`)}static nthChild(t){return i(`:nth-child(${t})`)}static nthCol(t){return i(`:nth-col(${t})`)}static nthLastChild(t){return i(`:nth-last-child(${t})`)}static nthLastCol(t){return i(`:nth-last-col(${t})`)}static nthLastOfType(t){return i(`:nth-last-of-type(${t})`)}static nthOfType(t){return i(`:nth-of-type(${t})`)}static state(t){return i(`:state(${t})`)}static where(t){return i(`:where(${t})`)}static and(t){return i(", "+t)}static child(t){return i(" > "+t)}static desc(t){return i(" "+t)}static next(t){return i(" + "+t)}static general(t){return i(" ~ "+t)}static _with(t){if(!(t.startsWith(".")||t.startsWith("#")))throw Error("should start with . or # - class / id");return i(t)}}var y0={DGRAY:{background:"#2f2f2f"},MSIZES:T.after()({position:l.absolute,right:4.3,top:1.3,content:X("xs",{sm:"sm",smd:"smd",md:"md",lg:"lg",xl:"xl",xxl:"xxl"}),color:Rt.orange,fontSize:1.5,zIndex:1000,pointerEvents:l.none}),BORDER1:{border:"1px dashed #80808070"},TRANS25:{transition:"all 0.25s"},SCROLL2:(t,n=l.inherit)=>[T.scrollbar()({width:X(1,{no_hover:0}),height:X(1,{no_hover:0})}),T.scrollbarTrack()({background:n}),T.scrollbarThumb()({background:t,borderRadius:2,backgroundClip:"content-box",border:"2.5px solid transparent"},T.hover()({border:"1px solid transparent",cursor:l.grabbing})),T.scrollbarCorner()({background:n})],BACKDROP:(t=0.8)=>{return{backdropFilter:x.blur(t),webkitBackdropFilter:x.blur(t)}},MASK:(t)=>{return{mask:t,webkitMask:t}}};import*as Qt from"@babel/parser";import vt from"@babel/traverse";var{file:et,write:pt}=globalThis.Bun;import xt from"fast-glob";class tn{files=[];classes=new Set;importMap=new Map;resolvedImports=new Map;StateValues=new Map;constructor({include:t=[]}={}){t.forEach((n)=>this.classes.add(n))}async load(t){let n=await xt(t);for(let r of n){let F=await et(r).text(),B=Qt.parse(F,{sourceType:"module",plugins:["jsx","typescript","decorators"]});vt(B,{AssignmentExpression:($)=>{let R=$.node.left;if(R.type==="MemberExpression"){if(W(R.property)==="value"){let M=W(R.object);if(M){let E=$.scope.getBinding(M);if(E){let D=Wt(E.path.node);if(D&&W(D)==="State")Mt.call(this,$.node.right,M)}}}}},CallExpression:($)=>{let R=$.node;if(R.type==="CallExpression"){let{arguments:M,callee:E}=R,D=W(E);if(D&&["add","remove","toggle"].includes(D)){if(E.type==="MemberExpression"){let g=W(E.object);if(g){let u=$.scope.getBinding(g);if(u){let A=Wt(u.path.node);if(A){if(W(A)==="$")M.forEach((q)=>{Q.call(this,q,$)})}}}}}}},JSXAttribute:($)=>{if($.node.name.name==="class"){let R=$.node.value;if(R&&R.type==="StringLiteral")Q.call(this,R,$);else if(R&&R.type==="JSXExpressionContainer")Q.call(this,R.expression,$)}}})}return this}setState(t,n){if(!this.StateValues.has(t))this.StateValues.set(t,new Set([n]));else this.StateValues.get(t).add(n)}async export(t,n="shaker"){let r=JSON.stringify([...this.classes.values()].filter((F)=>F));await pt(t+"/"+n+".json",r)}get shaker(){return[...this.classes.values()]}}function Mt(t,n){switch(t.type){case"StringLiteral":this.setState(n,t.value);break;case"MemberExpression":Mt.call(this,t.property,n);break;case"Identifier":this.setState(n,t.name);break;case"ArrayExpression":t.elements.forEach((r)=>{if(r)Mt.call(this,r,n)});break;default:break}}async function Q(t,n){switch(t.type){case"StringLiteral":t.value.split(/\s+/).forEach((F)=>this.classes.add(F));break;case"CallExpression":t.arguments.forEach(async(F)=>{await Q.call(this,F,n)});break;case"ArrayExpression":t.elements.forEach(async(F)=>{if(F)await Q.call(this,F,n)});break;case"MemberExpression":if(t.property.type==="Identifier")this.classes.add(t.property.name);break;case"ConditionalExpression":await Q.call(this,t.consequent,n),await Q.call(this,t.alternate,n);break;case"Identifier":let r=n.scope.getBinding(t.name);if(r&&r.path.node.type==="VariableDeclarator"){let F=this.StateValues.get(t.name);if(F)F.forEach((B)=>B.split(/\s+/).forEach(($)=>this.classes.add($)));await nn.call(this,r.path.node,n)}break;default:break}}async function nn(t,n){switch(t.type){case"VariableDeclarator":if(t.id.type==="Identifier"){let r=t.init;if(r&&r.type==="CallExpression")r.arguments.forEach(async(F)=>{await Q.call(this,F,n)})}break;default:break}}function W(t){switch(t.type){case"Identifier":return t.name;case"ObjectPattern":return"";case"CallExpression":return W(t.callee);case"MemberExpression":return W(t.property);default:break}}function Wt(t){switch(t.type){case"VariableDeclarator":return t.init;default:break}}class rn{name;prefix;save;exportMap=!1;cids=new G;constructor({name:t,prefix:n,importCSS:r=[],exportMap:F=!1,shaker:B=[],include:$=[]}){this.name=t,this.prefix=n??"",this.exportMap=F,Bn.call(this,this.prefix,C(r)?r:[r],B,$),this.save=({dir:R,mapDir:M,mapName:E,minify:D=!0})=>{let g=new Bt().load(this),u=C(R)?R:[R],A=D?$n(g.css):g.css;u.forEach((U)=>{if(!U)return;let c=U.endsWith("/")?"":"/",z=U+c+t+".css";e(U+c),v(z),Ut(z,A)});let q=M?M:u[0]??"";if(q){let U=q.endsWith("/")?"":"/",c=E?E:"css",z=q+U+c+".js";e(q+U),v(z),this.cids.init(t,{});let _=this.cids.get(t);f(g.cid).forEach(([m,ot])=>{if(_[m])_[m]=ot+" "+_[m];else _[m]=ot}),Fn(z,this.cids)}}}}var Fn=(t,n)=>{let r={};n.values().forEach((B)=>{f(B).forEach(([$,R])=>{if(!r[$])r[$]=[R];else r[$].push(R)})});let F=f(r).map(([B,$])=>{return`${B} = "${$.join(" ")}"`}).join();Ut(t,`export const ${F};`);return};var $n=(t)=>{return t.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").trim()};function Bn(t,n,r=[],F=[]){let B={dom:new O("",t),id:new O("#",t),cx:new O(".",t,r,F),kf:new S(t),at:new y,font:new h};n.forEach(($)=>{let R=$.exportMap,M={};if(K(B).forEach((E)=>{if(B[E].load($[E]),R)Y(M,gt($[E].cid))}),R&&k(M)){this.cids.set($.name,{});let E=this.cids.get($.name);Y(E,M)}}),K(B).forEach(($)=>{B[$]=B[$].css}),Y(this,B)}function FF(t){return t.split("/").slice(-1)[0].split(".")[0]}export{y0 as x,l as v,T as ps,w as media,X as med,FF as fileName,x as f,rn as css,Rt as c,ct as _var,tn as SweetShaker,ft as $$};
