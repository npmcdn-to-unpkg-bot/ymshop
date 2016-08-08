



<template>
	
	<section class="">
	<div class="banners">
		<img src="../images/banner_ymsc.png">
	</div>	
		<div class="banner-bottom">
			<!-- 是否登录 -->
			<div v-touch:tap="toMyShop">
				<!-- 登陆 -->
				<div class="icon" >
					<img src="../images/icon_gw.png">
				</div>
				<div class="info ">
					<h3>我的商城</h3>
					<p class="clearfix">
						<span v-if="userInfo.success">{{userInfo.points}}</span>
						<span v-else>立即登录</span>
						<span class="money-icon"></span>
					</p>
				</div>
			</div>

		</div>
		<div class="banner-bottom">
			<div v-touch:tap="toMySign" >
				<div class="icon">
					<img src="../images/icon_qd.png">
				</div>
				<div class="info ">
					<h3>每日签到</h3>
					<p class="clearfix">
						<span>100%中奖</span>
						<!-- <i class="money-icon"></i> -->
					</p>
				</div>
			</div>
		</div>

	</section>
</template>

	



<script>



module.exports={
	route:{
		
	},

	data:function(){
		return {

		}
	},

	vuex:{
		getters:{
			userInfo: state=> state.userInfo
		}
	},
	methods: {
		showDialog:function(message){
				this.$dispatch('showDialog',message)
			},
		toMyShop:function(){
			if (this.userInfo.success) {
				this.$router.go({path:'/myshop'})
			}else{
				window.location.href="https://www.yishengzhan.cn/download?channel=release_tuiguang08";
			}
		},
		toMySign:function(){
			if (this.userInfo.success) {
				this.$router.go({path:'/mysign'})
			}else{
				this.showDialog('请先登录')
			}
		}
	}
}


</script>



<style lang="sass">
	@import '../scss/varible.scss';

	.banners{
		width: 100%;
		font-size:0;
		img{
			width: 100%;
		}
	}
	.banner-bottom{
		width: 50%;
		border: 1px solid $line;
		box-sizing: border-box;
		float:left;
		height: 7rem;
		.icon{
			width: 5rem;
			height: 5rem;
			border-radius: 2rem;
			margin: 0.7rem 1rem 0.5rem 1.3rem;
			display: inline-block;
			vertical-align: middle;
			@media screen and (max-width:365px){
				width: 4rem;
				margin: 0.7rem 0.5rem 0 1rem;
			}
			img{
				width: 100%;
			}
		}
		.info{
			display:inline-block;
			vertical-align: middle;
			h3{
				font-size: 1.6rem;
				color: #000;
				margin-bottom: 0.6rem;
			}
			p{	
				margin-top: 0.5rem;
				.money-icon{
					display:block;
					width: 1.7rem;
					height: 1.7rem;
					background: url(../images/icon_jinbi.png) no-repeat center center/100% auto;
					margin-left: 10px;
					float: left;
				}
				span{
					color:#999;
					font-size: 1.4rem;
					float:left;
					margin-top: 0.2rem;
				}
			}
			
		}
	}

	



</style>



