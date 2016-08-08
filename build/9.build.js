webpackJsonp([9,8],{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(15)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\home.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
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

/***/ 14:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(63);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _webviewtestShare = __webpack_require__(78);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

		route: {},
		components: {
			banner: __webpack_require__(16),
			goodsList: __webpack_require__(23)
		},
		data: function data() {
			return {
				limtedGoods: [],
				freeGoods: []

			};
		},
		methods: {
			playRule: function playRule() {
				this.$router.go({ path: '/playRule' });
			}
		},
		created: function created() {
			var _this = this;

			var data_L = {
				goodsType: 1
			};

			var data_F = {
				goodsType: 0,
				limit: 16,
				start: 0
			};

			this.$http.post('../../transfer', {
				url: 'shop-list.csp',
				json: (0, _stringify2.default)(data_L),
				flag: true
			}).then(function (res) {
				var Lgoods = res.json().goodsList;
				for (var i = 0; i < Lgoods.length; i++) {
					Lgoods[i].isLimit = true;
					var num = Lgoods[i].quantity / Lgoods[i].onsaleNum;
					Lgoods[i].ratio = num.toFixed(2);
				}
				_this.limtedGoods = Lgoods;
			}, function (res) {
				console.log(res.json());
			});

			this.$http.post('../../transfer', {
				url: 'shop-list.csp',
				json: (0, _stringify2.default)(data_F),
				flag: true
			}).then(function (res) {

				var Fgoods = res.json().goodsList;
				for (var i = 0; i < Fgoods.length; i++) {
					Fgoods[i].isLimit = false;
				}
				_this.freeGoods = Fgoods;
			}, function (res) {
				console.log(res.json());
			});
		},

		ready: function ready() {
			_webviewtestShare2.default.test(1);
		}

	};

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\banner.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(19)
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

/***/ 17:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 18:
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

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n\n\n\n\n<div class=\"banners\">\n\t<img src=\"" + __webpack_require__(20) + "\">\n</div>\t\n<section class=\"\">\n\t<div class=\"banner-bottom\">\n\t\t<!-- 是否登录 -->\n\t\t<div v-touch:tap=\"toMyShop\">\n\t\t\t<!-- 登陆 -->\n\t\t\t<div class=\"icon\" >\n\t\t\t\t<img src=\"" + __webpack_require__(21) + "\">\n\t\t\t</div>\n\t\t\t<div class=\"info \">\n\t\t\t\t<h3>我的商城</h3>\n\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t<span v-if=\"userInfo.success\">{{userInfo.points}}</span>\n\t\t\t\t\t<span v-else>立即登录</span>\n\t\t\t\t\t<i class=\"money-icon\"></i>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"banner-bottom\">\n\t\t<div v-touch:tap=\"toMySign\" >\n\t\t\t<div class=\"icon\">\n\t\t\t\t<img src=\"" + __webpack_require__(22) + "\">\n\t\t\t</div>\n\t\t\t<div class=\"info \">\n\t\t\t\t<h3>每日签到</h3>\n\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t<span>100%中奖</span>\n\t\t\t\t\t<!-- <i class=\"money-icon\"></i> -->\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</section>\n";

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/banner_ymsc.png";

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/icon_gw.png";

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/icon_qd.png";

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(24)
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\goodsList.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(26)
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

/***/ 24:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 25:
/***/ function(module, exports) {

	'use strict';

	module.exports = {

		props: ['goods'],

		computed: {},
		methods: {}
	};

/***/ },

/***/ 26:
/***/ function(module, exports) {

	module.exports = "\n\n<ul class=\"goods-box clearfix\">\n\t<li v-for=\"good in goods\" >\n\t\t<span class=\"goods-tag\" v-if=\"good.category==0\" >电子产品</span>\n\t\t<div class=\"goods-pic\">\n\t\t\t<img :src=\"good.coverpicurl\" v-link=\"{path:'/goodDetail',query:{goodid:good.id}}\">\n\t\t</div>\n\t\t<div class=\"goods-info\">\n\t\t\t<h4 class=\"goods-name\">{{good.name}}</h4>\n\t\t\t<p class=\"goods-price clearfix\">\n\t\t\t\t<span class=\"left\">{{good.priceYm+'医米'}}{{good.priceYb==0?'':'+'}}{{good.priceYb==0?'':good.priceYb+'医币'}}</span>\n\t\t\t\t<span class=\"right\" v-if=\"good.isLimit\">{{good.dayTime}}开抢</span>\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"goods-progress\" v-if=\"good.isLimit\">\n\t\t\t<div class=\"max-length\">\n\t\t\t\t<div class=\"now-length\" :style=\"{width:good.ratio*100+'%'}\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"has-buy\" >已抢{{good.ratio*100}}%</div>\n\t\t</div>\n\t</li>\n</ul>\n\n\n";

/***/ },

/***/ 34:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n<div class=\"header clearfix\" _v-038df740=\"\">\n\t<banner _v-038df740=\"\"></banner>\n</div>\n\n<h2 class=\"goodsList\" _v-038df740=\"\">\n\t限时抢兑\n</h2>\n\n<div class=\"section\" _v-038df740=\"\">\n\t<goods-list :goods=\"limtedGoods\" _v-038df740=\"\"></goods-list>\n</div>\n<h2 class=\"goodsList\" _v-038df740=\"\">\n\t想兑就兑\n</h2>\n<div class=\"section\" _v-038df740=\"\">\n\t<goods-list :goods=\"freeGoods\" _v-038df740=\"\"></goods-list>\n</div>\n\t\n<button class=\"btn btn-red\" style=\"margin-bottom: 20px;\" v-touch:tap=\"playRule\" _v-038df740=\"\">医米商城怎么玩?</button>\n";

/***/ },

/***/ 78:
/***/ function(module, exports) {

	module.exports = {
		 say:function(){
		 	alert(1)
		 },
		 test:function(show){

	          var u = navigator.userAgent;
	          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	          var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	          //0是隐藏，1是显示
	          var isHide =   show===0;

	          if (isAndroid) {
	            if (window.WebViewJavascriptBridge) {
	              window.WebViewJavascriptBridge.callHandler(
	                'hideShareBtn',
	                {'isHide':isHide},
	                function (responseData) {
	                 console.log(responseData)
	                }
	              )
	            } else {
	              document.addEventListener(
	                'WebViewJavascriptBridgeReady'
	                , function () {
	                  window.WebViewJavascriptBridge.callHandler(
	                     'hideShareBtn',
	                     {'isHide':isHide},
	                    function (responseData) {
	                      console.log(responseData)
	                    }
	                  )
	                },
	                false
	              )
	            }
	          } else if(isIOS) {

	            console.log(2)

	          } else {

	          	console.log('pc')
	          	
	          }

	    }
	}

/***/ }

});