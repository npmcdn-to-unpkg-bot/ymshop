webpackJsonp([15,9],{

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

/***/ 41:
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

/***/ 48:
/***/ function(module, exports) {

	
	exports.setGoodInfo=function(store,obj){
		store.dispatch('SETGOODINFO',obj)
	}



	exports.setAddress = function(store,obj){
		store.dispatch('SETADDRESS',obj)
	}

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(59)
	__vue_script__ = __webpack_require__(60)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\infoSure.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(61)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6a54f1c4/infoSure.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 59:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _webviewtestShare = __webpack_require__(12);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _title = __webpack_require__(19);

	var _title2 = _interopRequireDefault(_title);

	var _getBlance = __webpack_require__(41);

	var _getBlance2 = _interopRequireDefault(_getBlance);

	var _actions = __webpack_require__(48);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GetQueryString = function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return r[2];
		return null;
	};

	module.exports = {
		data: function data() {
			return {
				isFix: true,
				getAddr: {},
				emails: [{ mail: "qq.com" }, { mail: "vip.qq.com" }, { mail: "vip.sina.com" }, { mail: "126.com" }, { mail: "sina.com" }, { mail: "163.com" }, { mail: "126.com" }, { mail: "yahoo.cn" }, { mail: "foxmail.com" }, { mail: "yeah.net" }, { mail: "gmail.com" }, { mail: "sohu.com" }, { mail: "hotmail.com" }],
				showMails: false,
				email_end: '',
				email: '',
				email_start: '',
				realGood: true,
				showTip: false,
				isSave: true,
				message: ''
			};
		},
		route: {
			activate: function activate() {},
			data: function data(transition) {
				var _this = this;

				var data = {
					uid: GetQueryString('uid')
				};
				this.$http.post('../shop-getAddr.csp', data, { emulateJSON: true }).then(function (res) {
					transition.next({
						getAddr: res.json().addr
					});

					_this.setAddress(res.json().addr);
				}, function (res) {});
			}
		},
		vuex: {
			getters: {
				goodInfo: function goodInfo(state) {
					return state.goodsInfo;
				},
				uid: function uid(state) {
					return state.uid;
				},
				userInfo: function userInfo(state) {
					return state.userInfo;
				}
			},
			actions: {
				setAddress: _actions.setAddress
			}
		},
		computed: {
			isFix: function isFix() {
				if (this.getAddr.detailaddrShort == '' || this.getAddr.detailaddr == '') {
					return false;
				} else {
					return true;
				}
			},
			realGood: function realGood() {
				return this.goodInfo.goodsCategory == 0;
			},
			email: function email() {
				return this.email_start + '@' + this.email_end;
			},
			exEmailStart: function exEmailStart() {
				if (this.userInfo.email) {
					var length = this.userInfo.email.indexOf('@');
					return this.userInfo.email.substr(0, length);
				}
			},
			exEmailEnd: function exEmailEnd() {
				if (this.userInfo.email) {
					var length = this.userInfo.email.indexOf('@');
					return this.userInfo.email.substring(length + 1);
				}
			}
		},
		methods: {
			tipMail: function tipMail() {
				this.showMails = true;
			},
			untipMial: function untipMial() {
				this.showMails = false;
			},
			select: function select(index) {
				this.email_end = this.emails[index].mail;
			},
			showDialog: function showDialog(message) {
				this.$dispatch('showDialog', message);
			},
			revise: function revise() {
				this.isSave = true;
			},
			save: function save() {
				var _this2 = this;

				var _email = this.email;

				if (this.realGood) {

					var data = {
						uid: this.uid,
						goodId: this.goodInfo.id,
						platform: GetQueryString('platform')
					};
					if (this.isSave) {
						this.isSave = false;
						this.$http.post('../shop-buyGoods.csp', data, { emulateJSON: true }).then(function (res) {
							if (res.json().success) {
								var self = _this2;
								self.showDialog('兑换成功！');
								setTimeout(function () {
									self.isSave = true;
									self.$router.go({ path: '/home' });
									self.userInfo.points = self.userInfo.points - self.goodInfo.priceYm;
									self.userInfo.ymMoney = self.userInfo.ymMoney - self.goodInfo.priceYb;

									var ym = self.userInfo.points;
									var yb = self.userInfo.ymMoney;
									console.log(ym);
									console.log(yb);
									_getBlance2.default.blance(ym, yb);
								}, 1000);
							} else {
								_this2.isSave = true;
								_this2.showDialog(res.json().message);
							}
						}, function (res) {
							_this2.isSave = true;
							_this2.showDialog(res.json().message);
						});
					}
				} else {

					if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_email)) {
						this.showTip = true;
						this.message = "邮箱格式不正确";
						this.isSave = false;
					}

					if (this.isSave) {
						this.isSave = false;
						var data = {
							uid: this.uid,
							goodId: this.goodInfo.id,
							email: this.email,
							platform: GetQueryString('platform')
						};

						this.$http.post('../shop-buyGoods.csp', data, { emulateJSON: true }).then(function (res) {
							if (res.json().success) {
								var self = _this2;

								self.showDialog('兑换成功');

								setTimeout(function () {
									self.isSave = true;
									self.$router.go({ path: '/home' });

									self.userInfo.points = self.userInfo.points - self.goodInfo.priceYm;
									self.userInfo.ymMoney = self.userInfo.ymMoney - self.goodInfo.priceYb;
									var ym = self.userInfo.points;
									var yb = self.userInfo.ymMoney;
									console.log(ym);
									console.log(yb);
									_getBlance2.default.blance(ym, yb);
								}, 1000);
							} else {
								_this2.isSave = true;
								_this2.showDialog(res.json().message);
							}
						}, function (res) {
							_this2.showDialog(res.json().message);
							_this2.isSave = true;
						});
					}
				}
			}
		},
		ready: function ready() {
			_webviewtestShare2.default.test(0);

			_title2.default.title('信息确认');
		}
	};

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "\n<section class=\"infoSure\">\n\t<div class=\"user-info\">\n\t\t<div v-if=\"realGood\">\n\t\t\t<div  class=\"isFix\">\n\t\t\t\t<p>收货人：<span>{{getAddr.name}}</span></p>\n\t\t\t\t<p>联系电话：<span>{{getAddr.phone}}</span></p>\n\t\t\t\t<p>收货地址：<span>{{getAddr.detailaddr}}</span></p>\n\t\t\t</div>\n\t\t\t<div  class=\"fix-info\">\n\t\t\t\t<p v-if=\"isFix\" style=\"color: #D93639;display: inline-block;width:80%\" v-link=\"{path:'/saveAddr'}\">修改收货地址</p>\n\t\t\t\t<p v-else style=\"color: #D93639;display: inline-block\" v-link=\"{path:'/saveAddr'}\">还未填写收货地址？马上去填写</p>\n\t\t\t\t<span class=\"go-change\"></span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div v-else>\n\t\t\t<h3 class=\"email-title\">电子邮箱</h3>\n\t\t\t<div class=\"email clearfix\">\n\t\t\t\t<div>\n\t\t\t\t\t<input type=\"text\" name=\"\" v-model=\"email_start\" @change=\"revise\" :value=\"exEmailStart\">\n\t\t\t\t</div>\n\t\t\t\t<div style=\"margin-left: 1px;margin-right: 1px;width: 20px;text-align: center;height: 30px;line-height: 30px\">@</div>\n\t\t\t\t<div>\n\t\t\t\t\t<input type=\"text\" placeholder=\"qq.com\" @focus=\"tipMail\" @blur=\"untipMial\" v-model=\"email_end\" :value=\"exEmailEnd\">\n\t\t\t\t\t<div v-if=\"showMails\" class=\"emailBox\">\n\t\t\t\t\t\t<ul v-if=\"showMails\" transition=\"expand\">\n\t\t\t\t\t\t\t<li v-for=\"item in emails\" v-touch:tap=\"select($index)\">{{item.mail}}</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<div class=\"hr\"></div>\n\t\t<div class=\"good-info\">\n\n\t\t\t\t<div>\n\t\t\t\t\t<img :src=\"goodInfo.coverpicurl\">\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<p>{{goodInfo.name}}</p>\n\n\n\t\t\t\t</div>\n\t\t\t\t<div>\n\n\t\t\t\t\t<p class=\"red\">{{goodInfo.priceYm+'医米'}}<br>{{goodInfo.priceYb==0?'':'+'}}{{goodInfo.priceYb==0?'':goodInfo.priceYb+'医币'}}</p>\n\n\t\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<button class=\"btn btn-red fixed-bottom\" v-touch:tap=\"save\" >确认兑换</button>\n\t<div class=\"tip\" v-show=\"showTip\" v-text=\"message\"></div>\n</section>\n";

/***/ }

});