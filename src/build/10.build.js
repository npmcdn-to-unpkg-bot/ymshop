webpackJsonp([10,9],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\home.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(31)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-038df740/home.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(12);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _shareInfo = __webpack_require__(13);

	var _shareInfo2 = _interopRequireDefault(_shareInfo);

	var _title = __webpack_require__(19);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

		route: {
			data: function data(transition) {
				transition.next();
			},
			canReuse: function canReuse() {
				return false;
			}

		},
		components: {
			banner: __webpack_require__(20),
			goodsList: __webpack_require__(27)
		},
		data: function data() {
			return {
				limtedGoods: [],
				freeGoods: [],
				F_count: 1,
				busy: false,
				isEnd: true
			};
		},
		methods: {
			playRule: function playRule() {
				this.$router.go({ path: '/playRule' });
			},
			loadMore: function loadMore() {

				if (!this.isEnd) {
					this.busy = true;
					var self = this;

					setTimeout(function () {

						self.$http.post('../shop-list.csp', { goodsType: 0, limit: 10, start: self.F_count * 10 }, { emulateJSON: true }).then(function (res) {

							var Fgoods = res.json().goodsList;
							for (var i = 0; i < Fgoods.length; i++) {
								Fgoods[i].isLimit = false;
								self.freeGoods.push(Fgoods[i]);
							}


							self.F_count++;
							self.isEnd = res.json().isEnd == 1;
						}, function (res) {});

						self.busy = false;
					}, 600);
				}
			}
		},
		created: function created() {
			var _this = this;

			var data_L = {
				goodsType: 1
			};

			var data_F = {
				goodsType: 0,
				limit: 10,
				start: 0
			};

			this.$http.post('../shop-list.csp', data_F, { emulateJSON: true }).then(function (res) {

				var Fgoods = res.json().goodsList;
				for (var i = 0; i < Fgoods.length; i++) {
					Fgoods[i].isLimit = false;
				}
				_this.freeGoods = Fgoods;
				_this.isEnd = res.json().isEnd == 1;
			}, function (res) {
				console.log(res.json());
			});

			_title2.default.title('医米商城');
		},

		ready: function ready() {
			_webviewtestShare2.default.test(1);
			_shareInfo2.default.share();
		}

	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
		 say:function(){
		 	alert(1)
		 },
		 title:function(tit){

	          var u = navigator.userAgent;
	          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	          //0是隐藏，1是显示


	          if (isAndroid) {
	            if (window.WebViewJavascriptBridge) {
	              window.WebViewJavascriptBridge.callHandler(
	                'setTitle',
	                {'title':tit},
	                function (responseData) {
	                 console.log(responseData)
	                 window.alert('success')
	                }
	              )
	            } else {
	              document.addEventListener(
	                'WebViewJavascriptBridgeReady'
	                , function () {
	                  window.WebViewJavascriptBridge.callHandler(
	                     'setTitle',
	                     {'title':tit},
	                    function (responseData) {
	                      console.log(responseData)
	                       window.alert('success')
	                    }
	                  )
	                },
	                false
	              )
	            }
	          } else if(isIOS) {

	            // 检测是已创建script


	                 var hasBuildScript=document.getElementById('IOS_setTitle')

	                  if (hasBuildScript) {
	                      document.body.removeChild(hasBuildScript)
	                      var script = document.createElement('script');
	                          script.id = 'IOS_setTitle';
	                          script.innerHTML='try {window.webkit.messageHandlers.setTitle.postMessage({title: "'+tit+'"});}catch(e){}'

	                          document.body.appendChild(script)
	                  }else{

	                     var script = document.createElement('script');
	                         script.id = 'IOS_setTitle';
	                         script.innerHTML=' try{window.webkit.messageHandlers.setTitle.postMessage({title: "'+tit+'"});}catch(e){}'

	                         document.body.appendChild(script)
	                  }


	           
	          } else {

	          	console.log('pc')
	          	
	          }

	    }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(21)
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\banner.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-23f1e4cd/banner.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		route: {},

		data: function data() {
			return {};
		},

		vuex: {
			getters: {
				userInfo: function userInfo(state) {
					return state.userInfo;
				}
			}
		},
		methods: {
			showDialog: function showDialog(message) {
				this.$dispatch('showDialog', message);
			},
			toMyShop: function toMyShop() {
				if (this.userInfo.success) {
					this.$router.go({ path: '/myshop' });
				} else {
					window.location.href = "https://www.yishengzhan.cn/download?channel=release_tuiguang08";
				}
			},
			toMySign: function toMySign() {
				if (this.userInfo.success) {
					this.$router.go({ path: '/mysign' });
				} else {
					this.showDialog('请先登录');
				}
			}
		}
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n\n\n\n\n\n<section class=\"\">\n<div class=\"banners\">\n\t<img src=\"" + __webpack_require__(24) + "\">\n</div>\t\n\t<div class=\"banner-bottom\">\n\t\t<!-- 是否登录 -->\n\t\t<div v-touch:tap=\"toMyShop\">\n\t\t\t<!-- 登陆 -->\n\t\t\t<div class=\"icon\" >\n\t\t\t\t<img src=\"" + __webpack_require__(25) + "\">\n\t\t\t</div>\n\t\t\t<div class=\"info \">\n\t\t\t\t<h3>我的商城</h3>\n\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t<span v-if=\"userInfo.success\">{{userInfo.points}}</span>\n\t\t\t\t\t<span v-else>立即登录</span>\n\t\t\t\t\t<span class=\"money-icon\"></span>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"banner-bottom\">\n\t\t<div v-touch:tap=\"toMySign\" >\n\t\t\t<div class=\"icon\">\n\t\t\t\t<img src=\"" + __webpack_require__(26) + "\">\n\t\t\t</div>\n\t\t\t<div class=\"info \">\n\t\t\t\t<h3>每日签到</h3>\n\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t<span>100%中奖</span>\n\t\t\t\t\t<!-- <i class=\"money-icon\"></i> -->\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</section>\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/banner_ymsc.png";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/icon_gw.png";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/icon_qd.png";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(28)
	__vue_script__ = __webpack_require__(29)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\goodsList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(30)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-264b0ffa/goodsList.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

		props: ['goods'],

		computed: {},
		methods: {}
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "\n\n<ul class=\"goods-box clearfix\">\n\t<li v-for=\"good in goods\"  track-by=\"id\">\n\t\t<span class=\"goods-tag\" v-if=\"good.goodsCategory==1\" >电子书</span>\n\t\t<div class=\"goods-pic\">\n\t\t\t<img :src=\"good.coverpicurl\" v-link=\"{path:'/goodDetail',query:{goodid:good.id,isL:good.isLimit?good.dayTime:''}}\">\n\t\t</div>\n\t\t<div class=\"goods-info\">\n\t\t\t<h4 class=\"goods-name\">{{good.name}}</h4>\n\t\t\t<p class=\"goods-price clearfix\">\n\t\t\t\t<span class=\"left\">{{good.priceYm+'医米'}}{{good.priceYb==0?'':'+'}}{{good.priceYb==0?'':good.priceYb+'医币'}}</span>\n\t\t\t\t<span class=\"right\" v-if=\"good.isLimit\">{{good.dayTime.substr(0,5)+':00'}}开抢</span>\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"goods-progress\" v-if=\"good.isLimit\">\n\t\t\t<div class=\"max-length\">\n\t\t\t\t<div class=\"now-length\" :style=\"{width:good.ratio+'%'}\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"has-buy\" >已抢{{good.ratio}}%</div>\n\t\t</div>\n\t</li>\n</ul>\n\n\n";

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "\n\n\n<div _v-038df740=\"\">\n\t\n\n\t<div class=\"header clearfix\" _v-038df740=\"\">\n\t\t<banner _v-038df740=\"\"></banner>\n\t</div>\n\n\t<h2 class=\"goodsList\" v-if=\"false\" _v-038df740=\"\">\n\t\t限时抢兑\n\t</h2>\n\n\t<div class=\"section\" v-if=\"false\" _v-038df740=\"\">\n\t\t<goods-list :goods=\"limtedGoods\" _v-038df740=\"\"></goods-list>\n\t</div>\n\t<h2 class=\"goodsList\" _v-038df740=\"\">\n\t\t想兑就兑\n\t</h2>\n\t<div class=\"section\" _v-038df740=\"\">\n\t\t<goods-list :goods=\"freeGoods\" v-infinite-scroll=\"loadMore()\" infinite-scroll-disabled=\"busy\" infinite-scroll-distance=\"10\" keep-alive=\"\" _v-038df740=\"\"></goods-list>\n\t</div>\n\t\t\n\t<button class=\"btn btn-red\" style=\"margin-bottom: 20px;\" v-touch:tap=\"playRule\" _v-038df740=\"\">医米商城怎么玩?</button>\n</div>\n";

/***/ }
]);