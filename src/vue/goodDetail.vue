<template >
	<section class="goods-detail">
		<div id="iSlider-wrapper">
		
		</div>
		<div class="goods-name">
			<h3>{{goods.name}}</h3>
			<h3>
				<span class="ym">{{goods.priceYm}}</span>医米<span style="color: #333">{{goods.priceYb==0?"":"+"}}
				</span><span class="ym">{{goods.priceYb==0?"":goods.priceYb}}</span>{{goods.priceYb==0?"":"医币"}}
			</h3>
			<div class="goods-progress" v-if="isLimit" style="margin-top: 2rem;margin-bottom: 0.5rem;width: 70%">
				<div class="time-to-buy clearfix">
					<div>
						{{isStart?'距结束':'距开始'}}
					</div>
					<div  v-countdown="{start:dayTime,end:dayTimeDown,count:t,sout:issaleout}" >
						<span  class="L-hour" v-bind:class="{'start-to-buy':!isStart}" style="width: 1.9rem;height: 1.5rem;line-height: 1.5rem;font-size: 1.3rem">00</span>
						<span>:</span>
						<span  class="L-min" v-bind:class="{'start-to-buy':!isStart}" style="width: 1.9rem;height: 1.5rem;line-height: 1.5rem;font-size: 1.3rem">00</span>
						<span>:</span>
						<span  class="L-s" v-bind:class="{'start-to-buy':!isStart}" style="width: 1.9rem;height: 1.5rem;line-height: 1.5rem;font-size: 1.3rem">00</span>
					</div>

					
				</div>
				<div class="max-length">
					<div class="now-length" :style="{width:ratio+'%'}"></div>
				</div>
				<div class="has-buy" >已抢{{ratio}}%</div>
			</div>
		</div>


		<h2 class="goods-intro">
			<span></span>
			重要说明
		</h2>
		<div class="intro">
			<ol class="goods-play-rule">
				<li>兑换商品需先进行实名认证（我-头像-实名认证）；</li>
				<li>每个账号一周限兑1次；</li>
				<li>实物商品兑换后2-3工作日内发放，虚拟商品1-2工作日发送电子邮箱；</li>
				<li>因商品特价，如无质量问题，不接受退货；</li>
				<li>请准确填写收件信息，资料不完整或错误可能造成无法送达。因地址不详被退回的件，需要补快递费才给重发。</li>
			</ol>
		</div>
		

		<h2 class="goods-intro">
			<span></span>
			礼品说明
		</h2>
		<div class="intro">
			<h3>商品名称：{{goods.name}}</h3>
			<div v-html="details">
			</div>
		</div>
		<div class="btn-bg">
			
		
			<button  class="btn btn-red" :class="{'disabled':!canClick}" v-touch:tap="buy">
				<span>{{btnMsg}}</span>
			</button>
		</div>
	</section>
	

	
</template>

<script >
 	var iSlider = require('iSlider');
 	require('iSlider-dot');

 	import {setGoodInfo} from '../vuex/actions.js'
 	import webview from '../js/webviewtestShare.js'
	import share from '../js/shareInfo.js';
	import setTitle from '../js/title.js';


	module.exports = {
		data:function(){
			return {
				goods:{},
				banner:[],
				isLimit:null,
				btnMsg:'立即兑换',
				Stime:'',
				t:1
			}	
		},
		route:{
			data:function(transition){
				transition.next()
				document.removeEventListener('scroll',function(){
					console.log()
				})
				this.sliderBanner()
			},
			activate:function(){
				// document.body.scrollTop = 0;
				setTitle.title('商品详情')

				var self = this;

				for(var i = 0; i<100;i++){
					window.clearInterval(i)
				}

				setInterval(function(){
					self.t++
				},1000)
					
			},
			canReuse:function(){
				return false;
			}
		},
		computed:{
			details:function(){
				var str = this.goods.detail + '';
				return str.replace(/\(><\)/g,'"')
			},
			canClick:function(){
					if (this.userInfo.success==false) {
						this.btnMsg = '请先登录'
						return false
					}
					if (this.userInfo.authFlag !=1) {
						this.btnMsg = '仅实名认证用户可兑换'
						return false
					}
					if (this.userInfo.points<this.goods.priceYm) {
						this.btnMsg = '医米不足'
						return false
					}
					if (this.userInfo.ymMoney< this.goods.priceYb) {
						this.btnMsg = '医币不足，请先充值'
						return false
					}
					
					if (this.Stime) {
						//抢兑情况下
						var StartTime = parseInt(this.Stime);
						var now = new Date();
						var h=now.getHours();
						if (h<StartTime) {
							this.btnMsg = '抢兑未开始'
							return false
						}else if(h>=this.dayTimeDown){
							this.btnMsg = '抢兑结束'	
							return false
						}else if (this.ratio==100) {
							this.btnMsg = '抢兑结束'
							return false
						}else{
							this.btnMsg = '点击抢兑'
							return true
						}
					}

					return true
			},
			isLimit:function(){
				if (this.$route.query.dayTime != 0) {
					return true
				}else{
					return false
				}
			},
			isStart:function(){
				var now = new Date();
				if (now.getHours()<this.dayTime || now.getHours()>=this.dayTimeDown) {
					return false
				}
				else{
					return true
				}
			},
			dayTime:function(){
				return parseInt(this.$route.query.dayTime)
			},
			dayTimeDown:function(){
				return parseInt(this.$route.query.dayTimeDown)
			},
			ratio:function(){
				return this.$route.query.ratio
			},
			issaleout:function(){
				//已到抢兑时间，判断是否抢兑完成
				var h = new Date().getHours();

				if (h >= this.dayTime && this.quantity==0 && h<this.dayTimeDown) {
					// 正在抢兑，商品已经抢完
					return 1
				}else if(h>=this.dayTimeDown){
					// 抢兑时间结束
					return 1
				}else{
					return 0
				}
				


			}
		},
		vuex:{
			getters:{
				userInfo: state=> state.userInfo
			},
			actions:{
				setGoodInfo
			}
		},
		methods:{
			showDialog:function(message){
				this.$dispatch('showDialog',message)
			},
			buy:function(){
				if (this.canClick) {
					this.$router.go({path:'/infoSure'})
					this.setGoodInfo(this.goods)
				}
			},
			sliderBanner:function(){
				var goodid = this.$route.query.goodid;
				this.Stime = this.$route.query.isL;
				var goods;
				//上传的商品数据ID
				var data = {
					id:goodid
				}

				this.$http.post('../shop-info.csp',data,{emulateJSON : true}).then((res)=>{
					goods = res.json().goods;
					
					this.goods = goods
					var List = [];
					
						if (goods.bannerpicurl2==''||goods.bannerpicurl3=='') {
							List = [
					        		{content:'<img src='+this.goods.bannerpicurl+'>'},
					        		{content:'<img src='+this.goods.bannerpicurl+'>'},
					        		{content:'<img src='+this.goods.bannerpicurl+'>'}
			        				]
						}else{
 							List = 	[
						        		{content:'<img src='+this.goods.bannerpicurl+'>'},
						        		{content:'<img src='+this.goods.bannerpicurl2+'>'},
						        		{content:'<img src='+this.goods.bannerpicurl3+'>'}
						        	]	
						}	
						
						
			        

						var S = new iSlider({
					        dom: document.getElementById("iSlider-wrapper"),
					        data: List,
			   				isLooping: true,
			                isOverspread: false,
			                isVertical: false,
			                isAutoplay: true,
			                duration:2000,
			                plugins: [['dot', {locate:'relative'}]]
					    });


				},(res)=>{
					console.log(res)
				})

			}
		},
		ready:function(){

			webview.test(1);
			share.share();

		
		}

	}
</script>

<style lang="sass">
	@import '../scss/varible.scss';
	.goods-detail{
		background-color: #f4f4f4;
		overflow: hidden;
		padding-bottom: 6rem;
		position: absolute;
	}
	.goods-name{
		padding: 1rem;
		background-color: #fff;
		h3{
			font-size: 2rem;
			margin:0;
			color: $basecolor;
			&:first-child{
				color: #333;
				margin-bottom: 1.3rem;
			}
			&:last-child{
				color: $basecolor;
				span.ym{
					font-size: 2.5rem;
					color: #D93639;
				}
			}
		}
	}
	.goods-intro {
		margin: 0.5rem 0 0 0;
		border-top: 1px solid $line;
		border-bottom: 1px solid $line;
		background-color: #fff;
		height: 4.5rem;
		text-indent: 1.3rem;
		color: #000;
		font-size: 1.8rem;
		box-sizing: border-box;
		line-height: 4.5rem;
		position: relative;
		span{
			position:absolute;
			display: block;
			height: 4rem;
			width: 5px;
			background-color:$basecolor;
			left: 0;
			top: 50%;
			margin-top: -2rem;
		}
	}
	.intro{

		padding: 1rem 1.5rem;
		background-color: #fff;
		img{
			width: 100%;
		}
		h3{
			font-size: 1.7rem;
			color:#000;
			margin: 1.2rem 0;
			font-weight: normal;
		}

	}
	.goods-play-rule{
		padding-left: 1.8rem;
		margin-top: 0;
		li{
			margin-bottom: 1rem;
			font-size: 1.55rem;
			color: #333;
		}
	}
	#iSlider-wrapper{
		overflow: hidden;
		position: relative;
	}
	.islider-outer{
		position: relative;
		margin: 0;
		padding-bottom: 50%;
		background-color: #fff;
		li{
			position: absolute;
			width: 100%;
			img{
				width: 100%;
			}
		}
	}
	.islider-dot-wrap{
		position: absolute;
		bottom: 1.1rem;
		margin-bottom:0;
		right: 1.6rem;
		li{
			width: 10px;
			height: 10px;
			border-radius: 5px;;
			background-color: #fff;
			display: inline-block;
			margin:  0  5px;
			&.active{
				background-color:#666; 
				width: 12px;
				height: 12px;
				border-radius: 6px;
			}
		}
	}
	.disabled{
		background-color: #AEAEAE;
		color: #fff;
	}
	
	.btn-bg{
		width: 100%;
		bottom: 0px;
		left: 50%;
		position: fixed;
		margin-left: -50%!important;
		background: #fff;
		padding: 10px 0px;
	}


</style>




