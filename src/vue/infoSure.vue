<template>
	<section class="infoSure">
		<div class="user-info">
			<div v-if="realGood">
				<div  class="isFix">
					<p>收货人：<span>{{getAddr.name}}</span></p>
					<p>联系电话：<span>{{getAddr.phone}}</span></p>
					<p>收货地址：<span>{{getAddr.detailaddr}}</span></p>
				</div>
				<div  class="fix-info">
					<p v-if="isFix" style="color: #D93639;display: inline-block;width:80%" v-link="{path:'/saveAddr'}">修改收货地址</p>
					<p v-else style="color: #D93639;display: inline-block" v-link="{path:'/saveAddr'}">还未填写收货地址？马上去填写</p>
					<span class="go-change"></span>
				</div>
			</div>
			<div v-else>
				<h3 class="email-title">电子邮箱</h3>
				<div class="email clearfix">
					<div>
						<input type="text" name="" v-model="email_start" @change="revise" :value="exEmailStart">
					</div>
					<div style="margin-left: 1px;margin-right: 1px;width: 20px;text-align: center;height: 30px;line-height: 30px">@</div>
					<div>
						<input type="text" placeholder="qq.com" id="exEmailEnd" @focus="tipMail" @change="revise" @blur="untipMial" v-model="email_end" :value="exEmailEnd">
						<div v-if="showMails" class="emailBox">
							<ul v-if="showMails" transition="expand">
								<li v-for="item in emails" v-touch:tap="select($index)">{{item.mail}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			
			<div class="hr"></div>
			<div class="good-info">

					<div>
						<img :src="goodInfo.coverpicurl">
					</div>
					<div>
						<p>{{goodInfo.name}}</p>


					</div>
					<div>

						<p class="red">{{goodInfo.priceYm+'医米'}}<br>{{goodInfo.priceYb==0?'':'+'}}{{goodInfo.priceYb==0?'':goodInfo.priceYb+'医币'}}</p>

					</div>
			</div>
		</div>
		<button class="btn btn-red fixed-bottom" v-touch:tap="save" >确认兑换</button>
		<div class="tip" v-show="showTip" v-text="message"></div>
	</section>
</template>


<script >
	import webview from '../js/webviewtestShare.js'
	import setTitle from '../js/title.js';
	import getBlance from '../js/getBlance.js';
	import {setAddress} from '../vuex/actions.js'

		// 获取url参数内容的方法
	var GetQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	};


	module.exports = {
		data:function(){
			return{
				isFix:true,
				getAddr:{},
				emails:[{mail:"qq.com"},{mail:"vip.qq.com"},{mail:"vip.sina.com"},{mail:"126.com"},{mail:"sina.com"},{mail:"163.com"},{mail:"126.com"},{mail:"yahoo.cn"},{mail:"foxmail.com"},{mail:"yeah.net"},{mail:"gmail.com"},{mail:"sohu.com"},{mail:"hotmail.com"}],
				showMails:false,
				email_end:'',
				email:'',
				email_start:'',
				realGood:true,
				showTip:false,
				isSave:true,
				message:''
			}
		},
		route:{
			activate:function(){
				// document.body.scrollTop = 0
			},
			data:function(transition){

				var data = {
					uid:GetQueryString('uid')
				}
				this.$http.post('../shop-getAddr.csp',data,{emulateJSON : true}).then(res=>{
					transition.next({
						getAddr:res.json().addr
					})

					this.setAddress(res.json().addr)

				},res=>{

				})
			}
		},
		vuex:{
			getters:{
				goodInfo:state=> state.goodsInfo,
				uid: state=> state.uid,
				userInfo:state=> state.userInfo
			},
			actions:{
				setAddress
			}
		},
		computed:{
			isFix:function(){
				if (this.getAddr.detailaddrShort==''||this.getAddr.detailaddr=='') {
					return false;
				}else{
					return true
				}
			},
			realGood:function(){
				return this.goodInfo.goodsCategory == 0
			},
			email:function(){
				return this.email_start +'@'+ this.email_end;
			},
			exEmailStart:function(){
				if (this.userInfo.email) {
					var length = this.userInfo.email.indexOf('@')
					return this.userInfo.email.substr(0,length)
				}
			},
			exEmailEnd:function(){
				if (this.userInfo.email) {
					var length = this.userInfo.email.indexOf('@')
					return this.userInfo.email.substring(length+1)
				}
				
			}
		},
		methods:{
			tipMail:function(){
				this.showMails = true
				this.isSave = true
			},
			untipMial:function(){
				this.showMails =false
			},
			select:function(index){
				this.email_end = this.emails[index].mail
				this.isSave = true;
			},
			showDialog:function(message){
				this.$dispatch('showDialog',message)
			},
			revise:function(){
				this.isSave = true;
			},
			save:function(){
				var _email = this.email;

				if (this.realGood) {

					var data = {
						uid:this.uid,
						goodId:this.goodInfo.id,
						platform:GetQueryString('platform')
					}
					if (this.isSave) {
						this.isSave = false;
						this.$http.post('../shop-buyGoods.csp',data,{emulateJSON : true}).then(res=>{
							if (res.json().success) {
									var self=this;
									self.showDialog('兑换成功！');
									setTimeout(function(){
										self.isSave = true
										self.$router.go({path:'/home'})
										self.userInfo.points = self.userInfo.points - self.goodInfo.priceYm 
										self.userInfo.ymMoney = self.userInfo.ymMoney - self.goodInfo.priceYb 
										//返回医米医币变换给APP
										var ym = self.userInfo.points;
										var yb = self.userInfo.ymMoney;
										console.log(ym)
										console.log(yb)
										getBlance.blance(ym,yb)

									},1000)
									// setTimeout(function(){
										
									// },1500)

								}else{
									this.isSave = true 
									this.showDialog(res.json().message)
									// this.$router.go({path:'/home'})
								}
						},res=>{
							this.isSave = true;
							this.showDialog(res.json().message)

						})
					}
					
					

				}else{

					if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_email))){
						this.showTip = true ;
						this.message = "邮箱格式不正确"
						this.isSave = false;
					}



					if (this.isSave) {
						this.isSave = false;
						var data = {
							uid:this.uid,
							goodId:this.goodInfo.id,
							email:this.email,
							platform:GetQueryString('platform')
						}

						this.$http.post('../shop-buyGoods.csp',data,{emulateJSON : true}).then(res=>{
							if (res.json().success) {
								var self = this;

								self.showDialog('兑换成功')

								setTimeout(function(){
										self.isSave = true
										self.$router.go({path:'/home'})


										self.userInfo.points = self.userInfo.points - self.goodInfo.priceYm 
										self.userInfo.ymMoney = self.userInfo.ymMoney - self.goodInfo.priceYb 
										var ym = self.userInfo.points;
										var yb = self.userInfo.ymMoney;
										console.log(ym)
										console.log(yb)
										getBlance.blance(ym,yb)
										
									},1000)

								// setTimeout(function(){
									
								// },1500)
							}else{
								this.isSave = true 
								this.showDialog(res.json().message)
								// this.$router.go({path:'/home'})
							}
						},res=>{
								this.showDialog(res.json().message)
								this.isSave = true
						})
					}
				}
				
				

			}
		},
		ready:function(){
			//隐藏分享按钮,0隐藏，1显示
			webview.test(0)

			//信息确认
			setTitle.title('信息确认')


			
		}
	}
</script>




<style lang="sass">
	@import '../scss/varible.scss';
	.infoSure{
		background-color: #fff;
		.user-info{
			.isFix{
				padding: 2rem  0.5rem 0 1.5rem;;
			}
			p{
				font-size: 1.5rem;
				color: #333;
				margin: 0 0 10px 0;
			}
			.red{
				display: block;
			}
		}
		.fix-info{
			height: 5rem;
			line-height: 5rem;
			color: $basecolor;
			padding: 0 15px 0 15px;;
			border-top: 1px solid $line;

			.go-change{
				display: block;
				content: '';
				float: right;
				width: 15px;
				height: 25px;
				background:url(../images/arrow.png) no-repeat center center/100% auto;
				margin-top: 15px;
			}
		}
		.hr{
			height: 10px;
			background-color: #eef5f5;
		}
		.good-info{
			padding-left: 1rem;
			div{
					display: inline-block;
					vertical-align: middle;
					&:nth-child(1){
						width: 25%;
						border:1px solid $line;
						margin: 10px 0;
						img{
							width: 100%;
						}
					}
					&:nth-child(2){
						width: 43%;
						font-size: 1.2rem;
						padding:20px 0;
						p{
							margin-left: 10px;
						}
						p:nth-child(2){
							color: #999;
							font-size: 1.3rem;
							margin-top: 1.8rem;
							@media screen and (max-width:360px){
								margin: 5px 0 5px 0;
								font-size: 1rem;
							}
						}
						p:nth-child(1){
							@media screen and (max-width:360px){
								margin: 0 0 5px 0;
							}
						}
					}
					&:nth-child(3){
						width: 29%;
						font-size: 1.2rem;
						p{
							padding-right: 20px;
							text-align: right;
							color: $basecolor;
							@media screen and (max-width:360px){
								padding-right: 0;
								line-height: 1.4;
							}
						}
						p:nth-child(2){
							color: #999;
							font-size: 1.3rem;
							margin-top: 1.8rem;
						}
					}
				}
		}
	}
	.email-title{
		height: 35px;
		background-color: #eef1f5;
		line-height: 35px;
		font-size: 1.5rem;
		padding-left: 15px;
		margin: 0;
		font-weight: normal;
	}
	.email{
		padding:5px 15px; 
		div{
			float: left;
			&:first-child{
				width: 45%;
			}
			&:last-child{
				width: 30%;
				position: relative;
				.emailBox{
					position:absolute;
					width: 100%;
					height: 160px;
					overflow-y: scroll;
					overflow-x: hidden;
					background-color: #fff;
					margin-left: 0;
				}
				ul{
					margin-top:0;
					background-color: #fff;
					width: 100%;
					border-left: 1px solid $line;
					border-right: 1px solid $line;
					li{
						box-sizing: border-box;
						font-size: 1.4rem;
						text-align: justify;
						padding: 3px 2px;
						border-bottom: 1px solid $line;
					}
				}
			}
			input{
				    display: inline-block;
				    height: 30px;
				    width: 100%;
				    padding-left: 5px;
				    box-sizing: border-box;
			}
		}
	}

.expand-transition {
  transition: all .4s ease;
  padding: 3px 0;
  background-color: #eee;
  overflow: hidden;
}


.expand-enter, .expand-leave {
  height: 0;
  padding: 0;
  opacity: 0;
}

</style>
