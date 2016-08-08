<template>
	<section class="play-rule">
		<div class="rule-list">
			<h3>1.医米有何价值？</h3>
			<p>医米是医生站送站友的福利。医生站的用户可通过认证、点赞视频、签到等行为获得医米。用户获得医米，可在医米商城兑换超值实物商品，每周只能兑换一种商品。医米还可参加医米抽奖活动，体验站内的各种有趣活动。</p>
		</div>
		<div class="rule-list">
			<h3>2.如何领取医米？</h3>
			<p> 
				○每日任务：完成每日“医米任务”。如分享视频、分享文章等行为。<br>
				○新人奖励：注册医生站、完善基本资料、实名认证等。<br>
				○邀请奖励：发送邀请码给好友注册、认证。<br>
				○活动奖励：参与医生站互动活动如签到获医米。
			</p>
		</div>
		<div class="rule-list">
			<h3>3.医米商城可兑换/买什么？</h3>
			<p>医米商城有两种支付方式。<br>
○医米兑换。这不是游戏中虚拟游戏币，而是真金白银实物商城。用户可通过完成每日任务等方式获取医米，可在商城进行超值抢兑。提醒的是，不是所有奖品都无限供应，要想抢到心仪商品，除了每天攥医米外，还要每天准时来商城抢兑哦。<br>
○“医币+医米”购买。“想兑就兑”专区不需要用户拼运气抢兑，可通过充值医币方式购买到远低于市场价的同类商品。安卓用户通可过支付宝方式充值医币（我-我的钱包），iOS用户暂时不能充值医币。
			</p>
		</div>
		<div class="rule-list">
			<h3>4.医米兑换后何时领取商品？</h3>
			<p>
				○实物商品将委托我们合作厂家直接寄出，兑换后一般2-3工作日内发货。但个别商品受厂家定制、地域偏远等因素制约，延迟发货请耐心等待。<br>
				○虚拟商品（如电子书）1-2工作日内发到电子邮箱。未收到请通过意见反馈告知。<br>
				○除商品本身不能正常兑换外，商品一经兑换，一律不退还医米。
			</p>
		</div>
		<div class="rule-list">
			<h3>5.作弊惩罚机制：</h3>
			<p> 
				○对于不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）参与活动的用户，医生站有权禁止其参与活动，取消其兑换资格。<br>
				○通过非法途径获得医米后进行的正常兑换行为，或不按商品使用规则进行兑换，发货商家有权不提供服务；<br>
				○为保障所有用户的正当利益，我们将严厉打击违规行为，包括但不限于通过软件制造僵尸用户盗刷医米。针对用机器软件恶意盗刷行为，我们将保留冻结作弊者账户、启动法律程序追究其违法违约责任等权利。
			</p>
		</div>
		
	</section>
</template>

<style lang="sass">
	@import '../scss/varible.scss';

	.play-rule{
		background-color: #eef1f5;
		padding: 0;
		.rule-list{
			margin-bottom: 20px;
			background-color: #fff;
			h3{
				padding: 0 2rem;
				height: 4.5rem;
				font-size: 1.8rem;
				color: $basecolor;
				line-height: 4.5rem;
				font-weight: normal;
				margin: 0;
				border-bottom: 1px solid $line;
			}
			p{
				margin: 0;
				font-size: 1.6rem;
				color: #333;
				line-height: 1.55;
				padding: 15px 20px;
				border-bottom: 1px solid $line;
			}
		}
	}
</style>

<script>

import webview from '../js/webviewtestShare.js'
import setTitle from '../js/title.js';
    module.exports = {
    	route:{
    		activate:function(){
    			document.body.scrollTop = 0
    			setTitle.title('医米商城怎么玩')
    		}
    	},
    	ready:function(){
    		webview.test(0)

    	}
    }
</script>