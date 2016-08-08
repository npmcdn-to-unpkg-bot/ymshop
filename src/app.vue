<template>
	<div id="main">
		<router-view> 
			
		</router-view>

		
		<div class="dialog" transition="bounce" v-show="showDialog" >
			{{msg}}
		</div>
	</div>
</template>


<script>
	import store from './vuex/store.js';
	import webview from './js/webviewtestShare.js';
	import share from './js/shareInfo.js';


	// 获取uid 
   
	//获取url参数内容的方法
	var GetQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	};


	











	module.exports = {
		store,
		data:function(){
			return {
				showDialog:false,
				msg:''
			}
		},
		methods:{
			SSS:function(){
				this.showDialog=!this.showDialog
			},
			hideDialog:()=>{
				this.showDialog = false
			}
		},
		events:{
			'showDialog':function(message){
				this.showDialog = true;
				this.msg = message;
				var self=this;
				setTimeout(function(){
					self.showDialog = false;
				},900)
			}
		},
		directives:{
			countDown:{
				bind:function(){
					console.log(1)
				},
				update:function(val){
					console.log(val)
				}
			}
		},
		created:function(){
			//获取用户信息
			var data = {
				uid:GetQueryString('uid'),
				url:window.location.href
			}
			
			this.$http.post('../user-info.csp',data,{
				emulateJSON:true
			}).then(function (response) {
				//苹果安卓医币不同
				var obj=response.json()
				var u = navigator.userAgent;
        		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        		if (isAndroid) {
        			obj.ymMoney = obj.ymMoneyAdr
        		}else if (isIOS) {
        			obj.ymMoney = obj.ymMoneyAdr + obj.ymMoneyIph
        		}else {
        			obj.ymMoney = obj.ymMoneyAdr + obj.ymMoneyIph
        		}

       		 	store.dispatch('GETINFO',obj)
	      }, function (response) {
	          console.log("error")
	      });

			store.dispatch('GETUID',GetQueryString('uid'))
		},
		ready:function(){
							

		
			//显示隐藏分享按钮，0隐藏，1显示
			webview.test(1);
			share.share();

			
		}
	}












</script>


<style lang="sass">


	.dialog{
		position: fixed;
		width: 60%;
		height: 4.2rem;
		font-size: 1.8rem;
		background-color: #000;
		color: #fff;
		left: 50%;
		top: 45%;
		vertical-align: middle;
		border-radius: 10px;
		margin-left: -30%;
		margin-top: -2.1rem;
		text-align: center;
		padding: 10px 2px;
	}


.bounce-transition {

}
.bounce-enter {
  animation: bounce-in .4s;
}
.bounce-leave {
  animation: bounce-out .4s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}

.change-transition{
	transition: opacity .2s ease;
}
.change-enter, .change-leave{
	opacity: 0;
}


	#loading{
		background-color: #fff;
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 1;
		margin-top: 0px;
		top: 0px;
	}
	#loading-center{
		width: 100%;
		height: 100%;
		position: relative;
		}
	#loading-center-absolute {
		position: absolute;
		left: 50%;
		top: 50%;
		height: 200px;
		width: 200px;
		margin-top: -100px;
		margin-left: -100px;
		-ms-transform: rotate(-135deg); 
	   	-webkit-transform: rotate(-135deg); 
	    transform: rotate(-135deg);
	}
	.object{

		-moz-border-radius: 50% 50% 50% 50%;
		-webkit-border-radius: 50% 50% 50% 50%;
		border-radius: 50% 50% 50% 50%;
		position: absolute;
		border-top: 5px solid #FFF;
		border-bottom: 5px solid transparent;
		border-left:  5px solid #FFF;
		border-right: 5px solid transparent;
		
		-webkit-animation: animate 2s infinite;
		animation: animate 2s infinite;	

		}
	#object_one{
		left: 75px;
		top: 75px;
		width: 50px;
		height: 50px;
		}
								
	#object_two{
		left: 65px;
		top: 65px;
		width: 70px;
		height: 70px;
		-webkit-animation-delay: 0.2s;
	    animation-delay: 0.2s;
		}
			
	#object_three{
		left: 55px;
		top: 55px;
		width: 90px;
		height: 90px;
		-webkit-animation-delay: 0.4s;
	    animation-delay: 0.4s;
		}
	#object_four{
		left: 45px;
		top: 45px;
		width: 110px;
		height: 110px;
		-webkit-animation-delay: 0.6s;
	    animation-delay: 0.6s;
		
		}	

	@-webkit-keyframes animate {
	 

	50% {

		-ms-transform: rotate(360deg) scale(0.8); 
	   	-webkit-transform: rotate(360deg) scale(0.8); 
	    transform: rotate(360deg) scale(0.8); 
	  }
	}

	@keyframes animate {
		
	50% {

		-ms-transform: rotate(360deg) scale(0.8); 
	   	-webkit-transform: rotate(360deg) scale(0.8); 
	    transform: rotate(360deg) scale(0.8); 
	  }	
	}
</style>