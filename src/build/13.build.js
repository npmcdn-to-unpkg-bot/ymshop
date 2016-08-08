webpackJsonp([13,9],{

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

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(46)
	__vue_script__ = __webpack_require__(47)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\vue\\goodDetail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(53)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-02afe8e2/goodDetail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 46:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _actions = __webpack_require__(48);

	var _webviewtestShare = __webpack_require__(12);

	var _webviewtestShare2 = _interopRequireDefault(_webviewtestShare);

	var _shareInfo = __webpack_require__(13);

	var _shareInfo2 = _interopRequireDefault(_shareInfo);

	var _title = __webpack_require__(19);

	var _title2 = _interopRequireDefault(_title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var iSlider = __webpack_require__(49);
	__webpack_require__(51);

	module.exports = {
		data: function data() {
			return {
				goods: {},
				banner: [],
				isLimit: null,
				btnMsg: '立即兑换',
				Stime: ''
			};
		},
		route: {
			data: function data(transition) {
				this.sliderBanner();
			},
			activate: function activate(transition) {
				_title2.default.title('商品详情');
				transition.next();
			},
			canReuse: function canReuse() {
				return false;
			}
		},
		computed: {
			details: function details() {
				var str = this.goods.detail + '';
				return str.replace(/\(><\)/g, '"');
			},
			canClick: function canClick() {
				if (this.userInfo.success == false) {
					this.btnMsg = '请先登录';
					return false;
				}
				if (this.userInfo.authFlag != 1) {
					this.btnMsg = '仅实名认证用户可兑换';
					return false;
				}
				if (this.userInfo.points < this.goods.priceYm) {
					this.btnMsg = '医米不足';
					return false;
				}
				if (this.userInfo.ymMoney < this.goods.priceYb) {
					this.btnMsg = '医币不足，请先充值';
					return false;
				}
				if (this.goods.quantity == 0) {
					this.btnMsg = '抢兑结束';
					return false;
				}
				if (this.Stime) {
					var StartTime = parseInt(this.Stime);
					var now = new Date();
					var h = now.getHours();
					if (StartTime >= h) {
						this.btnMsg = '抢兑未开始';
						return false;
					} else {
						this.btnMsg = '点击抢兑';
						return true;
					}
				}
				return true;
			}

		},
		vuex: {
			getters: {
				userInfo: function userInfo(state) {
					return state.userInfo;
				}
			},
			actions: {
				setGoodInfo: _actions.setGoodInfo
			}
		},
		methods: {
			showDialog: function showDialog(message) {
				this.$dispatch('showDialog', message);
			},
			buy: function buy() {
				if (this.canClick) {
					this.$router.go({ path: '/infoSure' });
					this.setGoodInfo(this.goods);
				}
			},
			sliderBanner: function sliderBanner() {
				var _this = this;

				var goodid = this.$route.query.goodid;
				this.Stime = this.$route.query.isL;
				var goods;

				var data = {
					id: goodid
				};

				this.$http.post('../shop-info.csp', data, { emulateJSON: true }).then(function (res) {
					goods = res.json().goods;

					_this.goods = goods;
					var List = [];

					if (goods.bannerpicurl2 == '' || goods.bannerpicurl3 == '') {
						List = [{ content: '<img src=' + _this.goods.bannerpicurl + '>' }, { content: '<img src=' + _this.goods.bannerpicurl + '>' }, { content: '<img src=' + _this.goods.bannerpicurl + '>' }];
					} else {
						List = [{ content: '<img src=' + _this.goods.bannerpicurl + '>' }, { content: '<img src=' + _this.goods.bannerpicurl2 + '>' }, { content: '<img src=' + _this.goods.bannerpicurl3 + '>' }];
					}

					var S = new iSlider({
						dom: document.getElementById("iSlider-wrapper"),
						data: List,
						isLooping: true,
						isOverspread: false,
						isVertical: false,
						isAutoplay: true,
						duration: 2000
					});
				}, function (res) {
					console.log(res);
				});
			}
		},
		ready: function ready() {

			_webviewtestShare2.default.test(1);
			_shareInfo2.default.share();
		}

	};

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

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {!function(t){"use strict";function e(){}function i(t,e){return e.indexOf(t)>-1}function n(t){return"[object Array]"===Object.prototype.toString.call(t)}function s(t){return"[object Object]"===Object.prototype.toString.call(t)}function a(t,e){return t.className.match(new RegExp("(\\s|^)("+e+")(\\s|$)"))}function r(t,e){a(t,e)||(t.className+=" "+e)}function h(t,e){a(t,e)&&(t.className=t.className.replace(RegExp("(\\s|^)("+e+")(\\s|$)"),"$3"))}function o(t){return/<\/?[^>]*>/.test(t)?!1:/^(?:(https|http|ftp|rtsp|mms):)?(\/\/)?(\w+:{0,1}\w*@)?([^\?#:\/]+\.[a-z]+|\d+\.\d+\.\d+\.\d+)?(:[0-9]+)?((?:\.?\/)?([^\?#]*)?(\?[^#]+)?(#.+)?)?$/.test(t)}function l(t){return Array.prototype.slice.apply(t,Array.prototype.slice.call(arguments,1))}function d(t){return t.replace(/^[a-z]/,function(t){return t.toUpperCase()})}var c=function(){var t=l(arguments,0,3);if(!t.length)throw new Error("Parameters required!");var e=s(t.slice(-1)[0])?t.pop():{};switch(t.length){case 2:e.data=e.data||t[1];case 1:e.dom=e.dom||t[0]}if(!e.dom)throw new Error("Container can not be empty!");if(!e.data||!e.data.length)throw new Error("Data must be an array and must have more than one element!");this._opts=e,e=null,t=null,this._setting(),this.fire("initialize"),this._renderWrapper(),this._initPlugins(),this._bindHandler(),this.fire("initialized"),this._autoPlay()};c.VERSION="2.1.8",c.EVENTS=["initialize","initialized","pluginInitialize","pluginInitialized","renderComplete","slide","slideStart","slideEnd","slideChange","slideChanged","slideRestore","slideRestored","loadData","reset","destroy"],c.EASING=[["linear","ease","ease-in","ease-out","ease-in-out"],/cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/],c.FIX_PAGE_TAGS=["SELECT","INPUT","TEXTAREA","BUTTON","LABEL"],c.NODE_TYPE={unknown:"unknown",empty:"empty",pic:"pic",dom:"dom",html:"html",node:"node",element:"element"},c.TRANSITION_END_EVENT=null,c.BROWSER_PREFIX=null,function(){var t=document.createElement("fakeElement");[["WebkitTransition","webkitTransitionEnd","webkit"],["transition","transitionend",null],["MozTransition","transitionend","moz"],["OTransition","oTransitionEnd","o"]].some(function(e){return void 0!==t.style[e[0]]?(c.TRANSITION_END_EVENT=e[1],c.BROWSER_PREFIX=e[2],!0):void 0})}(),c.DEVICE_EVENTS=function(){var e=!!("ontouchstart"in t&&!/Mac OS X /.test(t.navigator.userAgent)||t.DocumentTouch&&document instanceof t.DocumentTouch);return{hasTouch:e,startEvt:e?"touchstart":"mousedown",moveEvt:e?"touchmove":"mousemove",endEvt:e?"touchend":"mouseup",cancelEvt:e?"touchcancel":"mouseout",resizeEvt:"onorientationchange"in t?"orientationchange":"resize"}}(),c.extend=function(){var t,e,i=arguments;switch(i.length){case 0:return;case 1:t=c.prototype,e=i[0];break;case 2:t=i[0],e=i[1]}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},c.plugins={},c.regPlugin=function(t,e){c.plugins[t]=c.plugins[t]||e},c.styleProp=function(t,e){return c.BROWSER_PREFIX?e?c.BROWSER_PREFIX+d(t):"-"+c.BROWSER_PREFIX+"-"+t:t},c.setStyle=function(t,e,i){t.style[c.styleProp(e,1)]=i},c.getStyle=function(t,e){return t.style[c.styleProp(e,1)]},c._animateFuncs={normal:function(){function t(t,e,i,n,s){c.setStyle(t,"transform","translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)")}return t.effect=c.styleProp("transform"),t}()};var u=c.prototype;u.extend=c.extend,u._setting=function(){var s=this;s._plugins=c.plugins,s._animateFuncs=c._animateFuncs,s._holding=!1,s._locking=!1,s._intermediateScene=null,s._transitionEndHandler=null,s._LSN={autoPlay:null,resize:null,transitionEnd:null},s.currentEl=null,s._EventHandle={},s.onMoving=!1,s.onSliding=!1,s.direction=null;var a=this._opts;s.wrap=a.dom,s.data=a.data,s.isVertical=!!a.isVertical,s.isOverspread=!!a.isOverspread,s.duration=a.duration||2e3,s.initIndex=a.initIndex>0&&a.initIndex<=a.data.length-1?a.initIndex:0,s.fixPage=function(){var t=a.fixPage;return t===!1||0===t?!1:n(t)&&t.length>0||"string"==typeof t&&""!==t?[].concat(t).toString():!0}(),s.fillSeam=!!a.fillSeam,s.slideIndex=s.slideIndex||s.initIndex||0,s.axis=s.isVertical?"Y":"X",s.reverseAxis="Y"===s.axis?"X":"Y",s.width="number"==typeof a.width?a.width:s.wrap.offsetWidth,s.height="number"==typeof a.height?a.height:s.wrap.offsetHeight,s.ratio=s.height/s.width,s.scale=s.isVertical?s.height:s.width,s.offset=s.offset||{X:0,Y:0},s.isTouchable=null==a.isTouchable?!0:!!a.isTouchable,s.isLooping=!!(a.isLooping&&s.data.length>1),s.dampingForce=Math.max(0,Math.min(1,parseFloat(a.dampingForce)||0)),s.delay=a.delay||0,s.isAutoplay=!!(a.isAutoplay&&s.data.length>1),s.animateType=a.animateType in s._animateFuncs?a.animateType:"normal",s._animateFunc=s._animateFuncs[s.animateType],s._animateReverse=function(){var t=[];for(var e in s._animateFuncs)s._animateFuncs.hasOwnProperty(e)&&s._animateFuncs[e].reverse&&t.push(e);return t}(),s.isVertical&&"card"===s.animateType&&(s.isOverspread=!0),s.log=a.isDebug?function(){t.console.log.apply(t.console,arguments)}:e,s._damping=function(){return function(t){return.62*Math.atan(Math.abs(t)/s.scale)*(1-s.dampingForce)*s.scale*(t>0?1:-1)}}(),s.animateTime=null!=a.animateTime&&a.animateTime>-1?a.animateTime:300,s.animateEasing=i(a.animateEasing,c.EASING[0])||c.EASING[1].test(a.animateEasing)?a.animateEasing:"ease",s.deviceEvents=c.DEVICE_EVENTS,s.fingerRecognitionRange=a.fingerRecognitionRange>-1?parseInt(a.fingerRecognitionRange):10,s.events={},c.EVENTS.forEach(function(t){var e=a["on"+t.replace(/^\w{1}/,function(t){return t.toUpperCase()})]||a["on"+t.toLowerCase()];"function"==typeof e&&s.on(t,e,1)}),s.pluginConfig=function(){var t={};return n(a.plugins)&&a.plugins.forEach(function(e){n(e)?t[e[0]]=e.slice(1):"string"==typeof e&&(t[e]=[])}),t}()},u._initPlugins=function(){var t=this.pluginConfig,e=this._plugins;for(var i in t)t.hasOwnProperty(i)&&e.hasOwnProperty(i)&&e[i]&&"function"==typeof e[i]&&typeof e[i].apply&&e[i].apply(this,t[i]);this.fire("pluginInitialized")},u._itemType=function(t){if(isNaN(t)||(t=this.data[t]),t.hasOwnProperty("type"))return t.type;var e,i=t.content,n=c.NODE_TYPE;return e=null==i?n.empty:Boolean(i.nodeName)&&Boolean(i.nodeType)?n.node:"string"==typeof i?o(i)?n.pic:n.html:n.unknown,t.type=e,e},u._renderItem=function(t,e){var i,n=this,s=this.data.length,a=function(){var e=' src="'+i.content+'"';e+=i.height/i.width>n.ratio?' height="100%"':' width="100%"',n.isOverspread&&(t.style.cssText+="background-image:url("+i.content+");background-repeat:no-repeat;background-position:50% 50%;background-size:cover",e+=' style="display:block;opacity:0;height:100%;width:100%;"'),t.innerHTML="<img"+e+" />"};if(t.innerHTML="",t.style.background="",this.isLooping||null!=this.data[e]){e=(s+e)%s,i=this.data[e];var r=this._itemType(i),h=c.NODE_TYPE;switch(t.className="islider-"+r,r){case h.pic:if(2===i.load)a();else{var o=new Image;o.src=i.content,o.onload=function(){i.height=o.height,i.width=o.width,a(),i.load=2}}break;case h.dom:case h.html:t.innerHTML=i.content;break;case h.node:case h.element:if(11===i.content.nodeType){var l=document.createElement("div");l.appendChild(i.content),i.content=l}t.appendChild(i.content)}}},u._renderIntermediateScene=function(){null!=this._intermediateScene&&(this._renderItem.apply(this,this._intermediateScene),this._intermediateScene=null)},u._changedStyles=function(){var t=["islider-prev","islider-active","islider-next"];this.els.forEach(function(e,i){h(e,t.join("|")),r(e,t[i]),this.fillSeam&&this.originScale(e)}.bind(this))},u._renderWrapper=function(){var e;this.outer?(e=this.outer,e.innerHTML=""):e=document.createElement("ul"),e.className="islider-outer",this.els=[];for(var i=0;3>i;i++){var n=document.createElement("li");e.appendChild(n),this.els.push(n),this._animateFunc(n,this.axis,this.scale,i,0),this.fixPage||(n.style.overflow="auto"),!this.isVertical||"rotate"!==this.animateType&&"flip"!==this.animateType?this._renderItem(n,i-1+this.slideIndex):this._renderItem(n,1-i+this.slideIndex)}this._changedStyles(),this.fillSeam&&this.els.forEach(function(t,e){r(t,"islider-sliding"+(1===e?"-focus":""))}),t.setTimeout(function(){this._preloadImg(this.slideIndex)}.bind(this),200),this.outer||(this.outer=e,this.wrap.appendChild(e)),this.currentEl=this.els[1],this.fire("renderComplete",this.slideIndex,this.currentEl,this)},u._preloadImg=function(t){if(this.data.length>3){var e=this.data,i=e.length,n=this,s=function(t){var i=e[t];if("pic"===n._itemType(i)&&!i.load){var s=new Image;s.src=i.content,s.onload=function(){i.width=s.width,i.height=s.height,i.load=2},i.load=1}};s((t+2)%i),s((t-2+i)%i)}},u._watchTransitionEnd=function(e,i){var n=function(){this._unWatchTransitionEnd(),"slideChanged"===i&&this._changedStyles(),this.fire.call(this,i,this.slideIndex,this.currentEl,this),this._renderIntermediateScene(),this.play(),this.onSliding=!1,this.direction=null}.bind(this);c.TRANSITION_END_EVENT&&(this.currentEl.addEventListener(c.TRANSITION_END_EVENT,n),this._transitionEndHandler={el:this.currentEl,handler:n}),this._LSN.transitionEnd=t.setTimeout(n,e)},u._unWatchTransitionEnd=function(){this._LSN.transitionEnd&&t.clearTimeout(this._LSN.transitionEnd),null!==this._transitionEndHandler&&(this._transitionEndHandler.el.removeEventListener(c.TRANSITION_END_EVENT,this._transitionEndHandler.handler),this._transitionEndHandler=null)},u._bindHandler=function(){var e=this.outer,i=this.deviceEvents;this.isTouchable&&(i.hasTouch||(e.style.cursor="pointer",e.ondragstart=function(t){return!t}),e.addEventListener(i.startEvt,this),e.addEventListener(i.moveEvt,this),e.addEventListener(i.endEvt,this),!i.hasTouch&&e.addEventListener("mouseout",this)),t.addEventListener(i.resizeEvt,this),t.addEventListener("focus",this,!1),t.addEventListener("blur",this,!1)},u.handleEvent=function(t){var e=this.deviceEvents;switch(t.type){case"mousedown":if(0!==t.button)break;case"touchstart":this.startHandler(t);break;case e.moveEvt:this.moveHandler(t);break;case e.endEvt:case e.cancelEvt:this.endHandler(t);break;case e.resizeEvt:this.resizeHandler();break;case"focus":this.play();break;case"blur":this.pause()}},u.startHandler=function(t){if(this.fixPage&&c.FIX_PAGE_TAGS.indexOf(t.target.tagName.toUpperCase())<0&&!this._isItself(t.target)&&t.preventDefault(),!this._holding&&!this._locking){var e=this.deviceEvents;this.onMoving=!0,this.pause(),this.fire("slideStart",t,this),this.startTime=(new Date).getTime(),this.startX=e.hasTouch?t.targetTouches[0].pageX:t.pageX,this.startY=e.hasTouch?t.targetTouches[0].pageY:t.pageY}},u.moveHandler=function(t){if(this.onMoving){var e=this.deviceEvents,i=this.data.length,n=this.axis,s=this.reverseAxis,a={};t.hasOwnProperty("offsetRatio")?(a[n]=t.offsetRatio*this.scale,a[s]=0):(a.X=e.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,a.Y=e.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY),this.offset=a,t.offsetRatio=a[n]/this.scale,Math.abs(a[n])-Math.abs(a[s])>10&&(t.preventDefault(),this._unWatchTransitionEnd(),this.isLooping||(a[n]>0&&0===this.slideIndex||a[n]<0&&this.slideIndex===i-1)&&(a[n]=this._damping(a[n])),this.els.forEach(function(t,e){t.style.visibility="visible",c.setStyle(t,"transition","none"),this._animateFunc(t,n,this.scale,e,a[n],a[n]),this.fillSeam&&this.seamScale(t)}.bind(this)),this.fire("slide",t,this))}},u.endHandler=function(e){function i(n){if(null!=n)if("A"===n.tagName){if(n.href)return"_blank"===n.getAttribute("target")?t.open(n.href):t.location.href=n.href,e.preventDefault(),!1}else{if("LI"===n.tagName&&n.className.search(/^islider\-/)>-1)return!1;i(n.parentNode)}}if(this.onMoving){this.onMoving=!1;var n=this.offset,s=this.axis,a=this.scale/2,r=(new Date).getTime(),h=this.fingerRecognitionRange;a=r-this.startTime>300?a:14;var o=Math.abs(n[s]),l=Math.abs(n[this.reverseAxis]);this.fire("slideEnd",e,this),n[s]>=a&&o>l?this.slideTo(this.slideIndex-1):n[s]<-a&&o>l?this.slideTo(this.slideIndex+1):Math.abs(this.offset[s])>=h&&this.slideTo(this.slideIndex),Math.abs(this.offset[s])<h&&this.fixPage&&e.target&&i(e.target),this.offset.X=this.offset.Y=0}},u.resizeHandler=function(){var e,i,n=this._LSN.resize,s=+new Date;this.deviceEvents.hasTouch?(n&&t.clearInterval(n),n=t.setInterval(function(){this.height!==this.wrap.offsetHeight||this.width!==this.wrap.offsetWidth?(n&&t.clearInterval(n),n=t.setInterval(function(){e===this.wrap.offsetWidth&&i===this.wrap.offsetHeight?(n&&t.clearInterval(n),this.reset()):(e=this.wrap.offsetWidth,i=this.wrap.offsetHeight)}.bind(this),12)):+new Date-s>=1e3&&n&&t.clearInterval(n)}.bind(this),12)):(n&&t.clearTimeout(n),n=t.setTimeout(function(){this.height===this.wrap.offsetHeight&&this.width===this.wrap.offsetWidth||(n&&t.clearInterval(n),this.reset())}.bind(this),200))},u.slideTo=function(t,e){if(this.isAutoplay&&this.pause(),!this._locking){this.unhold(),this.onSliding=!0;var n,s=this.animateTime,a=this.animateType,o=this._animateFunc,l=this.data,d=this.els,u=this.axis,f=t,p=t-this.slideIndex,m=this.offset,g=0;"object"==typeof e&&(e.animateTime>-1&&(s=e.animateTime),"string"==typeof e.animateType&&e.animateType in this._animateFuncs&&(a=e.animateType,o=this._animateFuncs[a])),0!==m[u]&&(g=Math.abs(m[u])/this.scale*s),Math.abs(p)>1&&this._renderItem(p>0?this.els[2]:this.els[0],f),this._preloadImg(f),l[f]?this.slideIndex=f:this.isLooping?this.slideIndex=p>0?0:l.length-1:p=0;var v,E,_;0===p?n="slideRestore":((this.isVertical&&i(a,this._animateReverse))^p>0?(d.push(d.shift()),v=d[2],E=d[0],_=1):(d.unshift(d.pop()),v=d[0],E=d[2],_=-1),this.currentEl=d[1],1===Math.abs(p)?(this._renderIntermediateScene(),this._renderItem(v,f+p)):Math.abs(p)>1&&(this.isVertical&&i(a,this._animateReverse)?(this._renderItem(E,f+_),this._renderItem(d[1],f),this._intermediateScene=[v,f-_]):(this._renderItem(v,f+_),this._intermediateScene=[E,f-_])),c.setStyle(v,"transition","none"),g=s-g,n="slideChange",this.fillSeam&&(d.forEach(function(t){h(t,"islider-sliding|islider-sliding-focus")}),r(this.currentEl,"islider-sliding-focus"),r(v,"islider-sliding")),this.direction=_);for(var y=0;3>y;y++)d[y]!==v&&c.setStyle(d[y],"transition",(o.effect||"all")+" "+g+"ms "+this.animateEasing),o.call(this,d[y],u,this.scale,y,0,_),this.fillSeam&&this.seamScale(d[y]);this._watchTransitionEnd(g,n+"d"),this.fire(n,this.slideIndex,this.currentEl,this)}},u.slideNext=function(){this.slideTo.apply(this,[this.slideIndex+1].concat(l(arguments)))},u.slidePrev=function(){this.slideTo.apply(this,[this.slideIndex-1].concat(l(arguments)))},u.regPlugin=function(){var t=l(arguments),e=t.shift(),n=t[0];(this._plugins.hasOwnProperty(e)||"function"==typeof n)&&("function"==typeof n&&(this._plugins[e]=n,t.shift()),i(e,this._opts.plugins)||(this._opts.plugins.push(t.length?[].concat([e],t):e),"function"==typeof this._plugins[e]&&this._plugins[e].apply(this,t)))},u.bind=u.delegate=function(e,i,n){function s(e){for(var s=t.event?t.event:e,a=s.target,r=document.querySelectorAll(i),h=0;h<r.length;h++)if(a===r[h]){n.call(a);break}}this.wrap.addEventListener(e,s,!1);var a=e+";"+i;this._EventHandle.hasOwnProperty(a)?(this._EventHandle[a][0].push(n),this._EventHandle[a][1].push(s)):this._EventHandle[a]=[[n],[s]]},u.unbind=u.unDelegate=function(t,e,i){var n=t+";"+e;if(this._EventHandle.hasOwnProperty(n)){var s=this._EventHandle[n][0].indexOf(i);if(s>-1)return this.wrap.removeEventListener(t,this._EventHandle[n][1][s]),this._EventHandle[n][0][s]=this._EventHandle[n][1][s]=null,!0}return!1},u.destroy=function(){var e=this.outer,i=this.deviceEvents;this.fire("destroy"),this.isTouchable&&(e.removeEventListener(i.startEvt,this),e.removeEventListener(i.moveEvt,this),e.removeEventListener(i.endEvt,this),!i.hasTouch&&e.removeEventListener("mouseout",this)),t.removeEventListener(i.resizeEvt,this),t.removeEventListener("focus",this),t.removeEventListener("blur",this);var n;for(n in this._EventHandle)for(var s=this._EventHandle[n][1],a=0;a<s.length;a++)"function"==typeof s[a]&&this.wrap.removeEventListener(n.substr(0,n.indexOf(";")),s[a]);this._EventHandle=null;for(n in this._LSN)this._LSN.hasOwnProperty(n)&&this._LSN[n]&&t.clearTimeout(this._LSN[n]);this._LSN=null,this.wrap.innerHTML=""},u.on=function(t,e,n){return i(t,c.EVENTS)&&"function"==typeof e&&(!(t in this.events)&&(this.events[t]=[]),n?this.events[t].unshift(e):this.events[t].push(e)),this},u.has=function(t,e){return t in this.events?-1<this.events[t].indexOf(e):!1},u.off=function(t,e){if(t in this.events){var i=this.events[t].indexOf(e);i>-1&&delete this.events[t][i]}},u.fire=function(t){var e=l(arguments,1);t.split(/\x20+/).forEach(function(t){if(t in this.events)for(var i=this.events[t],n=0;n<i.length;n++)"function"==typeof i[n]&&i[n].apply&&i[n].apply(this,e)}.bind(this))},u.reset=function(){this.pause(),this._unWatchTransitionEnd(),this.width="number"==typeof this._opts.width?this._opts.width:this.wrap.offsetWidth,this.height="number"==typeof this._opts.height?this._opts.height:this.wrap.offsetHeight,this.ratio=this.height/this.width,this.scale=this.isVertical?this.height:this.width,this._renderWrapper(),this._autoPlay(),this.fire("reset slideRestored",this.slideIndex,this.currentEl,this)},u.loadData=function(t,e){this.pause(),this._unWatchTransitionEnd(),this.slideIndex=e||0,this.data=t,this._renderWrapper(),this._autoPlay(),this.fire("loadData slideChanged",this.slideIndex,this.currentEl,this)},u.pushData=function(t){if(null!=t){var e=this.data.length;this.data=this.data.concat(t),this.isLooping&&0===this.slideIndex?this._renderItem(this.els[0],this.data.length-1):e-1===this.slideIndex&&(this._renderItem(this.els[2],e),this._autoPlay())}},u.unshiftData=function(t){if(null!=t){n(t)||(t=[t]);var e=t.length;this.data=t.concat(this.data),0===this.slideIndex&&this._renderItem(this.els[0],e-1),this.slideIndex+=e}},u._autoPlay=function(){this.delay>0?t.setTimeout(this.play.bind(this),this.delay):this.play()},u.play=function(){this.pause(),this.isAutoplay&&(this.isLooping||this.slideIndex<this.data.length-1)&&(this._LSN.autoPlay=t.setTimeout(this.slideNext.bind(this),this.duration))},u.pause=function(){this._LSN.autoPlay&&t.clearTimeout(this._LSN.autoPlay)},u.hold=function(){this._holding=!0},u.unhold=function(){this._holding=!1,this.unlock()},u.lock=function(){this.hold(),this._locking=!0},u.unlock=function(){this._locking=!1},u.seamScale=function(t){var e=/scale([XY]?)\(([^\)]+)\)/,i=c.getStyle(t,"transform");e.test(i)?c.setStyle(t,"transform",i.replace(e,function(t,e,i){var n={};return e?(n[e]=parseFloat(i),"scale"+this.axis+"("+(e===this.axis?1.001*n[this.axis]:1.001)+")"):(i.indexOf(",")>-1?(i=i.split(","),n.X=parseFloat(i[0]),n.Y=parseFloat(i[1])):n.Y=n.X=parseFloat(i),n[this.axis]*=1.001,"scale("+n.X+", "+n.Y+")")}.bind(this))):c.setStyle(t,"transform",i+" scale"+this.axis+"(1.001)")},u.originScale=function(t){var e=/([\x20]?scale)([XY]?)\(([^\)]+)\)/;c.setStyle(t,"transform",c.getStyle(t,"transform").replace(e,function(t,e,i,n){return t={},i?"1.001"===n?"":(t[i]=parseFloat(n),"scale"+this.axis+"("+(i===this.axis?t[this.axis]/1.001:1)+")"):(n.indexOf(",")>-1?(n=n.split(","),t.X=parseFloat(n[0]),t.Y=parseFloat(n[1])):t.Y=t.X=parseFloat(n),t[this.axis]/=1.001,"scale("+t.X+", "+t.Y+")")}.bind(this)))},u._isItself=function(t){var e=this.fixPage;if("string"==typeof e){for(var i,n=[],s=t;!a(s,"islider-outer")&&s!==this.wrap;)n.push(s),s=s.parentNode;if(s=n.pop(),n.length)try{if(i=Array.prototype.slice.call(s.querySelectorAll(e)),i.length)for(var r=0;r<n.length;r++)if(i.indexOf(n[r])>-1)return!0}catch(h){return!1}}return!1},u.subjectTo=function(t,e){if(!(!t instanceof c)){var i=this;i.animateTime=t.animateTime,i.isLooping=t.isLooping,i.isAutoplay=!1,t.on("slideStart",function(t){i.startHandler(t)}),t.on("slide",function(t){i.moveHandler(t)}),t.on("slideEnd",function(t){i.endHandler(t)}),t.on("slideChange",function(t){var e=i.data.length,n=i.direction;n>0&&(t-i.slideIndex+e)%e===1?i.slideNext():0>n&&(t-i.slideIndex-e)%e===-1&&i.slidePrev()}),t.on("slideRestore",function(t){i.slideIndex!==t&&i.slideTo(t)})}},"function"=="function"&&"object"==typeof module&&module&&"object"==typeof exports&&exports?module.exports=c: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return c}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):t.iSlider=t.iSlider||c}(window||this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module)))

/***/ },

/***/ 50:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * To create dots index on iSlider
	 *
	 * @file dot.js
	 * @author BE-FE Team
	 *    xieyu33333 xieyu33333@gmail.com
	 *    shinate shine.wangrs@gmail.com
	 * @Instructions
	 *    activation:
	 *       new iSlider({
	 *          ...
	 *          plugins: ['dot']
	 *          ...
	 *       });
	 *    more options:
	 *       new iSlider({
	 *          ...
	 *          plugins: [['dot', {locate:'absoulute'}]]
	 *          ...
	 *       });
	 * @options
	 *    locate {string|HTML Element} the warpper of dots value: 'absolute', 'relative' or Specified dom, default: 'absolute'
	 */

	(function (global, factory) {
	    /* CommonJS */
	    if ("function" === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
	        factory(__webpack_require__(49));
	    /* AMD */
	    else if ("function" === 'function' && __webpack_require__(52)['amd'])
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(49)], __WEBPACK_AMD_DEFINE_RESULT__ = function (iSlider) {
	            factory(iSlider);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    /* Global */
	    else
	        factory(global['iSlider']);

	})(window ? window : this, function (iSlider) {

	    'use strict';

	    iSlider && iSlider.regPlugin('dot', function (opts) {


	        var HANDLE = this;
	        var data = HANDLE.data;
	        var dots = [];
	        var evtHandle = [];
	        var endEvt = HANDLE.deviceEvents.endEvt;

	        var dotWrap = document.createElement('ul');
	        dotWrap.className = 'islider-dot-wrap';

	        renderDots();

	        locate(opts && opts.locate != null ? opts.locate : false)
	            .appendChild(dotWrap);

	        HANDLE.on('slideChange', function () {
	            for (var i = 0; i < data.length; i++) {
	                dots[i].className = 'islider-dot';
	                if (i === this.slideIndex) {
	                    dots[i].className += ' active';
	                }
	            }
	        });

	        HANDLE.on('loadData', function () {
	            data = this.data;
	            renderDots();
	        }, 1);

	        function renderDots() {
	            var fragment = document.createDocumentFragment();
	            dots.forEach(function (el, i) {
	                el.removeEventListener(endEvt, evtHandle[i], false);
	            });
	            dots = [], evtHandle = [];
	            dotWrap.innerHTML = '';
	            for (var i = 0; i < data.length; i++) {
	                dots[i] = document.createElement('li');
	                dots[i].className = 'islider-dot';
	                dots[i].setAttribute('index', i);
	                if (i === HANDLE.slideIndex) {
	                    dots[i].className += ' active';
	                }
	                evtHandle[i] = function () {
	                    HANDLE.slideTo(parseInt(this.getAttribute('index'), 10));
	                };
	                dots[i].addEventListener(endEvt, evtHandle[i], false);
	                fragment.appendChild(dots[i]);
	            }
	            dotWrap.appendChild(fragment);
	        }

	        function locate(locate) {
	            if (locate === 'relative') {
	                return HANDLE.wrap;
	            } else if (Boolean(locate.nodeName) && Boolean(locate.nodeType)) {
	                return locate;
	            }
	            return HANDLE.wrap.parentNode;
	        }
	    });
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module)))

/***/ },

/***/ 52:
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ 53:
/***/ function(module, exports) {

	module.exports = "\n<section class=\"goods-detail\">\n\t<div id=\"iSlider-wrapper\">\n\t\t\n\n\t</div>\n\t<div class=\"goods-name\">\n\t\t<h3>{{goods.name}}</h3>\n\t\t<h3><span class=\"ym\">{{goods.priceYm}}</span>医米<span style=\"color: #333\">{{goods.priceYb==0?\"\":\"+\"}}\n\t\t</span><span class=\"ym\">{{goods.priceYb==0?\"\":goods.priceYb}}</span>{{goods.priceYb==0?\"\":\"医币\"}}</h3>\n\t</div>\n\n\n\t<h2 class=\"goods-intro\">\n\t\t<span></span>\n\t\t重要说明\n\t</h2>\n\t<div class=\"intro\">\n\t\t<ol class=\"goods-play-rule\">\n\t\t\t<li>兑换商品需先进行实名认证（我-头像-实名认证）；</li>\n\t\t\t<li>每个账号一周限兑1次；</li>\n\t\t\t<li>实物商品兑换后2-3工作日内发放，虚拟商品1-2工作日发送电子邮箱；</li>\n\t\t\t<li>因商品特价，如无质量问题，不接受退货；</li>\n\t\t\t<li>请准确填写收件信息，资料不完整或错误可能造成无法送达。因地址不详被退回的件，需要补快递费才给重发。</li>\n\t\t</ol>\n\t</div>\n\t\n\n\t<h2 class=\"goods-intro\">\n\t\t<span></span>\n\t\t礼品说明\n\t</h2>\n\t<div class=\"intro\">\n\t\t<h3>商品名称：{{goods.name}}</h3>\n\t\t<div v-html=\"details\">\n\t\t</div>\n\t</div>\n\t<div class=\"btn-bg\">\n\t\t\n\t\n\t\t<button  class=\"btn btn-red\" :class=\"{'disabled':!canClick}\" v-touch:tap=\"buy\">\n\t\t\t<span>{{btnMsg}}</span>\n\t\t</button>\n\t</div>\n</section>\n\n\n\n";

/***/ }

});