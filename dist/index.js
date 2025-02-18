// @bun
import{writeFileSync as Ot}from"fs";var ot=(t)=>typeof t==="function";var k=(t)=>{return!isNaN(parseFloat(t))&&isFinite(t)};var Ft=(t)=>{return t.startsWith(".")||t.startsWith("#")};var z=(t)=>typeof t==="string",D=(t)=>Array.isArray(t),A=(t)=>typeof t==="object",Et=(t)=>typeof t==="number";var Tt=(t)=>{return Number.isInteger(Number(t))};class e{static set p(t){if(Array.isArray(t))console.log(...t);else console.log(t)}}class it{_c=0;_id="";constructor(t){if(this._c=0,this._id=t??m(5),t?.includes("-")){let[n,o]=[t.split("-").slice(0,-1).join("-"),t.split("-").slice(-1)[0]];this._id=n,this._c=k(o)?parseInt(o):0}}get id(){return this._id+"-"+this._c}get mid(){return this._id+"-"+ ++this._c}}var wn=new RegExp(/(\d+)(\d*)/,"m"),It=(t)=>Array.from({length:t},(n,o)=>o),Bt="ABCDEFGHIJKLMNOPQRSTUVWXYZ",Kt="abcdefghijklmnopqrstuvwxyz",Xt=It(10).join("");var I=(t)=>JSON.stringify(t),V=(t)=>{return JSON.parse(t)},h=(t)=>{if(t.startsWith("webkit"))t="-"+t;return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},m=(t)=>{let n=Bt+Kt;return Array.from({length:t},(o,i)=>n+(i?Xt:"")).reduce((o,i)=>{return o+=i.charAt(Math.floor(Math.random()*i.length))},"")};class T extends Map{obj(t){t&&C(t).forEach(([n,o])=>this.set(n,o))}map(t){t.forEach((n,o)=>{if(n instanceof T)this.set(o,n);else if(D(n)){if(this.lacks(o))this.set(o,[]);this.get(o).push(...n)}else if(A(n))this.ass(o,n);else this.set(o,n)})}ass(t,n){if(!this.has(t))this.set(t,{});H(this.get(t),n)}lacks(t){return!this.has(t)}init(t,n){return this.has(t)?this.get(t):this.set(t,n).get(t)}}var{values:K,keys:B,entries:C}=Object;var bt=Object.hasOwn;var H=Object.assign,Jt=(t)=>{return Object.keys(t).length};var Y=(t,n)=>{return{name:t,content:n}},Yt=(t,n)=>{return{property:t,content:n}},ct=(t,n)=>{return{"http-equiv":t,content:n}};class rt{metas=[];constructor(t){t&&this.metas.push(Y("description",t))}author(t){return this.meta=Y("author",t),this}charset(t){return this.meta={charset:t},this}keywords(...t){return this.meta=Y("keywords",t.join(", ")),this}viewport(t){let n=C(t).map(([o,i])=>[h(o),String(i)].join("="));return this.meta=Y("viewport",n.join(", ")),this}httpEquiv(t){return C(t).forEach(([n,o])=>{this.meta=ct(h(n),String(o))}),this}robots(...t){return this.meta=Y("robots",t.join(", ")),this}themeColor(t){return this.meta=Y("theme-color",t),this}openGraph(t){return C(t).forEach(([n,o])=>{this.meta=Yt("og:"+n,String(o))}),this}twitter(t){return C(t).forEach(([n,o])=>{this.meta=Y("twitter:"+n,String(o))}),this}and(t){return this}set meta(t){this.metas.push(t)}}var At=["charset","name","property","http-equiv"],wt=(t,n)=>{n.forEach((o)=>{for(let i of At)if(i in o){let g=o[i];t[`${i}_${i==="charset"?"":g}`]=o}})},Vt=(t,n)=>{n.forEach((o)=>{if("href"in o){let i=o.href;t[`${i}`]=o}})};class Dt{_head;idm;constructor(t){this._head=new T(t)}set head(t){C(t).forEach(([n,o])=>{if(n==="title"||n==="base"){if(o!==void 0)this._head.set(n,o);return}if(o instanceof rt)return wt(this._head.init("meta",{}),o.metas);if(!D(o))return;switch(n){case"meta":return wt(this._head.init("meta",{}),o);case"link":return Vt(this._head.init("link",{}),o);case"script":if(o.length){this._head.init(n,[]);let i=o.map((g)=>{if(!g.yid&&this.idm)g.yid="sc"+this.idm.mid;return g});this._head.get(n).push(...i)}return}})}get head(){return this._head}set id(t){this.idm=new it(t)}}class zt{lang="en";htmlHead=new T;head;constructor(){this.head=(t={})=>{let n=new Dt(this.htmlHead);n.head=t,this.htmlHead=n.head}}}var Mt=(t,n)=>{let o=n;if(t?.class)o.push(...D(t.class)?t.class:[t.class]);return delete t.class,o.filter((i)=>i)};var qt=(t,n=!1)=>{if(k(t))return[+t,Tt(t)?"int":"float"];if(n&&/\.\w+$/.test(t))return[t,"file"];if(t==="/")return[t,"-"];if(t.length===36&&t.match(/\-/g)?.length===4)return[t,"uuid"];return[t,"string"]},gt=(t)=>{let n=t.startsWith("/")?t:"/"+t,o=n.match(/(?<=\/)[^/].*?(?=\/|$)/g)??["/"],[i,g]=o.reduce(([S,R],E)=>{if(E.includes("<")){let F=E.match(/(?<=<)[^/].*?(?=>|$)/g);if(F?.length){let[M,$]=F[0].split(":");if(M&&$)S.push(M),R.push($)}}else S.push(E===">"?"/":E);return[S,R]},[[],[]]);if(n.endsWith("/")&&n.length>1)i.push("/");return{parsed:i,args:g}};class p{storage=new T;cache(t,n){if(this.storage.lacks(t))this.storage.set(t,n());return this.storage.get(t)}}var mt=["int","float","file","uuid","string"],yt=new p;class Qt{_storage=new T;set(t){let{parsed:n,path:o}=t,i=I(n);if(!this._storage.get(i))this._storage.set(i,t);else throw`path: ${o} already used.`}get(t){let{parsed:n}=yt.cache(t,()=>gt(t)),o={},i=this._storage.get(I(n));if(!i&&t!=="/")for(let g of this._storage.keys()){let S=[],R=V(g);if(n.length===R.length){let E=R.map(($,J)=>{let b=qt(n[J],n.length-1===J);if($===b[0])return b[0];if(mt.includes(b[1]))return S.push(b[0]),b[1];return $}),F=I(E);if(this._storage.has(F)){i=this._storage.get(F),i?.args.forEach(($,J)=>{o[$]=S[J]});break}}}return[i,o]}}class Ut{static rand(t=6,n){if(n)return Math.floor(Math.random()*(n-t+1)+t);return Math.floor(Math.random()*t)+1-1}static fill(t,n=null){return Array(t).fill(n)}static new({dom:t,id:n,inner:o}){let i=document.createElement(t);if(n)i.id=n;if(o)i.innerHTML=o;return i}static randFrom(t){if(Array.isArray(t)){let n=t.length,o=this.rand(0,n-1);return t[o]}else if(typeof t=="object"){let n=B(t),o=n.length,i=this.rand(0,o-1);return n[i]}}static makeID=m;static reClass=Mt;static get O(){return{vals:K,keys:B,items:C,has:bt,ass:H,len:(t={})=>B(t).length}}}import{mkdirSync as dt,writeFileSync as ut,existsSync as Ht}from"fs";var a=(t,n="")=>{if(Ht(t))return!0;return ut(t,n,{flag:"wx"}),!0},v=(t)=>{if(Ht(t))return!0;return dt(t,{recursive:!0}),!0};var Pt={xs:"480px",sm:"480px",smd:"624px",md:"768px",lg:"1024px",xl:"1280px",xxl:"1536px"};class U{static default="xs";static prop=C(Pt).reduce((t,[n,o],i)=>{return t[n]=`(${i==0?"max-width":"min-width"}: ${o})`,t},{});static extra={no_hover:"(pointer: coarse)",print:"print",screen:"screen",dark:"(prefers-color-scheme: dark)"};constructor(t,n={}){let o=U.default,i={};if(t!==void 0)St(i,o,t);C(n).forEach(([g,S])=>{St(i,g,S)}),H(this,i)}static new(t){C(t).forEach(([n,o])=>{if(!this.extra[n])this.extra[n]=`(${o})`})}static get breakpoints(){return V(I(Pt))}}var _t=U.default,St=(t,n,o)=>{if(o!==void 0)if(o instanceof U)C(o).forEach(([i,g])=>{if(n!==i){let S=_t===i?n:`${n}-${i}`;St(t,S,g)}});else t[n]=o};function W(t,n){if(n)return new U(t,n);return new U(void 0,t)}function lt(t){return[...this._prefix,t]}function st(t){if(this._prefix.size){let n=[...this._prefix].reduce((o,i)=>{return o[i]=t,o},{});return W(n)}else return W({xs:t})}function G(t){return new this.constructor(lt.call(this,t),this._values)}class x{_prefix=new Set;_values={};constructor(t=[],n={}){t.forEach((o)=>{o&&this._prefix.add(o)}),C(n).forEach(([o,i])=>{if(!this._values[o])this._values[o]=W({});H(this._values[o],i)})}get XS(){return G.call(this,"xs")}get SM(){return G.call(this,"sm")}get SMD(){return G.call(this,"smd")}get MD(){return G.call(this,"md")}get LG(){return G.call(this,"lg")}get XL(){return G.call(this,"xl")}get XXL(){return G.call(this,"xxl")}get NO_HOVER(){return G.call(this,"no_hover")}get PRINT(){return G.call(this,"print")}get SCREEN(){return G.call(this,"screen")}get DARK(){return G.call(this,"dark")}set _value(t){C(t).forEach(([n,o])=>{if(!this._values[n])this._values[n]=W({});H(this._values[n],st.call(this,o))})}get _value(){return this._values}}class L{_var="";k="";_cvar="";fallback;_val;constructor(t={},n){if(Jt(t)){let[o,i]=C(t)[0];this.k=o,this._var="--"+h(o),this._val=i instanceof U?i:W(i,{}),this.fallback=n}else this._val=W({})}__(t){if(t)this.fallback=t;let n=this.fallback;if(n)return`var(${this._var}, ${f(D(n)?n:[n])})`;else return`var(${this._var})`}new(t){return new L({[this.k]:f([t])})}prefix(t){if(t)C(this._val).forEach(([n,o])=>{e.p=[n,o]})}}var kt=(t,n)=>{return new L(t,n)};var Zt=new Set(["transitionDuration","transitionDelay","animationDelay","animationDuration"]),et=new Set([...Zt,"zIndex","opacity","aspectRatio","order","flexShrink","flexGrow","flex","fillOpacity","lineClamp","order","webkitLineClamp","animationIterationCount","columnCount"]),pt=new Set(["content"]),at=new Set(["transitionProperty"]);function y(t,n){let o=D(n)?n:[n];return f(o,{rem:!et.has(t),second:Zt.has(t),quote:pt.has(t),delimeter:at.has(t)?", ":" "})}function f(t,{rem:n=!1,degree:o=!1,percent:i=!1,quote:g=!1,second:S=!1,delimeter:R=" ",delim_arr:E=!0,perc_arr:F=!1}={}){return t.filter(($)=>$!==void 0).map(($)=>{if(D($))return f($,{rem:F?!1:n,degree:F?!1:o,percent:F?F:i,delimeter:E?R:" ",quote:g});if($ instanceof L)return $.__();if(ot($)){let J=$();return f(D(J)?J:[J],{rem:F?!1:n,degree:F?!1:o,percent:F?F:i,delimeter:E?R:" ",quote:g})}if(g)$=String($);if(Et($))if(n)return`${$}rem`;else if(o)return`${$}deg`;else if(i)return`${$}%`;else if(S)return`${$}s`;else return String($);if(z($))if($.includes("("))return $;else if(g)return`'${$}'`;else return $;return""}).join(R)}function vt(t,n={}){let{rem:o=!1,degree:i=!1,percent:g=!1,second:S=!1,quote:R=!1,delimeter:E=" ",delimeter_arr:F=!0,percent_arr:M=!1}=n;return f(D(t)?t:[t],{rem:o,degree:i,percent:g,second:S,quote:R,delimeter:E,delim_arr:F,perc_arr:M})}function xt(...t){return f(t,{rem:!1,degree:!1,percent:!1,second:!1,quote:!1,delimeter:", ",perc_arr:!1,delim_arr:!1})}var ft=(t)=>{if(t instanceof U)return t;if(t instanceof L)return W(t.__(),{});return W(t,{})};class tt{prefix;anim;constructor(t,n=new T){this.prefix=t;this.anim=n}set(t,n,o){if(!A(n))return;let i=new T,g=(S,R)=>{if(S.startsWith(":")||S.startsWith(","))this.set(t+S,R,o);else if(S.startsWith(" ")){let F=S.match(/^.*?\w/gm)?.[0].slice(0,-1),M=S.replaceAll(/, /gm,`, ${t}${F}`);this.set(t+M,R,o)}else if(Ft(S))this.set(t+S,R,o);else i.set(S,this.props(t,S,ft(R)))};if(n instanceof L)this.saveAnim(t,n),i.ass(n._var,this.props(t,n._var,ft(n._val)));else if(n instanceof x)C(n._values).forEach(([S,R])=>{i.set(S,this.props(t,S,ft(R)))});else C(n).forEach(([S,R])=>g(S,R));o.init(t,i).map(i)}props(t,n,o){let i=["animation","animationName"].includes(n);return C(o).forEach(([g,S])=>{if(i)o[g]=y(n,this.addPrefixToAnimation(t,S));else o[g]=y(n,S)}),o}addPrefixToAnimation(t,n){if(n instanceof L)this.saveAnim(t,n);else if(D(n))return n[0]=this.addPrefixToAnimation(t,n[0]),n;else if(z(n)&&!n.includes("("))return n.split(", ").map((g)=>{let S=g.split(" "),R=S[0],E=S.slice(1).join(" "),F=`${this.prefix}${R}`;return this.anim.init(F,new Set).add(t),`${this.prefix}${R} ${E}`.trim()}).join(", ");return n}saveAnim(t,n){$t(n).forEach((o)=>{this.anim.init(`${this.prefix}${o}`,new Set).add(t)})}}var $t=(t,n=[])=>{let o=[];if(D(t))return $t(t[0],o);if(t instanceof L)return $t(K(t._val),o);return o.push(String(t)),o};class d{exportMap;pre;data=new T;cid=new T;cidz=new T;animCLS=new T;DATAX=new T;DATAZ=new T;prefix;DATA;constructor(t,n="",o=!0){this.exportMap=o;this.pre=t,this.prefix=n?n+"_":n,this.DATA=this.exportMap?this.DATAX.init(this.prefix,new T):this.DATAZ.init(this.prefix,new T)}get(t,n){let o=this.pre+n;if(o in this.data)return o;else if(n=="data")return this.data;else if(n=="DATAX")return this.DATAX;else if(n=="DATAZ")return this.DATAZ;else if(n=="cid")return this.cid;else if(n=="cidz")return this.cidz;else if(n=="prefix")return this.prefix;else if(n=="animCLS")return this.animCLS;return}set(t,n,o){return!1}get css(){return new Proxy(this,this)}load(t){if(t.DATAX.size)t.DATAX.forEach((n,o)=>{this.DATAX.init(o,new T).map(n)});if(t.DATAZ.size)t.DATAZ.forEach((n,o)=>{this.DATAZ.init(o,new T).map(n)});if(t.animCLS.size)t.animCLS.forEach((n,o)=>{let i=this.animCLS.init(o,new Set);n.forEach((g)=>{i.add(g)})});return t.data.size&&this.data.map(t.data),this}}class c extends d{PS;constructor(t="",n="",o=!0){super(t,n,o);this.PS=new tt(this.prefix,this.animCLS)}set(t,n,o){let i=this.pre+n;return(D(o)?o:[o]).forEach((S)=>{this.PS.set(i,S,this.DATA)}),!0}get css(){return new Proxy(this,this)}}class u extends d{webkit;PS;constructor(t="",n=!0){super("",t,!1);this.webkit=n;this.PS=new tt(this.prefix)}set(t,n,o){let i=this.prefix+n,g=D(o)?o:[o],S=new T;g.forEach((E)=>{C(E).forEach(([F,M])=>{this.PS.set(F,M,S)})}),this.animCLS.init(i,new Set);let R=`@keyframes ${i}`;if(this.DATA.set(R,S),this.webkit){let E=`@-webkit-keyframes ${i}`;this.DATA.set(E,S)}return!0}get css(){return new Proxy(this,this)}}class _ extends d{constructor(t=""){super("@",t)}set(t,n,o){let i=this.pre+n;if(i in t.data)this.data.get(i)?.push(o);else this.data.set(i,[o]);return t}get css(){return new Proxy(this,this)}}class l extends d{constructor(t=""){super("@font-face",t);this.data.set("@font",[])}set(t,n,o){return this.data.get("@font")?.push(o),!0}get css(){return new Proxy(this,this)}}var ht=(t)=>{let n=(g)=>Array.from(t.matchAll(g),(S)=>S[1]),o=/\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g,i=/#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g;return{classes:[...new Set(n(o))],ids:[...new Set(n(i))]}},tn=(t,n)=>{return t.replaceAll(/\.|\#/g,(o)=>o+n)},jt=(t,n,o,i)=>{if(!t[n])t[n]={[o]:i.split(",").map((g)=>g.trim())};else t[n][o].push(...i.split(",").map((g)=>g.trim()))},nt=(t,n)=>{let o=C(n).map(([i,g])=>`${i}: ${g};`).join(` 
  `);return`${t} {
  ${o}
}`};function Lt(t,n,o=[],i=[]){let g=(S,R=!1)=>{S.forEach((E,F)=>{E.forEach((M,$)=>{M.forEach((J,b)=>{C(J).forEach(([q,w])=>{let P=q,Q=I({[h(b)]:w}),{classes:Z,ids:O}=ht($);[Z,O].flat().forEach((j)=>{if(R){if(t.cid.lacks(j))t.cid.set(j,F+j)}else if(t.cidz.lacks(j))t.cidz.set(j,F+j)});let N=F?tn($,F):$;if(o.length&&N.startsWith(".")||N.startsWith("#")){if([...Z,...O].some((X)=>o.includes(X)||i.length&&i.includes(X)))s(n,P,Q),jt(n,P,Q,N)}else s(n,P,Q),jt(n,P,Q,N)})})})})};return g(t.DATAX,!0),g(t.DATAZ),t}function Nt(t,n,o,i=[],g=[]){t.DATAZ.forEach((S,R)=>{S.forEach((E,F)=>{E.forEach((M,$)=>{let J={};M.forEach((b,q)=>{C(b).forEach(([w,P])=>{let Q=w;if(!J[Q])J[Q]={};J[Q][h(q)]=P})}),C(J).forEach(([b,q])=>{if(i.length){let w=F.split(" ")[1];if(o.has(w)){if([...o.get(w)].some((Z)=>{let{classes:O,ids:N}=ht(Z);return[...O,...N].some((j)=>i.includes(j)||g.length&&g.includes(j))})){let Z=b;s(n,Z,F),n[Z][F].push(nt($,q))}}}else{let w=b;s(n,w,F),n[w][F].push(nt($,q))}})})})})}function Gt(t,n){for(let[o,i]of t.data)for(let g of i){let S=g.includes("(")?g:`"${g}"`;n.push(`${o} ${S.trim()};`)}}function Wt(t,n){t.data.get("@font")?.forEach((i)=>{let g=C(i).map(([S,R])=>`${h(S)}: ${y(S,R)}`).join(`;
	`);n.push(`@font-face {
	${g}
}`)})}var s=(t,n,o)=>{try{if(!t[n])t[n]={},t[n][o]=[];if(!t[n][o])t[n][o]=[]}catch(i){console.error(`property "${n}" not found!`)}};class Ct{css="";cid={};cidz={};constructor(){}updateCid(t){t.forEach((n,o)=>{this.cid[o]=n})}updateCidZ(t){t.forEach((n,o)=>{this.cidz[o]=n})}load(t,n=[],o=[]){let i=U.prop;H(i,U.extra);let g=U.default,S={},R={},E={},F=[];B(i).forEach(($)=>{S[$]={},R[$]={},E[$]={}});let M=new T;return K(t).forEach(($)=>{if($ instanceof c){let J=Lt($,S,n,o);$.animCLS.forEach((b,q)=>{b.forEach((w)=>{M.init(q,new Set).add(w)})}),this.updateCid(J.cid),this.updateCidZ(J.cidz)}else if($ instanceof u)Nt($,R,M,n,o);else if($ instanceof _)Gt($,F);else if($ instanceof l)Wt($,F)}),C(S).forEach(([$,J])=>{if(!E[$])E[$]={};if(J!==void 0)C(J).forEach(([b,q])=>{let w=q.join(", ");if(!E[$][w])E[$][w]={};H(E[$][w],V(b))})}),C(E).forEach(([$,J])=>{let b=[];if(C(J).forEach(([q,w])=>b.push(nt(q,w))),R[$])C(R[$]).forEach(([q,w])=>{b.push(`${q} {
${w.join(`
`)}
}`)});if(b.length)if(F.push(`/* -------------- ${$+($==g?" ( default )":"")} */`),$==g)F.push(b.join(`
`));else{let q=$.split("-").map((w)=>i[w]).join(" and ");F.push(`@media ${q}	{
${b.join(`
`)}
}`)}}),this.css=F.join(`
`),this}}var Ii={important:" !important",visible:"visible",hidden:"hidden",auto:"auto",none:"none",clip:"clip",scroll:"scroll",initial:"initial",inherit:"inherit",flex:"flex",center:"center",flex_start:"flex-start",flex_end:"flex-end",space_evenly:"space-evenly",stretch:"stretch",wrap:"wrap",column:"column",column_reverse:"column-reverse",row:"row",row_reverse:"row-reverse",space_between:"space-between",space_around:"space-around",pr100:"100%",pr50:"50%",i100vh:"100vh",i100vw:"100vw",block:"block",sticky:"sticky",fixed:"fixed",absolute:"absolute",relative:"relative",pointer:"pointer",grabbing:"grabbing",checkbox:"checkbox",solid:"solid",inset:"inset",bold:"bold",currentColor:"currentColor",forwards:"forwards",text:"text",norepeat:"no-repeat",nowrap:"nowrap",difference:"difference",preserve3d:"preserve-3d"};function r(t){return function(...n){let o=n.reduce((i,g)=>{if(g instanceof L)i[g._var]=g._val;else if(A(g))H(i,g);return i},{});if(t.startsWith("::before")||t.startsWith("::after")){let i=o.content;o.content=i!==void 0?i:""}return{[t]:o}}}class nn{static attr(t){let[n,o]=C(t)[0];return r(`[${n}="${o}"]`)}static after(t=""){return r("::after"+t)}static before(t=""){return r("::before"+t)}static backdrop(t=""){return r("::backdrop"+t)}static cue(t=""){return r("::cue"+t)}static cueRegion(t=""){return r("::cue-region"+t)}static firstLetter(t=""){return r("::first-letter"+t)}static firstLine(t=""){return r("::first-line"+t)}static marker(t=""){return r("::marker"+t)}static part(t=""){return r("::part"+t)}static placeholder(t=""){return r("::placeholder"+t)}static selection(t=""){return r("::selection"+t)}static slotted(t=""){return r("::slotted"+t)}static spellingError(t=""){return r("::spelling-error"+t)}static targetText(t=""){return r("::target-text"+t)}static viewTransition(t=""){return r("::view-transition"+t)}static viewTransitionGroup(t=""){return r("::view-transition-group"+t)}static viewTransitionImagePair(t=""){return r("::view-transition-image-pair"+t)}static viewTransitionNew(t=""){return r("::view-transition-new"+t)}static viewTransitionOld(t=""){return r("::view-transition-old"+t)}static scrollbar(t=""){return r("::-webkit-scrollbar"+t)}static scrollbarThumb(t=""){return r("::-webkit-scrollbar-thumb"+t)}static scrollbarTrack(t=""){return r("::-webkit-scrollbar-track"+t)}static scrollbarCorner(t=""){return r("::-webkit-scrollbar-corner"+t)}static active(t=""){return r(":active"+t)}static anyLink(t=""){return r(":any-link"+t)}static autofill(t=""){return r(":autofill"+t)}static blank(t=""){return r(":blank"+t)}static checked(t=""){return r(":checked"+t)}static current(t=""){return r(":current"+t)}static default(t=""){return r(":default"+t)}static defined(t=""){return r(":defined"+t)}static disabled(t=""){return r(":disabled"+t)}static empty(t=""){return r(":empty"+t)}static enabled(t=""){return r(":enabled"+t)}static first(t=""){return r(":first"+t)}static firstChild(t=""){return r(":first-child"+t)}static firstOfType(t=""){return r(":first-of-type"+t)}static fullscreen(t=""){return r(":fullscreen"+t)}static future(t=""){return r(":future"+t)}static focus(t=""){return r(":focus"+t)}static focusVisible(t=""){return r(":focus-visible"+t)}static focusWithin(t=""){return r(":focus-within"+t)}static host(t=""){return r(":host"+t)}static hover(t=""){return r(":hover"+t)}static indeterminate(t=""){return r(":indeterminate"+t)}static inRange(t=""){return r(":in-range"+t)}static invalid(t=""){return r(":invalid"+t)}static lastChild(t=""){return r(":last-child"+t)}static lastOfType(t=""){return r(":last-of-type"+t)}static left(t=""){return r(":left"+t)}static link(t=""){return r(":link"+t)}static localLink(t=""){return r(":local-link"+t)}static modal(t=""){return r(":modal"+t)}static onlyChild(t=""){return r(":only-child"+t)}static onlyOfType(t=""){return r(":only-of-type"+t)}static optional(t=""){return r(":optional"+t)}static outOfRange(t=""){return r(":out-of-range"+t)}static past(t=""){return r(":past"+t)}static pictureInPicture(t=""){return r(":picture-in-picture"+t)}static placeholderShown(t=""){return r(":placeholder-shown"+t)}static paused(t=""){return r(":paused"+t)}static playing(t=""){return r(":playing"+t)}static readOnly(t=""){return r(":read-only"+t)}static readWrite(t=""){return r(":read-write"+t)}static required(t=""){return r(":required"+t)}static right(t=""){return r(":right"+t)}static root(t=""){return r(":root"+t)}static scope(t=""){return r(":scope"+t)}static target(t=""){return r(":target"+t)}static targetWithin(t=""){return r(":target-within"+t)}static userInvalid(t=""){return r(":user-invalid"+t)}static valid(t=""){return r(":valid"+t)}static visited(t=""){return r(":visited"+t)}static dir(t){return r(`:dir(${t})`)}static has(t){return r(`:has(${t})`)}static host_(t){return r(`:host(${t})`)}static hostContext(t){return r(`:host-context(${t})`)}static is(t){return r(`:is(${t})`)}static lang(t){return r(`:lang(${t})`)}static not(t){return r(`:not(${t})`)}static nthChild(t){return r(`:nth-child(${t})`)}static nthCol(t){return r(`:nth-col(${t})`)}static nthLastChild(t){return r(`:nth-last-child(${t})`)}static nthLastCol(t){return r(`:nth-last-col(${t})`)}static nthLastOfType(t){return r(`:nth-last-of-type(${t})`)}static nthOfType(t){return r(`:nth-of-type(${t})`)}static state(t){return r(`:state(${t})`)}static where(t){return r(`:where(${t})`)}static and(t){return r(", "+t)}static child(t){return r(" > "+t)}static desc(t){return r(" "+t)}static next(t){return r(" + "+t)}static general(t){return r(" ~ "+t)}static _with(t){if(!(t.startsWith(".")||t.startsWith("#")))throw Error("should start with . or # - class / id");return r(t)}}class on{static attr(t,n,o){return`attr(${f([t,n,o])})`}static blur(t){return`blur(${f([t],{rem:!0})})`}static brightness(t){return`brightness(${f([t])})`}static calc(...t){return`calc(${f(t,{rem:!0})})`}static circle(t,n){return`circle(${f([t,n],{rem:!0})})`}static clamp(t,n,o){return`clamp(${f([t,n,o],{rem:!0,delimeter:", "})})`}static colorMix(t,n,o){return`color-mix(${f([t,f(n),f(o)],{delimeter:", "})})`}static conicGradient(...t){return`conic-gradient(${f(t,{delimeter:", ",delim_arr:!1})})`}static contrast(t){return`contrast(${f([t])})`}static cubicBezier(t,n,o,i){return`cubic-bezier(${f([t,n,o,i],{delimeter:", "})})`}static dropShadow(...t){return`drop-shadow(${f(t,{rem:!0})})`}static grayscale(t){return`grayscale(${f([t])})`}static hsl(t,n,o){return`hsl(${f([t,n,o])})`}static hsla(t,n,o,i){return`hsl(${f([t,n,o,i?["/",i]:i])})`}static hueRotate(t){return`hue-rotate(${f([t],{degree:!0})})`}static inset(...t){return`inset(${f(t,{rem:!0})})`}static invert(t){return`invert(${f([t])})`}static linearGradient(...t){return`linear-gradient(${f(t,{delim_arr:!1,delimeter:", "})})`}static matrix(t,n,o,i,g,S){return`matrix(${f([t,n,o,i,g,S],{delimeter:", "})})`}static matrix3d(t,n,o,i){return`matrix3d(${f([t,n,o,i],{delimeter:", "})})`}static max(...t){return`max(${f(t,{rem:!0,delimeter:", "})})`}static min(...t){return`min(${f(t,{rem:!0,delimeter:", "})})`}static opacity(t){return`opacity(${f([t])})`}static path(t){return`path(${f([t],{quote:!0})})`}static clipPath(t,n){return`path(${f([t,f([n],{quote:!0})],{delimeter:", "})})`}static perspective(t){return`perspective(${f([t])})`}static polygon(...t){return`polygon(${f(t,{percent:!0,delimeter:", "})})`}static radialGradient(...t){return`radial-gradient(${f(t,{delim_arr:!1,perc_arr:!0,delimeter:", "})})`}static repeatingConicGradient(...t){return`repeating-conic-gradient(${f(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingLinearGradient(...t){return`repeating-linear-gradient(${f(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingRadialGradient(...t){return`repeating-radial-gradient(${f(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static rgb(t,n,o){return`rgb(${f([t,n,o])})`}static rgba(t,n,o,i){return`rgba(${f([t,n,o,i?["/",i]:i])})`}static rotate(t){return`rotate(${f([t],{degree:!0})})`}static rotate3d(t,n,o,i){return`rotate3d(${f([f([t,n,o],{delimeter:", "}),i],{degree:!0,delimeter:", "})})`}static rotateX(t){return`rotateX(${f([t],{degree:!0})})`}static rotateY(t){return`rotateY(${f([t],{degree:!0})})`}static rotateZ(t){return`rotateZ(${f([t],{degree:!0})})`}static saturate(...t){return`saturate(${f(t)})`}static scale(t,n){return`scale(${f([t,n],{delimeter:", "})})`}static scale3d(t,n,o){return`scale3d(${f([t,n,o],{delimeter:", "})})`}static scaleX(t){return`scaleX(${f([t])})`}static scaleY(t){return`scaleY(${f([t])})`}static scaleZ(t){return`scaleZ(${f([t])})`}static sepia(t){return`sepia(${f([t])})`}static skew(...t){return`skew(${f(t,{degree:!0,delimeter:", "})})`}static skewX(t){return`skewX(${f([t],{degree:!0})})`}static skewY(t){return`skewY(${f([t],{degree:!0})})`}static translate(...t){return`translate(${f(t,{rem:!0,delimeter:", "})})`}static translate3d(...t){return`translate3d(${f(t,{rem:!0,delimeter:", "})})`}static translateX(t){return`translateX(${f([t],{rem:!0})})`}static translateY(t){return`translateY(${f([t],{rem:!0})})`}static translateZ(...t){return`translateZ(${f(t,{rem:!0,delimeter:", "})})`}static url(t){return`url(${f([t])})`}static var(t,n=""){t="--"+h(t);let o=n?", "+f([n],{rem:!0,delimeter:", "}):"";return`var(${f([t],{rem:!0})}${o})`}}class rn{name;prefix;save;exportMap=!1;cids=new T;constructor({name:t,prefix:n,sweetSS:o=[],exportMap:i=!0,webkitKeyframes:g}){this.name=t,this.prefix=n??"",this.exportMap=i;let S=D(o)?o:[o];fn.call(this,this.prefix,S,g,i),this.save=({dir:R,mapDir:E,mapName:F,minify:M=!0,shaker:$=[],include:J=[]})=>{let b=new Ct().load(this,$,J),q=D(R)?R:[R],w=M?Sn(b.css):b.css;q.forEach((Q)=>{if(!Q)return;let Z=Q.endsWith("/")?"":"/",O=Q+Z+t+".css";v(Q+Z),a(O),Ot(O,w)});let P=E?E:q[0]??"";if(P){let Q=P.endsWith("/")?"":"/",Z=F?F:"css",O=P+Q+Z+".js";v(P+Q),a(O),this.cids.init(t,{});let N=this.cids.get(t),j=i?b.cid:b.cidz;C(j).forEach(([X,Rt])=>{if(N[X])N[X]=Rt+" "+N[X];else N[X]=Rt}),gn(O,this.cids)}}}}var gn=(t,n)=>{let o={};n.values().forEach((g)=>{C(g).forEach(([S,R])=>{if(!o[S])o[S]=[R];else o[S].push(R)})});let i=C(o).map(([g,S])=>{return`${g}="${S.join(" ")}"`}).sort((g,S)=>g.localeCompare(S,void 0,{numeric:!0}));Ot(t,i.length?`export const ${i.join()};`:"");return},Sn=(t)=>{return t.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").trim()};function fn(t,n,o=!0,i=!1){let g={dom:new c("",t,i),id:new c("#",t,i),cx:new c(".",t,i),kf:new u(t,o),at:new _,font:new l};n.forEach((S)=>{B(g).forEach((R)=>{g[R].load(S[R])})}),B(g).forEach((S)=>{g[S]=g[S].css}),H(this,g)}function $r(t){return t.split("/").slice(-1)[0].split(".")[0]}export{vt as value,Ii as v,nn as ps,U as media,W as med,xt as join,$r as fileName,on as f,Ut as __,kt as Var,rn as SweetSS,x as Medyas,e as $$};
