webpackJsonp([2,9],{

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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(35)
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\myshop.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(38)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6478ed43/myshop.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 35:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(13);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _webviewGoMission = __webpack_require__(37);

	var _webviewGoMission2 = _interopRequireDefault(_webviewGoMission);

	var _title = __webpack_require__(20);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		route: {
			activate: function activate(transition) {
				_title2.default.title('我的商城');
				transition.next();
			},
			data: function data(transition) {
				var _this = this;

				this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 0, start: 0, limit: 10 }, { emulateJSON: true }).then(function (res) {
					_this.ymBill = res.json().points;
					_this.isYmBillEnd = res.json().isEnd == 1;
					if (_this.isYmBillEnd) {
						_this.Ymsg = "已到最后一页";
					} else {
						_this.Ymsg = "点击加载更多";
					}
					if (_this.ymBill.length >= 10) {
						_this.showMoreY = true;
					}
				}, function (res) {});

				this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 1, start: 0, limit: 10 }, { emulateJSON: true }).then(function (res) {
					_this.winRecord = res.json().points;
					_this.isRewardsEnd = res.json().isEnd == 1;
					if (_this.isRewardsEnd) {
						_this.Rmsg = "已到最后一页";
					} else {
						_this.Rmsg = "点击加载更多";
					}
					if (_this.winRecord.length >= 10) {
						_this.showMoreR = true;
					}
				}, function (res) {});

				this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 2, start: 0, limit: 10 }, { emulateJSON: true }).then(function (res) {
					_this.orders = res.json().points;
					_this.isOrderEnd = res.json().isEnd == 1;
					if (_this.isOrderEnd) {
						_this.Omsg = "已到最后一页";
					} else {
						_this.Omsg = "点击加载更多";
					}
					if (_this.orders.length >= 10) {
						_this.showMoreO = true;
					}
				}, function (res) {});
			}
		},
		vuex: {
			getters: {
				userInfo: function userInfo(state) {
					return state.userInfo;
				},
				uid: function uid(state) {
					return state.uid;
				}
			}
		},
		data: function data() {
			return {
				tabs: [{ name: '订单查询', active: true, index: 0 }, { name: '医米流水', active: false, index: 1 }, { name: '中奖纪录', active: false, index: 2 }],
				tabBoxIndex: 0,
				ymBill: [],
				winRecord: [],
				orders: [],
				isOrderEnd: true,
				isYmBillEnd: true,
				isRewardsEnd: true,
				startOrder: 1,
				startYmBill: 1,
				startRewards: 1,
				Omsg: '点击加载更多',
				Ymsg: '点击加载更多',
				Rmsg: '点击加载更多',
				showMoreO: false,
				showMoreY: false,
				showMoreR: false
			};
		},
		methods: {
			setCur: function setCur(index) {
				for (var i = 0; i < this.tabs.length; i++) {
					if (index == i) {
						this.tabs[index].active = true;
						this.tabBoxIndex = this.tabs[i].index * -1;
					} else {
						this.tabs[i].active = false;
					}
				}
			},
			getYm: function getYm() {
				_webviewGoMission2.default.goMission();
			},
			goOrder: function goOrder(orderId) {
				this.$router.go({ path: '/orderDetail', query: { oId: orderId } });
			},
			loadMoreOrder: function loadMoreOrder() {
				var _this2 = this;

				if (!this.isOrderEnd) {
					this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 2, start: this.startOrder * 10, limit: 10 }, { emulateJSON: true }).then(function (res) {
						var arr = _this2.orders;
						var brr = res.json().points;
						_this2.orders = arr.concat(brr);

						_this2.isOrderEnd = res.json().isEnd == 1;
						_this2.startOrder++;
						if (_this2.isOrderEnd) {
							_this2.Omsg = "已到最后一页";
						}
					}, function (res) {});
				} else {
					this.Omsg = "已到最后一页";
				}
			},
			loadMoreYmBill: function loadMoreYmBill() {
				var _this3 = this;

				if (!this.isYmBillEnd) {
					this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 0, start: this.startYmBill * 10, limit: 10 }, { emulateJSON: true }).then(function (res) {

						var arr = _this3.ymBill;
						var brr = res.json().points;

						_this3.ymBill = arr.concat(brr);

						_this3.isYmBillEnd = res.json().isEnd == 1;
						_this3.startYmBill++;
						if (_this3.isYmBillEnd) {
							_this3.Ymsg = "已最后一页";
						}
					}, function (res) {});
				} else {
					this.Ymsg = "已到最后一页";
				}
			},
			loadMoreRewards: function loadMoreRewards() {
				var _this4 = this;

				if (!this.isRewardsEnd) {
					this.$http.post('../user-getPointsList.csp', { uid: this.uid, type: 1, start: this.startRewards * 10, limit: 10 }, { emulateJSON: true }).then(function (res) {

						var arr = _this4.winRecord;
						var brr = res.json().points;

						_this4.winRecord = arr.concat(brr);

						_this4.isRewardsEnd = res.json().isEnd == 1;
						_this4.startRewards++;
						if (_this4.isRewardsEnd) {
							_this4.Rmsg = "已到最后一页";
						}
					}, function (res) {});
				} else {
					this.Rmsg = "已到最后一页";
				}
			}
		},

		ready: function ready() {
			_webviewtestShare2.default.test(0);
		}

	};

/***/ },

/***/ 37:
/***/ function(module, exports) {

	module.exports = {
		 //点击获取医米 进入APP医米任务界面
		 //
		say:function(){
			alert(1)
		},
	    goMission:function(){
	        var u = navigator.userAgent;
	        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	        if (isAndroid) {

	          if (window.WebViewJavascriptBridge) {
	              window.WebViewJavascriptBridge.callHandler(
	                'go2MissionAct',
	                function (responseData) {
	                 console.log(responseData)
	                }
	              )
	            
	            } else {
	              document.addEventListener(
	                'WebViewJavascriptBridgeReady'
	                , function () {
	                  window.WebViewJavascriptBridge.callHandler(
	                     'go2MissionAct',
	                    function (responseData) {
	                      console.log(responseData)
	                    }
	                  )
	                },
	                false
	              )
	            }
	        }else if (isIOS){


	              var script = document.createElement('script');
	                  script.id = 'IOS_go2MissionAct';
	                  script.innerHTML='try{window.webkit.messageHandlers.go2MissionActOC.postMessage({go2Mission: true});}catch(e){}'

	              document.body.appendChild(script)





	        } else {
	        	console.log('pc')
	        }

	    }
	}

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<section class=\"my-shop-contain\">\n\t<div class=\"my-shop\">\n\t\t<span class=\"money-icon\"></span>\n\t\t我的医米:\n\t\t<span>{{userInfo.points}}</span>\n\t\t<button class=\"btn btn-red\" v-touch:tap=\"getYm\">获取医米</button>\n\t</div>\n\t<div class=\"my-shop-info\">\n\t\t<ul class=\"my-shop-tab\">\n\t\t\t<li v-for=\"tab in tabs\" v-bind:class=\"{'active':tab.active}\" v-touch:tap=\"setCur($index)\">\n\t\t\t\t{{tab.name}}\n\t\t\t\t<span></span>\n\t\t\t</li>\n\t\t</ul>\n\t\t<div class=\"tab-container\">\n\t\t\t<ul class=\"clearfix\" v-bind:style=\"{transform:'translateX('+tabBoxIndex*33.33+'%)'}\">\n\t\t\t\t<li class=\"orders\">\n\t\t\t\t\t<div style=\"width: 100%;min-height: 1px;\">\n\t\t\t\t\t\t<div class=\"my-order\"  v-for=\"order in orders\"  v-touch:tap=\"goOrder(order.orderId)\">\n\n\n\t\t\t\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t\t\t\t<span class=\"order-name\">{{order.exReason}}</span>\n\t\t\t\t\t\t\t\t<span>{{order.points}}医米</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p class=\"clearfix\">\n\t\t\t\t\t\t\t\t<span>{{new Date(order.creatTime*1000).Format(\"yyyy-MM-dd\")}}&nbsp;&nbsp;{{new Date(order.creatTime*1000).Format(\"hh:mm:ss\")}}</span>\n\t\t\t\t\t\t\t\t<span>支付成功</span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\n\t\t\t\t\t<button class=\"btn btn-red\" v-if=\"showMoreO\" :class=\"{'disabled':isOrderEnd}\" v-touch:tap=\"loadMoreOrder\">{{Omsg}}</button>\n\t\t\t\t</li>\n\t\t\t\t\t\t<!-- 订单详情 -->\n\t\t\t\t\t\t<!-- <div>\n\t\t\t\t\t\t\t<img src=\"" + __webpack_require__(39) + "\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<p>{{order.exReason}}</p>\n\t\t\t\t\t\t\t<p>{{new Date(order.creatTime*1000).Format(\"yyyy-MM-dd\")}}<br>10:24:33</p>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\n\t\t\t\t\t\t\t<p class=\"red\">{{order.points}}医米</p>\n\t\t\t\t\t\t\t<p >支付成功</p>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div> -->\n\t\t\t\t<li class=\"yms\">\n\t\t\t\t\t<table>\n\t\t\t\t\t\t<tr v-for=\"bill in ymBill\">\n\t\t\t\t\t\t\t<td>{{new Date(bill.creatTime*1000).Format(\"yyyy-MM-dd\")}}</td>\n\t\t\t\t\t\t\t<td>{{bill.exReason}}</td>\n\t\t\t\t\t\t\t<td>{{bill.points}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\n\t\t\t\t\t</table>\n\t\t\t\t\t<button class=\"btn btn-red\" v-if=\"showMoreY\" :class=\"{'disabled':isYmBillEnd}\" v-touch:tap=\"loadMoreYmBill\">{{Ymsg}}</button>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"rewards\">\n\t\t\t\t\t<table>\n\t\t\t\t\t\t<tr v-for=\"win in  winRecord\">\n\t\t\t\t\t\t\t<td>{{new Date(win.creatTime*1000).Format(\"yyyy-MM-dd\")}}</td>\n\t\t\t\t\t\t\t<td>{{win.points}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\n\t\t\t\t\t</table>\n\t\t\t\t\t<button class=\"btn btn-red\" v-if=\"showMoreR\" :class=\"{'disabled':isRewardsEnd}\" v-touch:tap=\"loadMoreRewards\">{{Rmsg}}</button>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t\n\t</div>\n</section>\n";

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/my-order_03.png";

/***/ }

});