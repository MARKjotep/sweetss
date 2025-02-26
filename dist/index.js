// @bun
var At=Object.defineProperty;var Vt=(t,n)=>{for(var o in n)At(t,o,{get:n[o],enumerable:!0,configurable:!0,set:(i)=>n[o]=()=>i})};import{writeFileSync as mt}from"fs";var Ct={};Vt(Ct,{isWindow:()=>_t,isUndefined:()=>ut,isStr:()=>V,isPlainObject:()=>yt,isObj:()=>Y,isNumber:()=>I,isNum:()=>St,isNull:()=>Jt,isNotWindow:()=>Dt,isInt:()=>$t,isFN:()=>x,isDict:()=>zt,isClassOrId:()=>gt,isBool:()=>ht,isAsync:()=>ct,isArraybuff:()=>dt,isArr:()=>J});var x=(t)=>typeof t==="function",ct=(t)=>t.constructor.name==="AsyncFunction",I=(t)=>{return!isNaN(parseFloat(t))&&isFinite(t)},zt=(t)=>{return typeof t==="object"&&t!==null&&!Array.isArray(t)},yt=(t)=>{return typeof t==="object"&&t!==null&&Object.getPrototypeOf(t)===Object.prototype},dt=(t)=>{return t instanceof Uint8Array||t instanceof ArrayBuffer||typeof t==="string"},gt=(t)=>{return t.startsWith(".")||t.startsWith("#")},ht=(t)=>typeof t==="boolean",V=(t)=>typeof t==="string",J=(t)=>Array.isArray(t),Y=(t)=>typeof t==="object",St=(t)=>typeof t==="number",Jt=(t)=>t===null,ut=(t)=>typeof t==="undefined",$t=(t)=>{return Number.isInteger(Number(t))},_t=typeof window!=="undefined",Dt=typeof window==="undefined";class tt{static set p(t){if(Array.isArray(t))console.log(...t);else console.log(t)}}class Ft{_c=0;_id="";constructor(t){if(this._c=0,this._id=t??d(5),t?.includes("-")){let[n,o]=[t.split("-").slice(0,-1).join("-"),t.split("-").slice(-1)[0]];this._id=n,this._c=I(o)?parseInt(o):0}}get id(){return this._id+"-"+this._c}get mid(){return this._id+"-"+ ++this._c}}var Nn=new RegExp(/(\d+)(\d*)/,"m"),lt=(t)=>Array.from({length:t},(n,o)=>o),st="ABCDEFGHIJKLMNOPQRSTUVWXYZ",pt="abcdefghijklmnopqrstuvwxyz",et=lt(10).join("");var O=(t)=>JSON.stringify(t),c=(t)=>{return JSON.parse(t)},G=(t)=>{if(t.startsWith("webkit"))t="-"+t;return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},d=(t)=>{let n=st+pt;return Array.from({length:t},(o,i)=>n+(i?et:"")).reduce((o,i)=>{return o+=i.charAt(Math.floor(Math.random()*i.length))},"")};class w extends Map{obj(t){t&&F(t).forEach(([n,o])=>this.set(n,o))}map(t){t.forEach((n,o)=>{if(n instanceof w)this.set(o,n);else if(J(n)){if(this.lacks(o))this.set(o,[]);this.get(o).push(...n)}else if(Y(n))this.ass(o,n);else this.set(o,n)})}ass(t,n){if(!this.has(t))this.set(t,{});H(this.get(t),n)}lacks(t){return!this.has(t)}init(t,n){return this.has(t)?this.get(t):this.set(t,n).get(t)}}var{values:B,keys:X,entries:F}=Object;var qt=Object.hasOwn;var H=Object.assign,Qt=(t)=>{return Object.keys(t).length};var m=(t,n)=>{return{name:t,content:n}},kt=(t,n)=>{return{property:t,content:n}},at=(t,n)=>{return{"http-equiv":t,content:n}};class ft{metas=[];constructor(t){t&&this.metas.push(m("description",t))}author(t){return this.meta=m("author",t),this}charset(t){return this.meta={charset:t},this}keywords(...t){return this.meta=m("keywords",t.join(", ")),this}viewport(t){let n=F(t).map(([o,i])=>[G(o),String(i)].join("="));return this.meta=m("viewport",n.join(", ")),this}httpEquiv(t){return F(t).forEach(([n,o])=>{this.meta=at(G(n),String(o))}),this}robots(...t){return this.meta=m("robots",t.join(", ")),this}themeColor(t){return this.meta=m("theme-color",t),this}openGraph(t){return F(t).forEach(([n,o])=>{this.meta=kt("og:"+n,String(o))}),this}twitter(t){return F(t).forEach(([n,o])=>{this.meta=m("twitter:"+n,String(o))}),this}and(t){return this}set meta(t){this.metas.push(t)}}var vt=["charset","name","property","http-equiv"],Pt=(t,n)=>{n.forEach((o)=>{for(let i of vt)if(i in o){let g=o[i];t[`${i}_${i==="charset"?"":g}`]=o}})},xt=(t,n)=>{n.forEach((o)=>{if("href"in o){let i=o.href;t[`${i}`]=o}})};class Ht{_head;idm;constructor(t){this._head=new w(t)}set head(t){F(t).forEach(([n,o])=>{if(n==="title"||n==="base"){if(o!==void 0)this._head.set(n,o);return}if(o instanceof ft)return Pt(this._head.init("meta",{}),o.metas);if(!J(o))return;switch(n){case"meta":return Pt(this._head.init("meta",{}),o);case"link":return xt(this._head.init("link",{}),o);case"script":if(o.length){this._head.init(n,[]);let i=o.map((g)=>{if(!g.yid&&this.idm)g.yid="sc"+this.idm.mid;return g});this._head.get(n).push(...i)}return}})}get head(){return this._head}set id(t){this.idm=new Ft(t)}}class tn{lang="en";htmlHead=new w;head;constructor(){this.head=(t={})=>{let n=new Ht(this.htmlHead);n.head=t,this.htmlHead=n.head}}}var Ut=(t,n=!1)=>{if(I(t))return[+t,$t(t)?"int":"float"];if(n&&/\.\w+$/.test(t))return[t,"file"];if(t==="/")return[t,"-"];if(t.length===36&&t.match(/\-/g)?.length===4)return[t,"uuid"];return[t,"string"]},Rt=(t)=>{let n=t.startsWith("/")?t:"/"+t,o=n.match(/(?<=\/)[^/].*?(?=\/|$)/g)??["/"],[i,g]=o.reduce(([S,f],E)=>{if(E.includes("<")){let R=E.match(/(?<=<)[^/].*?(?=>|$)/g);if(R?.length){let[D,C]=R[0].split(":");if(D&&C)S.push(D),f.push(C)}}else S.push(E===">"?"/":E);return[S,f]},[[],[]]);if(n.endsWith("/")&&n.length>1)i.push("/");return{parsed:i,args:g}};class nt{storage=new w;cache(t,n){if(this.storage.lacks(t))this.storage.set(t,n());return this.storage.get(t)}}var nn=["int","float","file","uuid","string"],on=new nt;class jt{_storage=new w;set(t){let{parsed:n,path:o}=t,i=O(n);if(!this._storage.get(i))this._storage.set(i,t);else throw`path: ${o} already used.`}get(t){let{parsed:n}=on.cache(t,()=>Rt(t)),o={},i=this._storage.get(O(n));if(!i&&t!=="/")for(let g of this._storage.keys()){let S=[],f=c(g);if(n.length===f.length){let E=f.map((C,T)=>{let h=Ut(n[T],n.length-1===T);if(C===h[0])return h[0];if(nn.includes(h[1]))return S.push(h[0]),h[1];return C}),R=O(E);if(this._storage.has(R)){i=this._storage.get(R),i?.args.forEach((C,T)=>{o[C]=S[T]});break}}}return[i,o]}}class Mt{static rand(t=6,n){if(n)return Math.floor(Math.random()*(n-t+1)+t);return Math.floor(Math.random()*t)+1-1}static fill(t,n=null){return Array(t).fill(n)}static new({dom:t,id:n,inner:o}){let i=document.createElement(t);if(n)i.id=n;if(o)i.innerHTML=o;return i}static randFrom(t){if(Array.isArray(t)){let n=t.length,o=this.rand(0,n-1);return t[o]}else if(typeof t=="object"){let n=X(t),o=n.length,i=this.rand(0,o-1);return n[i]}}static makeID=d;static class(t,n){let o=n;if(t?.class)o.push(...J(t.class)?t.class:[t.class]);t.class=n}static get O(){return{vals:B,keys:X,items:F,has:qt,ass:H,len:(t={})=>X(t).length}}static get is(){return Ct}static get return(){return Zt}}class Zt{static array(t){return J(t)?t:[t]}}import{mkdirSync as rn,writeFileSync as gn,existsSync as Lt}from"fs";var ot=(t,n="")=>{if(Lt(t))return!0;return gn(t,n,{flag:"wx"}),!0},it=(t)=>{if(Lt(t))return!0;return rn(t,{recursive:!0}),!0};var Gt={xs:"480px",sm:"480px",smd:"624px",md:"768px",lg:"1024px",xl:"1280px",xxl:"1536px"};class U{static default="xs";static prop=F(Gt).reduce((t,[n,o],i)=>{return t[n]=`(${i==0?"max-width":"min-width"}: ${o})`,t},{});static extra={no_hover:"(pointer: coarse)",print:"print",screen:"screen",dark:"(prefers-color-scheme: dark)"};constructor(t,n={}){let o=U.default,i={};if(t!==void 0)z(i,o,t,o);F(n).forEach(([g,S])=>{z(i,g,S,o)}),H(this,i)}static new(t){F(t).forEach(([n,o])=>{if(!this.extra[n])this.extra[n]=`(${o})`})}static get breakpoints(){return c(O(Gt))}}var z=(t,n,o,i)=>{if(o!==void 0)if(o instanceof U)F(o).forEach(([g,S])=>{if(i!==n)if(n!==g)if(i===g)z(t,n,S,i);else z(t,`${n}-${g}`,S,i);else z(t,g,S,i);else z(t,g,S,i)});else t[n]=o};function j(t,n){if(n)return new U(t,n);return new U(void 0,t)}function Sn(t){if(this._prefix)return j({[this._prefix]:t});else return j({xs:t})}function W(t){return new this.constructor({prefix:t,values:this._values,data:this.data})}class y{_prefix;data;_values;constructor({prefix:t,data:n,values:o}={data:{},values:{}}){this._prefix=t,this._values=o,F(o).forEach(([i,g])=>{if(!this._values[i])this._values[i]=j({});H(this._values[i],g)}),this.data=n}get XS(){return W.call(this,"xs")}get SM(){return W.call(this,"sm")}get SMD(){return W.call(this,"smd")}get MD(){return W.call(this,"md")}get LG(){return W.call(this,"lg")}get XL(){return W.call(this,"xl")}get XXL(){return W.call(this,"xxl")}get NO_HOVER(){return W.call(this,"no_hover")}get PRINT(){return W.call(this,"print")}get SCREEN(){return W.call(this,"screen")}get DARK(){return W.call(this,"dark")}set _value(t){F(t).forEach(([n,o])=>{if(!this._values[n])this._values[n]=j({});H(this._values[n],Sn.call(this,o))})}get _value(){return this._values}}class N{_var="";k="";_cvar="";fallback;_val;constructor(t={},n){if(Qt(t)){let[o,i]=F(t)[0];this.k=o,this._var="--"+G(o),this._val=i instanceof U?i:j(i,{}),this.fallback=n}else this._val=j({})}__(t){if(t)this.fallback=t;let n=this.fallback;if(n)return`var(${this._var}, ${$(J(n)?n:[n])})`;else return`var(${this._var})`}new(t){return new N({[this.k]:t instanceof U?t:$([t])})}prefix(t){if(t)F(this._val).forEach(([n,o])=>{tt.p=[n,o]})}}var $n=(t,n)=>{return new N(t,n)};var Nt=new Set(["transitionDuration","transitionDelay","animationDelay","animationDuration"]),Cn=new Set([...Nt,"zIndex","opacity","aspectRatio","order","flexShrink","flexGrow","flex","fillOpacity","lineClamp","order","webkitLineClamp","animationIterationCount","animationTimingFunction","transitionTimingFunction","columnCount","gridColumn","gridRow","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd"]),Fn=new Set(["content"]),fn=new Set(["transitionProperty"]);function u(t,n){let o=J(n)?n:[n];return $(o,{rem:!Cn.has(t),second:Nt.has(t),quote:Fn.has(t),delimeter:fn.has(t)?", ":" "})}function $(t,{rem:n=!1,degree:o=!1,percent:i=!1,quote:g=!1,second:S=!1,delimeter:f=" ",delim_arr:E=!0,perc_arr:R=!1}={}){return t.filter((C)=>C!==void 0).map((C)=>{if(J(C))return $(C,{rem:R?!1:n,degree:R?!1:o,percent:R?R:i,delimeter:E?f:" ",quote:g});if(C instanceof N)return C.__();if(x(C)){let T=C();return $(J(T)?T:[T],{rem:R?!1:n,degree:R?!1:o,percent:R?R:i,delimeter:E?f:" ",quote:g})}if(g)C=String(C);if(St(C))if(n)return`${C}rem`;else if(o)return`${C}deg`;else if(i)return`${C}%`;else if(S)return`${C}s`;else return String(C);if(V(C))if(C.includes("("))return C;else if(g)return`'${C}'`;else return C;return""}).join(f)}function Rn(t,n={}){let{rem:o=!1,degree:i=!1,percent:g=!1,second:S=!1,quote:f=!1,delimeter:E=" ",delimeter_arr:R=!0,percent_arr:D=!1}=n;return $(J(t)?t:[t],{rem:o,degree:i,percent:g,second:S,quote:f,delimeter:E,delim_arr:R,perc_arr:D})}function En(...t){return $(t,{rem:!1,degree:!1,percent:!1,second:!1,quote:!1,delimeter:", ",perc_arr:!1,delim_arr:!1})}var Et=(t)=>{if(t instanceof U)return t;if(t instanceof N)return j(t.__(),{});return j(t,{})};class rt{prefix;anim;constructor(t,n=new w){this.prefix=t;this.anim=n}set(t,n,o){if(!Y(n))return;let i=new w,g=(S,f)=>{if(S.startsWith(":")||S.startsWith(","))this.set(t+S,f,o);else if(S.startsWith(" ")){let R=S.match(/^.*?\w/gm)?.[0].slice(0,-1),D=S.replaceAll(/, /gm,`, ${t}${R}`);this.set(t+D,f,o)}else if(gt(S))this.set(t+S,f,o);else i.set(S,this.props(t,S,Et(f)))};if(n instanceof N)this.saveAnim(t,n),i.ass(n._var,this.props(t,n._var,Et(n._val)));else if(n instanceof y)F(n._values).forEach(([S,f])=>{i.set(S,this.props(t,S,Et(f)))});else if(J(n))n.forEach((S)=>{this.set(t,S,o)});else F(n).forEach(([S,f])=>g(S,f));o.init(t,i).map(i)}props(t,n,o){let i=["animation","animationName"].includes(n);return F(o).forEach(([g,S])=>{if(i)o[g]=u(n,this.addPrefixToAnimation(t,S));else o[g]=u(n,S)}),o}addPrefixToAnimation(t,n){if(n instanceof N)this.saveAnim(t,n);else if(J(n))return n[0]=this.addPrefixToAnimation(t,n[0]),n;else if(V(n)&&!n.includes("("))return n.split(", ").map((g)=>{let S=g.split(" "),f=S[0],E=S.slice(1).join(" "),R=`${this.prefix}${f}`;return this.anim.init(R,new Set).add(t),`${this.prefix}${f} ${E}`.trim()}).join(", ");return n}saveAnim(t,n){wt(n).forEach((o)=>{this.anim.init(`${this.prefix}${o}`,new Set).add(t)})}}var wt=(t,n=[])=>{let o=[];if(J(t))return wt(t[0],o);if(t instanceof N)return wt(B(t._val),o);return o.push(String(t)),o};class _{exportMap;pre;data=new w;cid=new w;cidz=new w;animCLS=new w;DATAX=new w;DATAZ=new w;prefix;DATA;constructor(t,n="",o=!0){this.exportMap=o;this.pre=t,this.prefix=n?n+"_":n,this.DATA=this.exportMap?this.DATAX.init(this.prefix,new w):this.DATAZ.init(this.prefix,new w)}get(t,n){let o=this.pre+n;if(o in this.data)return o;else if(n=="data")return this.data;else if(n=="DATAX")return this.DATAX;else if(n=="DATAZ")return this.DATAZ;else if(n=="cid")return this.cid;else if(n=="cidz")return this.cidz;else if(n=="prefix")return this.prefix;else if(n=="animCLS")return this.animCLS;return}set(t,n,o){return!1}get css(){return new Proxy(this,this)}load(t){if(t.DATAX.size)t.DATAX.forEach((n,o)=>{this.DATAX.init(o,new w).map(n)});if(t.DATAZ.size)t.DATAZ.forEach((n,o)=>{this.DATAZ.init(o,new w).map(n)});if(t.animCLS.size)t.animCLS.forEach((n,o)=>{let i=this.animCLS.init(o,new Set);n.forEach((g)=>{i.add(g)})});return t.data.size&&this.data.map(t.data),this}}class A extends _{PS;constructor(t="",n="",o=!0){super(t,n,o);this.PS=new rt(this.prefix,this.animCLS)}set(t,n,o){let i=this.pre+n;return(J(o)?o:[o]).forEach((S)=>{this.PS.set(i,S,this.DATA)}),!0}get css(){return new Proxy(this,this)}}class l extends _{webkit;PS;constructor(t="",n=!0){super("",t,!1);this.webkit=n;this.PS=new rt(this.prefix)}set(t,n,o){let i=this.prefix+n,g=J(o)?o:[o],S=new w;g.forEach((E)=>{F(E).forEach(([R,D])=>{let C=I(R)?`${R}%`:R;this.PS.set(C,D,S)})}),this.animCLS.init(i,new Set);let f=`@keyframes ${i}`;if(this.DATA.set(f,S),this.webkit){let E=`@-webkit-keyframes ${i}`;this.DATA.set(E,S)}return!0}get css(){return new Proxy(this,this)}}class s extends _{constructor(t=""){super("@",t)}set(t,n,o){let i=this.pre+n;if(i in t.data)this.data.get(i)?.push(o);else this.data.set(i,[o]);return t}get css(){return new Proxy(this,this)}}class p extends _{constructor(t=""){super("@font-face",t);this.data.set("@font",[])}set(t,n,o){return this.data.get("@font")?.push(o),!0}get css(){return new Proxy(this,this)}}var Wt=(t)=>{let n=(g)=>Array.from(t.matchAll(g),(S)=>S[1]),o=/\.(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g,i=/#(?![0-9])([a-zA-Z0-9_-]+)(?![^{]*})/g;return{classes:[...new Set(n(o))],ids:[...new Set(n(i))]}},wn=(t,n)=>{return t.replaceAll(/\.|\#/g,(o)=>o+n)},Kt=(t,n,o,i)=>{if(!t[n])t[n]={[o]:i.split(",").map((g)=>g.trim())};else t[n][o].push(...i.split(",").map((g)=>g.trim()))},e=(t,n)=>{let o=F(n).map(([i,g])=>`${i}: ${g};`).join(` 
  `);return`${t} {
  ${o}
}`};function Ot(t,n,o=[],i=[]){let g=(S,f=!1)=>{S.forEach((E,R)=>{E.forEach((D,C)=>{D.forEach((T,h)=>{F(T).forEach(([P,b])=>{let q=P,K=O({[G(h)]:b}),{classes:M,ids:Z}=Wt(C);[M,Z].flat().forEach((Q)=>{if(f){if(t.cid.lacks(Q))t.cid.set(Q,R+Q)}else if(t.cidz.lacks(Q))t.cidz.set(Q,R+Q)});let L=R?wn(C,R):C;if(o.length&&L.startsWith(".")||L.startsWith("#")){if([...M,...Z].some((a)=>o.includes(a)||i.length&&i.includes(a)))k(n,q,K),Kt(n,q,K,L)}else k(n,q,K),Kt(n,q,K,L)})})})})};return g(t.DATAX,!0),g(t.DATAZ),t}function Xt(t,n,o,i=[],g=[]){t.DATAZ.forEach((S,f)=>{S.forEach((E,R)=>{E.forEach((D,C)=>{let T={};D.forEach((h,P)=>{F(h).forEach(([b,q])=>{let K=b;if(!T[K])T[K]={};T[K][G(P)]=q})}),F(T).forEach(([h,P])=>{if(i.length){let b=R.split(" ")[1];if(o.has(b)){if([...o.get(b)].some((M)=>{let{classes:Z,ids:L}=Wt(M);return[...Z,...L].some((Q)=>i.includes(Q)||g.length&&g.includes(Q))})){let M=h;k(n,M,R),n[M][R].push(e(C,P))}}}else{let b=h;k(n,b,R),n[b][R].push(e(C,P))}})})})})}function Bt(t,n){for(let[o,i]of t.data)for(let g of i){let S=g.includes("(")?g:`"${g}"`;n.push(`${o} ${S.trim()};`)}}function It(t,n){t.data.get("@font")?.forEach((i)=>{let g=F(i).map(([S,f])=>`${G(S)}: ${u(S,f)}`).join(`;
	`);n.push(`@font-face {
	${g}
}`)})}var k=(t,n,o)=>{try{if(!t[n])t[n]={},t[n][o]=[];if(!t[n][o])t[n][o]=[]}catch(i){console.error(`property "${n}" not found!`)}};class bt{css="";cid={};cidz={};constructor(){}updateCid(t){t.forEach((n,o)=>{this.cid[o]=n})}updateCidZ(t){t.forEach((n,o)=>{this.cidz[o]=n})}load(t,n=[],o=[]){let i=U.prop;H(i,U.extra);let g=U.default,S={},f={},E={},R=[];X(i).forEach((C)=>{S[C]={},f[C]={},E[C]={}});let D=new w;return B(t).forEach((C)=>{if(C instanceof A){let T=Ot(C,S,n,o);C.animCLS.forEach((h,P)=>{h.forEach((b)=>{D.init(P,new Set).add(b)})}),this.updateCid(T.cid),this.updateCidZ(T.cidz)}else if(C instanceof l)Xt(C,f,D,n,o);else if(C instanceof s)Bt(C,R);else if(C instanceof p)It(C,R)}),F(S).forEach(([C,T])=>{if(!E[C])E[C]={};if(T!==void 0)F(T).forEach(([h,P])=>{let b=P.join(", ");if(!E[C][b])E[C][b]={};H(E[C][b],c(h))})}),F(E).forEach(([C,T])=>{let h=[],P=[];if(F(T).forEach(([b,q])=>{if(q.animation||q.transition)P.push(e(b,q));else h.push(e(b,q))}),P.length)h.unshift(...P);if(f[C])F(f[C]).forEach(([b,q])=>{h.push(`${b} {
${q.join(`
`)}
}`)});if(h.length)if(R.push(`/* -------------- ${C+(C==g?" ( default )":"")} */`),C==g)R.push(h.join(`
`));else{let b=C.split("-").map((q)=>i[q]).join(" and ");R.push(`@media ${b}	{
${h.join(`
`)}
}`)}}),this.css=R.join(`
`),this}}var yi={important:" !important",visible:"visible",hidden:"hidden",auto:"auto",none:"none",clip:"clip",scroll:"scroll",initial:"initial",inherit:"inherit",flex:"flex",center:"center",flex_start:"flex-start",flex_end:"flex-end",space_evenly:"space-evenly",stretch:"stretch",wrap:"wrap",column:"column",column_reverse:"column-reverse",row:"row",row_reverse:"row-reverse",space_between:"space-between",space_around:"space-around",pr100:"100%",pr50:"50%",i100vh:"100vh",i100vw:"100vw",block:"block",sticky:"sticky",fixed:"fixed",absolute:"absolute",relative:"relative",pointer:"pointer",grabbing:"grabbing",checkbox:"checkbox",solid:"solid",inset:"inset",bold:"bold",currentColor:"currentColor",forwards:"forwards",text:"text",norepeat:"no-repeat",nowrap:"nowrap",difference:"difference",preserve3d:"preserve-3d"};function r(t){return function(...n){let o=n.reduce((i,g)=>{if(g instanceof N)i[g._var]=g._val;if(g instanceof y)F(g._value).forEach(([S,f])=>{if(!i[S])i[S]=j({});H(i[S],f)});else if(Y(g))H(i,g);return i},{});if(t.startsWith("::before")||t.startsWith("::after")){let i=o.content;o.content=i!==void 0?i:""}return{[t]:o}}}class bn{static attr(t){let[n,o]=F(t)[0];return r(`[${n}="${o}"]`)}static after(t=""){return r("::after"+t)}static before(t=""){return r("::before"+t)}static backdrop(t=""){return r("::backdrop"+t)}static cue(t=""){return r("::cue"+t)}static cueRegion(t=""){return r("::cue-region"+t)}static firstLetter(t=""){return r("::first-letter"+t)}static firstLine(t=""){return r("::first-line"+t)}static marker(t=""){return r("::marker"+t)}static part(t=""){return r("::part"+t)}static placeholder(t=""){return r("::placeholder"+t)}static selection(t=""){return r("::selection"+t)}static slotted(t=""){return r("::slotted"+t)}static spellingError(t=""){return r("::spelling-error"+t)}static targetText(t=""){return r("::target-text"+t)}static viewTransition(t=""){return r("::view-transition"+t)}static viewTransitionGroup(t=""){return r("::view-transition-group"+t)}static viewTransitionImagePair(t=""){return r("::view-transition-image-pair"+t)}static viewTransitionNew(t=""){return r("::view-transition-new"+t)}static viewTransitionOld(t=""){return r("::view-transition-old"+t)}static scrollbar(t=""){return r("::-webkit-scrollbar"+t)}static scrollbarThumb(t=""){return r("::-webkit-scrollbar-thumb"+t)}static scrollbarTrack(t=""){return r("::-webkit-scrollbar-track"+t)}static scrollbarCorner(t=""){return r("::-webkit-scrollbar-corner"+t)}static active(t=""){return r(":active"+t)}static anyLink(t=""){return r(":any-link"+t)}static autofill(t=""){return r(":autofill"+t)}static blank(t=""){return r(":blank"+t)}static checked(t=""){return r(":checked"+t)}static current(t=""){return r(":current"+t)}static default(t=""){return r(":default"+t)}static defined(t=""){return r(":defined"+t)}static disabled(t=""){return r(":disabled"+t)}static empty(t=""){return r(":empty"+t)}static enabled(t=""){return r(":enabled"+t)}static first(t=""){return r(":first"+t)}static firstChild(t=""){return r(":first-child"+t)}static firstOfType(t=""){return r(":first-of-type"+t)}static fullscreen(t=""){return r(":fullscreen"+t)}static future(t=""){return r(":future"+t)}static focus(t=""){return r(":focus"+t)}static focusVisible(t=""){return r(":focus-visible"+t)}static focusWithin(t=""){return r(":focus-within"+t)}static host(t=""){return r(":host"+t)}static hover(t=""){return r(":hover"+t)}static indeterminate(t=""){return r(":indeterminate"+t)}static inRange(t=""){return r(":in-range"+t)}static invalid(t=""){return r(":invalid"+t)}static lastChild(t=""){return r(":last-child"+t)}static lastOfType(t=""){return r(":last-of-type"+t)}static left(t=""){return r(":left"+t)}static link(t=""){return r(":link"+t)}static localLink(t=""){return r(":local-link"+t)}static modal(t=""){return r(":modal"+t)}static onlyChild(t=""){return r(":only-child"+t)}static onlyOfType(t=""){return r(":only-of-type"+t)}static optional(t=""){return r(":optional"+t)}static outOfRange(t=""){return r(":out-of-range"+t)}static past(t=""){return r(":past"+t)}static pictureInPicture(t=""){return r(":picture-in-picture"+t)}static placeholderShown(t=""){return r(":placeholder-shown"+t)}static paused(t=""){return r(":paused"+t)}static playing(t=""){return r(":playing"+t)}static readOnly(t=""){return r(":read-only"+t)}static readWrite(t=""){return r(":read-write"+t)}static required(t=""){return r(":required"+t)}static right(t=""){return r(":right"+t)}static root(t=""){return r(":root"+t)}static scope(t=""){return r(":scope"+t)}static target(t=""){return r(":target"+t)}static targetWithin(t=""){return r(":target-within"+t)}static userInvalid(t=""){return r(":user-invalid"+t)}static valid(t=""){return r(":valid"+t)}static visited(t=""){return r(":visited"+t)}static dir(t){return r(`:dir(${t})`)}static has(t){return r(`:has(${t})`)}static host_(t){return r(`:host(${t})`)}static hostContext(t){return r(`:host-context(${t})`)}static is(t){return r(`:is(${t})`)}static lang(t){return r(`:lang(${t})`)}static not(t){return r(`:not(${t})`)}static nthChild(t){return r(`:nth-child(${t})`)}static nthCol(t){return r(`:nth-col(${t})`)}static nthLastChild(t){return r(`:nth-last-child(${t})`)}static nthLastCol(t){return r(`:nth-last-col(${t})`)}static nthLastOfType(t){return r(`:nth-last-of-type(${t})`)}static nthOfType(t){return r(`:nth-of-type(${t})`)}static state(t){return r(`:state(${t})`)}static where(t){return r(`:where(${t})`)}static and(t){return r(", "+t)}static child(t){return r(" > "+t)}static desc(t){return r(" "+t)}static next(t){return r(" + "+t)}static general(t){return r(" ~ "+t)}static _with(t){if(!(t.startsWith(".")||t.startsWith("#")))throw Error("should start with . or # - class / id");return r(t)}}class Yt{static minmax(t,n){return`minmax(${$([t,n],{rem:!0,delimeter:", "})})`}static fitContent(t){return`fit-content(${$([t],{rem:!0})})`}static repeat(t,...n){return`repeat(${$([t,$([n],{rem:!0})],{delimeter:", "})})`}}class Tn extends Yt{static attr(t,n,o){return`attr(${$([t,n,o])})`}static blur(t){return`blur(${$([t],{rem:!0})})`}static brightness(t){return`brightness(${$([t])})`}static calc(...t){return`calc(${$(t,{rem:!0})})`}static circle(t,n){return`circle(${$([t,n],{rem:!0})})`}static clamp(t,n,o){return`clamp(${$([t,n,o],{rem:!0,delimeter:", "})})`}static colorMix(t,n,o){return`color-mix(${$([t,$(n),$(o)],{delimeter:", "})})`}static conicGradient(...t){return`conic-gradient(${$(t,{delimeter:", ",delim_arr:!1})})`}static contrast(t){return`contrast(${$([t])})`}static cubicBezier(t,n,o,i){return`cubic-bezier(${$([t,n,o,i],{delimeter:", "})})`}static dropShadow(...t){return`drop-shadow(${$(t,{rem:!0})})`}static grayscale(t){return`grayscale(${$([t])})`}static hsl(t,n,o){return`hsl(${$([t,n,o])})`}static hsla(t,n,o,i){return`hsl(${$([t,n,o,i?["/",i]:i])})`}static hueRotate(t){return`hue-rotate(${$([t],{degree:!0})})`}static inset(...t){return`inset(${$(t,{rem:!0})})`}static invert(t){return`invert(${$([t])})`}static linearGradient(...t){return`linear-gradient(${$(t,{delim_arr:!1,delimeter:", "})})`}static matrix(t,n,o,i,g,S){return`matrix(${$([t,n,o,i,g,S],{delimeter:", "})})`}static matrix3d(t,n,o,i){return`matrix3d(${$([t,n,o,i],{delimeter:", "})})`}static max(...t){return`max(${$(t,{rem:!0,delimeter:", "})})`}static min(...t){return`min(${$(t,{rem:!0,delimeter:", "})})`}static opacity(t){return`opacity(${$([t])})`}static path(t){return`path(${$([t],{quote:!0})})`}static clipPath(t,n){return`path(${$([t,$([n],{quote:!0})],{delimeter:", "})})`}static perspective(t){return`perspective(${$([t])})`}static polygon(...t){return`polygon(${$(t,{percent:!0,delimeter:", "})})`}static ray(...t){return`ray(${$(t,{degree:!0})})`}static radialGradient(...t){return`radial-gradient(${$(t,{delim_arr:!1,perc_arr:!0,delimeter:", "})})`}static repeatingConicGradient(...t){return`repeating-conic-gradient(${$(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingLinearGradient(...t){return`repeating-linear-gradient(${$(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static repeatingRadialGradient(...t){return`repeating-radial-gradient(${$(t,{delim_arr:!1,degree:!0,perc_arr:!0,delimeter:", "})})`}static rgb(t,n,o){return`rgb(${$([t,n,o])})`}static rgba(t,n,o,i){return`rgba(${$([t,n,o,i?["/",i]:i])})`}static rotate(t){return`rotate(${$([t],{degree:!0})})`}static rotate3d(t,n,o,i){return`rotate3d(${$([$([t,n,o],{delimeter:", "}),i],{degree:!0,delimeter:", "})})`}static rotateX(t){return`rotateX(${$([t],{degree:!0})})`}static rotateY(t){return`rotateY(${$([t],{degree:!0})})`}static rotateZ(t){return`rotateZ(${$([t],{degree:!0})})`}static saturate(...t){return`saturate(${$(t)})`}static scale(t,n){return`scale(${$([t,n],{delimeter:", "})})`}static scale3d(t,n,o){return`scale3d(${$([t,n,o],{delimeter:", "})})`}static scaleX(t){return`scaleX(${$([t])})`}static scaleY(t){return`scaleY(${$([t])})`}static scaleZ(t){return`scaleZ(${$([t])})`}static sepia(t){return`sepia(${$([t])})`}static skew(...t){return`skew(${$(t,{degree:!0,delimeter:", "})})`}static skewX(t){return`skewX(${$([t],{degree:!0})})`}static skewY(t){return`skewY(${$([t],{degree:!0})})`}static steps(t,n){return`steps(${$([t,n],{})})`}static translate(...t){return`translate(${$(t,{rem:!0,delimeter:", "})})`}static translate3d(...t){return`translate3d(${$(t,{rem:!0,delimeter:", "})})`}static translateX(t){return`translateX(${$([t],{rem:!0})})`}static translateY(t){return`translateY(${$([t],{rem:!0})})`}static translateZ(...t){return`translateZ(${$(t,{rem:!0,delimeter:", "})})`}static url(t){return`url(${$([t],{quote:!0})})`}static var(t,n=""){t="--"+G(t);let o=n?", "+$([n],{rem:!0,delimeter:", "}):"";return`var(${$([t],{rem:!0})}${o})`}}class hn{path;_imported=new Set;name;prefix;save;exportMap=!1;cids=new w;constructor({__filename:t,name:n,prefix:o,sweetSS:i=[],exportMap:g=!0,webkitKeyframes:S}){this.path=t,this.name=n||Qn(t),this.prefix=o??"",this.exportMap=g;let f=J(i)?i:[i];qn.call(this,this.prefix,f,S,g);let E=this;Object.assign(this,{get sweet(){return E}}),this.save=({dir:R,mapDir:D,mapName:C="index",minify:T=!0,shaker:h=[],include:P=[]})=>{let b=new bt().load(this,h,P),q=J(R)?R:[R],K=T?Dn(b.css):b.css;q.forEach((Z)=>{if(!Z)return;let L=Z.endsWith("/")?"":"/",Q=Z+L+this.name+".css";it(Z+L),ot(Q),mt(Q,K)});let M=D?D:q[0]??"";if(M){let Z=M.endsWith("/")?"":"/",L=M+Z+C+".js";it(M+Z),ot(L),this.cids.init(this.name,{});let Q=this.cids.get(this.name),a=g?b.cid:b.cidz;F(a).forEach(([v,Tt])=>{if(Q[v])Q[v]=Tt+" "+Q[v];else Q[v]=Tt}),Jn(L,this.cids)}}}get imported(){return[...this._imported]}}var Jn=(t,n)=>{let o={};n.values().forEach((g)=>{F(g).forEach(([S,f])=>{if(!o[S])o[S]=[f];else o[S].push(f)})});let i=F(o).map(([g,S])=>{return`${g}="${S.join(" ")}"`}).sort((g,S)=>g.localeCompare(S,void 0,{numeric:!0}));mt(t,i.length?`export const ${i.join()};`:"");return},Dn=(t)=>{return t.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s*([{}:;,])\s*/g,"$1").trim()};function qn(t,n,o=!1,i=!1){let g={dom:new A("",t,i),id:new A("#",t,i),cx:new A(".",t,i),kf:new l(t,o),at:new s,font:new p};n.forEach((S)=>{this._imported.add(S.path),S._imported.forEach((f)=>{this._imported.add(f)}),X(g).forEach((f)=>{g[f].load(S[f])})}),X(g).forEach((S)=>{g[S]=g[S].css}),H(this,g)}function Qn(t){return t.split("/").slice(-1)[0].split(".")[0]}export{Rn as value,yi as v,bn as ps,U as media,j as med,En as join,Qn as fileName,Tn as f,Mt as __,$n as Var,hn as SweetSS,y as Medyas,tt as $$};
