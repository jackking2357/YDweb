<template>
	<view class="payment">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="支付" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<view class="header">
				<view class="">
					支付金额
				</view>
				<view class="">
					{{payInfo.payMoney}}元
				</view>
			</view>
			<view class="bottom">
				<view class="title">
					支付宝付款码
				</view>
				<view class="image">
					<image :src="payInfo.qrCodePhoto[0]" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="confirm" @click="confrim">
				确认已付款
			</view>
			<view class="close" @click="closeOrder">
				取消
			</view>
		</view>
		<!-- 取消订单弹框 -->
		<u-popup v-model="show" @close="close" mode="center" :mask-close-able="false">
			<view class="announcementPopup">
				<view class="title">
				    提示
				</view>
				<view class="text">
					是否确认取消订单?
				</view>
				<view class="popupBtn">
					<view class="close" @click="close">
						取消
					</view>
					<view class="confirm" @click="OrderCancel">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 已付款弹框 -->
		<u-popup v-model="payshow" @close="payclose" mode="center" :mask-close-able="false">
			<view class="announcementPopup">
				<view class="title">
				    提示
				</view>
				<view class="text">
					是否确认已付款?
				</view>
				<view class="popupBtn">
					<view class="close" @click="payclose">
						取消
					</view>
					<view class="confirm" @click="confrimPay">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		robotOrderPaid
	} from '@/api/goods'
	import { robotOrderCancel } from '@/api/user'
	export default {
		data() {
			return {
				robotAcceleratorId:'',//加速器id
				payInfo:{},
				show:false,
				payshow:false
			};
		},
		onLoad() {
			if(this.$Route.query.robotOrderId){
				this.payInfo = this.$Route.query
				this.robotAcceleratorId = this.$Route.query.robotOrderId
			}
		},
		methods:{
			confrim(){
				this.payshow = true
			},
			payclose(){
				this.payshow = false
			},
			OrderCancel(){
				uni.showLoading({
					title:'取消中~',
					icon:'none'
				})
				robotOrderCancel({
					robotOrderId:this.payInfo.robotOrderId
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'取消成功',
						icon:'none'
					})
					this.close()
					setTimeout(()=>{
						uni.navigateBack({})
					},1000)
					
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'取消失败',
						icon:'none'
					})
					this.close()
				})
			},
			close(){
				this.show = false
			},
			closeOrder(){
				this.show = true
			},
			confrimPay(){
				robotOrderPaid({
					robotOrderId:this.payInfo.robotOrderId
				}).then(res=>{
					console.log(res)
					uni.showToast({
						title:'提交成功,请等待管理员审核',
						icon:'none'
					})
					this.payclose()
				}).catch(()=>{
					this.payclose()
				})
			},
		}
	}
</script>

<style lang="scss">
	.payment {
		padding: 0 32rpx;
		position: relative;
		.list {
			margin-top: 32rpx;
			.header {
				height: 114rpx;
				background: #1A1816;
				border-radius: 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 32rpx;
				& > view:nth-child(1){
					color: #CCCAC8;
					font-size: 28rpx;
				}
				& > view:nth-child(2){
					color: #FFDFB2;
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			.bottom {
				margin-top: 24rpx;
				height: 572rpx;
				background: #1A1816;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					font-size: 32rpx;
					font-weight: 600;
					margin-top: 32rpx;
				}
				.image {
					width: 400rpx;
					height: 400rpx;
					margin-top: 48rpx;
				}
			}
		}
		.btns {
			position: fixed;
			bottom: calc(env(safe-area-inset-bottom) + 32rpx);
			left: 0;
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 0 32rpx;
			.confirm {
				width: 330rpx;
				height: 88rpx;
				background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
				border-radius: 16rpx;
				color: #0E0B06;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
			}
			.close {
				width: 330rpx;
				height: 88rpx;
				background: #262524;
				border-radius: 16rpx;
				color: #666666;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
			}
		}
		.announcementPopup {
			width: 558rpx;
			// height: 468rpx;
			background-color: #262524;
			border-radius: 16rpx;
			overflow: hidden;
			position: relative;
			padding-bottom: 40rpx;
			.title {
				width: 100%;
				font-size: 36rpx;
				color: #262524;
				background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
			}
			.text {
				padding: 32rpx 32rpx 0;
				font-size: 30rpx;
				color: #CCCAC8;
				line-height: 56rpx;
			}
			.popupBtn {
				display: flex;
				justify-content: space-between;
				padding: 0 32rpx;
				margin-top: 30rpx;
				.close {
					width: 200rpx;
					height: 80rpx;
					background: #666666;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					color: #CCC;
				}
				.confirm {
					width: 200rpx;
					height: 80rpx;
					background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #0E0B06;
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
