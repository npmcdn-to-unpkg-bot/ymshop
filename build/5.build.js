webpackJsonp([5,9],{

/***/ 20:
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

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(57)
	__vue_script__ = __webpack_require__(58)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\orderDetail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-99a92e24/orderDetail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 57:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(13);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _title = __webpack_require__(20);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds() };
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}return fmt;
	};

	module.exports = {
		route: {
			activate: function activate(transition) {
				transition.next();
				_title2.default.title('订单详情');
			},
			data: function data() {
				var _this = this;

				var oId = this.$route.query.oId;
				this.$http.post('../shop-getOrderInfo.csp', { uid: this.uid, orderId: oId }, { emulateJSON: true }).then(function (res) {
					if (res.json().success) {
						_this.ODetail = res.json().order;
					} else {

						_this.ODetail = {
							orderNumber: '无信息',
							info: '无',
							createtime: +new Date() / 1000,
							costYb: 0,
							costYm: 0,
							orderStatus: '无'
						};
					}
				}, function (res) {});
			}
		},
		vuex: {
			getters: {
				uid: function uid(state) {
					return state.uid;
				}
			}
		},
		data: function data() {
			return {
				ODetail: {}
			};
		},
		computed: {
			ymAndyb: function ymAndyb() {
				if (this.ODetail.costYb == 0 && this.ODetail.costYm != 0) {
					return "医米购买";
				} else if (this.ODetail.costYb != 0 && this.ODetail.costYm == 0) {
					return "医币购买";
				} else if (this.ODetail.costYm != 0 && this.ODetail.costYb != 0) {
					return "医米+医币购买";
				} else {
					return "其他";
				}
			}
		},
		ready: function ready() {
			_webviewtestShare2.default.test(0);
		}
	};

/***/ },

/***/ 59:
/***/ function(module, exports) {

	module.exports = "\n<section class=\"order-detail\">\n\t<div>\n\t\t<span>订单号</span>\n\t\t<span>{{ODetail.orderNumber}}</span>\n\t</div>\n\t<div>\n\t\t<span>订单名称</span>\n\t\t<span class=\"order-name\">{{ODetail.info}}</span>\n\t</div>\n\t<div>\n\t\t<span>创建时间</span>\n\t\t<span>{{new Date(ODetail.createtime*1000).Format(\"yyyy-MM-dd hh:mm:ss\")}}</span>\n\t</div>\n\t<div>\n\t\t<span>消费渠道</span>\n\t\t<span>{{ymAndyb}}</span>\n\t</div>\n\t<i class=\"hr\"></i>\n\t<div>\n\t\t<span>支付状态</span>\n\t\t<span>支付成功</span>\n\t</div>\n\t<div>\n\t\t<span>支付医米</span>\n\t\t<span>{{ODetail.costYm}}医米</span>\n\t</div>\n\t<div>\n\t\t<span>支付医币</span>\n\t\t<span>{{ODetail.costYb}}医币</span>\n\t</div>\n\t<i class=\"hr\"></i>\n\t<div>\n\t\t<span>订单状态</span>\n\t\t<span>{{ODetail.orderStatus}}</span>\n\t</div>\n</section>\n";

/***/ }

});