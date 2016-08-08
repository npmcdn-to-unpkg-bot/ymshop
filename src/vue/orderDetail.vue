<template>
	<section class="order-detail">
		<div>
			<span>订单号</span>
			<span>{{ODetail.orderNumber}}</span>
		</div>
		<div>
			<span>订单名称</span>
			<span class="order-name">{{ODetail.info}}</span>
		</div>
		<div>
			<span>创建时间</span>
			<span>{{new Date(ODetail.createtime*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span>
		</div>
		<div>
			<span>消费渠道</span>
			<span>{{ymAndyb}}</span>
		</div>
		<i class="hr"></i>
		<div>
			<span>支付状态</span>
			<span>支付成功</span>
		</div>
		<div>
			<span>支付医米</span>
			<span>{{ODetail.costYm}}医米</span>
		</div>
		<div>
			<span>支付医币</span>
			<span>{{ODetail.costYb}}医币</span>
		</div>
		<i class="hr"></i>
		<div>
			<span>订单状态</span>
			<span>{{ODetail.orderStatus}}</span>
		</div>
	</section>
</template>

<style lang="sass">
	@import '../scss/varible.scss';
	.order-detail{
		div{
			height: 50px;
			padding: 0 12px;
			line-height: 50px;
			border-bottom: 1px solid $line; 
			background-color: #fff;
			span{
				&:first-child{
					float: left;
					font-size: 1.5rem;
					color: #333;
				}
				&:last-child{
					float: right;
					font-size: 1.4rem;
					color: #888888;
				}
			}
		}
		.hr{
			display: block;
			height: 1rem;
		}
		.order-name{
			width: 67%;
    		text-align: right;
    		overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		}
	}
</style>


<script >
	import webview from '../js/webviewtestShare.js'
	import setTitle from '../js/title.js';


	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}


	module.exports = {
		route:{
			activate:function(transition){
				// document.body.scrollTop = 0;
				transition.next()
				setTitle.title('订单详情')
			},
			data:function(){
				var oId = this.$route.query.oId;
				this.$http.post('../shop-getOrderInfo.csp',{uid:this.uid,orderId:oId},{emulateJSON : true})
						  .then(res=>{
						  	if (res.json().success) {
						  		this.ODetail = res.json().order
						  	}else{

						  		this.ODetail = {
						  			orderNumber:'无信息',
						  			info:'无',
						  			createtime:+new Date()/1000,
						  			costYb:0,
						  			costYm:0,
						  			orderStatus:'无'
						  		}
						  	}
						  	
						  },res=>{

						  })
			}
		},
		vuex:{
			getters:{
				uid: state=> state.uid
			}
		},
		data:function(){
			return {
				ODetail:{}
			}
		},
		computed:{
			ymAndyb:function(){
				if (this.ODetail.costYb == 0 && this.ODetail.costYm!=0) {
					return "医米购买";
				}else if (this.ODetail.costYb != 0 && this.ODetail.costYm==0) {
					return "医币购买";
				}else if (this.ODetail.costYm!=0 && this.ODetail.costYb!=0) {
					return "医米+医币购买";
				}else{
					return "其他"
				}

			}
		},
		ready:function(){
			webview.test(0)

		}
	}
</script>