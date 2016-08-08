webpackJsonp([7,9],{

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

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(65)
	__vue_script__ = __webpack_require__(66)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\saveAddr.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(69)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-8d715d22/saveAddr.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 65:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _province = __webpack_require__(67);

	var _province2 = _interopRequireDefault(_province);

	var _city = __webpack_require__(68);

	var _city2 = _interopRequireDefault(_city);

	var _webviewtestShare = __webpack_require__(13);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _title = __webpack_require__(20);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GetQueryString = function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return r[2];
		return null;
	};

	module.exports = {
		route: {
			data: function data() {},
			activate: function activate(transition) {
				_title2.default.title('收货地址');
				transition.next();
			}
		},
		data: function data() {
			return {
				show: false,
				citys: _city2.default.citys,
				provinces: _province2.default.provs,
				proId: 0,
				cityId: 0,
				proName: '',
				cityName: '',
				userName: '',
				userPhone: '',
				detailAddr: '',
				activePro: false,
				activeCity: false,
				showTip: false,
				isSave: false,
				message: ''
			};
		},
		vuex: {
			getters: {
				address: function address(state) {
					return state.address;
				}
			}
		},
		methods: {
			toSelect: function toSelect() {
				this.show = !this.show;
			},
			hideModal: function hideModal() {
				this.show = false;
			},
			choosePro: function choosePro(index) {
				this.proName = this.provinces[index].name;
				this.proId = this.provinces[index].pvcid;
				this.chooseCity(0);
			},
			chooseCity: function chooseCity(index) {
				this.cityName = this.cityArr[index].name;
				this.cityId = this.cityArr[index].id;
			},
			showDialog: function showDialog(message) {
				this.$dispatch('showDialog', message);
			},
			saveInfo: function saveInfo() {
				var _this = this;

				this.isSave = true;
				if (this.userName == '') {
					this.showTip = true;
					this.isSave = false;
					this.message = '姓名不能为空';
				}
				if (this.userPhone == '') {
					this.showTip = true;
					this.message = '电话不能为空';
					this.isSave = false;
				}
				if (this.proId == 0) {
					this.showTip = true;
					this.message = '省份不能为空';
					this.isSave = false;
				}
				if (this.cityId == 0) {
					this.showTip = true;
					this.message = '城市不能为空';
					this.isSave = false;
				}
				if (!/^1[3|4|5|7|8]\d{9}$/.test(parseInt(this.userPhone))) {
					this.isSave = false;
					this.showTip = true;
					this.message = '电话号码格式不正确';
				}
				if (this.detailAddr == '') {
					this.showTip = true;
					this.message = '详细地址不能为空';
					this.isSave = false;
				}
				if (this.userName.length > 15) {
					this.showTip = true;
					this.message = '姓名不能超过15个字';
					this.isSave = false;
				}

				if (this.isSave) {
					var data = {
						name: this.userName,
						phone: this.userPhone,
						provinceId: this.proId,
						provinceName: this.proName,
						ctyId: this.cityId,
						ctyName: this.cityName,
						detailaddr: this.detailAddr,
						uid: GetQueryString('uid')
					};

					this.$http.post('../shop-saveAddr.csp', data, { emulateJSON: true }).then(function (res) {
						if (res.json().success) {
							_this.$router.go({ path: '/infoSure' });
						} else {
							_this.showDialog(res.json().message);
						}
					}, function (res) {
						_this.showDialog(res.json().message);
					});
				}
			},
			isChange: function isChange() {
				if (this.address) {
					this.userName = this.address.name;
					this.userPhone = this.address.phone;
					this.proName = this.address.provinceName;
					this.cityName = this.address.ctyName;
					this.detailAddr = this.address.detailaddrShort;
					this.proId = this.address.provinceId;
					this.cityId = this.address.ctyid;
				}
			}

		},
		ready: function ready() {
			_webviewtestShare2.default.test(0);
			this.isChange();
		},
		computed: {
			cityArr: function cityArr() {
				var cArr = [];
				var self = this;
				if (self.proId == 0) {
					cArr.push(this.citys[0]);
				} else {
					cArr = this.citys.filter(function (item, index) {
						return item.pvcid == self.proId;
					});
				}
				return cArr;
			}

		}
	};

/***/ },

/***/ 67:
/***/ function(module, exports) {

	 




	module.exports = { provs: [
	            {
	                pvcid: 1,
	                name: "北京",
	                directly: 1
	            },
	            {
	                pvcid: 2,
	                name: "天津",
	                directly: 1
	            },
	            {
	                pvcid: 3,
	                name: "河北省",
	                directly: 0
	            },
	            {
	                pvcid: 4,
	                name: "山西省",
	                directly: 0
	            },
	            {
	                pvcid: 5,
	                name: "内蒙古自治区",
	                directly: 0
	            },
	            {
	                pvcid: 6,
	                name: "辽宁省",
	                directly: 0
	            },
	            {
	                pvcid: 7,
	                name: "吉林省",
	                directly: 0
	            },
	            {
	                pvcid: 8,
	                name: "黑龙江省",
	                directly: 0
	            },
	            {
	                pvcid: 9,
	                name: "上海",
	                directly: 1
	            },
	            {
	                pvcid: 10,
	                name: "江苏省",
	                directly: 0
	            },
	            {
	                pvcid: 11,
	                name: "浙江省",
	                directly: 0
	            },
	            {
	                pvcid: 12,
	                name: "安徽省",
	                directly: 0
	            },
	            {
	                pvcid: 13,
	                name: "福建省",
	                directly: 0
	            },
	            {
	                pvcid: 14,
	                name: "江西省",
	                directly: 0
	            },
	            {
	                pvcid: 15,
	                name: "山东省",
	                directly: 0
	            },
	            {
	                pvcid: 16,
	                name: "河南省",
	                directly: 0
	            },
	            {
	                pvcid: 17,
	                name: "湖北省",
	                directly: 0
	            },
	            {
	                pvcid: 18,
	                name: "湖南省",
	                directly: 0
	            },
	            {
	                pvcid: 19,
	                name: "广东省",
	                directly: 0
	            },
	            {
	                pvcid: 20,
	                name: "广西壮族自治区",
	                directly: 0
	            },
	            {
	                pvcid: 21,
	                name: "海南省",
	                directly: 0
	            },
	            {
	                pvcid: 22,
	                name: "重庆",
	                directly: 1
	            },
	            {
	                pvcid: 23,
	                name: "四川省",
	                directly: 0
	            },
	            {
	                pvcid: 24,
	                name: "贵州省",
	                directly: 0
	            },
	            {
	                pvcid: 25,
	                name: "云南省",
	                directly: 0
	            },
	            {
	                pvcid: 26,
	                name: "西藏自治区",
	                directly: 0
	            },
	            {
	                pvcid: 27,
	                name: "陕西省",
	                directly: 0
	            },
	            {
	                pvcid: 28,
	                name: "甘肃省",
	                directly: 0
	            },
	            {
	                pvcid: 29,
	                name: "青海省",
	                directly: 0
	            },
	            {
	                pvcid: 30,
	                name: "宁夏回族自治区",
	                directly: 0
	            },
	            {
	                pvcid: 31,
	                name: "新疆维吾尔自治区",
	                directly: 0
	            },
	            {
	                pvcid: 32,
	                name: "台湾",
	                directly: 0
	            },
	            {
	                pvcid: 33,
	                name: "香港特别行政区",
	                directly: 0
	            },
	            {
	                pvcid: 34,
	                name: "澳门特别行政区",
	                directly: 0
	            },
	            {
	                pvcid: 35,
	                name: "海外",
	                directly: 0
	            }
	        ]

	}

/***/ },

/***/ 68:
/***/ function(module, exports) {

		

	module.exports= { citys:	[
			 {id:1,pvcid:1,name:"北京市"},                                  
			 {id:2,pvcid:2,name:"天津市"},                                  
			 {id:3,pvcid:3,name:"石家庄市"},                               
			 {id:4,pvcid:3,name:"唐山市"},                                  
			 {id:5,pvcid:3,name:"秦皇岛市"},                               
			 {id:6,pvcid:3,name:"邯郸市"},                                  
			 {id:7,pvcid:3,name:"邢台市"},                                  
			 {id:8,pvcid:3,name:"保定市"},                                  
			 {id:9,pvcid:3,name:"张家口市"},                               
			 {id:10,pvcid:3,name:"承德市"},                                 
			 {id:11,pvcid:3,name:"沧州市"},                                 
			 {id:12,pvcid:3,name:"廊坊市"},                                 
			 {id:13,pvcid:3,name:"衡水市"},                                 
			 {id:14,pvcid:4,name:"太原市"},                                 
			 {id:15,pvcid:4,name:"大同市"},                                 
			 {id:16,pvcid:4,name:"阳泉市"},                                 
			 {id:17,pvcid:4,name:"长治市"},                                 
			 {id:18,pvcid:4,name:"晋城市"},                                 
			 {id:19,pvcid:4,name:"朔州市"},                                 
			 {id:20,pvcid:4,name:"晋中市"},                                 
			 {id:21,pvcid:4,name:"运城市"},                                 
			 {id:22,pvcid:4,name:"忻州市"},                                 
			 {id:23,pvcid:4,name:"临汾市"},                                 
			 {id:24,pvcid:4,name:"吕梁市"},                                 
			 {id:25,pvcid:5,name:"呼和浩特市"},                           
			 {id:26,pvcid:5,name:"包头市"},                                 
			 {id:27,pvcid:5,name:"乌海市"},                                 
			 {id:28,pvcid:5,name:"赤峰市"},                                 
			 {id:29,pvcid:5,name:"通辽市"},                                 
			 {id:30,pvcid:5,name:"鄂尔多斯市"},                           
			 {id:31,pvcid:5,name:"呼伦贝尔市"},                           
			 {id:32,pvcid:5,name:"巴彦淖尔市"},                           
			 {id:33,pvcid:5,name:"乌兰察布市"},                           
			 {id:34,pvcid:5,name:"兴安盟"},                                 
			 {id:35,pvcid:5,name:"锡林郭勒盟"},                           
			 {id:36,pvcid:5,name:"阿拉善盟"},                              
			 {id:37,pvcid:6,name:"沈阳市"},                                 
			 {id:38,pvcid:6,name:"大连市"},                                 
			 {id:39,pvcid:6,name:"鞍山市"},                                 
			 {id:40,pvcid:6,name:"抚顺市"},                                 
			 {id:41,pvcid:6,name:"本溪市"},                                 
			 {id:42,pvcid:6,name:"丹东市"},                                 
			 {id:43,pvcid:6,name:"锦州市"},                                 
			 {id:44,pvcid:6,name:"营口市"},                                 
			 {id:45,pvcid:6,name:"阜新市"},                                 
			 {id:46,pvcid:6,name:"辽阳市"},                                 
			 {id:47,pvcid:6,name:"盘锦市"},                                 
			 {id:48,pvcid:6,name:"铁岭市"},                                 
			 {id:49,pvcid:6,name:"朝阳市"},                                 
			 {id:50,pvcid:6,name:"葫芦岛市"},                              
			 {id:51,pvcid:7,name:"长春市"},                                 
			 {id:52,pvcid:7,name:"吉林市"},                                 
			 {id:53,pvcid:7,name:"四平市"},                                 
			 {id:54,pvcid:7,name:"辽源市"},                                 
			 {id:55,pvcid:7,name:"通化市"},                                 
			 {id:56,pvcid:7,name:"白山市"},                                 
			 {id:57,pvcid:7,name:"松原市"},                                 
			 {id:58,pvcid:7,name:"白城市"},                                 
			 {id:59,pvcid:7,name:"延边朝鲜族自治州"},                  
			 {id:60,pvcid:8,name:"哈尔滨市"},                              
			 {id:61,pvcid:8,name:"齐齐哈尔市"},                           
			 {id:62,pvcid:8,name:"鸡西市"},                                 
			 {id:63,pvcid:8,name:"鹤岗市"},                                 
			 {id:64,pvcid:8,name:"双鸭山市"},                              
			 {id:65,pvcid:8,name:"大庆市"},                                 
			 {id:66,pvcid:8,name:"伊春市"},                                 
			 {id:67,pvcid:8,name:"佳木斯市"},                              
			 {id:68,pvcid:8,name:"七台河市"},                              
			 {id:69,pvcid:8,name:"牡丹江市"},                              
			 {id:70,pvcid:8,name:"黑河市"},                                 
			 {id:71,pvcid:8,name:"绥化市"},                                 
			 {id:72,pvcid:8,name:"大兴安岭地区"},                        
			 {id:73,pvcid:9,name:"上海市"},                                 
			 {id:74,pvcid:10,name:"南京市"},                                
			 {id:75,pvcid:10,name:"无锡市"},                                
			 {id:76,pvcid:10,name:"徐州市"},                                
			 {id:77,pvcid:10,name:"常州市"},                                
			 {id:78,pvcid:10,name:"苏州市"},                                
			 {id:79,pvcid:10,name:"南通市"},                                
			 {id:80,pvcid:10,name:"连云港市"},                             
			 {id:81,pvcid:10,name:"淮安市"},                                
			 {id:82,pvcid:10,name:"盐城市"},                                
			 {id:83,pvcid:10,name:"扬州市"},                                
			 {id:84,pvcid:10,name:"镇江市"},                                
			 {id:85,pvcid:10,name:"泰州市"},                                
			 {id:86,pvcid:10,name:"宿迁市"},                                
			 {id:87,pvcid:11,name:"杭州市"},                                
			 {id:88,pvcid:11,name:"宁波市"},                                
			 {id:89,pvcid:11,name:"温州市"},                                
			 {id:90,pvcid:11,name:"嘉兴市"},                                
			 {id:91,pvcid:11,name:"湖州市"},                                
			 {id:92,pvcid:11,name:"绍兴市"},                                
			 {id:93,pvcid:11,name:"金华市"},                                
			 {id:94,pvcid:11,name:"衢州市"},                                
			 {id:95,pvcid:11,name:"舟山市"},                                
			 {id:96,pvcid:11,name:"台州市"},                                
			 {id:97,pvcid:11,name:"丽水市"},                                
			 {id:98,pvcid:12,name:"合肥市"},                                
			 {id:99,pvcid:12,name:"芜湖市"},                                
			 {id:100,pvcid:12,name:"蚌埠市"},                               
			 {id:101,pvcid:12,name:"淮南市"},                               
			 {id:102,pvcid:12,name:"马鞍山市"},                            
			 {id:103,pvcid:12,name:"淮北市"},                               
			 {id:104,pvcid:12,name:"铜陵市"},                               
			 {id:105,pvcid:12,name:"安庆市"},                               
			 {id:106,pvcid:12,name:"黄山市"},                               
			 {id:107,pvcid:12,name:"滁州市"},                               
			 {id:108,pvcid:12,name:"阜阳市"},                               
			 {id:109,pvcid:12,name:"宿州市"},                               
			 {id:110,pvcid:12,name:"六安市"},                               
			 {id:111,pvcid:12,name:"亳州市"},                               
			 {id:112,pvcid:12,name:"池州市"},                               
			 {id:113,pvcid:12,name:"宣城市"},                               
			 {id:114,pvcid:13,name:"福州市"},                               
			 {id:115,pvcid:13,name:"厦门市"},                               
			 {id:116,pvcid:13,name:"莆田市"},                               
			 {id:117,pvcid:13,name:"三明市"},                               
			 {id:118,pvcid:13,name:"泉州市"},                               
			 {id:119,pvcid:13,name:"漳州市"},                               
			 {id:120,pvcid:13,name:"南平市"},                               
			 {id:121,pvcid:13,name:"龙岩市"},                               
			 {id:122,pvcid:13,name:"宁德市"},                               
			 {id:123,pvcid:14,name:"南昌市"},                               
			 {id:124,pvcid:14,name:"景德镇市"},                            
			 {id:125,pvcid:14,name:"萍乡市"},                               
			 {id:126,pvcid:14,name:"九江市"},                               
			 {id:127,pvcid:14,name:"新余市"},                               
			 {id:128,pvcid:14,name:"鹰潭市"},                               
			 {id:129,pvcid:14,name:"赣州市"},                               
			 {id:130,pvcid:14,name:"吉安市"},                               
			 {id:131,pvcid:14,name:"宜春市"},                               
			 {id:132,pvcid:14,name:"抚州市"},                               
			 {id:133,pvcid:14,name:"上饶市"},                               
			 {id:134,pvcid:15,name:"济南市"},                               
			 {id:135,pvcid:15,name:"青岛市"},                               
			 {id:136,pvcid:15,name:"淄博市"},                               
			 {id:137,pvcid:15,name:"枣庄市"},                               
			 {id:138,pvcid:15,name:"东营市"},                               
			 {id:139,pvcid:15,name:"烟台市"},                               
			 {id:140,pvcid:15,name:"潍坊市"},                               
			 {id:141,pvcid:15,name:"济宁市"},                               
			 {id:142,pvcid:15,name:"泰安市"},                               
			 {id:143,pvcid:15,name:"威海市"},                               
			 {id:144,pvcid:15,name:"日照市"},                               
			 {id:145,pvcid:15,name:"莱芜市"},                               
			 {id:146,pvcid:15,name:"临沂市"},                               
			 {id:147,pvcid:15,name:"德州市"},                               
			 {id:148,pvcid:15,name:"聊城市"},                               
			 {id:149,pvcid:15,name:"滨州市"},                               
			 {id:150,pvcid:15,name:"菏泽市"},                               
			 {id:151,pvcid:16,name:"郑州市"},                               
			 {id:152,pvcid:16,name:"开封市"},                               
			 {id:153,pvcid:16,name:"洛阳市"},                               
			 {id:154,pvcid:16,name:"平顶山市"},                            
			 {id:155,pvcid:16,name:"安阳市"},                               
			 {id:156,pvcid:16,name:"鹤壁市"},                               
			 {id:157,pvcid:16,name:"新乡市"},                               
			 {id:158,pvcid:16,name:"焦作市"},                               
			 {id:159,pvcid:16,name:"濮阳市"},                               
			 {id:160,pvcid:16,name:"许昌市"},                               
			 {id:161,pvcid:16,name:"漯河市"},                               
			 {id:162,pvcid:16,name:"三门峡市"},                            
			 {id:163,pvcid:16,name:"南阳市"},                               
			 {id:164,pvcid:16,name:"商丘市"},                               
			 {id:165,pvcid:16,name:"信阳市"},                               
			 {id:166,pvcid:16,name:"周口市"},                               
			 {id:167,pvcid:16,name:"驻马店市"},                            
			 {id:168,pvcid:16,name:"省直辖"},                               
			 {id:169,pvcid:17,name:"武汉市"},                               
			 {id:170,pvcid:17,name:"黄石市"},                               
			 {id:171,pvcid:17,name:"十堰市"},                               
			 {id:172,pvcid:17,name:"宜昌市"},                               
			 {id:173,pvcid:17,name:"襄阳市"},                               
			 {id:174,pvcid:17,name:"鄂州市"},                               
			 {id:175,pvcid:17,name:"荆门市"},                               
			 {id:176,pvcid:17,name:"孝感市"},                               
			 {id:177,pvcid:17,name:"荆州市"},                               
			 {id:178,pvcid:17,name:"黄冈市"},                               
			 {id:179,pvcid:17,name:"咸宁市"},                               
			 {id:180,pvcid:17,name:"随州市"},                               
			 {id:181,pvcid:17,name:"恩施土家族苗族自治州"},          
			 {id:182,pvcid:17,name:"省直辖"},                               
			 {id:183,pvcid:18,name:"长沙市"},                               
			 {id:184,pvcid:18,name:"株洲市"},                               
			 {id:185,pvcid:18,name:"湘潭市"},                               
			 {id:186,pvcid:18,name:"衡阳市"},                               
			 {id:187,pvcid:18,name:"邵阳市"},                               
			 {id:188,pvcid:18,name:"岳阳市"},                               
			 {id:189,pvcid:18,name:"常德市"},                               
			 {id:190,pvcid:18,name:"张家界市"},                            
			 {id:191,pvcid:18,name:"益阳市"},                               
			 {id:192,pvcid:18,name:"郴州市"},                               
			 {id:193,pvcid:18,name:"永州市"},                               
			 {id:194,pvcid:18,name:"怀化市"},                               
			 {id:195,pvcid:18,name:"娄底市"},                               
			 {id:196,pvcid:18,name:"湘西土家族苗族自治州"},          
			 {id:197,pvcid:19,name:"广州市"},                               
			 {id:198,pvcid:19,name:"韶关市"},                               
			 {id:199,pvcid:19,name:"深圳市"},                               
			 {id:200,pvcid:19,name:"珠海市"},                               
			 {id:201,pvcid:19,name:"汕头市"},                               
			 {id:202,pvcid:19,name:"佛山市"},                               
			 {id:203,pvcid:19,name:"江门市"},                               
			 {id:204,pvcid:19,name:"湛江市"},                               
			 {id:205,pvcid:19,name:"茂名市"},                               
			 {id:206,pvcid:19,name:"肇庆市"},                               
			 {id:207,pvcid:19,name:"惠州市"},                               
			 {id:208,pvcid:19,name:"梅州市"},                               
			 {id:209,pvcid:19,name:"汕尾市"},                               
			 {id:210,pvcid:19,name:"河源市"},                               
			 {id:211,pvcid:19,name:"阳江市"},                               
			 {id:212,pvcid:19,name:"清远市"},                               
			 {id:213,pvcid:19,name:"东莞市"},                               
			 {id:214,pvcid:19,name:"中山市"},                               
			 {id:215,pvcid:19,name:"潮州市"},                               
			 {id:216,pvcid:19,name:"揭阳市"},                               
			 {id:217,pvcid:19,name:"云浮市"},                               
			 {id:218,pvcid:20,name:"南宁市"},                               
			 {id:219,pvcid:20,name:"柳州市"},                               
			 {id:220,pvcid:20,name:"桂林市"},                               
			 {id:221,pvcid:20,name:"梧州市"},                               
			 {id:222,pvcid:20,name:"北海市"},                               
			 {id:223,pvcid:20,name:"防城港市"},                            
			 {id:224,pvcid:20,name:"钦州市"},                               
			 {id:225,pvcid:20,name:"贵港市"},                               
			 {id:226,pvcid:20,name:"玉林市"},                               
			 {id:227,pvcid:20,name:"百色市"},                               
			 {id:228,pvcid:20,name:"贺州市"},                               
			 {id:229,pvcid:20,name:"河池市"},                               
			 {id:230,pvcid:20,name:"来宾市"},                               
			 {id:231,pvcid:20,name:"崇左市"},                               
			 {id:232,pvcid:21,name:"海口市"},                               
			 {id:233,pvcid:21,name:"三亚市"},                               
			 {id:234,pvcid:21,name:"三沙市"},                               
			 {id:235,pvcid:21,name:"省直辖"},                               
			 {id:236,pvcid:22,name:"重庆市"},                               
			 {id:237,pvcid:23,name:"成都市"},                               
			 {id:238,pvcid:23,name:"自贡市"},                               
			 {id:239,pvcid:23,name:"攀枝花市"},                            
			 {id:240,pvcid:23,name:"泸州市"},                               
			 {id:241,pvcid:23,name:"德阳市"},                               
			 {id:242,pvcid:23,name:"绵阳市"},                               
			 {id:243,pvcid:23,name:"广元市"},                               
			 {id:244,pvcid:23,name:"遂宁市"},                               
			 {id:245,pvcid:23,name:"内江市"},                               
			 {id:246,pvcid:23,name:"乐山市"},                               
			 {id:247,pvcid:23,name:"南充市"},                               
			 {id:248,pvcid:23,name:"眉山市"},                               
			 {id:249,pvcid:23,name:"宜宾市"},                               
			 {id:250,pvcid:23,name:"广安市"},                               
			 {id:251,pvcid:23,name:"达州市"},                               
			 {id:252,pvcid:23,name:"雅安市"},                               
			 {id:253,pvcid:23,name:"巴中市"},                               
			 {id:254,pvcid:23,name:"资阳市"},                               
			 {id:255,pvcid:23,name:"阿坝藏族羌族自治州"},             
			 {id:256,pvcid:23,name:"甘孜藏族自治州"},                   
			 {id:257,pvcid:23,name:"凉山彝族自治州"},                   
			 {id:258,pvcid:24,name:"贵阳市"},                               
			 {id:259,pvcid:24,name:"六盘水市"},                            
			 {id:260,pvcid:24,name:"遵义市"},                               
			 {id:261,pvcid:24,name:"安顺市"},                               
			 {id:262,pvcid:24,name:"毕节市"},                               
			 {id:263,pvcid:24,name:"铜仁市"},                               
			 {id:264,pvcid:24,name:"黔西南布依族苗族自治州"},       
			 {id:265,pvcid:24,name:"黔东南苗族侗族自治州"},          
			 {id:266,pvcid:24,name:"黔南布依族苗族自治州"},          
			 {id:267,pvcid:25,name:"昆明市"},                               
			 {id:268,pvcid:25,name:"曲靖市"},                               
			 {id:269,pvcid:25,name:"玉溪市"},                               
			 {id:270,pvcid:25,name:"保山市"},                               
			 {id:271,pvcid:25,name:"昭通市"},                               
			 {id:272,pvcid:25,name:"丽江市"},                               
			 {id:273,pvcid:25,name:"普洱市"},                               
			 {id:274,pvcid:25,name:"临沧市"},                               
			 {id:275,pvcid:25,name:"楚雄彝族自治州"},                   
			 {id:276,pvcid:25,name:"红河哈尼族彝族自治州"},          
			 {id:277,pvcid:25,name:"文山壮族苗族自治州"},             
			 {id:278,pvcid:25,name:"西双版纳傣族自治州"},             
			 {id:279,pvcid:25,name:"大理白族自治州"},                   
			 {id:280,pvcid:25,name:"德宏傣族景颇族自治州"},          
			 {id:281,pvcid:25,name:"怒江傈僳族自治州"},                
			 {id:282,pvcid:25,name:"迪庆藏族自治州"},                   
			 {id:283,pvcid:26,name:"拉萨市"},                               
			 {id:284,pvcid:26,name:"昌都地区"},                            
			 {id:285,pvcid:26,name:"山南地区"},                            
			 {id:286,pvcid:26,name:"日喀则地区"},                         
			 {id:287,pvcid:26,name:"那曲地区"},                            
			 {id:288,pvcid:26,name:"阿里地区"},                            
			 {id:289,pvcid:26,name:"林芝地区"},                            
			 {id:290,pvcid:27,name:"西安市"},                               
			 {id:291,pvcid:27,name:"铜川市"},                               
			 {id:292,pvcid:27,name:"宝鸡市"},                               
			 {id:293,pvcid:27,name:"咸阳市"},                               
			 {id:294,pvcid:27,name:"渭南市"},                               
			 {id:295,pvcid:27,name:"延安市"},                               
			 {id:296,pvcid:27,name:"汉中市"},                               
			 {id:297,pvcid:27,name:"榆林市"},                               
			 {id:298,pvcid:27,name:"安康市"},                               
			 {id:299,pvcid:27,name:"商洛市"},                               
			 {id:300,pvcid:28,name:"兰州市"},                               
			 {id:301,pvcid:28,name:"嘉峪关市"},                            
			 {id:302,pvcid:28,name:"金昌市"},                               
			 {id:303,pvcid:28,name:"白银市"},                               
			 {id:304,pvcid:28,name:"天水市"},                               
			 {id:305,pvcid:28,name:"武威市"},                               
			 {id:306,pvcid:28,name:"张掖市"},                               
			 {id:307,pvcid:28,name:"平凉市"},                               
			 {id:308,pvcid:28,name:"酒泉市"},                               
			 {id:309,pvcid:28,name:"庆阳市"},                               
			 {id:310,pvcid:28,name:"定西市"},                               
			 {id:311,pvcid:28,name:"陇南市"},                               
			 {id:312,pvcid:28,name:"临夏回族自治州"},                   
			 {id:313,pvcid:28,name:"甘南藏族自治州"},                   
			 {id:314,pvcid:29,name:"西宁市"},                               
			 {id:315,pvcid:29,name:"海东地区"},                            
			 {id:316,pvcid:29,name:"海北藏族自治州"},                   
			 {id:317,pvcid:29,name:"黄南藏族自治州"},                   
			 {id:318,pvcid:29,name:"海南藏族自治州"},                   
			 {id:319,pvcid:29,name:"果洛藏族自治州"},                   
			 {id:320,pvcid:29,name:"玉树藏族自治州"},                   
			 {id:321,pvcid:29,name:"海西蒙古族藏族自治州"},          
			 {id:322,pvcid:30,name:"银川市"},                               
			 {id:323,pvcid:30,name:"石嘴山市"},                            
			 {id:324,pvcid:30,name:"吴忠市"},                               
			 {id:325,pvcid:30,name:"固原市"},                               
			 {id:326,pvcid:30,name:"中卫市"},                               
			 {id:327,pvcid:31,name:"乌鲁木齐市"},                         
			 {id:328,pvcid:31,name:"克拉玛依市"},                         
			 {id:329,pvcid:31,name:"吐鲁番地区"},                         
			 {id:330,pvcid:31,name:"哈密地区"},                            
			 {id:331,pvcid:31,name:"昌吉回族自治州"},                   
			 {id:332,pvcid:31,name:"博尔塔拉蒙古自治州"},             
			 {id:333,pvcid:31,name:"巴音郭楞蒙古自治州"},             
			 {id:334,pvcid:31,name:"阿克苏地区"},                         
			 {id:335,pvcid:31,name:"克孜勒苏柯尔克孜自治州"},       
			 {id:336,pvcid:31,name:"喀什地区"},                            
			 {id:337,pvcid:31,name:"和田地区"},                            
			 {id:338,pvcid:31,name:"伊犁哈萨克自治州"},                
			 {id:339,pvcid:31,name:"塔城地区"},                            
			 {id:340,pvcid:31,name:"阿勒泰地区"},                         
			 {id:341,pvcid:31,name:"自治区直辖"},                         
			 {id:342,pvcid:32,name:"台北市"},                               
			 {id:343,pvcid:32,name:"高雄市"},                               
			 {id:344,pvcid:32,name:"基隆市"},                               
			 {id:345,pvcid:32,name:"台中市"},                               
			 {id:346,pvcid:32,name:"台南市"},                               
			 {id:347,pvcid:32,name:"新竹市"},                               
			 {id:348,pvcid:32,name:"嘉义市"},                               
			 {id:349,pvcid:32,name:"省直辖"},                               
			 {id:350,pvcid:33,name:"香港岛"},                               
			 {id:351,pvcid:33,name:"九龙"},                                  
			 {id:352,pvcid:33,name:"新界"},                                  
			 {id:353,pvcid:34,name:"澳门半岛"},                            
			 {id:354,pvcid:34,name:"澳门离岛"},                            
			 {id:355,pvcid:34,name:"无堂区划分区域"},                   
			 {id:356,pvcid:35,name:"亚洲"},                                  
			 {id:357,pvcid:35,name:"欧洲"},                                  
			 {id:358,pvcid:35,name:"非洲"},                                  
			 {id:359,pvcid:35,name:"北美洲"},                               
			 {id:360,pvcid:35,name:"南美洲"},                               
			 {id:361,pvcid:35,name:"大洋洲"}                              
			]
		}

/***/ },

/***/ 69:
/***/ function(module, exports) {

	module.exports = "\r\n<div>\r\n\t<section class=\"save-addr\">\r\n\t<div class=\"addr-form\">\r\n\t\t<div>\r\n\t\t\t<input type=\"text\" name=\"\" placeholder=\"收货人姓名\" v-model=\"userName\" maxlength=\"15\" >\r\n\t\t</div>\r\n\t\t<div>\r\n\t\t\t<input type=\"text\" name=\"\" placeholder=\"手机号码\" v-model=\"userPhone\" maxlength=\"11\" oninput=\"value=value.replace(/[^0-9]/g, '')\">\r\n\t\t</div>\r\n\t\t<div class=\"area\" v-touch:tap=\"toSelect\">\r\n\t\t\t<input type=\"text\" name=\"\" placeholder=\"省\" v-model=\"proName\">\r\n\t\t</div>\r\n\t\t<div class=\"area\" v-touch:tap=\"toSelect\">\r\n\t\t\t<input type=\"text\" name=\"\" placeholder=\"市\" v-model=\"cityName\">\r\n\t\t</div>\r\n\t\t<div>\r\n\t\t\t<textarea type=\"text\" placeholder=\"填写详细地址\" maxlength=\"60\" v-model=\"detailAddr\"></textarea> \r\n\t\t</div>\r\n\t</div>\r\n\t\r\n\t</section>\r\n\t<button class=\"btn btn-red fixed-bottom\" v-touch:tap=\"saveInfo\">保存</button>\r\n\t<div class=\"tip\" v-text=\"message\" v-show=\"showTip\"></div>\r\n\t<div class=\"modal-mask\" v-show=\"show\" transition=\"area-select\">\r\n\t\t<div class=\"select-modal-container\">\r\n\t\t\t<div class=\"select-btn clearfix\">\r\n\t\t\t\t<button class=\"btn\" v-touch:tap=\"hideModal\">确认</button>\r\n\t\t\t\t<button class=\"btn\" v-touch:tap=\"hideModal\">取消</button>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"select-box clearfix\">\r\n\t\t\t\t<div class=\"selected-box\">\r\n\t\t\t\t\t<ul class=\"province\">\r\n\t\t\t\t\t\t<li v-for=\"pro in provinces\" v-touch:tap=\"choosePro($index)\" :class=\"{'active':pro.pvcid==proId}\">\r\n\t\t\t\t\t\t\t{{pro.name}}\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div class=\"selected-box\">\r\n\t\t\t\t\t<ul class=\"city\">\r\n\t\t\t\t\t\t<li v-for=\"city in cityArr\" v-touch:tap=\"chooseCity($index)\" :class=\"{'active':city.id==cityId}\">\r\n\t\t\t\t\t\t\t{{city.name}}\r\n\t\t\t\t\t\t</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n";

/***/ }

});