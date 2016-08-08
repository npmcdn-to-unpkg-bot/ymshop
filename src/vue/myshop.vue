<template>
	<section class="my-shop-contain">
		<div class="my-shop">
			<span class="money-icon"></span>
			我的医米:
			<span>{{userInfo.points}}</span>
			<button class="btn btn-red" v-touch:tap="getYm">获取医米</button>
		</div>
		<div class="my-shop-info">
			<ul class="my-shop-tab">
				<li v-for="tab in tabs" v-bind:class="{'active':tab.active}" v-touch:tap="setCur($index)">
					{{tab.name}}
					<span></span>
				</li>
			</ul>
			<div class="tab-container">
				<ul class="clearfix" v-bind:style="{transform:'translateX('+tabBoxIndex*33.33+'%)'}">
					<li class="orders">
						<div style="width: 100%;min-height: 1px;">
							<div class="my-order"  v-for="order in orders"  v-touch:tap="goOrder(order.orderId)">


								<p class="clearfix">
									<span class="order-name">{{order.exReason}}</span>
									<span>{{order.points}}医米</span>
								</p>
								<p class="clearfix">
									<span>{{new Date(order.creatTime*1000).Format("yyyy-MM-dd")}}&nbsp;&nbsp;{{new Date(order.creatTime*1000).Format("hh:mm:ss")}}</span>
									<span>支付成功</span>
								</p>
							</div>
						</div>	
						<button class="btn btn-red" v-if="showMoreO" :class="{'disabled':isOrderEnd}" v-touch:tap="loadMoreOrder">{{Omsg}}</button>
					</li>
							<!-- 订单详情 -->
							<!-- <div>
								<img src="../images/my-order_03.png">
							</div>
							<div>
								<p>{{order.exReason}}</p>
								<p>{{new Date(order.creatTime*1000).Format("yyyy-MM-dd")}}<br>10:24:33</p>

							</div>
							<div>

								<p class="red">{{order.points}}医米</p>
								<p >支付成功</p>
								
							</div> -->
					<li class="yms">
						<table>
							<tr v-for="bill in ymBill">
								<td>{{new Date(bill.creatTime*1000).Format("yyyy-MM-dd")}}</td>
								<td>{{bill.exReason}}</td>
								<td>{{bill.points}}</td>
							</tr>
							
						</table>
						<button class="btn btn-red" v-if="showMoreY" :class="{'disabled':isYmBillEnd}" v-touch:tap="loadMoreYmBill">{{Ymsg}}</button>
					</li>
					<li class="rewards">
						<table>
							<tr v-for="win in  winRecord">
								<td>{{new Date(win.creatTime*1000).Format("yyyy-MM-dd")}}</td>
								<td>{{win.points}}</td>
							</tr>
							
						</table>
						<button class="btn btn-red" v-if="showMoreR" :class="{'disabled':isRewardsEnd}" v-touch:tap="loadMoreRewards">{{Rmsg}}</button>
					</li>
				</ul>
			</div>
			
		</div>
	</section>
</template>

<script>

	import webview from '../js/webviewtestShare.js'
	import webviewGM from '../js/webviewGoMission.js'
	import setTitle from '../js/title.js';



	module.exports = {
		route:{
			activate:function(transition){
				// document.body.scrollTop = 0;
				setTitle.title('我的商城')
				transition.next()
			},
			data:function(transition){
				// type--查询类型：0=医米流水  1=中奖纪录  2=订单列表（必填）
   				// statr--纪录开始数		  
		  		// limit--每页查询记录数
		  		

		  		//查询医米流水
				this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:0,start:0,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	this.ymBill = res.json().points; 
						  	this.isYmBillEnd = res.json().isEnd == 1
						  	if (this.isYmBillEnd) {
						  		this.Ymsg = "已到最后一页"
						  	}else{
						  		this.Ymsg = "点击加载更多"
						  	}
						  	if (this.ymBill.length>=10) {
						  		this.showMoreY = true
						  	}
						  },res=>{

						  })	

				//查询中奖纪录
				this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:1,start:0,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	this.winRecord = res.json().points;
						  	this.isRewardsEnd = res.json().isEnd == 1
						  	if (this.isRewardsEnd) {
						  		this.Rmsg = "已到最后一页"
						  	}else{
						  		this.Rmsg = "点击加载更多"
						  	}
						  	if (this.winRecord.length>=10) {
						  		this.showMoreR = true
						  	}
						  },res=>{

						  })

				//查询订单详情
				this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:2,start:0,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	this.orders = res.json().points;
						  	this.isOrderEnd = res.json().isEnd == 1
						  	if (this.isOrderEnd) {
						  		this.Omsg = "已到最后一页"
						  	}else{
						  		this.Omsg = "点击加载更多"
						  	}
						  	if (this.orders.length>=10) {
						  		this.showMoreO =true
						  	}
						  },res=>{

						  })

			}
		},
		vuex:{
			getters:{
				userInfo: state=> state.userInfo,
				uid: state=> state.uid
			}
		},
		data:function(){
				return{
					tabs:[
						{name:'订单查询',active:true,index:0},
						{name:'医米流水',active:false,index:1},
						{name:'中奖纪录',active:false,index:2}
					],
					tabBoxIndex:0,
					ymBill:[],
					winRecord:[],
					orders:[],
					isOrderEnd:true,
					isYmBillEnd:true,
					isRewardsEnd:true,
					startOrder:1,
					startYmBill:1,
					startRewards:1,
					Omsg:'点击加载更多',
					Ymsg:'点击加载更多',
					Rmsg:'点击加载更多',
					showMoreO:false,
					showMoreY:false,
					showMoreR:false
				}
			},
		methods:{
			setCur:function(index){
				for(var i=0;i<this.tabs.length;i++){
					if (index == i) {
						this.tabs[index].active = true;
						this.tabBoxIndex = this.tabs[i].index*-1;
					}else{
						this.tabs[i].active = false;
					}
				}
			},
			getYm:function(){
				webviewGM.goMission()
			},
			goOrder:function(orderId){
				this.$router.go({path:'/orderDetail',query:{oId:orderId}})
			},
			loadMoreOrder:function(){

					if (!this.isOrderEnd) {
						this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:2,start:this.startOrder*10,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	var arr = this.orders ;
						  	var brr = res.json().points;
						  	this.orders=arr.concat(brr)


						  	this.isOrderEnd = res.json().isEnd == 1
						  	this.startOrder++
						  	if (this.isOrderEnd) {
						  		this.Omsg = "已到最后一页"
						  	}
						  },res=>{

						  })	

					}else{
						this.Omsg = "已到最后一页"
					}


			},
			loadMoreYmBill:function(){

				if (!this.isYmBillEnd) {
						this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:0,start:this.startYmBill*10,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	
						  	var arr = this.ymBill ;
						  	var brr = res.json().points;

						  	this.ymBill=arr.concat(brr)


						  	this.isYmBillEnd = res.json().isEnd == 1
						  	this.startYmBill++
						  	if (this.isYmBillEnd) {
						  		this.Ymsg = "已最后一页"
						  	}

						  },res=>{

						  })	

					}else{
						this.Ymsg = "已到最后一页"
					}

			},
			loadMoreRewards:function(){

				if (!this.isRewardsEnd) {
						this.$http.post('../user-getPointsList.csp',{uid:this.uid,type:1,start:this.startRewards*10,limit:10},{emulateJSON:true})
						  .then(res=>{
						  	
						  	var arr = this.winRecord ;
						  	var brr = res.json().points;
						  	
						  	this.winRecord = arr.concat(brr)


						  	this.isRewardsEnd = res.json().isEnd == 1
						  	this.startRewards++ ;
						  	if(this.isRewardsEnd){
						  		this.Rmsg = "已到最后一页"
						  	}

						  },res=>{

						  })	

					}else{
						this.Rmsg = "已到最后一页"
					}

			}
		},
	
		ready:function(){
			// 隐藏分享按钮
			webview.test(0)




		}

		

		
	}

</script>


<style lang="sass">

	@import '../scss/varible.scss';
	section.my-shop-contain{
		background-color: #f4f4f4;
	}
	.my-shop{
		background-color: #fff;
		height: 55px;
		font-size: 1.7rem;
		line-height: 55px;
		color: #333;
		font-weight: 500;
		position: relative;
		.money-icon{
			display: block;
		    width: 1.7rem;
		    height: 1.7rem;
		    background: url(../images/icon_jinbi.png) no-repeat center center/100% auto;
		    margin-left: 1.5rem;
		    float: left;
			margin-top: 18px;
			margin-right: 1.3rem;
		}
		span{
			color: $basecolor;
		}
		.btn-red{
			background-color: $basecolor;
			padding: 0 1.5rem;
			text-align: center;
			line-height: 1.75;
			color: #fff;
			font-weight: 500;
			height: 2.5rem;
			line-height: 2.5rem;
			border-radius: 1.25rem;
			top: 12px;
			position: absolute;
			right: 8px;
			width: 32%;
		}
	}
	.my-shop-tab{
		margin-top: 10px;
		font-size: 0;
		width: 100%;
		background-color: #fff;
		border-top: 1px solid $line;
		border-bottom: 1px solid $line;
		li{
			width: 32%;
			width:calc(33% - 1px);
			overflow: hidden;
			display: inline-block;
			border-right: 1px solid $line;
			height: 4.5rem;
			text-align: center;
			line-height: 4.5rem;
			font-size: 1.7rem;
			color: #333;
			position: relative;
			span{
				position: absolute;
				width: 80%;
				height: 2px;
				display: block;
				background-color:$basecolor;
				bottom: 0;
				left: 50%;
				margin-left: -40%;
				display: none;
			}
			&:last-child{
				border-right: none;
			}
			&.active{
				color: $basecolor;
				span{
					display:block;
				}
			}
		}
	}

	.tab-container{
		width: 100%;
		overflow: hidden;
		position: relative;
		ul{
			width: 300%;
			background-color:#fff;
			position: relative;
			transition: 0.3s ease;
			li{
				width:33.33%;
				float: left;
			}
			.orders{
				/* 我的订单 */
				.order-name{

				}
				.my-order{
					width: 100%;
					font-size: 1.5rem;
					padding: 0.5rem 1rem;
					box-sizing: border-box;
					&:nth-child(odd){
						background-color: #fff;
					}
					&:nth-child(even){
						background-color: #eef1f5;
					}
					.order-name{
						width: 67%;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					}
					p{
						font-size: 1.6rem;
						padding-right: 2rem;

						&:nth-child(1){

							color: #333;
						}
						&:nth-child(2){
							color: #999;
						}
						span{
							&:first-child{
								float: left;
							}
							&:last-child{
								float: right;
							}
						}
					}
					div{
						// display: inline-block;
						// vertical-align: middle;
						// &:nth-child(1){
						// 	width: 25%;
						// 	border:1px solid $line;
						// 	img{
						// 		width: 100%;
						// 	}
						// }
						// &:nth-child(2){
						// 	width: 40%;
						// 	font-size: 1.2rem;
						// 	p{
						// 		margin-left: 10px;
						// 	}
						// 	p:nth-child(2){
						// 		color: #999;
						// 		font-size: 1.3rem;
						// 		margin-top: 1.8rem;
						// 	}
						// }
						// &:nth-child(3){
						// 	width: 33%;
						// 	font-size: 1.2rem;
						// 	p{
						// 		padding-right: 20px;
						// 		text-align: right;
						// 		color: $basecolor;
						// 	}
						// 	p:nth-child(2){
						// 		color: #999;
						// 		font-size: 1.3rem;
						// 		margin-top: 1.8rem;
						// 	}
						// }

					
					}
				}
			}
			/* 医米流水 */
			.yms{
				table{
					width: 100%;
					border-collapse: collapse;
					tr{
						height: 5.5rem;
						font-size: 1.6rem;
						line-height: 5.5rem;
						color: #000;
						&:nth-child(odd){
							background-color: #fff;
						}
						&:nth-child(even){
							background-color: #eef1f5;
						}
						td{
							text-align: center;
							width: 33.33%;
							line-height: 1.2;
							&:last-child{
								color: $basecolor;
							}
						}
					}
				}
			}
			/* 中奖纪录 */
			.rewards{
				table{
					width: 100%;
					border-collapse: collapse;
					tr{
						height: 5.5rem;
						font-size: 1.6rem;
						line-height: 5.5rem;
						color: #000;
						&:nth-child(odd){
							background-color: #fff;
						}
						&:nth-child(even){
							background-color: #eef1f5;
						}
						td{
							text-align: center;
							color: #000;
							width: 49%;
						}
					}
				}
			}

		}
	}
	.disabled{
		background-color: #AEAEAE;
		color: #fff;
	}
</style>



