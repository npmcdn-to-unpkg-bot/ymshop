webpackJsonp([0,8],[,/*!*************************!*\
  !*** ./src/js/title.js ***!
  \*************************/
function(o,s){o.exports={say:function(){alert(1)},title:function(o){var s=navigator.userAgent,t=s.indexOf("Android")>-1||s.indexOf("Linux")>-1,e=!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(t)window.WebViewJavascriptBridge?window.WebViewJavascriptBridge.callHandler("setTitle",{title:o},function(o){console.log(o),window.alert("success")}):document.addEventListener("WebViewJavascriptBridgeReady",function(){window.WebViewJavascriptBridge.callHandler("setTitle",{title:o},function(o){console.log(o),window.alert("success")})},!1);else if(e){var i=document.getElementById("IOS_setTitle");if(i){document.body.removeChild(i);var n=document.createElement("script");n.id="IOS_setTitle",n.innerHTML='try {window.webkit.messageHandlers.setTitle.postMessage({title: "'+o+'"});}catch(e){}',document.body.appendChild(n)}else{var n=document.createElement("script");n.id="IOS_setTitle",n.innerHTML=' try{window.webkit.messageHandlers.setTitle.postMessage({title: "'+o+'"});}catch(e){}',document.body.appendChild(n)}}else console.log("pc")}}},,,,,,,,,,,,,,,,/*!************************************************************************************************************************************************************!*\
  !*** ./~/babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./~/vue-loader/lib/selector.js?type=script&index=0!./src/vue/banner.vue ***!
  \************************************************************************************************************************************************************/
function(o,s){"use strict";o.exports={route:{},data:function(){return{}},vuex:{getters:{userInfo:function(o){return o.userInfo}}},methods:{showDialog:function(o){this.$dispatch("showDialog",o)},toMyShop:function(){this.userInfo.success?this.$router.go({path:"/myshop"}):window.location.href="https://www.yishengzhan.cn/download?channel=release_tuiguang08"},toMySign:function(){this.userInfo.success?this.$router.go({path:"/mysign"}):this.showDialog("请先登录")}}}},,/*!***************************************************************************************************************************************************************!*\
  !*** ./~/babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./~/vue-loader/lib/selector.js?type=script&index=0!./src/vue/goodsList.vue ***!
  \***************************************************************************************************************************************************************/
function(o,s){"use strict";o.exports={props:["goods"],computed:{},methods:{}}},/*!**********************************************************************************************************************************************************!*\
  !*** ./~/babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./~/vue-loader/lib/selector.js?type=script&index=0!./src/vue/home.vue ***!
  \**********************************************************************************************************************************************************/
function(o,s,t){"use strict";function e(o){return o&&o.__esModule?o:{"default":o}}var i=t(/*! ../js/webviewtestShare.js */2),n=e(i),d=t(/*! ../js/shareInfo.js */5),a=e(d),c=t(/*! ../js/title.js */1),r=e(c);o.exports={route:{data:function(o){o.next()},canReuse:function(){return!1}},components:{banner:t(/*! ./banner.vue */55),goodsList:t(/*! ./goodsList.vue */57)},data:function(){return{limtedGoods:[],freeGoods:[],F_count:1,busy:!1,isEnd:!0}},methods:{playRule:function(){this.$router.go({path:"/playRule"})},loadMore:function(){if(!this.isEnd){this.busy=!0;var o=this;setTimeout(function(){o.$http.post("../shop-list.csp",{goodsType:0,limit:10,start:10*o.F_count},{emulateJSON:!0}).then(function(s){for(var t=s.json().goodsList,e=0;e<t.length;e++)t[e].isLimit=!1,o.freeGoods.push(t[e]);o.F_count++,o.isEnd=1==s.json().isEnd},function(o){}),o.busy=!1},600)}}},created:function(){var o=this,s={goodsType:0,limit:10,start:0};this.$http.post("../shop-list.csp",s,{emulateJSON:!0}).then(function(s){for(var t=s.json().goodsList,e=0;e<t.length;e++)t[e].isLimit=!1;o.freeGoods=t,o.isEnd=1==s.json().isEnd},function(o){console.log(o.json())}),r["default"].title("医米商城")},ready:function(){n["default"].test(1),a["default"].share()}}},,,,,,,,/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-rewriter.js!./~/sass-loader!./~/vue-loader/lib/selector.js?type=style&index=0!./src/vue/banner.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
function(o,s){},,/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-rewriter.js!./~/sass-loader!./~/vue-loader/lib/selector.js?type=style&index=0!./src/vue/goodsList.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************/
function(o,s){},,,,,,,/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-rewriter.js?id=_v-038df740&scoped=true!./~/sass-loader!./~/vue-loader/lib/selector.js?type=style&index=0!./src/vue/home.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
function(o,s){},/*!************************************!*\
  !*** ./src/images/banner_ymsc.png ***!
  \************************************/
function(o,s,t){o.exports=t.p+"images/banner_ymsc.png"},,/*!********************************!*\
  !*** ./src/images/icon_gw.png ***!
  \********************************/
function(o,s,t){o.exports=t.p+"images/icon_gw.png"},/*!********************************!*\
  !*** ./src/images/icon_qd.png ***!
  \********************************/
function(o,s,t){o.exports=t.p+"images/icon_qd.png"},,/*!*****************************************************************************************************!*\
  !*** ./~/vue-html-loader!./~/vue-loader/lib/selector.js?type=template&index=0!./src/vue/banner.vue ***!
  \*****************************************************************************************************/
function(o,s,t){o.exports=' <section class=""> <div class=banners> <img src='+t(/*! ../images/banner_ymsc.png */38)+"> </div> <div class=banner-bottom> <div v-touch:tap=toMyShop> <div class=icon> <img src="+t(/*! ../images/icon_gw.png */40)+"> </div> <div class=info> <h3>我的商城</h3> <p class=clearfix> <span v-if=userInfo.success>{{userInfo.points}}</span> <span v-else>立即登录</span> <span class=money-icon></span> </p> </div> </div> </div> <div class=banner-bottom> <div v-touch:tap=toMySign> <div class=icon> <img src="+t(/*! ../images/icon_qd.png */41)+"> </div> <div class=info> <h3>每日签到</h3> <p class=clearfix> <span>100%中奖</span> </p> </div> </div> </div> </section> "},,/*!********************************************************************************************************!*\
  !*** ./~/vue-html-loader!./~/vue-loader/lib/selector.js?type=template&index=0!./src/vue/goodsList.vue ***!
  \********************************************************************************************************/
function(o,s){o.exports=" <ul class=\"goods-box clearfix\"> <li v-for=\"good in goods\" track-by=id> <span class=goods-tag v-if=\"good.goodsCategory==1\">电子书</span> <div class=goods-pic> <img :src=good.coverpicurl v-link=\"{path:'/goodDetail',query:{goodid:good.id,isL:good.isLimit?good.dayTime:''}}\"> </div> <div class=goods-info> <h4 class=goods-name>{{good.name}}</h4> <p class=\"goods-price clearfix\"> <span class=left>{{good.priceYm+'医米'}}{{good.priceYb==0?'':'+'}}{{good.priceYb==0?'':good.priceYb+'医币'}}</span> <span class=right v-if=good.isLimit>{{good.dayTime.substr(0,5)+':00'}}开抢</span> </p> </div> <div class=goods-progress v-if=good.isLimit> <div class=max-length> <div class=now-length :style=\"{width:good.ratio+'%'}\"></div> </div> <div class=has-buy>已抢{{good.ratio}}%</div> </div> </li> </ul> "},,,,,,,/*!**********************************************************************************************************************************************************!*\
  !*** ./~/vue-html-loader!./~/vue-loader/lib/template-rewriter.js?id=_v-038df740!./~/vue-loader/lib/selector.js?type=template&index=0!./src/vue/home.vue ***!
  \**********************************************************************************************************************************************************/
function(o,s){o.exports=' <div _v-038df740=""> <div class="header clearfix" _v-038df740=""> <banner _v-038df740=""></banner> </div> <h2 class=goodsList v-if=false _v-038df740=""> 限时抢兑 </h2> <div class=section v-if=false _v-038df740=""> <goods-list :goods=limtedGoods _v-038df740=""></goods-list> </div> <h2 class=goodsList _v-038df740=""> 想兑就兑 </h2> <div class=section _v-038df740=""> <goods-list :goods=freeGoods v-infinite-scroll=loadMore() infinite-scroll-disabled=busy infinite-scroll-distance=10 keep-alive="" _v-038df740=""></goods-list> </div> <button class="btn btn-red" style="margin-bottom: 20px" v-touch:tap=playRule _v-038df740="">医米商城怎么玩?</button> </div> '},,,/*!****************************!*\
  !*** ./src/vue/banner.vue ***!
  \****************************/
function(o,s,t){var e,i;t(/*! !./../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!vue-style-loader!css-loader!./../../~/vue-loader/lib/style-rewriter.js!sass-loader!./../../~/vue-loader/lib/selector.js?type=style&index=0!./banner.vue */28),e=t(/*! !babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./../../~/vue-loader/lib/selector.js?type=script&index=0!./banner.vue */17),i=t(/*! !vue-html-loader!./../../~/vue-loader/lib/selector.js?type=template&index=0!./banner.vue */43),o.exports=e||{},o.exports.__esModule&&(o.exports=o.exports["default"]),i&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=i)},,/*!*******************************!*\
  !*** ./src/vue/goodsList.vue ***!
  \*******************************/
function(o,s,t){var e,i;t(/*! !./../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!vue-style-loader!css-loader!./../../~/vue-loader/lib/style-rewriter.js!sass-loader!./../../~/vue-loader/lib/selector.js?type=style&index=0!./goodsList.vue */30),e=t(/*! !babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./../../~/vue-loader/lib/selector.js?type=script&index=0!./goodsList.vue */19),i=t(/*! !vue-html-loader!./../../~/vue-loader/lib/selector.js?type=template&index=0!./goodsList.vue */45),o.exports=e||{},o.exports.__esModule&&(o.exports=o.exports["default"]),i&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=i)},/*!**************************!*\
  !*** ./src/vue/home.vue ***!
  \**************************/
function(o,s,t){var e,i;t(/*! !./../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!vue-style-loader!css-loader!./../../~/vue-loader/lib/style-rewriter.js?id=_v-038df740&scoped=true!sass-loader!./../../~/vue-loader/lib/selector.js?type=style&index=0!./home.vue */37),e=t(/*! !babel-loader?presets[]=es2015&plugins[]=transform-runtime&comments=false!./../../~/vue-loader/lib/selector.js?type=script&index=0!./home.vue */20),i=t(/*! !vue-html-loader!./../../~/vue-loader/lib/template-rewriter.js?id=_v-038df740!./../../~/vue-loader/lib/selector.js?type=template&index=0!./home.vue */52),o.exports=e||{},o.exports.__esModule&&(o.exports=o.exports["default"]),i&&(("function"==typeof o.exports?o.exports.options||(o.exports.options={}):o.exports).template=i)}]);
//# sourceMappingURL=0.build.js.map