//vue的应用当然要引，等下要用它来注册
var Vue = require('vue')
//这个是路由
var VueRouter = require('vue-router');
//这个是类似ajax请求,拉数据
var VueResource = require('vue-resource');
//这个是手机端事件
var VueTouch = require('vue-touch'); 
var hammerjs = require('hammerjs');
require('vue-lazyload-img')



var app = require('./app.vue');
//无限加载商品列表
var infiniteScroll =  require('vue-infinite-scroll');
//注册插件
//
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueTouch);

Vue.use(infiniteScroll);


Vue.use(Vue.lazyimg,{
      /**
       * 是否开启淡入效果的全局选项
       */
      fadein: false,
      /**
       * 是否忽略横向懒加载的全局选项
       */
      nohori: false,
      /**
       * 对屏幕滚动的速度的阈值，滚动速度高于此值时，不加载图片
       */
      speed: 20
  })
// 实例化router
var router = new VueRouter({
    // 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
    hashbang: true,
    history: false,
    saveScrollPosition: false,
    suppressTransitionError:true,
    transitionOnLoad: true
});


// 注册倒计时


// 格式化时间
  Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }


Vue.directive('countdown',{
      deep: true,
      bind:function(){
        
      },
      update:function(val){
        var self = this;
        var now = new Date();
        // console.log(val.sout)
        var calcTime = function(endline,oneday){
          var str ;
          if (endline==24) {
              str = new Date().Format("yyyy-MM-dd").replace(/-/g, "/") +" "+"23:59:59"
          }else{
              str = new Date().Format("yyyy-MM-dd").replace(/-/g, "/") + " "+endline+":00:00"
          }
        
          var t;
          if (oneday) {
             t = (+new Date(str) +oneday*60*60*1000 - now.getTime())/1000;//当前时间和第二天开始时间时间差
          }else{
             t = (+new Date(str) - now.getTime())/1000;//当前时间和即将开始时间时间差
          }
          var d=Math.floor(t/60/60/24);
              var h=Math.floor(t/60/60%24);
              var m=Math.floor(t/60%60);
              var s=Math.floor(t%60);

              self.el.querySelector('span.L-hour').innerHTML = h;
              self.el.querySelector('span.L-min').innerHTML = m;
              self.el.querySelector('span.L-s').innerHTML = s;
        }


        if (now.getHours()<val.start) {
              calcTime(val.start)
        }else if(now.getHours()>=val.start && now.getHours()<val.end){
              calcTime(val.end)
        }else if(val.sout==1){

              calcTime(val.start,24)
        }
        

      },
      unbind:function(){  

      }

    })


//路由
router.map({
    //  '/':{                    //首页
    //     component: function (resolve) {
    //        require(['./vue/home.vue'],resolve)
    //      }
    // },
    '/home':{
        name : 'home',                    //首页
        component: function (resolve) {
           require(['./vue/home.vue'],resolve)
         }
    },
    '/myshop':{
        name: 'myshop',
        component: function(resolve) {
            require(['./vue/myshop.vue'],resolve)//我的商城
        }
    },
    '/mysign':{
        name: 'mysign',
        component: function(resolve){
            require(['./vue/mysign.vue'],resolve)//我的签到
        }
    },
    '/goodDetail':{
      name:'goodDetail',
      component:function(resolve){
            require(['./vue/goodDetail.vue'],resolve)
      }
    },
    '/orderDetail':{
      component:function(resolve){
            require(['./vue/orderDetail.vue'],resolve)
      }
    },
    '/infoSure':{
      component:function(resolve){
            require(['./vue/infoSure.vue'],resolve)
      }
    },
    '/saveAddr':{
      component:function(resolve){
            require(['./vue/saveAddr.vue'],resolve)
      }
    },
    '/playRule':{
      component:function(resolve){
            require(['./vue/playRule.vue'],resolve)
      }
    }
});

router.redirect({
  '*':'/home'
})


// router.beforeEach(function(transition){
  
// })


//测试路由是否成功
router.afterEach(function (transition) {
  console.log('成功浏览到: ' + transition.to.path)

  var isGoodDetail = transition.to.path.indexOf('/goodDetail') 
  if (isGoodDetail>=0) {
     window.scrollTo(0,0)
  }else{

  }
  
});
// 启动路由
router.start(app,"#app");