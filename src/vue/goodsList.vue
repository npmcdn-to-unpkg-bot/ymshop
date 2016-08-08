<template>
	
	<ul class="goods-box clearfix">
		<li v-for="good in goods"  track-by="id">
			<span class="goods-tag" v-if="good.goodsCategory==1" >电子书</span>
			<div class="goods-pic">
				<img  src="../images/loading.gif" v-lazyload:opt.fadein="good.coverpicurl" v-link="{path:'/goodDetail',query:{goodid:good.id,isL:good.isLimit?good.dayTime:'',dayTime:good.dayTime,dayTimeDown:good.dayTimeDown,ratio:good.ratio}}">
			</div>
			<div class="goods-info">
				<h4 class="goods-name">{{good.name}}</h4>
				<p class="goods-price clearfix">
					<span class="left">{{good.priceYm+'医米'}}{{good.priceYb==0?'':'+'}}{{good.priceYb==0?'':good.priceYb+'医币'}}</span>
				</p>
			</div>
			<div class="goods-progress" v-if="good.isLimit">
				<div class="time-to-buy clearfix">
					<div><span>开始时间</span></div>
					<div class="start-buy">
						<span>{{good.dayTime}}</span>
						<span>:</span>
						<span>00</span>
					</div>
				</div>
				<div class="max-length">
					<div class="now-length" :style="{width:good.ratio+'%'}"></div>
				</div>
				<div class="has-buy" >已抢{{good.ratio}}%</div>
			</div>
		</li>
	</ul>


</template>

<script>




	module.exports={
		
		route:{
			
		},
		props:['goods'],

		data:function(){
			return {
				s:1
			}
		},
		computed:{
			
		},
		methods:{
			
		},
		created:function(){
			
		},
		ready:function(){

				
		}

	}

</script>


<style lang="sass">
	@import '../scss/varible.scss';
	
	.goods-box {
		padding: 0 4px;
		width: 100%;
		box-sizing: border-box;
		li{
			margin: 3px;
			float: left;
			width: 47.5%;
			width: calc(50% - 8px);
			position: relative;
			border: 5px solid #fff;
			box-sizing: border-box;
			background-color: #fff;
			.goods-tag{
				width: 5.5rem;
				height: 2rem;
				line-height: 2rem;
				font-size: 1.3rem;
				text-align: center;
				color: #fff;
				background-color: $basecolor;
				position: absolute;
				top: 0;
				z-index: 1;
				left: 0;
			}
			.goods-pic{
				padding-bottom: 60%;
				position: relative;
				img{
					width: 100%;
					display: block;
					position: absolute;
				}
			}
			.goods-info{
				padding: 0 0.25rem;
				h4{
					font-size: 1.35rem;
					color: #000;
					margin: 0.8rem 0 0 0;
					padding: 0.3rem;
					height: 1.6rem;
					overflow: hidden;
   					white-space: nowrap;
   					text-overflow: ellipsis;
   					line-height: 1.6rem;
   					font-weight:normal;
				}
				p{
					margin-top: 0.1rem;
					margin-bottom: 0.5rem;
					span{
						color: $basecolor;
						font-size: 1.2rem;
						padding: 0 0.1rem;
						font-weight: normal;
					}
					.left{
						// float: left;
						display: block;
						@media screen and (max-width:360px){
							float: none;
							display: block;
						}
					}
					.right{
						// float: right;
						margin-top: 5px;
						display: block;
						@media screen and (max-width:360px){
							float: none;
							display: block;
						}
					}
				}
			}
		}
	}
	.goods-progress{
		width: 100%;
		.max-length{
			display: inline-block;
			position:relative;
			width: 55%;
			background-color: #D0D0D0;
			height: 0.6rem;
			border-radius: 0.3rem;
			margin-left: 0.25rem;
			margin-right: 3%;
			@media screen and (max-width:360px){
				width: 50%;
			}
			.now-length{
				position: absolute;
				background-color: $basecolor;
				height: 0.6rem;
				border-radius:0.3rem;
				width: 50%;
			}
		}
		.has-buy{
			width: 35%;
			display:inline-block;
			color: #888888;
			font-size: 1.1rem;
			@media screen and (max-width:360px){
				width: 40%;
			}
		}
		margin-bottom:0.4rem;
	}
	.btn-red{
		background-color: $basecolor;
		color: #fff;
		font-size: 1.7rem;
		display: block;
		padding: 0.9rem 0; 
		margin: 0 auto;
		width: 95%;
	}
	.time-to-buy{
		font-size: 1.3rem;
		padding-left: 0.25rem;
		div{
			float: left;
			margin-bottom:0.5rem;
			&:first-child{
				margin-right: 5px;
			}
			&:last-child{
				span{
					display:inline-block;
					font-size: 1.2rem;
					&.L-hour,&.L-min,&.L-s{
						width: 1.7rem;
						height: 1.4rem;
						background-color: $basecolor;
						color: #fff;
						text-align: center;
					}
				}
			}
			&.start-buy{
				color: $basecolor;
			}
		}
		.start-to-buy{
			background-color: #BABABA!important;
		}
	}
</style>