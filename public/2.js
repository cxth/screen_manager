(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{0:function(e,t,n){"use strict";function i(e,t,n,i,o,r,s,a){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),s?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var d=l.render;l.render=function(e,t){return c.call(t),d(e,t)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,c):[c]}return{exports:e,options:l}}n.d(t,"a",(function(){return i}))},27:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n.n(i),r={data:function(){return{url_id:null,url:"../img/default.jpg",timer:""}},created:function(){this.fetchURL(),this.timer=setInterval(this.fetchURL,this.fetchTimeout)},methods:{fetchURL:function(){var e=this;o.a.get("".concat(this.siteURL,"/request")).then((function(t){if(console.log("fetch URL response: "),console.log(t.data),"invalid-user"==t.data[0]&&setTimeout((function(){location.reload()}),3e3),"deactivated-user"==t.data[0]&&setTimeout((function(){window.location.href="".concat(this.fetchURL,"/deactivated")}),3e3),"no-content"==t.data[0]){console.log("geturl is empty");var n={screen_id:"default",show_datetime:"no-sched",expire_datetime:"no-sched",id:999,url:"../img/default.jpg"}}else n=t.data[0];console.log("current url id "+e.url_id),console.log("sched url id "+n.id),n.id&&n.id!=e.url_id?(e.url_id=n.id,e.url=n.url):console.log("(".concat(n.id,") no change in content"))})).catch((function(e){}))},cancelAutoUpdate:function(){clearInterval(this.timer)}},beforeDestroy:function(){clearInterval(this.timer)}},s=n(0),a=Object(s.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("iframe",{directives:[{name:"resize",rawName:"v-resize",value:{log:!0},expression:"{ log: true }"}],staticClass:"responsive-iframe",attrs:{width:"100%",height:"100%",frameborder:"0",src:this.url,allow:"autoplay; fullscreen",id:"mswsm"}})}),[],!1,null,null,null);t.default=a.exports}}]);