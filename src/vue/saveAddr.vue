<template>
<div>
	<section class="save-addr">
	<div class="addr-form">
		<div>
			<input type="text" name="" placeholder="收货人姓名" v-model="userName" maxlength="15" >
		</div>
		<div>
			<input type="text" name="" placeholder="手机号码" v-model="userPhone" maxlength="11" oninput="value=value.replace(/[^0-9]/g, '')">
		</div>
		<div class="area" v-touch:tap="toSelect">
			<input type="text" name="" placeholder="省" v-model="proName">
		</div>
		<div class="area" v-touch:tap="toSelect">
			<input type="text" name="" placeholder="市" v-model="cityName">
		</div>
		<div>
			<textarea type="text" placeholder="填写详细地址" maxlength="60" v-model="detailAddr"></textarea> 
		</div>
	</div>
	
	</section>
	<button class="btn btn-red fixed-bottom" v-touch:tap="saveInfo">保存</button>
	<div class="tip" v-text="message" v-show="showTip"></div>
	<div class="modal-mask" v-show="show" transition="area-select">
		<div class="select-modal-container">
			<div class="select-btn clearfix">
				<button class="btn" v-touch:tap="hideModal">确认</button>
				<button class="btn" v-touch:tap="hideModal">取消</button>
			</div>
			<div class="select-box clearfix">
				<div class="selected-box">
					<ul class="province">
						<li v-for="pro in provinces" v-touch:tap="choosePro($index)" :class="{'active':pro.pvcid==proId}">
							{{pro.name}}
						</li>
					</ul>
				</div>
				
				<div class="selected-box">
					<ul class="city">
						<li v-for="city in cityArr" v-touch:tap="chooseCity($index)" :class="{'active':city.id==cityId}">
							{{city.name}}
						</li>
					</ul>
				</div>
				
			</div>
			
		</div>
	</div>
</div>
</template>


<script >
	import province from '../js/province.js'
	import city from '../js/city.js'
	import webview from '../js/webviewtestShare.js'
	import setTitle from '../js/title.js';
	//获取url参数内容的方法
	var GetQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	};




	module.exports={
		route:{
			data:function(){
				// document.body.scrollTop = 0;
			},
			activate:function(transition){
				setTitle.title('收货地址')
				transition.next()
			}
		},
		data:function(){
			return {
				show:false,
				citys:city.citys,
				provinces:province.provs,
				proId:0,
				cityId:0,
				proName:'',
				cityName:'',
				userName:'',
				userPhone:'',
				detailAddr:'',
				activePro:false,
				activeCity:false,
				showTip:false,
				isSave:false,
				message:''
			}
		},
		vuex:{
			getters:{
				address:state=>state.address
			}
		},
		methods:{
			toSelect:function(){
				this.show = !this.show
			},
			hideModal:function(){
				this.show = false
			},
			choosePro:function(index){
				this.proName = this.provinces[index].name;
				this.proId = this.provinces[index].pvcid;
				this.chooseCity(0);
			},
			chooseCity:function(index){
				this.cityName = this.cityArr[index].name;
				this.cityId = this.cityArr[index].id;
			},
			showDialog:function(message){
				this.$dispatch('showDialog',message)
			},
			saveInfo:function(){
				this.isSave = true;
				if (this.userName == '') {
					this.showTip = true;
					this.isSave = false;
					this.message = '姓名不能为空'
				}
				if (this.userPhone == '') {
					this.showTip = true;
					this.message = '电话不能为空'
					this.isSave = false
				}
				if (this.proId == 0) {
					this.showTip = true;
					this.message = '省份不能为空'
					this.isSave = false
				}
				if (this.cityId == 0 ){
					this.showTip = true;
					this.message =  '城市不能为空'
					this.isSave = false;
				}
				if (!(/^1[3|4|5|7|8]\d{9}$/.test(parseInt(this.userPhone)))) {
					this.isSave=false;
					this.showTip=true;
					this.message = '电话号码格式不正确'
				}
				if (this.detailAddr =='') {
					this.showTip = true;
					this.message = '详细地址不能为空'
					this.isSave = false;
				}
				if (this.userName.length>15) {
					this.showTip = true;
					this.message = '姓名不能超过15个字'; 
					this.isSave = false;
				}

				if (this.isSave) {
					// 上传数据
					var data = {
						name: this.userName,
						phone: this.userPhone,
						provinceId: this.proId,
						provinceName: this.proName,
						ctyId: this.cityId,
						ctyName : this.cityName,
						detailaddr: this.detailAddr,
						uid:GetQueryString('uid')
					}

					this.$http.post('../shop-saveAddr.csp',data,{emulateJSON : true}).then(res=>{
						if (res.json().success) {
							this.$router.go({path:'/infoSure'})
						}else{
							this.showDialog(res.json().message)
						}
					},res=>{
						this.showDialog(res.json().message)
					})
				}
			},
			isChange:function(){
				if (this.address) {
					this.userName = this.address.name;
					this.userPhone = this.address.phone;
					this.proName = this.address.provinceName;
					this.cityName = this.address.ctyName;
					this.detailAddr = this.address.detailaddrShort;
					this.proId = this.address.provinceId;
					this.cityId = this.address.ctyid;
				}
			}
			
		},
		ready:function(){
			webview.test(0);
			this.isChange()

		},
		computed:{
			cityArr:function(){
				var cArr = [];
				var self=this;
				if (self.proId == 0) {
					cArr.push(this.citys[0])
				}else{
					cArr = this.citys.filter(function(item , index){
						return item.pvcid == self.proId;
					})
				}
				return cArr;
			}

		}
	}
</script>










<style lang="sass">
@import '../scss/varible.scss';
	.save-addr{
		background-color: #fff;
	}
	.addr-form{
		div{
			height: 40px;
			font-size: 1.6rem;
			padding-left: 24px;
			color: #333;
			border-bottom: 1px solid $line;
			input{
				padding: 5px 0px;
				box-sizing: border-box;
				width: 85%;
				display: inline-block;
				font-size: 1.5rem;
				border: none;
				outline: none;
				height: 38px;
				line-height: 38px;
			}
			&:last-child{
				height: 7rem;
				textarea{
					border: none;
					outline: none;
					display: block;
					width: 90%;
					margin-top: 10px;
					height: 6rem;
				}
			}
			&.area{
				&:after {
					display: block;
					content: '';
					float: right;
					width: 12px;
					height: 22px;
					background: url(../images/arrow.png) no-repeat center center/100% auto;
					margin-top: 8px;
					margin-right:10px; 
				}
			}
		}
	}
	.select-btn{
		width: 100%;
		button{
			width: 80px;
			height: 35px;
			font-size: 1.5rem;
			background-color: $basecolor;
			color: #fff;
			margin: 5px 10px;
			&:first-child{
				float: left;
			}
			&:last-child{
				float: right;
			}
		}
	}
	.select-box{
		overflow: hidden;
		height: 100%;
		font-size: 0;
		.selected-box{
			width: 49%;
			height: 30rem;
			overflow: scroll;
			display: inline-block;
		}
		ul{
			width: 100%;
			display: inline-block;
			border-bottom: 1px solid $line;
			border-top: 1px solid $line;
			float: left;
			li{
				width: 100%;
				box-sizing: border-box;
				height: 2.7rem;
				line-height: 2.7rem;
				text-align: center;
				font-size: 1.5rem;
				border-bottom: 1px solid $line;
				border-left: 1px solid $line;
				border-right: 1px solid $line;
				&.active{
					background-color: #e9e9e9;
				}
			}
		}
	}



.tip{
	color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    padding: 5px 15px;
    width: 80%;
    margin: 20px auto;
    border-radius: 4px;
    font-size: 1.5rem;
}







	.hideModal{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1000
	}
	.select-modal-container{
		width: 100%;
		height: 60%;
		display:table;
		background-color: #fff;
		transition: all .4s ease;
		transform:translateY(70%)
	}
	.area-select-leave,.area-select-enter{
		opacity: 0;
	}
	.area-select-leave .select-modal-container,.area-select-enter .select-modal-container{
		transform: translateY(200%)
	}

</style>
