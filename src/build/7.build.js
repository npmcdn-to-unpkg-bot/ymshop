webpackJsonp([7,8],{1:/*!*************************!*\
  !*** ./src/js/title.js ***!
  \*************************/
function(e,t){e.exports={say:function(){alert(1)},title:function(e){var t=navigator.userAgent,s=t.indexOf("Android")>-1||t.indexOf("Linux")>-1,i=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(s)window.WebViewJavascriptBridge?window.WebViewJavascriptBridge.callHandler("setTitle",{title:e},function(e){console.log(e),window.alert("success")}):document.addEventListener("WebViewJavascriptBridgeReady",function(){window.WebViewJavascriptBridge.callHandler("setTitle",{title:e},function(e){console.log(e),window.alert("success")})},!1);else if(i){var n=document.getElementById("IOS_setTitle");if(n){document.body.removeChild(n);var a=document.createElement("script");a.id="IOS_setTitle",a.innerHTML='try {window.webkit.messageHandlers.setTitle.postMessage({title: "'+e+'"});}catch(e){}',document.body.appendChild(a)}else{var a=document.createElement("script");a.id="IOS_setTitle",a.innerHTML=' try{window.webkit.messageHandlers.setTitle.postMessage({title: "'+e+'"});}catch(e){}',document.body.appendChild(a)}}else console.log("pc")}}},24:/*!*****************************************************************************************************************************************************************!*\
  !*** ./~/babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./~/vue-loader/lib/selector.js?type=script&index=0!./src/vue/orderDetail.vue ***!
  \*****************************************************************************************************************************************************************/
function(e,t,s){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var n=s(/*! ../js/webviewtestShare.js */2),a=i(n),o=s(/*! ../js/title.js */1),r=i(o);Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var s in t)new RegExp("("+s+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[s]:("00"+t[s]).substr((""+t[s]).length)));return e},e.exports={route:{activate:function(e){e.next(),r["default"].title("我的订单")},data:function(){var e=this,t=this.$route.query.oId;this.$http.post("../shop-getOrderInfo.csp",{uid:this.uid,orderId:t},{emulateJSON:!0}).then(function(t){t.json().success?e.ODetail=t.json().order:e.ODetail={orderNumber:"无信息",info:"无",createtime:+new Date/1e3,costYb:0,costYm:0,orderStatus:"无"}},function(e){})}},vuex:{getters:{uid:function(e){return e.uid}}},data:function(){return{ODetail:{}}},computed:{ymAndyb:function(){return 0==this.ODetail.costYb&&0!=this.ODetail.costYm?"医米购买":0!=this.ODetail.costYb&&0==this.ODetail.costYm?"医币购买":0!=this.ODetail.costYm&&0!=this.ODetail.costYb?"医米+医币购买":"其他"}},ready:function(){a["default"].test(0)}}},34:/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-rewriter.js!./~/sass-loader!./~/vue-loader/lib/selector.js?type=style&index=0!./src/vue/orderDetail.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
function(e,t){},49:/*!**********************************************************************************************************!*\
  !*** ./~/vue-html-loader!./~/vue-loader/lib/selector.js?type=template&index=0!./src/vue/orderDetail.vue ***!
  \**********************************************************************************************************/
function(e,t){e.exports=' <section class=order-detail> <div> <span>订单号</span> <span>{{ODetail.orderNumber}}</span> </div> <div> <span>订单名称</span> <span class=order-name>{{ODetail.info}}</span> </div> <div> <span>创建时间</span> <span>{{new Date(ODetail.createtime*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span> </div> <div> <span>消费渠道</span> <span>{{ymAndyb}}</span> </div> <i class=hr></i> <div> <span>支付状态</span> <span>支付成功</span> </div> <div> <span>支付医米</span> <span>{{ODetail.costYm}}医米</span> </div> <div> <span>支付医币</span> <span>{{ODetail.costYb}}医币</span> </div> <i class=hr></i> <div> <span>订单状态</span> <span>{{ODetail.orderStatus}}</span> </div> </section> '},62:/*!*********************************!*\
  !*** ./src/vue/orderDetail.vue ***!
  \*********************************/
function(e,t,s){var i,n;s(/*! !./../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!vue-style-loader!css-loader!./../../~/vue-loader/lib/style-rewriter.js!sass-loader!./../../~/vue-loader/lib/selector.js?type=style&index=0!./orderDetail.vue */34),i=s(/*! !babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./../../~/vue-loader/lib/selector.js?type=script&index=0!./orderDetail.vue */24),n=s(/*! !vue-html-loader!./../../~/vue-loader/lib/selector.js?type=template&index=0!./orderDetail.vue */49),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),n&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=n)}});
//# sourceMappingURL=7.build.js.map