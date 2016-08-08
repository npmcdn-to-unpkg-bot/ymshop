webpackJsonp([8,9],{

/***/ 19:
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

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(69)
	__vue_script__ = __webpack_require__(70)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\playRule.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(71)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0985f1b1/playRule.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 69:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(12);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _title = __webpack_require__(19);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    route: {
	        activate: function activate() {
	            _title2.default.title('医米商城怎么玩');
	        }
	    },
	    ready: function ready() {
	        _webviewtestShare2.default.test(0);
	    }
	};

/***/ },

/***/ 71:
/***/ function(module, exports) {

	module.exports = "\n\t<section class=\"play-rule\">\n\t\t<div class=\"rule-list\">\n\t\t\t<h3>1.医米有何价值？</h3>\n\t\t\t<p>医米是医生站送站友的福利。医生站的用户可通过认证、点赞视频、签到等行为获得医米。用户获得医米，可在医米商城兑换超值实物商品，每周只能兑换一种商品。医米还可参加医米抽奖活动，体验站内的各种有趣活动。</p>\n\t\t</div>\n\t\t<div class=\"rule-list\">\n\t\t\t<h3>2.如何领取医米？</h3>\n\t\t\t<p> \n\t\t\t\t○每日任务：完成每日“医米任务”。如分享视频、分享文章等行为。<br>\n\t\t\t\t○新人奖励：注册医生站、完善基本资料、实名认证等。<br>\n\t\t\t\t○邀请奖励：发送邀请码给好友注册、认证。<br>\n\t\t\t\t○活动奖励：参与医生站互动活动如签到获医米。\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"rule-list\">\n\t\t\t<h3>3.医米商城可兑换/买什么？</h3>\n\t\t\t<p>医米商城有两种支付方式。<br>\n○医米兑换。这不是游戏中虚拟游戏币，而是真金白银实物商城。用户可通过完成每日任务等方式获取医米，可在商城进行超值抢兑。提醒的是，不是所有奖品都无限供应，要想抢到心仪商品，除了每天攥医米外，还要每天准时来商城抢兑哦。<br>\n○“医币+医米”购买。“想兑就兑”专区不需要用户拼运气抢兑，可通过充值医币方式购买到远低于市场价的同类商品。安卓用户通可过支付宝方式充值医币（我-我的钱包），iOS用户暂时不能充值医币。\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"rule-list\">\n\t\t\t<h3>4.医米兑换后何时领取商品？</h3>\n\t\t\t<p>\n\t\t\t\t○实物商品将委托我们合作厂家直接寄出，兑换后一般2-3工作日内发货。但个别商品受厂家定制、地域偏远等因素制约，延迟发货请耐心等待。<br>\n\t\t\t\t○虚拟商品（如电子书）1-2工作日内发到电子邮箱。未收到请通过意见反馈告知。<br>\n\t\t\t\t○除商品本身不能正常兑换外，商品一经兑换，一律不退还医米。\n\t\t\t</p>\n\t\t</div>\n\t\t<div class=\"rule-list\">\n\t\t\t<h3>5.作弊惩罚机制：</h3>\n\t\t\t<p> \n\t\t\t\t○对于不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）参与活动的用户，医生站有权禁止其参与活动，取消其兑换资格。<br>\n\t\t\t\t○通过非法途径获得医米后进行的正常兑换行为，或不按商品使用规则进行兑换，发货商家有权不提供服务；<br>\n\t\t\t\t○为保障所有用户的正当利益，我们将严厉打击违规行为，包括但不限于通过软件制造僵尸用户盗刷医米。针对用机器软件恶意盗刷行为，我们将保留冻结作弊者账户、启动法律程序追究其违法违约责任等权利。\n\t\t\t</p>\n\t\t</div>\n\t\t\n\t</section>\n";

/***/ }

});