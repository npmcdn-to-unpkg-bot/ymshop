

<template>
<div>
		<div class="header clearfix">
			<banner></banner>
		</div>

		<h2 class="goodsList" v-show="hasLimit">
			限时抢兑
		</h2>

		<div class="section" v-if="hasLimit">
			<goods-list :goods="limtedGoods"></goods-list>
		</div>
		<h2 class="goodsList">
			想兑就兑
		</h2>
		<div class="section">
			<goods-list :goods="freeGoods" 
			 v-infinite-scroll="loadMore()" 
			 infinite-scroll-disabled="busy" 
			 infinite-scroll-distance="10"
			 keep-alive
			></goods-list>
		</div>
			
		<button class="btn btn-red" style="margin-bottom: 20px;" v-touch:tap="playRule">医米商城怎么玩?</button>

</div>
</template>





<script>
import webview from '../js/webviewtestShare.js'
import share_ from '../js/shareInfo.js';
import setTitle from '../js/title.js';

// var echo =require('echo-js')


module.exports= {

		route:{
			data:function(transition){
				transition.next()

			},
			canReuse:function(){
				return false
			}

			
		},
		components:{
			banner: require('./banner.vue'),
			goodsList: require('./goodsList.vue')
		},
		data:function(){
			return {
				limtedGoods:[
					
				],
				freeGoods:[
					
				],
				F_count:1,
				busy:false,
				isEnd:true,
				hasLimit:null
			}
		},
		methods:{
			playRule:function(){
				this.$router.go({path:'/playRule'})
			},
			loadMore:function(){

				if (!this.isEnd) {
					this.busy = true;
					var self = this;
					

					setTimeout(() => {
			        
					self.$http.post('../shop-list.csp',{goodsType:0,limit:10,start:self.F_count*10},{emulateJSON:true})
							  .then(res=>{

							  	var Fgoods = res.json().goodsList;
								for (var i = 0; i < Fgoods.length; i++) {
									Fgoods[i].isLimit=false
									self.freeGoods.push(Fgoods[i])
								}
								// console.log(Fgoods)
								
								self.F_count++;
								self.isEnd = res.json().isEnd==1
							  },res=>{

							  })



				        self.busy = false;
				      }, 600);

				}
				
			}
		},
		created:function(){
				
				// 请求商品列表，goodsType=0为新品分区，goodsType=1为限时抢购
				//请求限时抢购
				var data_L = {
					goodsType:1
				};
				//请求新品分区
				var data_F = {
					goodsType:0,
					limit:10,
					start:0
				}


				this.$http.post('../shop-list.csp',data_L,{emulateJSON : true}).then((res)=>{
					var Lgoods = res.json().goodsList;

					if (Lgoods.length>0) {
						this.hasLimit = true

						for (var i = 0; i < Lgoods.length; i++) {
							Lgoods[i].isLimit=true;
							var H = new Date().getHours()//获取当前时间小时数
							//只有在抢兑时间范围内才开显示已抢百分比
							if (H>=Lgoods[i].dayTime && H<Lgoods[i].dayTimeDown) {
								var num = (1-Lgoods[i].quantity/Lgoods[i].onsaleNum).toFixed(2)*100;
								if (num == 100) {
									Lgoods[i].ratio = num.toString().substr(0,3);
								}else{
									Lgoods[i].ratio = num.toString().substr(0,2);
								}
								Lgoods[i].isStart = true;
							}else{
								Lgoods[i].ratio = '0';
								Lgoods[i].isStart = false;
							}

							if (H>=Lgoods[i].dayTime && Lgoods[i].quantity == 0 && H<Lgoods[i].dayTimeDown) {
								// 正在抢兑，但商品已经卖完
								Lgoods[i].isout = 1;
							}else if (H>=Lgoods[i].dayTimeDown) {
								Lgoods[i].isout = 1;
							}else{
								Lgoods[i].isout = 0;
							}
							
						}

						this.limtedGoods = Lgoods;
						// console.log(this.limtedGoods)
					}
					
					

				},(res)=>{
					console.log(res.json())
				})



				this.$http.post('../shop-list.csp',data_F,{emulateJSON : true}).then((res)=>{

					var Fgoods = res.json().goodsList;
					for (var i = 0; i < Fgoods.length; i++) {
						Fgoods[i].isLimit=false
					}
					this.freeGoods= Fgoods;
					this.isEnd = res.json().isEnd == 1


				},(res)=>{
					console.log(res.json())
				})
			
				
				setTitle.title('医米商城')


				
			},

		ready:function(){
			//显示隐藏分享按钮，0隐藏，1显示
			webview.test(1);
			share_.share()
			//图片懒加载
			//
			
			// echo.init({
			//     offset: 100,
			//     throttle: 250,
			//     unload: false,
			//     callback: function (element, op) {
			//    	  echo.render();
			//       console.log(element, 'has been', op + 'ed')
			//     }
			//   });


		}

	}


        
   







</script>















<style lang="sass" scoped>
	@import '../scss/varible.scss';
	



	.goodsList {
		margin: 1.4rem 1rem;
		border-left: 4px solid $basecolor;
		height: 2rem;
		padding: 0 1rem;
		color: #000;
		font-size: 1.7rem;
		box-sizing: border-box;
		line-height: 2rem;
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

	
</style>