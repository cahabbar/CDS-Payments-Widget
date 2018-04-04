(function(){"use strict"
var t,e,r,n,i,s,o,a,u,c,h,l,p,f,d,g,y,v,m,b,S,w,E,T,C,D,P,B,N={},R=[].slice,I=!1,x=!1,A=!1,K=!1,O=!1,q=!1,M=!1
window.CDS=N,N.cdsProcess=function(){var t,e
return e=arguments[0],t=2<=arguments.length?R.call(arguments,1):[],N.cdsProcess.prototype[e].apply(this,t)},e=[{type:"MC",patterns:[2,5],lengthRange:[16,16]},{type:"VI",patterns:[4],lengthRange:[16,19]},{type:"JC",patterns:[3],lengthRange:[16,19]},{type:"AX",patterns:[3],lengthRange:[15,15]},{type:"DC",patterns:[3],lengthRange:[14,14]},{type:"DI",patterns:[6],lengthRange:[16,16]}],N.cdsProcess.cdsResponse=D={},N.cdsProcess.prototype.formatCardNumber=function(){return this.addEventListener("keypress",n),this.addEventListener("paste",i),this.addEventListener("keyup",h),this.addEventListener("focusout",g),this.setAttribute("maxlength","19"),this},N.cdsProcess.clientCode=function(t){if(K||(O=!1,E()),!t)return!1
A=!0,p=t,console.time("publicKeyLoadTime"),a()},N.cdsProcess.reportEncryptionResponse=function(){var t=y()
return r.fireEvent("cdsCardRespChange",[D]),t},n=function(t){console.log("restrictNumeric event triggered and handler started execution")
var e
return!(!t.metaKey&&!t.ctrlKey)||(32===t.which?(t.preventDefault(),!1):0===t.which||t.which<33||(e=String.fromCharCode(t.which),/[\d\s]/.test(e)||t.preventDefault(),!!/[\d\s]/.test(e)))},a=function(){if(console.log("This is the public key value when getPemFile is called "+N.cdsProcess.publicKey+" Its Boolean value: "+Boolean(N.cdsProcess.publicKey)+" toProcessCacheOnLoad value "+x),!N.cdsProcess.publicKey){var t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")
t.open("POST","https://qa-tznservice.buysub.com/getkey"),t.withCredentials=!0,t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t.setRequestHeader("dataType","json"),t.onload=function(){if(4===t.readyState)if(t.status>=200&&t.status<400){clearTimeout(e)
var r=t.response,n=JSON.parse(r)
n?(u(n.key),x?(console.timeEnd("publicKeyLoadTimeForCache"),f()):console.timeEnd("publicKeyLoadTime")):(console.error("Public key not found"),O=!0,y())}else console.log("Received Exception while loading public key"),O=!0,y()},t.onerror=function(){console.error("Exception occurred while loading public key due to connection error, so default key will be used")},t.send(encodeURI("pubcode="+p))
var e=setTimeout(function(){t.abort(),console.log("Request to get public key aborted due to connection error"),u("-----BEGIN PUBLIC KEY----- MIGJAoGBANfWaaUdVnwKOn8yM/gp+PTqleHwAcxRKPDdkZbsMzcCAa069B7q5gFYS6BBSLOBjhzS4QPtmsYJtgncXZu4W1bBnhVNd5FCli8LVNbC1PkeUId65bwDGURjBdNM+ilsLIwNfSOLfNhCjv8+DkBlJKDeB/JYECzrHPWfgFkojyUnAgMBAAE= -----END PUBLIC KEY-----"),f()},3e3)}},f=function(){if(document.querySelector('input[data-cds = "ccNumber"]').value)return console.log("encryptedCcNum is either undefined or null though credit card number present"),h.call(document.querySelector('input[data-cds = "ccNumber"]')),void y()},u=function(t){t?(N.cdsProcess.publicKey=t,console.log("Base64 key: "+N.cdsProcess.publicKey)):(console.error("Public Key missing"),O=!0,y())},c=function(){if(console.time("EncryptionCardNumber"),A&&N.cdsProcess.publicKey){var t=new N.JSEncrypt
t.setPublicKey(N.cdsProcess.publicKey)
var e=t.encryptToHex(document.querySelector('input[data-cds = "ccNumber"]').value)
if(e)return console.timeEnd("EncryptionCardNumber"),e}else A?(console.warn("Public key missing "),O=!0,y()):(console.error("Either clientCode/allowed Card Types is not configured correctly"),O=!0,y())},i=function(t){console.log("restricPaste event triggered and handler started execution"),t.preventDefault()},h=function(){console.log("started validating card number entered"+document.querySelector('input[data-cds = "ccNumber"]').value),console.time("ValidateCardNumberEachTime"),s=null,o=null,M=!1,d()
var t=this.value.length,e=this.value.charAt(0)
q(e,t)?(I=S())&&w(e,t)&&(M=!0,s=c(),console.log("Card number encrypted as it is now valid & allowed card type : "+s)):I=!1,console.timeEnd("ValidateCardNumberEachTime")},t=function(t,r){for(var n=0;n<e.length;n++)for(var i=e[n].patterns,s=e[n].lengthRange,o=0;o<i.length;o++)if(t==i[o]&&r>=s[0]&&r<=s[1])return e[n].type},l=function(){var t=document.querySelector('input[data-cds = "cipher"]'),e=document.querySelector('input[data-cds = "cardType"]')
t&&(t.value="",m(t)),e&&(e.value="",m(e))},C=function(){var t=document.querySelector('input[data-cds = "cipher"]')
t&&(t.value="",m(t))},P=function(t,e,r){D.cardType=t,D.cipher=e,D.respCode=r},d=function(){l()
var t=document.querySelector('input[data-cds = "responseCode"]')
t&&(t.value="074",m(t)),P("","","074"),r.fireEvent("cdsCardValChange",[D])},q=function(e,r){return K?!!(o=t(e,r)):(A=!1,O=!0,y(),!1)},w=function(t,e){var r=N.cdsProcess.allowedCards
if(o&&r)for(var n=0;n<r.length;n++)if(r[n]==o)return!0
return!1},E=function(){var t=N.cdsProcess.allowedCards
return t&&t.constructor===Array&&t.length>0&&t.every(T)?K=!0:A=!1},T=function(t){return"string"==typeof t||t instanceof String},g=function(){console.log("reportResponseOnFocusOut event triggered and handler started execution"),y()},y=function(){var t="",e=document.querySelector('input[data-cds = "responseCode"]'),n=document.querySelector('input[data-cds = "cardType"]'),i=document.querySelector('input[data-cds = "cipher"]')
return O?A?(t="099",P("","","099")):(t="075",P("","","075")):""==document.querySelector('input[data-cds = "ccNumber"]').value?(t="",P("","","")):I?I&&!M?(t="753",C(),n&&(n.value=o,m(n)),P(o,"","753")):I&&M&&s?(t="100",n&&(n.value=o,m(n)),i&&(i.value=s,m(i)),P(o,s,"100")):(t="099",l(),P("","","100")):(t="003",l(),P("","","003")),e&&(e.value=t,m(e)),r.fireEvent("cdsCardValChange",[D]),t},v=function(){this.events={},this.addEventListener=function(t,e){this.events.hasOwnProperty(t)?this.events[t].push(e):this.events[t]=[e]},this.removeEventListener=function(t,e){if(this.events.hasOwnProperty(t)){var r=this.events[t].indexOf(e);-1!=r&&this.events[t].splice(r,1)}},this.fireEvent=function(t,e){if(this.events.hasOwnProperty(t)){e&&e.length||(e=[])
for(var r=this.events[t],n=r.length,i=0;i<n;i++)r[i].apply(null,e)}}},N.cdsProcess.cdsCard=r=new v,S=function(){for(var t=document.querySelector('input[data-cds = "ccNumber"]').value,e=0,r=!1,n=t.length-1;n>=0;){var i=parseInt(t.charAt(n),10)
if(isNaN(i))return!1
r&&(i*=2)>9&&(i=i%10+1),r=!r,e+=i,n--}return e%10==0},m=function(t){if("createEvent"in document){var e=document.createEvent("HTMLEvents")
e.initEvent("change",!1,!0),t.dispatchEvent(e)}else t.fireEvent("onchange")},b=function(){console.time("publicKeyLoadTimeForCache"),document.querySelector('input[data-cds = "ccNumber"]').value&&(x=!0,a(),console.log("There is a card number detected could be from cache while page is loaded"))},B=function(){null!=document.querySelector('input[data-cds = "ccNumber"]')&&(N.cdsProcess.call(document.querySelector('input[data-cds = "ccNumber"]'),"formatCardNumber"),A&&E()?b():(O=!0,y()))},"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?B():document.addEventListener("DOMContentLoaded",B)}).call(this),function(){function t(t,e,r){null!=t&&("number"==typeof t?this.fromNumber(t,e,r):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}function e(){return new t(null)}function r(t,e,r,n,i,s){for(;--s>=0;){var o=e*this[t++]+r[n]+i
i=Math.floor(o/67108864),r[n++]=67108863&o}return i}function n(t,e,r,n,i,s){for(var o=32767&e,a=e>>15;--s>=0;){var u=32767&this[t],c=this[t++]>>15,h=a*u+c*o
u=o*u+((32767&h)<<15)+r[n]+(1073741823&i),i=(u>>>30)+(h>>>15)+a*c+(i>>>30),r[n++]=1073741823&u}return i}function i(t,e,r,n,i,s){for(var o=16383&e,a=e>>14;--s>=0;){var u=16383&this[t],c=this[t++]>>14,h=a*u+c*o
u=o*u+((16383&h)<<14)+r[n]+i,i=(u>>28)+(h>>14)+a*c,r[n++]=268435455&u}return i}function s(t){return G.charAt(t)}function o(t,e){var r=z[t.charCodeAt(e)]
return null==r?-1:r}function a(t){for(var e=this.t-1;e>=0;--e)t[e]=this[e]
t.t=this.t,t.s=this.s}function u(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0}function c(t){var r=e()
return r.fromInt(t),r}function h(e,r){var n
if(16==r)n=4
else if(8==r)n=3
else if(256==r)n=8
else if(2==r)n=1
else if(32==r)n=5
else{if(4!=r)return void this.fromRadix(e,r)
n=2}this.t=0,this.s=0
for(var i=e.length,s=!1,a=0;--i>=0;){var u=8==n?255&e[i]:o(e,i)
u<0?"-"==e.charAt(i)&&(s=!0):(s=!1,0==a?this[this.t++]=u:a+n>this.DB?(this[this.t-1]|=(u&(1<<this.DB-a)-1)<<a,this[this.t++]=u>>this.DB-a):this[this.t-1]|=u<<a,(a+=n)>=this.DB&&(a-=this.DB))}8==n&&0!=(128&e[0])&&(this.s=-1,a>0&&(this[this.t-1]|=(1<<this.DB-a)-1<<a)),this.clamp(),s&&t.ZERO.subTo(this,this)}function l(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t}function p(t){if(this.s<0)return"-"+this.negate().toString(t)
var e
if(16==t)e=4
else if(8==t)e=3
else if(2==t)e=1
else if(32==t)e=5
else{if(4!=t)return this.toRadix(t)
e=2}var r,n=(1<<e)-1,i=!1,o="",a=this.t,u=this.DB-a*this.DB%e
if(a-- >0)for(u<this.DB&&(r=this[a]>>u)>0&&(i=!0,o=s(r));a>=0;)u<e?(r=(this[a]&(1<<u)-1)<<e-u,r|=this[--a]>>(u+=this.DB-e)):(r=this[a]>>(u-=e)&n,u<=0&&(u+=this.DB,--a)),r>0&&(i=!0),i&&(o+=s(r))
return i?o:"0"}function f(){var r=e()
return t.ZERO.subTo(this,r),r}function d(){return this.s<0?this.negate():this}function g(t){var e=this.s-t.s
if(0!=e)return e
var r=this.t
if(0!=(e=r-t.t))return this.s<0?-e:e
for(;--r>=0;)if(0!=(e=this[r]-t[r]))return e
return 0}function y(t){var e,r=1
return 0!=(e=t>>>16)&&(t=e,r+=16),0!=(e=t>>8)&&(t=e,r+=8),0!=(e=t>>4)&&(t=e,r+=4),0!=(e=t>>2)&&(t=e,r+=2),0!=(e=t>>1)&&(t=e,r+=1),r}function v(){return this.t<=0?0:this.DB*(this.t-1)+y(this[this.t-1]^this.s&this.DM)}function m(t,e){var r
for(r=this.t-1;r>=0;--r)e[r+t]=this[r]
for(r=t-1;r>=0;--r)e[r]=0
e.t=this.t+t,e.s=this.s}function b(t,e){for(var r=t;r<this.t;++r)e[r-t]=this[r]
e.t=Math.max(this.t-t,0),e.s=this.s}function S(t,e){var r,n=t%this.DB,i=this.DB-n,s=(1<<i)-1,o=Math.floor(t/this.DB),a=this.s<<n&this.DM
for(r=this.t-1;r>=0;--r)e[r+o+1]=this[r]>>i|a,a=(this[r]&s)<<n
for(r=o-1;r>=0;--r)e[r]=0
e[o]=a,e.t=this.t+o+1,e.s=this.s,e.clamp()}function w(t,e){e.s=this.s
var r=Math.floor(t/this.DB)
if(r>=this.t)return void(e.t=0)
var n=t%this.DB,i=this.DB-n,s=(1<<n)-1
e[0]=this[r]>>n
for(var o=r+1;o<this.t;++o)e[o-r-1]|=(this[o]&s)<<i,e[o-r]=this[o]>>n
n>0&&(e[this.t-r-1]|=(this.s&s)<<i),e.t=this.t-r,e.clamp()}function E(t,e){for(var r=0,n=0,i=Math.min(t.t,this.t);r<i;)n+=this[r]-t[r],e[r++]=n&this.DM,n>>=this.DB
if(t.t<this.t){for(n-=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB
n+=this.s}else{for(n+=this.s;r<t.t;)n-=t[r],e[r++]=n&this.DM,n>>=this.DB
n-=t.s}e.s=n<0?-1:0,n<-1?e[r++]=this.DV+n:n>0&&(e[r++]=n),e.t=r,e.clamp()}function T(e,r){var n=this.abs(),i=e.abs(),s=n.t
for(r.t=s+i.t;--s>=0;)r[s]=0
for(s=0;s<i.t;++s)r[s+n.t]=n.am(0,i[s],r,s,0,n.t)
r.s=0,r.clamp(),this.s!=e.s&&t.ZERO.subTo(r,r)}function C(t){for(var e=this.abs(),r=t.t=2*e.t;--r>=0;)t[r]=0
for(r=0;r<e.t-1;++r){var n=e.am(r,e[r],t,2*r,0,1);(t[r+e.t]+=e.am(r+1,2*e[r],t,2*r+1,n,e.t-r-1))>=e.DV&&(t[r+e.t]-=e.DV,t[r+e.t+1]=1)}t.t>0&&(t[t.t-1]+=e.am(r,e[r],t,2*r,0,1)),t.s=0,t.clamp()}function D(r,n,i){var s=r.abs()
if(!(s.t<=0)){var o=this.abs()
if(o.t<s.t)return null!=n&&n.fromInt(0),void(null!=i&&this.copyTo(i))
null==i&&(i=e())
var a=e(),u=this.s,c=r.s,h=this.DB-y(s[s.t-1])
h>0?(s.lShiftTo(h,a),o.lShiftTo(h,i)):(s.copyTo(a),o.copyTo(i))
var l=a.t,p=a[l-1]
if(0!=p){var f=p*(1<<this.F1)+(l>1?a[l-2]>>this.F2:0),d=this.FV/f,g=(1<<this.F1)/f,v=1<<this.F2,m=i.t,b=m-l,S=null==n?e():n
for(a.dlShiftTo(b,S),i.compareTo(S)>=0&&(i[i.t++]=1,i.subTo(S,i)),t.ONE.dlShiftTo(l,S),S.subTo(a,a);a.t<l;)a[a.t++]=0
for(;--b>=0;){var w=i[--m]==p?this.DM:Math.floor(i[m]*d+(i[m-1]+v)*g)
if((i[m]+=a.am(0,w,i,b,0,l))<w)for(a.dlShiftTo(b,S),i.subTo(S,i);i[m]<--w;)i.subTo(S,i)}null!=n&&(i.drShiftTo(l,n),u!=c&&t.ZERO.subTo(n,n)),i.t=l,i.clamp(),h>0&&i.rShiftTo(h,i),u<0&&t.ZERO.subTo(i,i)}}}function P(r){var n=e()
return this.abs().divRemTo(r,null,n),this.s<0&&n.compareTo(t.ZERO)>0&&r.subTo(n,n),n}function B(t){this.m=t}function N(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t}function R(t){return t}function I(t){t.divRemTo(this.m,null,t)}function x(t,e,r){t.multiplyTo(e,r),this.reduce(r)}function A(t,e){t.squareTo(e),this.reduce(e)}function K(){if(this.t<1)return 0
var t=this[0]
if(0==(1&t))return 0
var e=3&t
return e=e*(2-(15&t)*e)&15,e=e*(2-(255&t)*e)&255,e=e*(2-((65535&t)*e&65535))&65535,e=e*(2-t*e%this.DV)%this.DV,e>0?this.DV-e:-e}function O(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function q(r){var n=e()
return r.abs().dlShiftTo(this.m.t,n),n.divRemTo(this.m,null,n),r.s<0&&n.compareTo(t.ZERO)>0&&this.m.subTo(n,n),n}function M(t){var r=e()
return t.copyTo(r),this.reduce(r),r}function L(t){for(;t.t<=this.mt2;)t[t.t++]=0
for(var e=0;e<this.m.t;++e){var r=32767&t[e],n=r*this.mpl+((r*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM
for(r=e+this.m.t,t[r]+=this.m.am(0,n,t,e,0,this.m.t);t[r]>=t.DV;)t[r]-=t.DV,t[++r]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)}function k(t,e){t.squareTo(e),this.reduce(e)}function U(t,e,r){t.multiplyTo(e,r),this.reduce(r)}function V(){return 0==(this.t>0?1&this[0]:this.s)}function F(r,n){if(r>4294967295||r<1)return t.ONE
var i=e(),s=e(),o=n.convert(this),a=y(r)-1
for(o.copyTo(i);--a>=0;)if(n.sqrTo(i,s),(r&1<<a)>0)n.mulTo(s,o,i)
else{var u=i
i=s,s=u}return n.revert(i)}function H(t,e){var r
return r=t<256||e.isEven()?new B(e):new O(e),this.exp(t,r)}var J,j=window.CDS
"Microsoft Internet Explorer"==navigator.appName?(t.prototype.am=n,J=30):"Netscape"!=navigator.appName?(t.prototype.am=r,J=26):(t.prototype.am=i,J=28),t.prototype.DB=J,t.prototype.DM=(1<<J)-1,t.prototype.DV=1<<J,t.prototype.FV=Math.pow(2,52),t.prototype.F1=52-J,t.prototype.F2=2*J-52
var Z,_,G="0123456789abcdefghijklmnopqrstuvwxyz",z=[]
for(Z="0".charCodeAt(0),_=0;_<=9;++_)z[Z++]=_
for(Z="a".charCodeAt(0),_=10;_<36;++_)z[Z++]=_
for(Z="A".charCodeAt(0),_=10;_<36;++_)z[Z++]=_
B.prototype.convert=N,B.prototype.revert=R,B.prototype.reduce=I,B.prototype.mulTo=x,B.prototype.sqrTo=A,O.prototype.convert=q,O.prototype.revert=M,O.prototype.reduce=L,O.prototype.mulTo=U,O.prototype.sqrTo=k,t.prototype.copyTo=a,t.prototype.fromInt=u,t.prototype.fromString=h,t.prototype.clamp=l,t.prototype.dlShiftTo=m,t.prototype.drShiftTo=b,t.prototype.lShiftTo=S,t.prototype.rShiftTo=w,t.prototype.subTo=E,t.prototype.multiplyTo=T,t.prototype.squareTo=C,t.prototype.divRemTo=D,t.prototype.invDigit=K,t.prototype.isEven=V,t.prototype.exp=F,t.prototype.toString=p,t.prototype.negate=f,t.prototype.abs=d,t.prototype.compareTo=g,t.prototype.bitLength=v,t.prototype.mod=P,t.prototype.modPowInt=H,t.ZERO=c(0),t.ONE=c(1),j.cdsProcess.BigInteger=t}.call(this),function(t){"use strict"
var e,r=window.CDS,n={}
n.decode=function(t){var r
if(void 0===e){var n="0123456789ABCDEF",i=" \f\n\r\t \u2028\u2029"
for(e=[],r=0;r<16;++r)e[n.charAt(r)]=r
for(n=n.toLowerCase(),r=10;r<16;++r)e[n.charAt(r)]=r
for(r=0;r<i.length;++r)e[i.charAt(r)]=-1}var s=[],o=0,a=0
for(r=0;r<t.length;++r){var u=t.charAt(r)
if("="==u)break
if(-1!=(u=e[u])){if(void 0===u)throw"Illegal character at offset "+r
o|=u,++a>=2?(s[s.length]=o,o=0,a=0):o<<=4}}if(a)throw"Hex encoding incomplete: 4 bits missing"
return s},r.cdsProcess.Hex=n}(),function(t){"use strict"
var e,r=window.CDS,n={}
n.decode=function(t){var r
if(void 0===e){var n="= \f\n\r\t \u2028\u2029"
for(e=[],r=0;r<64;++r)e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r)]=r
for(r=0;r<n.length;++r)e[n.charAt(r)]=-1}var i=[],s=0,o=0
for(r=0;r<t.length;++r){var a=t.charAt(r)
if("="==a)break
if(-1!=(a=e[a])){if(void 0===a)throw"Illegal character at offset "+r
s|=a,++o>=4?(i[i.length]=s>>16,i[i.length]=s>>8&255,i[i.length]=255&s,s=0,o=0):s<<=6}}switch(o){case 1:throw"Base64 encoding incomplete: at least 2 bits missing"
case 2:i[i.length]=s>>10
break
case 3:i[i.length]=s>>16,i[i.length]=s>>8&255}return i},n.re=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,n.unarmor=function(t){var e=n.re.exec(t)
if(e)if(e[1])t=e[1]
else{if(!e[2])throw"RegExp out of sync"
t=e[2]}return n.decode(t)},r.cdsProcess.Base64=n}(),function(){"use strict"
function t(t){this.buf=[+t||0]}var e=window.CDS
t.prototype.mulAdd=function(t,e){var r,n,i=this.buf,s=i.length
for(r=0;r<s;++r)n=i[r]*t+e,n<1e13?e=0:(e=0|n/1e13,n-=1e13*e),i[r]=n
e>0&&(i[r]=e)},t.prototype.toString=function(t){if(10!=(t||10))throw"only base 10 is supported"
for(var e=this.buf,r=e[e.length-1].toString(),n=e.length-2;n>=0;--n)r+=(1e13+e[n]).toString().substring(1)
return r},t.prototype.valueOf=function(){for(var t=this.buf,e=0,r=t.length-1;r>=0;--r)e=1e13*e+t[r]
return e},t.prototype.simplify=function(){var t=this.buf
return 1==t.length?t[0]:this},e.cdsProcess.Int10=t}(),function(t){"use strict"
function e(t,e){return t.length>e&&(t=t.substring(0,e)+a),t}function r(t,e){t instanceof r?(this.enc=t.enc,this.pos=t.pos):(this.enc=t,this.pos=e)}function n(t){var e=t.get()
if(this.tagClass=e>>6,this.tagConstructed=0!=(32&e),this.tagNumber=31&e,31==this.tagNumber){var r=new o
do{e=t.get(),r.mulAdd(128,127&e)}while(128&e)
this.tagNumber=r.simplify()}}function i(t,e,r,i,s){if(!(i instanceof n))throw"Invalid tag value."
this.stream=t,this.header=e,this.length=r,this.tag=i,this.sub=s}var s=window.CDS,o=s.cdsProcess.Int10,a="…",u=/^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,c=/^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/
r.prototype.get=function(t){if(void 0===t&&(t=this.pos++),t>=this.enc.length)throw"Requesting byte offset "+t+" on a stream of length "+this.enc.length
return"string"==typeof this.enc?this.enc.charCodeAt(t):this.enc[t]},r.prototype.hexDigits="0123456789ABCDEF",r.prototype.hexByte=function(t){return this.hexDigits.charAt(t>>4&15)+this.hexDigits.charAt(15&t)},r.prototype.hexDump=function(t,e,r){for(var n="",i=t;i<e;++i)if(n+=this.hexByte(this.get(i)),!0!==r)switch(15&i){case 7:n+="  "
break
case 15:n+="\n"
break
default:n+=" "}return n},r.prototype.isASCII=function(t,e){for(var r=t;r<e;++r){var n=this.get(r)
if(n<32||n>176)return!1}return!0},r.prototype.parseStringISO=function(t,e){for(var r="",n=t;n<e;++n)r+=String.fromCharCode(this.get(n))
return r},r.prototype.parseStringUTF=function(t,e){for(var r="",n=t;n<e;){var i=this.get(n++)
r+=i<128?String.fromCharCode(i):i>191&&i<224?String.fromCharCode((31&i)<<6|63&this.get(n++)):String.fromCharCode((15&i)<<12|(63&this.get(n++))<<6|63&this.get(n++))}return r},r.prototype.parseStringBMP=function(t,e){for(var r,n,i="",s=t;s<e;)r=this.get(s++),n=this.get(s++),i+=String.fromCharCode(r<<8|n)
return i},r.prototype.parseTime=function(t,e,r){var n=this.parseStringISO(t,e),i=(r?u:c).exec(n)
return i?(r&&(i[1]=+i[1],i[1]+=i[1]<70?2e3:1900),n=i[1]+"-"+i[2]+"-"+i[3]+" "+i[4],i[5]&&(n+=":"+i[5],i[6]&&(n+=":"+i[6],i[7]&&(n+="."+i[7]))),i[8]&&(n+=" UTC","Z"!=i[8]&&(n+=i[8],i[9]&&(n+=":"+i[9]))),n):"Unrecognized time: "+n},r.prototype.parseInteger=function(t,e){for(var r,n=this.get(t),i=n>127,s=i?255:0,a="";n==s&&++t<e;)n=this.get(t)
if(0==(r=e-t))return i?-1:0
if(r>4){for(a=n,r<<=3;0==(128&(a^s));)a<<=1,--r
a="("+r+" bit)\n"}i&&(n-=256)
for(var u=new o(n),c=t+1;c<e;++c)u.mulAdd(256,this.get(c))
return a+u.toString()},r.prototype.parseBitString=function(t,r,n){for(var i=this.get(t),s=(r-t-1<<3)-i,o="("+s+" bit)\n",a="",u=t+1;u<r;++u){for(var c=this.get(u),h=u==r-1?i:0,l=7;l>=h;--l)a+=c>>l&1?"1":"0"
if(a.length>n)return o+e(a,n)}return o+a},r.prototype.parseOctetString=function(t,r,n){if(this.isASCII(t,r))return e(this.parseStringISO(t,r),n)
var i=r-t,s="("+i+" byte)\n"
n/=2,i>n&&(r=t+n)
for(var o=t;o<r;++o)s+=this.hexByte(this.get(o))
return i>n&&(s+=a),s},r.prototype.parseOID=function(t,r,n){for(var i="",s=new o,a=0,u=t;u<r;++u){var c=this.get(u)
if(s.mulAdd(128,127&c),a+=7,!(128&c)){if(""===i){s=s.simplify()
var h=s<80?s<40?0:1:2
i=h+"."+(s-40*h)}else i+="."+s.toString()
if(i.length>n)return e(i,n)
s=new o,a=0}}return a>0&&(i+=".incomplete"),i},i.prototype.typeName=function(){switch(this.tag.tagClass){case 0:switch(this.tag.tagNumber){case 0:return"EOC"
case 1:return"BOOLEAN"
case 2:return"INTEGER"
case 3:return"BIT_STRING"
case 4:return"OCTET_STRING"
case 5:return"NULL"
case 6:return"OBJECT_IDENTIFIER"
case 7:return"ObjectDescriptor"
case 8:return"EXTERNAL"
case 9:return"REAL"
case 10:return"ENUMERATED"
case 11:return"EMBEDDED_PDV"
case 12:return"UTF8String"
case 16:return"SEQUENCE"
case 17:return"SET"
case 18:return"NumericString"
case 19:return"PrintableString"
case 20:return"TeletexString"
case 21:return"VideotexString"
case 22:return"IA5String"
case 23:return"UTCTime"
case 24:return"GeneralizedTime"
case 25:return"GraphicString"
case 26:return"VisibleString"
case 27:return"GeneralString"
case 28:return"UniversalString"
case 30:return"BMPString"}return"Universal_"+this.tag.tagNumber.toString()
case 1:return"Application_"+this.tag.tagNumber.toString()
case 2:return"["+this.tag.tagNumber.toString()+"]"
case 3:return"Private_"+this.tag.tagNumber.toString()}},i.prototype.content=function(t){if(void 0===this.tag)return null
void 0===t&&(t=1/0)
var r=this.posContent(),n=Math.abs(this.length)
if(!this.tag.isUniversal())return null!==this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(r,r+n,t)
switch(this.tag.tagNumber){case 1:return 0===this.stream.get(r)?"false":"true"
case 2:return this.stream.parseInteger(r,r+n)
case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(r,r+n,t)
case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(r,r+n,t)
case 6:return this.stream.parseOID(r,r+n,t)
case 16:case 17:return null!==this.sub?"("+this.sub.length+" elem)":"(no elem)"
case 12:return e(this.stream.parseStringUTF(r,r+n),t)
case 18:case 19:case 20:case 21:case 22:case 26:return e(this.stream.parseStringISO(r,r+n),t)
case 30:return e(this.stream.parseStringBMP(r,r+n),t)
case 23:case 24:return this.stream.parseTime(r,r+n,23==this.tag.tagNumber)}return null},i.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},i.prototype.toPrettyString=function(t){void 0===t&&(t="")
var e=t+this.typeName()+" @"+this.stream.pos
if(this.length>=0&&(e+="+"),e+=this.length,this.tag.tagConstructed?e+=" (constructed)":!this.tag.isUniversal()||3!=this.tag.tagNumber&&4!=this.tag.tagNumber||null===this.sub||(e+=" (encapsulates)"),e+="\n",null!==this.sub){t+="  "
for(var r=0,n=this.sub.length;r<n;++r)e+=this.sub[r].toPrettyString(t)}return e},i.prototype.posStart=function(){return this.stream.pos},i.prototype.posContent=function(){return this.stream.pos+this.header},i.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},i.prototype.toHexString=function(t){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},i.decodeLength=function(t){var e=t.get(),r=127&e
if(r==e)return r
if(r>6)throw"Length over 48 bits not supported at position "+(t.pos-1)
if(0===r)return null
e=0
for(var n=0;n<r;++n)e=256*e+t.get()
return e},n.prototype.isUniversal=function(){return 0===this.tagClass},n.prototype.isEOC=function(){return 0===this.tagClass&&0===this.tagNumber},i.decode=function(t){t instanceof r||(t=new r(t,0))
var e=new r(t),s=new n(t),o=i.decodeLength(t),a=t.pos,u=a-e.pos,c=null,h=function(){if(c=[],null!==o){for(var e=a+o;t.pos<e;)c[c.length]=i.decode(t)
if(t.pos!=e)throw"Content size is not correct for container starting at offset "+a}else try{for(;;){var r=i.decode(t)
if(r.tag.isEOC())break
c[c.length]=r}o=a-t.pos}catch(t){throw"Exception while decoding undefined length content: "+t}}
if(s.tagConstructed)h()
else if(s.isUniversal()&&(3==s.tagNumber||4==s.tagNumber))try{if(3==s.tagNumber&&0!=t.get())throw"BIT STRINGs with unused bits cannot encapsulate."
h()
for(var l=0;l<c.length;++l)if(c[l].tag.isEOC())throw"EOC is not supposed to be actual content."}catch(t){c=null}if(null===c){if(null===o)throw"We can't skip over an invalid tag with undefined length at offset "+a
t.pos=a+Math.abs(o)}return new i(e,u,o,s,c)},s.cdsProcess.ASN1=i}(),function(){"use strict"
function t(){this.i=0,this.j=0,this.S=[]}function e(t){var e,r,n
for(e=0;e<256;++e)this.S[e]=e
for(r=0,e=0;e<256;++e)r=r+this.S[e]+t[e%t.length]&255,n=this.S[e],this.S[e]=this.S[r],this.S[r]=n
this.i=0,this.j=0}function r(){var t
return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]}function n(){return new t}function i(){if(null==g){for(g=n();v<m;){var t=Math.floor(65536*Math.random())
y[v++]=255&t}for(g.init(y),v=0;v<y.length;++v)y[v]=0
v=0}return g.next()}function s(t){var e
for(e=0;e<t.length;++e)t[e]=i()}function o(){}function a(t,e){return new b(t,e)}function u(t,e){if(e<t.length+11)return console.error("Message too long for RSA"),null
for(var r=[],n=t.length-1;n>=0&&e>0;){var i=t.charCodeAt(n--)
i<128?r[--e]=i:i>127&&i<2048?(r[--e]=63&i|128,r[--e]=i>>6|192):(r[--e]=63&i|128,r[--e]=i>>6&63|128,r[--e]=i>>12|224)}r[--e]=0
for(var s=new o,a=[];e>2;){for(a[0]=0;0==a[0];)s.nextBytes(a)
r[--e]=a[0]}return r[--e]=2,r[--e]=0,new b(r)}function c(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}function h(t,e){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=a(t,16),this.e=parseInt(e,16)):console.error("Invalid RSA public key")}function l(t){return t.modPowInt(this.e,this.n)}function p(t){var e=u(t,this.n.bitLength()+7>>3)
if(null==e)return null
var r=this.doPublic(e)
if(null==r)return null
var n=r.toString(16)
return 0==(1&n.length)?n:"0"+n}function f(t){var e=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
try{return e.test(t)?d.cdsProcess.Hex.decode(t):d.cdsProcess.Base64.re.test(t)?d.cdsProcess.Base64.unarmor(t):t}catch(t){console.log("Exception occurred while decoding binary string")}}var d=window.CDS
t.prototype.init=e,t.prototype.next=r
var g,y,v,m=256
null==y&&(y=[],v=0),o.prototype.nextBytes=s
var b=d.cdsProcess.BigInteger
c.prototype.doPublic=l,c.prototype.setPublic=h,c.prototype.encrypt=p,c.prototype.parseBigInt=a,d.cdsProcess.ASN1.prototype.getHexStringValue=function(){var t=this.toHexString(),e=2*this.header,r=2*this.length
return t.substr(e,r)},c.prototype.parseKey=function(t){try{var e=0,r=0,n=f(t),i=d.cdsProcess.ASN1.decode(n)
if(2!==i.sub.length)return!1
var s=i
return i.sub[1]&&null!=i.sub[1].sub&&void 0!=i.sub[1].sub&&(s=i.sub[1].sub[0]),e=s.sub[0].getHexStringValue(),this.n=a(e,16),r=s.sub[1].getHexStringValue(),this.e=parseInt(r,16),!0}catch(t){return!1}},c.prototype.getPublicBaseKey=function(){var t={array:[new KJUR.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new KJUR.asn1.DERNull]},e=new KJUR.asn1.DERSequence(t)
return t={array:[new KJUR.asn1.DERInteger({bigint:this.n}),new KJUR.asn1.DERInteger({int:this.e})]},t={hex:"00"+new KJUR.asn1.DERSequence(t).getEncodedHex()},t={array:[e,new KJUR.asn1.DERBitString(t)]},new KJUR.asn1.DERSequence(t).getEncodedHex()},c.prototype.getPublicBaseKeyB64=function(){return hex2b64(this.getPublicBaseKey())},c.prototype.wordwrap=function(t,e){if(e=e||64,!t)return t
var r="(.{1,"+e+"})( +|$\n?)|(.{1,"+e+"})"
return t.match(RegExp(r,"g")).join("\n")},c.prototype.getPublicKey=function(){var t="-----BEGIN PUBLIC KEY-----\n"
return t+=this.wordwrap(this.getPublicBaseKeyB64())+"\n",t+="-----END PUBLIC KEY-----"},c.prototype.hasPublicKeyProperty=function(t){return t=t||{},t.hasOwnProperty("n")&&t.hasOwnProperty("e")},c.prototype.parsePropertiesFrom=function(t){this.n=t.n,this.e=t.e,t.hasOwnProperty("d")&&(this.d=t.d,this.p=t.p,this.q=t.q,this.dmp1=t.dmp1,this.dmq1=t.dmq1,this.coeff=t.coeff)}
var S=function(t){c.call(this),t&&("string"==typeof t?this.parseKey(t):this.hasPublicKeyProperty(t)&&this.parsePropertiesFrom(t))}
S.prototype=new c,S.prototype.constructor=S
var w=function(t){t=t||{},this.default_key_size=parseInt(t.default_key_size)||1024,this.default_public_exponent=t.default_public_exponent||"010001",this.log=t.log||!1,this.key=null}
w.prototype.setKey=function(t){this.log&&this.key&&console.warn("A key was already set, overriding existing."),this.key=new S(t)},w.prototype.setPublicKey=function(t){this.setKey(t)},w.prototype.encrypt=function(t){try{return hex2b64(this.getKey().encrypt(t))}catch(t){return!1}},w.prototype.encryptToHex=function(t){try{return this.getKey().encrypt(t)}catch(t){return!1}},w.prototype.getKey=function(){if(!this.key)throw"key does not exist"
return this.key},w.prototype.getPublicKey=function(){return this.getKey().getPublicKey()},w.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64()},d.JSEncrypt=w}.call(this)
