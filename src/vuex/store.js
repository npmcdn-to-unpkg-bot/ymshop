var Vue = require('vue');
var Vuex= require('vuex');



Vue.use(Vuex);





module.exports =  new Vuex.Store({
  state:{
  	userInfo:{
          // success:true,
          // ymMoney:1000,
          // points:1230,
          // continus:3,
          // canSign:1
        },
    goodsInfo:{

    },
    uid:{

    },
    address:{

    }
  },
  mutations:{
  	GETINFO:function(state,obj){
  		state.userInfo = obj
  	},
    SETGOODINFO:function(state,obj){
      state.goodsInfo = obj
    },
    GETUID:function(state,str){
      state.uid = str
    },
    SETADDRESS:function(state,obj){
      state.address = obj
    }
  }




})