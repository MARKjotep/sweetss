// @bun
import{writeFileSync as Lt}from"fs";var s=(t)=>{return!isNaN(parseFloat(t))&&isFinite(t)};var St=(t)=>{return t.startsWith(".")||t.startsWith("#")};var m=(t)=>typeof t==="string",D=(t)=>Array.isArray(t),Y=(t)=>typeof t==="object",$t=(t)=>typeof t==="number";var Ct=(t)=>{return Number.isInteger(Number(t))};class k{static set p(t){if(Array.isArray(t))console.log(...t);else console.log(t)}}class tt{_c=0;_id="";constructor(t){if(this._c=0,this._id=t??V(5),t?.includes("-")){let[n,o]=[t.split("-").slice(0,-1).join("-"),t.split("-").slice(-1)[0]];this._id=n,this._c=s(o)?parseInt(o):0}}get id(){return this._id+"-"+this._c}get mid(){return this._id+"-"+ ++this._c}}var Rn=new RegExp(/(\d+)(\d*)/,"m"),Pt=(t)=>Array.from({length:t},(n,o)=>o),Gt="ABCDEFGHIJKLMNOPQRSTUVWXYZ",It="abcdefghijklmnopqrstuvwxyz",Ot=Pt(10).join("");var G=(t)=>JSON.stringify(t),A=(t)=>{return JSON.parse(t)},Z=(t)=>{if(t.startsWith("webkit"))t="-"+t;return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},V=(t)=>{let n=Gt+It;return Array.from({length:t},(o,i)=>n+(i?Ot:"")).reduce((o,i)=>{return o+=i.charAt(Math.floor(Math.random()*i.length))},"")};class T extends Map{obj(t){t&&C(t).forEach(([n,o])=>this.set(n,o))}map(t){t.forEach((n,o)=>{if(n instanceof T)this.set(o,n);else if(D(n)){if(this.lacks(o))this.set(o,[]);this.get(o).push(...n)}else if(Y(n))this.ass(o,n);else this.set(o,n)})}ass(t,n){if(!this.has(t))this.set(t,{});j(this.get(t),n)}lacks(t){return!this.has(t)}init(t,n){return this.has(t)?this.get(t):this.set(t,n).get(t)}}var{values:O,keys:I,entries:C}=Object;var Et=Object.hasOwn;var j=Object.assign,Rt=(t)=>{return Object.keys(t).length};var K=(t,n)=>{return{name:t,content:n}},Bt=(t,n)=>{return{property:t,content:n}},Kt=(t,n)=>{return{"http-equiv":t,content:n}};class nt{metas=[];constructor(t){t&&this.metas.push(K("description",t))}author(t){return this.meta=K("author",t),this}charset(t){return this.meta={charset:t},this}keywords(...t){return this.meta=K("keywords",t.join(", ")),this}viewport(t){let n=C(t).map(([o,i])=>[Z(o),String(i)].join("="));return this.meta=K("viewport",n.join(", ")),this}httpEquiv(t){return C(t).forEach(([n,o])=>{this.meta=Kt(Z(n),String(o))}),this}robots(...t){return this.meta=K("robots",t.join(", ")),this}themeColor(t){return this.meta=K("theme-color",t),this}openGraph(t){return C(t).forEach(([n,o])=>{this.meta=Bt("og:"+n,String(o))}),this}twitter(t){return C(t).forEach(([n,o])=>{this.meta=K("twitter:"+n,String(o))}),this}and(t){return this}set meta(t){this.metas.push(t)}}var ct=["charset","name","property","http-equiv"],Ft=(t,n)=>{n.forEach((o)=>{for(let i of ct)if(i in o){let g=o[i];t[`${i}_${i==="charset"?"":g}`]=o}})},Xt=(t,n)=>{n.forEach((o)=>{if("href"in o){let i=o.href;t[`${i}`]=o}})};class Tt{_head;idm;constructor(t){this._head=new T(t)}set head(t){C(t).forEach(([n,o])=>{if(n==="title"||n==="base"){if(o!==void 0)this._head.set(n,o);return}if(o instanceof nt)return Ft(this._head.init("meta",{}),o.metas);if(!D(o))return;switch(n){case"meta":return Ft(this._head.init("meta",{}),o);case"link":return Xt(this._head.init("link",{}),o);case"script":if(o.length){this._head.init(n,[]);let i=o.map((g)=>{if(!g.yid&&this.idm)g.yid="sc"+this.idm.mid;return g});this._head.get(n).push(...i)}return}})}get head(){return this._head}set id(t){this.idm=new tt(t)}}class Yt{lang="en";htmlHead=new T;head;constructor(){this.head=(t={})=>{let n=new Tt(this.htmlHead);n.head=t,this.htmlHead=n.head}}}var bt=(t,n)=>{let o=n;if(t?.class)o.push(...D(t.class)?t.class:[t.class]);return delete t.class,o.filter((i)=>i)};var Jt=(t,n=!1)=>{if(s(t))return[+t,Ct(t)?"int":"float"];if(n&&/\.\w+$/.test(t))return[t,"file"];if(t==="/")return[t,"-"];if(t.length===36&&t.match(/\-/g)?.length===4)return[t,"uuid"];return[t,"string"]},ot=(t)=>{let n=t.startsWith("/")?t:"/"+t,o=n.match(/(?<=\/)[^/].*?(?=\/|$)/g)??["/"],[i,g]=o.reduce(([f,E],F)=>{if(F.includes("<")){let R=F.match(/(?<=<)[^/].*?(?=>|$)/g);if(R?.length){let[M,$]=R[0].split(":");if(M&&$)f.push(M),E.push($)}}else f.push(F===">"?"/":F);return[f,E]},[[],[]]);if(n.endsWith("/")&&n.length>1)i.push("/");return{parsed:i,args:g}};class e{storage=new T;cache(t,n){if(this.storage.lacks(t))this.storage.set(t,n());return this.storage.get(t)}}var At=["int","float","file","uuid","string"],mt=new e;class wt{_storage=new T;set(t){let{parsed:n,path:o}=t,i=G(n);if(!this._storage.get(i))this._storage.set(i,t);else throw`path: ${o} already used.`}get(t){let{parsed:n}=mt.cache(t,()=>ot(t)),o={},i=this._storage.get(G(n));if(!i&&t!=="/")for(let g of this._storage.keys()){let f=[],E=A(g);if(n.length===E.length){let F=E.map(($,w)=>{let b=Jt(n[w],n.length-1===w);if($===b[0])return b[0];if(At.includes(b[1]))return f.push(b[0]),b[1];return $}),R=G(F);if(this._storage.has(R)){i=this._storage.get(R),i?.args.forEach(($,w)=>{o[$]=f[w]});break}}}return[i,o]}}class Dt{static rand(t=6,n){if(n)return Math.floor(Math.random()*(n-t+1)+t);return Math.floor(Math.random()*t)+1-1}static fill(t,n=null){return Array(t).fill(n)}static new({dom:t,id:n,inner:o}){let i=document.createElement(t);if(n)i.id=n;if(o)i.innerHTML=o;return i}static randFrom(t){if(Array.isArray(t)){let n=t.length,o=this.rand(0,n-1);return t[o]}else if(typeof t=="object"){let n=I(t),o=n.length,i=this.rand(0,o-1);return n[i]}}static makeID=V;static reClass=bt;static get O(){return{vals:O,keys:I,items:C,has:Et,ass:j,len:(t={})=>I(t).length}}}import{mkdirSync as Vt,writeFileSync as zt,existsSync as Mt}from"fs";var p=(t,n="")=>{if(Mt(t))return!0;return zt(t,n,{flag:"wx"}),!0},a=(t)=>{if(Mt(t))return!0;return Vt(t,{recursive:!0}),!0};var Nt={xs:"480px",sm:"480px",smd:"624px",md:"768px",lg:"1024px",xl:"1280px",xxl:"1536px"};class Q{static default="xs";static prop=C(Nt).reduce((t,[n,o],i)=>{return t[n]=`(${i==0?"max-width":"min-width"}: ${o})`,t},{});static extra={no_hover:"(pointer: coarse)",print:"print",screen:"screen",dark:"(prefers-color-scheme: dark)"};constructor(t,n={}){let o=Q.default,i={};if(t!==void 0)it(i,o,t);C(n).forEach(([g,f])=>{it(i,g,f)}),j(this,i)}static new(t){C(t).forEach(([n,o])=>{if(!this.extra[n])this.extra[n]=`(${o})`})}static get breakpoints(){return A(G(Nt))}}var yt=Q.default,it=(t,n,o)=>{if(o!==void 0)if(o instanceof Q)C(o).forEach(([i,g])=>{if(n!==i){let f=yt===i?n:`${n}-${i}`;it(t,f,g)}});else t[n]=o};function c(t,n){if(n)return new Q(t,n);return new Q(void 0,t)}class h{_var="";k="";_cvar="";fallback;_val;constructor(t={},n){if(Rt(t)){let[o,i]=C(t)[0];this.k=o,this._var="--"+Z(o),this._val=i instanceof Q?i:c(i,{}),this.fallback=n}else this._val=c({})}__(t){if(t)this.fallback=t;let n=this.fallback;if(n)return`var(${this._var}, ${S(D(n)?n:[n])})`;else return`var(${this._var})`}new(t){return new h({[this.k]:S([t])})}prefix(t){if(t)C(this._val).forEach(([n,o])=>{k.p=[n,o]})}}var dt=(t,n)=>{return new h(t,n)};var qt=new Set(["transitionDuration","transitionDelay","animationDelay","animationDuration"]),ut=new Set([...qt,"zIndex","opacity","aspectRatio","order","flexShrink","flexGrow","flex","fillOpacity","lineClamp","order","webkitLineClamp","animationIterationCount","columnCount"]),_t=new Set(["content"]),lt=new Set(["transitionProperty"]);function z(t,n){let o=D(n)?n:[n];return S(o,{rem:!ut.has(t),second:qt.has(t),quote:_t.has(t),delimeter:lt.has(t)?", ":" "})}function S(t,{rem:n=!1,degree:o=!1,percent:i=!1,quote:g=!1,second:f=!1,delimeter:E=" ",delim_arr:F=!0,perc_arr:R=!1}={}){return t.filter(($)=>$!==void 0).map(($)=>{if(D($))return S($,{rem:R?!1:n,degree:R?!1:o,percent:R?R:i,delimeter:F?E:" ",quote:g});if($ instanceof h)return $.__();if(g)$=String($);if($t($))if(n)return`${$}rem`;else if(o)return`${$}deg`;else if(i)return`${$}%`;else if(f)return`${$}s`;else return String($);if(m($))if($.includes("("))return $;else if(g)return`'${$}'`;else return $;return""}).join(E)}function st(t,n={}){let{rem:o=!1,degree:i=!1,percent:g=!1,second:f=!1,quote:E=!1,delimeter:F=" ",delimeter_arr:R=!0,percent_arr:M=!1}=n;return S(D(t)?t:[t],{rem:o,degree:i,percent:g,second:f,quote:E,delimeter:F,delim_arr:R,perc_arr:M})}function kt(...t){return S(t,{rem:!1,degree:!1,percent:!1,second:!1,quote:!1,delimeter:", ",perc_arr:!1,delim_arr:!1})}var Qt=(t)=>{if(t instanceof Q)return t;if(t instanceof h)return c(t.__(),{});return c(t,{})};class v{prefix;anim;constructor(t,n=new T){this.prefix=t;this.anim=n}set(t,n,o){if(!Y(n))return;let i=new T,g=(f,E)=>{if(f.startsWith(":")||f.startsWith(","))this.set(t+f,E,o);else if(f.startsWith(" ")){let R=f.match(/^.*?\w/gm)?.[0].slice(0,-1),M=f.replaceAll(/, /gm,`, ${t}${R}`);this.set(t+M,E,o)}else if(St(f))this.set(t+f,E,o);else i.set(f,this.props(t,f,Qt(E)))};if(n instanceof h)this.saveAnim(t,n),i.ass(n._var,this.props(t,n._var,Qt(n._val)));else C(n).forEach(([f,E])=>g(f,E));o.init(t,i).map(i)}props(t,n,o){let i=["animation","animationName"].includes(n);return C(o).forEach(([g,f])=>{if(i)o[g]=z(n,this.addPrefixToAnimation(t,f));else o[g]=z(n,f)}),o}addPrefixToAnimation(t,n){if(n instanceof h)this.saveAnim(t,n);else if(D(n))return n[0]=this.addPrefixToAnimation(t,n[0]),n;else if(m(n)&&!n.includes("("))return n.split(", ").map((g)=>{let f=g.split(" "),E=f[0],F=f.slice(1).join(" "),R=`${this.prefix}${E}`;return this.anim.init(R,new Set).add(t),`${this.prefix}${E} ${F}`.trim()}).join(", ");return n}saveAnim(t,n){rt(n).forEach((o)=>{this.anim.init(`${this.prefix}${o}`,new Set).add(t)})}}var rt=(t,n=[])=>{let o=[];if(D(t))return rt(t[0],o);if(t instanceof h)return rt(O(t._val),o);return o.push(String(t)),o};class y{exportMap;pre;data=new T;cid=new T;cidz=new T;animCLS=new T;DATAX=new T;DATAZ=new T;prefix;DATA;constructor(t,n="",o=!0){this.exportMap=o;this.pre=t,this.prefix=n?n+"_":n,this.DATA=this.exportMap?this.DATAX.init(this.prefix,new T):this.DATAZ.init(this.prefix,new T)}get(t,n){let o=this.pre+n;if(o in this.data)return o;else if(n=="data")return this.data;else if(n=="DATAX")return this.DATAX;else if(n=="DATAZ")return this.DATAZ;else if(n=="cid")return this.cid;else if(n=="cidz")return this.cidz;else if(n=="prefix")return this.prefix;else if(n=="animCLS")return this.animCLS;return}set(t,n,o){return!1}get css(){return new Proxy(this,this)}load(t){if(t.DATAX.size)t.DATAX.forEach((n,o)=>{this.DATAX.init(o,new T).map(n)});if(t.DATAZ.size)t.DATAZ.forEach((n,o)=>{this.DATAZ.init(o,new T).map(n)});if(t.animCLS.size)t.animCLS.forEach((n,o)=>{let i=this.animCLS.init(o,new Set);n.forEach((g)=>{i.add(g)})});return t.data.size&&this.data.map(t.data),this}}class X extends y{PS;constructor(t="",n="",o=!0){super(t,n,o);this.PS=new v(this.prefix,this.animCLS)}set(t,n,o){let i=this.pre+n;return(D(o)?o:[o]).forEach((f)=>{this.PS.set(i,f,this.DATA)}),!0}get css(){return new Proxy(this,this)}}class d extends y{webkit;PS;constructor(t="",n=!0){super("",t,!1);this.webkit=n;this.PS=new v(this.prefix)}set(t,n,o){let i=this.prefix+n,g=D(o)?o:[o],f=new T;g.forEach((F)=>{C(F).forEach(([R,M])=>{this.PS.set(R,M,f)})}),this.animCLS.init(i,new Set);let E=`@keyframes ${i}`;if(this.DATA.set(E,f),this.webkit){let F=`@-webkit-keyframes ${i}`;this.DATA.set(F,f)}return!0}get css(){return new Proxy(this,this)}}class u extends y{constructor(t=""){super("@",t)}set(t,n,o){let i=this.pre+n;if(i in t.data)this.data.get(i)?.push(o);else this.data.set(i,[o]);return t}get css(){return new Proxy(this,this)}}class _ extends y{constructor(t=""){super("@font-face",t);this.data.set("@font",[])}set(t,n,o){return this.data.get("@font")?.push(o),!0}get css(){return new Proxy(this,this)}}var Ut=(t)=>{let n=(g)=>Array.from(t.matchAll(g),(f)=>f[1]),o=/\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g,i=/#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g;return{classes:[...new Set(n(o))],ids:[...new Set(n(i))]}},et=(t,n)=>{return t.replaceAll(/\.|\#/g,(o)=>o+n)},Wt=(t,n,o,i)=>{if(!t[n])t[n]={[o]:i.split(",").map((g)=>g.trim())};else t[n][o].push(...i.split(",").map((g)=>g.trim()))},x=(t,n)=>{let o=C(n).map(([i,g])=>`${i}: ${g};`).join(` 
  `);return`${t} {
  ${o}
}`};function Ht(t,n,o=[],i=[]){let g=(f,E=!1)=>{f.forEach((F,R)=>{F.forEach((M,$)=>{M.forEach((w,b)=>{C(w).forEach(([N,J])=>{let W=N,q=G({[Z(b)]:J}),{classes:U,ids:P}=Ut($);[U,P].flat().forEach((H)=>{if(E){if(t.cid.lacks(H))t.cid.set(H,R+H)}else if(t.cidz.lacks(H))t.cidz.set(H,R+H)});let L=R?et($,R):$;if(o.length&&L.startsWith(".")||L.startsWith("#")){if([...U,...P].some((B)=>o.includes(B)||i.length&&i.includes(B)))l(n,W,q),Wt(n,W,q,L)}else l(n,W,q),Wt(n,W,q,L)})})})})};return g(t.DATAX,!0),g(t.DATAZ),t}function Zt(t,n,o,i=[],g=[]){t.DATAZ.forEach((f,E)=>{f.forEach((F,R)=>{F.forEach((M,$)=>{let w={};M.forEach((b,N)=>{C(b).forEach(([J,W])=>{let q=J;if(!w[q])w[q]={};w[q][Z(N)]=W})}),C(w).forEach(([b,N])=>{if(i.length){let J=R.split(" ")[1];if(o.has(J)){if([...o.get(J)].some((U)=>{let{classes:P,ids:L}=Ut(U);return[...P,...L].some((H)=>i.includes(H)||g.length&&g.includes(H))})){let U=b;l(n,U,R),n[U][R].push(x($,N))}}}else{let J=b;l(n,J,R),n[J][R].push(x($,N))}})})})})}function jt(t,n){for(let[o,i]of t.data)for(let g of i){let f=g.includes("(")?g:`"${g}"`;n.push(`${o} ${f.trim()};`)}}function ht(t,n){t.data.get("@font")?.forEach((i)=>{let g=C(i).map(([f,E])=>`${Z(f)}: ${z(f,E)}`).join(`;
	`);n.push(`@font-face {
	${g}
}`)})}var l=(t,n,o)=>{try{if(!t[n])t[n]={},t[n][o]=[];if(!t[n][o])t[n][o]=[]}catch(i){console.error(`property "${n}" not found!`)}};class gt{css="";cid={};cidz={};constructor(){}updateCid(t){t.forEach((n,o)=>{this.cid[o]=n})}updateCidZ(t){t.forEach((n,o)=>{this.cidz[o]=n})}load(t,n=[],o=[]){let i=Q.prop;j(i,Q.extra);let g=Q.default,f={},E={},F={},R=[];I(i).forEach(($)=>{f[$]={},E[$]={},F[$]={}});let M=new T;return O(t).forEach(($)=>{if($ instanceof X){let w=Ht($,f,n,o);$.animCLS.forEach((b,N)=>{b.forEach((J)=>{M.init(N,new Set).add(J)})}),this.updateCid(w.cid),this.updateCidZ(w.cidz)}else if($ instanceof d)Zt($,E,M,n,o);else if($ instanceof u)jt($,R);else if($ instanceof _)ht($,R)}),C(f).forEach(([$,w])=>{if(!F[$])F[$]={};if(w!==void 0)C(w).forEach(([b,N])=>{let J=N.join(", ");if(!F[$][J])F[$][J]={};j(F[$][J],A(b))})}),C(F).forEach(([$,w])=>{let b=[];if(C(w).forEach(([N,J])=>b.push(x(N,J))),E[$])C(E[$]).forEach(([N,J])=>{b.push(`${N} {
${J.join(`
`)}
}`)});if(b.length)if(R.push(`/* -------------- ${$+($==g?" ( default )":"")} */`),$==g)R.push(b.join(`
`));else{let N=$.split("-").map((J)=>i[J]).join(" and ");R.push(`@media ${N}	{
${b.join(`
`)}
}`)}}),this.css=R.join(`
`),this}}var Gi={important:" !important",visible:"visible",hidden:"hidden",auto:"auto",none:"none",clip:"clip",scroll:"scroll",initial:"initial",inherit:"inherit",flex:"flex",center:"center",flex_start:"flex-start",flex_end:"flex-end",space_evenly:"space-evenly",stretch:"stretch",wrap:"wrap",column:"column",column_reverse:"column-reverse",row:"row",row_reverse:"row-reverse",space_between:"space-between",space_around:"space-around",pr100:"100%",pr50:"50%",i100vh:"100vh",i100vw:"100vw",block:"block",sticky:"sticky",fixed:"fixed",absolute:"absolute",relative:"relative",pointer:"pointer",grabbing:"grabbing",checkbox:"checkbox",solid:"solid",inset:"inset",bold:"bold",currentColor:"currentColor",forwards:"forwards",text:"text",norepeat:"no-repeat",nowrap:"nowrap",difference:"difference",preserve3d:"preserve-3d"};function r(t){return function(...n){let o=n.reduce((i,g)=>{if(g instanceof h)i[g._var]=g._val;else if(Y(g))j(i,g);return i},{});if(t.startsWith("::before")||t.startsWith("::after")){let i=o.content;o.content=i!==void 0?i:""}return{[t]:o}}}class pt{static attr(t){let[n,o]=C(t)[0];return r(`[${n}="${o}"]`)}static after(t=""){return r("::after"+t)}static before(t=""){return r("::before"+t)}static backdrop(t=""){return r("::backdrop"+t)}static cue(t=""){return r("::cue"+t)}static cueRegion(t=""){return r("::cue-region"+t)}static firstLetter(t=""){return r("::first-letter"+t)}static firstLine(t=""){return r("::first-line"+t)}static marker(t=""){return r("::marker"+t)}static part(t=""){return r("::part"+t)}static placeholder(t=""){return r("::placeholder"+t)}static selection(t=""){return r("::selection"+t)}static slotted(t=""){return r("::slotted"+t)}static spellingError(t=""){return r("::spelling-error"+t)}static targetText(t=""){return r("::target-text"+t)}static viewTransition(t=""){return r("::view-transition"+t)}static viewTransitionGroup(t=""){return r("::view-transition-group"+t)}static viewTransitionImagePair(t=""){return r("::view-transition-image-pair"+t)}static viewTransitionNew(t=""){return r("::view-transition-new"+t)}static viewTransitionOld(t=""){return r("::view-transition-old"+t)}static scrollbar(t=""){return r("::-webkit-scrollbar"+t)}static scrollbarThumb(t=""){return r("::-webkit-scrollbar-thumb"+t)}static scrollbarTrack(t=""){return r("::-webkit-scrollbar-track"+t)}static scrollbarCorner(t=""){return r("::-webkit-scrollbar-corner"+t)}static active(t=""){return r(":active"+t)}static anyLink(t=""){return r(":any-link"+t)}static autofill(t=""){return r(":autofill"+t)}static blank(t=""){return r(":blank"+t)}static checked(t=""){return r(":checked"+t)}static current(t=""){return r(":current"+t)}static default(t=""){return r(":default"+t)}static defined(t=""){return r(":defined"+t)}static disabled(t=""){return r(":disabled"+t)}static empty(t=""){return r(":empty"+t)}static enabled(t=""){return r(":enabled"+t)}static first(t=""){return r(":first"+t)}static firstChild(t=""){return r(":first-child"+t)}static firstOfType(t=""){return r(":first-of-type"+t)}static fullscreen(t=""){return r(":fullscreen"+t)}static future(t=""){return r(":future"+t)}static focus(t=""){return r(":focus"+t)}static focusVisible(t=""){return r(":focus-visible"+t)}static focusWithin(t=""){return r(":focus-within"+t)}static host(t=""){return r(":host"+t)}static hover(t=""){return r(":hover"+t)}static indeterminate(t=""){return r(":indeterminate"+t)}static inRange(t=""){return r(":in-range"+t)}static invalid(t=""){return r(":invalid"+t)}static lastChild(t=""){return r(":last-child"+t)}static lastOfType(t=""){return r(":last-of-type"+t)}static left(t=""){return r(":left"+t)}static link(t=""){return r(":link"+t)}static localLink(t=""){return r(":local-link"+t)}static modal(t=""){return r(":modal"+t)}static onlyChild(t=""){return r(":only-child"+t)}static onlyOfType(t=""){return r(":only-of-type"+t)}static optional(t=""){return r(":optional"+t)}static outOfRange(t=""){return r(":out-of-range"+t)}static past(t=""){return r(":past"+t)}static pictureInPicture(t=""){return r(":picture-in-picture"+t)}static placeholderShown(t=""){return r(":placeholder-shown"+t)}static paused(t=""){return r(":paused"+t)}static playing(t=""){return r(":playing"+t)}static readOnly(t=""){return r(":read-only"+t)}static readWrite(t=""){return r(":read-write"+t)}static required(t=""){return r(":required"+t)}static right(t=""){return r(":right"+t)}static root(t=""){return r(":root"+t)}static scope(t=""){return r(":scope"+t)}static target(t=""){return r(":target"+t)}static targetWithin(t=""){return r(":target-within"+t)}static userInvalid(t=""){return r(":user-invalid"+t)}static valid(t=""){return r(":valid"+t)}static visited(t=""){return r(":visited"+t)}static dir(t){return r(`:dir(${t})`)}static has(t){return r(`:has(${t})`)}static host_(t){return r(`:host(${t})`)}static hostContext(t){return r(`:host-context(${t})`)}static is(t){return r(`:is(${t})`)}static lang(t){return r(`:lang(${t})`)}static not(t){return r(`:not(${t})`)}static nthChild(t){return r(`:nth-child(${t})`)}static nthCol(t){return r(`:nth-col(${t})`)}static nthLastChild(t){return r(`:nth-last-child(${t})`)}static nthLastCol(t){return r(`:nth-last-col(${t})`)}static nthLastOfType(t){return r(`:nth-last-of-type(${t})`)}static nthOfType(t){return r(`:nth-of-type(${t})`)}static state(t){return r(`:state(${t})`)}static where(t){return r(`:where(${t})`)}static and(t){return r(", "+t)}static child(t){return r(" > "+t)}static desc(t){return r(" "+t)}static next(t){return r(" + "+t)}static general(t){return r(" ~ "+t)}static _with(t){if(!(t.startsWith(".")||t.startsWith("#")))throw Error("should start with . or # - class / id");return r(t)}}class at{static attr(t,n,o){return`attr(${S([t,n,o])})`}static blur(t){return`blur(${S([t],{rem:!0})})`}static brightness(t){return`brightness(${S([t])})`}static calc(...t){return`calc(${S(t,{rem:!0})})`}static circle(t,n){return`circle(${S([t,n],{rem:!0})})`}static clamp(t,n,o){return`clamp(${S([t,n,o],{rem:!0,delimeter:", "})})`}static colorMix(t,n,o){return`color-mix(${S([t,S(n),S(o)],{delimeter:", "})})`}static conicGradient(...t){return`conic-gradient(${S(t,{delimeter:", ",delim_arr:!1})})`}static contrast(t){return`contrast(${S([t])})`}static cubicBezier(t,n,o,i){return`cubic-bezier(${S([t,n,o,i],{delimeter:", "})})`}static dropShadow(...t){return`drop-shadow(${S(t,{rem:!0})})`}static grayscale(t){return`grayscale(${S([t])})`}static hsl(t,n,o){return`hsl(${S([t,n,o])})`}static hsla(t,n,o,i){return`hsl(${S([t,n,o,i?["/",i]:i])})`}static hueRotate(t){return`hue-rotate(${S([t],{degree:!0})})`}static inset(...t){return`inset(${S(t,{rem:!0})})`}static invert(t){return`invert(${S([t])})`}static linearGradient(...t){return`linear-gradient(${S(t,{delim_arr:!1,delimeter:", "})})`}static matrix(t,n,o,i,g,f){return`matrix(${S([t,n,o,i,g,f],{delimeter:", "})})`}static matrix3d(t,n,o,i){return`matrix3d(${S([t,n,o,i],{delimeter:", "})})`}static max(...t){return`max(${S(t,{rem:!0,delimeter:", "})})`}static min(...t){return`min(${S(t,{rem:!0,delimeter:", "})})`}static opacity(t){return`opacity(${S([t])})`}static path(t){return`path(${S([t],{quote:!0})})`}static clipPath(t,n){return`path(${S([t,S([n],{quote:!0})],{delimeter:", "})})`}static perspective(t){return`perspective(${S([t])})`}static polygon(...t){return`polygon(${S(t,{percent:!0,delimeter:", "})})`}static radialGradient(...t){return`radial-gradient(${S(t,{delim_arr:!1,perc_arr:!0,delimeter:", "})})`}static repeatingConicGradient(...t){return`repeating-conic-gradient(${S(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingLinearGradient(...t){return`repeating-linear-gradient(${S(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingRadialGradient(...t){return`repeating-radial-gradient(${S(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static rgb(t,n,o){return`rgb(${S([t,n,o])})`}static rgba(t,n,o,i){return`rgba(${S([t,n,o,i?["/",i]:i])})`}static rotate(t){return`rotate(${S([t],{degree:!0})})`}static rotate3d(t,n,o,i){return`rotate3d(${S([S([t,n,o],{delimeter:", "}),i],{degree:!0,delimeter:", "})})`}static rotateX(t){return`rotateX(${S([t],{degree:!0})})`}static rotateY(t){return`rotateY(${S([t],{degree:!0})})`}static rotateZ(t){return`rotateZ(${S([t],{degree:!0})})`}static saturate(...t){return`saturate(${S(t)})`}static scale(t,n){return`scale(${S([t,n],{delimeter:", "})})`}static scale3d(t,n,o){return`scale3d(${S([t,n,o],{delimeter:", "})})`}static scaleX(t){return`scaleX(${S([t])})`}static scaleY(t){return`scaleY(${S([t])})`}static scaleZ(t){return`scaleZ(${S([t])})`}static sepia(t){return`sepia(${S([t])})`}static skew(...t){return`skew(${S(t,{degree:!0,delimeter:", "})})`}static skewX(t){return`skewX(${S([t],{degree:!0})})`}static skewY(t){return`skewY(${S([t],{degree:!0})})`}static translate(...t){return`translate(${S(t,{rem:!0,delimeter:", "})})`}static translate3d(...t){return`translate3d(${S(t,{rem:!0,delimeter:", "})})`}static translateX(t){return`translateX(${S([t],{rem:!0})})`}static translateY(t){return`translateY(${S([t],{rem:!0})})`}static translateZ(...t){return`translateZ(${S(t,{rem:!0,delimeter:", "})})`}static url(t){return`url(${S([t])})`}static var(t,n=""){t="--"+Z(t);let o=n?", "+S([n],{rem:!0,delimeter:", "}):"";return`var(${S([t],{rem:!0})}${o})`}}class vt{name;prefix;save;exportMap=!1;cids=new T;constructor({name:t,prefix:n,sweetSS:o=[],exportMap:i=!0,webkitKeyframes:g}){this.name=t,this.prefix=n??"",this.exportMap=i;let f=D(o)?o:[o];nn.call(this,this.prefix,f,g,i),this.save=({dir:E,mapDir:F,mapName:R,minify:M=!0,shaker:$=[],include:w=[]})=>{let b=new gt().load(this,$,w),N=D(E)?E:[E],J=M?tn(b.css):b.css;N.forEach((q)=>{if(!q)return;let U=q.endsWith("/")?"":"/",P=q+U+t+".css";a(q+U),p(P),Lt(P,J)});let W=F?F:N[0]??"";if(W){let q=W.endsWith("/")?"":"/",U=R?R:"css",P=W+q+U+".js";a(W+q),p(P),this.cids.init(t,{});let L=this.cids.get(t),H=i?b.cid:b.cidz;C(H).forEach(([B,ft])=>{if(L[B])L[B]=ft+" "+L[B];else L[B]=ft}),xt(P,this.cids)}}}}var xt=(t,n)=>{let o={};n.values().forEach((g)=>{C(g).forEach(([f,E])=>{if(!o[f])o[f]=[E];else o[f].push(E)})});let i=C(o).map(([g,f])=>{return`${g}="${f.join(" ")}"`}).sort((g,f)=>g.localeCompare(f,void 0,{numeric:!0}));Lt(t,i.length?`export const ${i.join()};`:"");return},tn=(t)=>{return t.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").trim()};function nn(t,n,o=!0,i=!1){let g={dom:new X("",t,i),id:new X("#",t,i),cx:new X(".",t,i),kf:new d(t,o),at:new u,font:new _};n.forEach((f)=>{I(g).forEach((E)=>{g[E].load(f[E])})}),I(g).forEach((f)=>{g[f]=g[f].css}),j(this,g)}function fr(t){return t.split("/").slice(-1)[0].split(".")[0]}export{st as value,Gi as v,pt as ps,Q as media,c as med,kt as join,fr as fileName,at as f,Dt as __,dt as Var,vt as SweetSS,k as $$};
