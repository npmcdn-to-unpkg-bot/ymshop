<template>
	<div>
		<h1 class="sign-row">
			连续签到<span>{{curSign+1}}</span>天，连续签到7天可抽奖
			<span class="money-icon"></span>
			<span>{{userInfo.points}}医米</span>
		</h1>
		<div class="sign-box">
			<ul class="sign-list clearfix">
				<li class=""  v-for="sign in signs">
					<span>{{$index+1}}</span>
						<div class="sign-logo" v-if="$index<6">
							<img  :src="curSign>=$index?'./build/images/icon_jb_selected.png':'./build/images/icon_jb_normal.png'">
							<img v-show="curSign >= $index" src="../images/icon_dg_selected.png">
						</div>
						<div class="last-sign" v-if="$index == 6">
							<img v-if="userInfo.canSign!=1 || curSign!=$index-1" :src="curSign==6?'./build/images/icon_libao_.png':'./build/images/icon_libao.png'">
							<img v-show="curSign >= $index" class="sign-success" src="../images/icon_dg_selected.png">
						</div>
						<div class="click-sign" v-if="userInfo.canSign==1 && curSign==$index-1" v-on:click="addCurSign">
							<img src="../images/button_qd_small.png">
						</div>
						<p>{{sign.reward}}</p>
				</li>
			</ul>	
		</div>
		<h1 class="play">
			活动玩法
		</h1>
		<ul class="sign-play-rule">
			<li>1.每天签到得医米，连续签到第一、二天1医米，第三、四天2医米，第五、六天3医米。</li>
			<li>2.连续签到7天，即可抽奖。100%中奖，各种豪礼等你拿！</li>
			<li>3.断签则重新开始记录。</li>
		</ul>
		<div class="modal-mask" v-show="show" transition="modal">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="reward_modal">
						<img :src="curSign==6?'./build/images/icon_zjl.png':'./build/images/cgqd_picture.png'">
						<div v-if="isSign">
							<!-- <p v-text="prize?'':'恭喜中奖！'"></p> -->
							<p v-if="curSign!=6">成功签到，已获得<span style="color: #D93639;font-size:2rem;">{{award}}</span>医米！</p>
							<p v-else >恭喜抽中<span style="color: #D93639;font-size:2.3rem;">{{award}}医米！</span></p>
							<p >已连续签到{{userInfo.continus}}天</p>
						</div>
						<div v-else>
							<p style="margin-bottom: 30px;">您已经签到</p>
						</div>
						<button class="btn btn-red" v-touch:tap="hide" v-text="prize?'太好了':'确定'"></button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
 
<script>

import webview from '../js/webviewtestShare.js'
import setTitle from '../js/title.js';
import getBlance from '../js/getBlance.js';
	
	module.exports = {

		route:{
			avtivate:function(){
				// document.body.scrollTop = 0;
				setTitle.title('我的签到')
			}
		},
		data:function(){
			return {
				signs:[
					{reward:'+1医米'},
					{reward:'+1医米'},
					{reward:'+2医米'},
					{reward:'+2医米'},
					{reward:'+3医米'},
					{reward:'+3医米'},
					{reward:'100%中奖'}
				],
				show:false,
				isSign:null,
				prize:null,
				award:null
			}
		},
		vuex:{
			getters:{
				userInfo: state=> state.userInfo,
				uid: state=> state.uid
			}
		},
		methods:{
			addCurSign:function(){

				if (this.userInfo.canSign==1) {
					this.userInfo.continus++;
					this.curSign++;
					this.userInfo.canSign=0;
					this.show=true;
					this.isSign=true;
					// 签到成功发送请求
					var data = {
						uid: this.uid
					}
					this.$http.post('../user-userSignon.csp',data,{emulateJSON : true}).then(function(response){
						this.award=response.json().pointNum;
						this.userInfo.points=response.json().pointNum+this.userInfo.points;

						getBlance.blance(this.userInfo.points,this.userInfo.ymMoney)
						
					},function(response){

					})

				}else{
					this.show=true;
					this.isSign=false;
				}
			},
			hide:function(){
				this.show=false;
			}
		},
		computed:{
			curSign:function(){

				if (this.userInfo.canSign==0 && this.userInfo.continus == 0) {
					return this.curSign = 6
				}else{
					return this.curSign = this.userInfo.continus - 1;
				}

				
			},
			prize:function(){
				return this.userInfo.continus == 7
			}
		},
		ready:function(){
			webview.test(0);
			
		}
	}




</script>

<style lang="sass">
	@import '../scss/varible.scss';
	.sign-row{
		font-size: 1.55rem;
		margin: 0;
		font-weight: normal;
		padding: 1.8rem 1.5rem;
		span{
			color: $basecolor;
		} 
		.money-icon{
			display:inline-block;
			width: 1.7rem;
			height: 1.7rem;
			background: url(../images/icon_jinbi.png) no-repeat center center/100% auto;
			margin-bottom: -0.2rem;
			margin-left: 7.5%;
		}
		border-bottom: 1px solid $line;
	}
	
	.sign-box{
		padding: 1rem 1.5rem;
		.sign-list{
			border-bottom: 1px solid $line;
			border-left: 1px solid $line;
			width: 100%;
			li{
				width: 24%;
				width: calc(25% - 1px);
				padding-bottom: 25%;
				float: left;
				border-right: 1px solid $line;
				border-top: 1px solid $line;
				position: relative;
				.sign-wrap{
					position:absolute;
				}
				span{
					position: absolute;
					display:block;
					top: 5px;
					right: 5px;
					font-size: 1.3rem;
					color: #888888;
				}
				.sign-logo{
					    position: absolute;
					    left: 50%;
					    top: 50%;
					    width: 50%;
					    margin-left: -25%;
					    margin-top: -25%;
					img:first-child{
						width: 88%;
					}
					img:last-child{
						position: absolute;
					    width: 65%;
					    left: 50%;
					    top: 50%;
					    margin-left: 10%;
					    margin-top: 0%;
					}
				}
				p{
					position: absolute;
					bottom: 0;
					font-size: 1.3rem;
					color: #888888;
					margin: 0.8rem 0 1rem 0;
					text-align: center;
					left: 50%;
					margin-left: -50%;
					bottom: -2%;
					width: 100%;
				}
				&:last-child{
					width: 49%;
					width: calc(50% - 1px);
					.last-sign{
						width: 30%;
					    position: absolute;
					    left: 50%;
					    margin-left: -15%;
					    top: 12%;
					    img{
					    	width: 100%;
					    }
					    .sign-success{
							width: 100%;
						    position: absolute;
						    top: 30%;
						    left: 65%;
					    }
					}
					.click-sign{
						position: absolute;
					    left: 50%;
					    width: 50%;
					    top: 50%;
					    margin-left: -25%;
					    margin-top: -10%;
					}
				}
			}
		}
	}

	.play{
		font-size: 1.55rem;
		margin-top: 0;
		padding: 0 1.8rem;
	}
	.sign-play-rule{
		padding: 0 15px;
		li{
			margin: 1rem 0;
			font-size: 1.55rem;
			color: #333;
		}
	}
	.click-sign{
		position: absolute;
	    left: 50%;
	    width: 80%;
	    top: 50%;
	    margin-left: -40%;
	    margin-top: -20%;
	    img{
	    	width: 100%;
	    }
	}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: all .4s ease;
}
.modal-container{
	transition: all .4s ease;
}
//签到成功弹窗
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.reward_modal{
	background-color: #fff;
	width: 25.5rem;
	height: 21rem;
	margin: 0 auto;
	border-radius: 15px;
	@media screen and (min-width:375px){
		height: 22rem;
	}
	box-sizing: border-box;
	position: relative;
	img{
		width: 80%;
		position: absolute; 
		top: -45%;
		left: 50%;
		margin-left: -40%;
	}
	p{
		text-align: center;
		&:nth-of-type(1){
			font-size: 2rem;
			color:#333;
			padding-top: 8rem;
			font-weight: bold;
			margin:0;
		}
		&:nth-of-type(2){
			font-size: 1.75rem;
			color: #333;
			margin:15px 0 12px 0;
			span{
				color: $basecolor;
				font-size: 3rem;
			}
		}
		&:nth-of-type(3){
			font-size: 1.3rem;
			color: #999;
		}
	}
	button.btn-red{
		width: 21rem;
	}
}

</style>

