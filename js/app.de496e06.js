(function(t){function e(e){for(var o,a,i=e[0],c=e[1],u=e[2],p=0,f=[];p<i.length;p++)a=i[p],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&f.push(s[a][0]),s[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);l&&l(e);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},s={app:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/websocket-testing-client/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("a026"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"800px"},attrs:{id:"app"}},[t._m(0),n("div",{staticStyle:{display:"flex","justify-content":"center","margin-bottom":"20px"}},[n("b-input",{model:{value:t.url,callback:function(e){t.url=e},expression:"url"}}),n("b-input",{attrs:{placeholder:"sec-websocket-key"},model:{value:t.token,callback:function(e){t.token=e},expression:"token"}}),n("b-button",{staticClass:"button is-primary",on:{click:t.openConnection}},[t._v("Connect")])],1),t.socket?n("div",{staticStyle:{display:"flex","justify-content":"center","margin-bottom":"20px"}},[n("b-input",{staticStyle:{width:"464px"},attrs:{placeholder:"sec-websocket-key"},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),n("b-button",{staticClass:"button is-primary",on:{click:t.sendMessage}},[t._v("Send")])],1):t._e(),n("div",{staticClass:"input",staticStyle:{display:"flex","justify-content":"center",overflow:"auto",height:"200px",width:"528px",margin:"0 auto","margin-bottom":"20px"}},[t.output?n("span",{staticStyle:{"white-space":"pre","text-align":"left"}},[t._v(t._s(t.output))]):n("span",{staticStyle:{"white-space":"pre","text-align":"left"}},[t._v("No data")])]),t._m(1)])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"is-size-3",staticStyle:{"margin-bottom":"60px"}},[n("span",[t._v("WebSocket Debugging Tool")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"528px",margin:"0 auto"}},[n("span",[t._v("Note: For debugging you can go to firefox's about:config and toggle network.websocket.allowInsecureFromHTTPS to get rid of the SecurityError.")])])}],a=(n("0d03"),{name:"app",data:function(){return{url:"ws://localhost:<port>/<endpoint>",token:"",output:"",socket:null,message:""}},methods:{openConnection:function(){var t=this;this.socket&&this.socket.close();var e="Bearer---"+this.token;this.socket=new WebSocket(this.url,e),this.socket.addEventListener("open",(function(e){var n=t.getTimestamp();t.output=n+" - connection opened\n"+t.output})),this.socket.addEventListener("close",(function(e){var n=t.getTimestamp();t.output=n+" - connection closed\n"+t.output,t.socket=null})),this.socket.addEventListener("message",(function(e){var n=t.getTimestamp();t.output=n+" - "+"message ".concat(e.data)+"\n"+t.output}))},sendMessage:function(){this.socket.send(this.message),this.message=""},getTimestamp:function(){var t=new Date;return t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}}}),i=a,c=(n("5c0b"),n("2877")),u=Object(c["a"])(i,s,r,!1,null,null,null),l=u.exports,p=n("2f62");o["a"].use(p["a"]);var f=new p["a"].Store({state:{},mutations:{},actions:{},modules:{}}),d=n("289d");n("5abe");o["a"].use(d["a"]),o["a"].config.productionTip=!1,new o["a"]({store:f,render:function(t){return t(l)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("9c0c"),s=n.n(o);s.a},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.de496e06.js.map