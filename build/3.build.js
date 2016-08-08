webpackJsonp([3,9],{

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

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(41)
	__vue_script__ = __webpack_require__(42)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\mysign.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-e8c796ec/mysign.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 41:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(13);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _title = __webpack_require__(20);

	var _title2 = _interopRequireDefault(_title);

	var _getBlance = __webpack_require__(43);

	var _getBlance2 = _interopRequireDefault(_getBlance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {

		route: {
			avtivate: function avtivate() {
				_title2.default.title('我的签到');
			}
		},
		data: function data() {
			return {
				signs: [{ reward: '+1医米' }, { reward: '+1医米' }, { reward: '+2医米' }, { reward: '+2医米' }, { reward: '+3医米' }, { reward: '+3医米' }, { reward: '100%中奖' }],
				show: false,
				isSign: null,
				prize: null,
				award: null
			};
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
		methods: {
			addCurSign: function addCurSign() {

				if (this.userInfo.canSign == 1) {
					this.userInfo.continus++;
					this.curSign++;
					this.userInfo.canSign = 0;
					this.show = true;
					this.isSign = true;

					var data = {
						uid: this.uid
					};
					this.$http.post('../user-userSignon.csp', data, { emulateJSON: true }).then(function (response) {
						this.award = response.json().pointNum;
						this.userInfo.points = response.json().pointNum + this.userInfo.points;

						_getBlance2.default.blance(this.userInfo.points, this.userInfo.ymMoney);
					}, function (response) {});
				} else {
					this.show = true;
					this.isSign = false;
				}
			},
			hide: function hide() {
				this.show = false;
			}
		},
		computed: {
			curSign: function curSign() {

				if (this.userInfo.canSign == 0 && this.userInfo.continus == 0) {
					return this.curSign = 6;
				} else {
					return this.curSign = this.userInfo.continus - 1;
				}
			},
			prize: function prize() {
				return this.userInfo.continus == 7;
			}
		},
		ready: function ready() {
			_webviewtestShare2.default.test(0);
		}
	};

/***/ },

/***/ 43:
/***/ function(module, exports) {

	module.exports = {
	  say:function(){
	    
	    document.body.style.background="#000"
	  },
		blance:function(ym,yb){
			var u = navigator.userAgent;
	        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	        if (isAndroid) {

	          if (window.WebViewJavascriptBridge) {
	              window.WebViewJavascriptBridge.callHandler(
	                'setBalance',
	                {'balance':parseInt(yb),'point':parseFloat(ym)},
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
	                     'setBalance',
	                     {'balance':parseInt(yb),'point':parseFloat(ym)},
	                    function (responseData) {
	                      console.log(responseData)
	                       window.alert('success')
	                    }
	                  )
	                },
	                false
	              )
	            }

	 
	        }else if (isIOS){
	     
	        } else {
	        	console.log('pc')
	        }
		}

	}

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div>\n\t<h1 class=\"sign-row\">\n\t\t连续签到<span>{{curSign+1}}</span>天，连续签到7天可抽奖\n\t\t<span class=\"money-icon\"></span>\n\t\t<span>{{userInfo.points}}医米</span>\n\t</h1>\n\t<div class=\"sign-box\">\n\t\t<ul class=\"sign-list clearfix\">\n\t\t\t<li class=\"\"  v-for=\"sign in signs\">\n\t\t\t\t<span>{{$index+1}}</span>\n\t\t\t\t\t<div class=\"sign-logo\" v-if=\"$index<6\">\n\t\t\t\t\t\t<img  :src=\"curSign>=$index?'./build/images/icon_jb_selected.png':'./build/images/icon_jb_normal.png'\">\n\t\t\t\t\t\t<img v-show=\"curSign >= $index\" src=\"" + __webpack_require__(45) + "\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"last-sign\" v-if=\"$index == 6\">\n\t\t\t\t\t\t<img v-if=\"userInfo.canSign!=1 || curSign!=$index-1\" :src=\"curSign==6?'./build/images/icon_libao_.png':'./build/images/icon_libao.png'\">\n\t\t\t\t\t\t<img v-show=\"curSign >= $index\" class=\"sign-success\" src=\"" + __webpack_require__(45) + "\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"click-sign\" v-if=\"userInfo.canSign==1 && curSign==$index-1\" v-on:click=\"addCurSign\">\n\t\t\t\t\t\t<img src=\"" + __webpack_require__(46) + "\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<p>{{sign.reward}}</p>\n\t\t\t</li>\n\t\t</ul>\t\n\t</div>\n\t<h1 class=\"play\">\n\t\t活动玩法\n\t</h1>\n\t<ul class=\"sign-play-rule\">\n\t\t<li>1.每天签到得医米，连续签到第一、二天1医米，第三、四天2医米，第五、六天3医米。</li>\n\t\t<li>2.连续签到7天，即可抽奖。100%中奖，各种豪礼等你拿！</li>\n\t\t<li>3.断签则重新开始记录。</li>\n\t</ul>\n\t<div class=\"modal-mask\" v-show=\"show\" transition=\"modal\">\n\t\t<div class=\"modal-wrapper\">\n\t\t\t<div class=\"modal-container\">\n\t\t\t\t<div class=\"reward_modal\">\n\t\t\t\t\t<img :src=\"curSign==6?'./build/images/icon_zjl.png':'./build/images/cgqd_picture.png'\">\n\t\t\t\t\t<div v-if=\"isSign\">\n\t\t\t\t\t\t<!-- <p v-text=\"prize?'':'恭喜中奖！'\"></p> -->\n\t\t\t\t\t\t<p v-if=\"curSign!=6\">成功签到，已获得<span style=\"color: #D93639;font-size:2rem;\">{{award}}</span>医米！</p>\n\t\t\t\t\t\t<p v-else >恭喜抽中<span style=\"color: #D93639;font-size:2.3rem;\">{{award}}医米！</span></p>\n\t\t\t\t\t\t<p >已连续签到{{userInfo.continus}}天</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div v-else>\n\t\t\t\t\t\t<p style=\"margin-bottom: 30px;\">您已经签到</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button class=\"btn btn-red\" v-touch:tap=\"hide\" v-text=\"prize?'太好了':'确定'\"></button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/icon_dg_selected.png";

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/button_qd_small.png";

/***/ }

});