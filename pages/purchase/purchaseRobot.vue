<template>
	<view class="purchaseRobot">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="购买机器人" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="contents">
			<view class="image">
				<image :src="robotInfo.robotPhoto" mode=""></image>
			</view>
			<view class="text">
				<rich-text :nodes="robotInfo.robotDesc"></rich-text>
			</view>
		</view>
		<view class="btns">
			<view class="left">
				<view class="subtract" @click="subtract">
					<image src="../../static/images/subtract.png" mode=""></image>
				</view>
				<view class="input">
					<input type="number" v-model="value" />
				</view>
				<view class="add" @click="add">
					<image src="../../static/images/add.png" mode=""></image>
				</view>
			</view>
			<view class="right" @click="purchase">
				确认购买
			</view>
		</view>
		<!-- 实名认证弹出层 -->
		<u-popup v-model="show" @close="close" mode="center" :mask-close-able="false">
			<view class="announcementPopup">
				<view class="title">
				    提示
				</view>
				<view class="text">
					您还未实名认证,暂无法购买,请前往认证~
				</view>
				<view class="popupBtn">
					<view class="close" @click="close">
						取消
					</view>
					<view class="confirm" @click="authentication">
						前往认证
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
	    mapGetters,
	    mapActions
	} from 'vuex'
	import {
		getRobotDetail,
		robotBuy
	} from '@/api/goods'
	import Cache from "@/utils/cache"
	import {
		USER_INFO,
	} from '@/config/cachekey';
	export default {
		data() {
			return {
				value: 1,
				robotInfo:{},
				userInfo:'',
				show:false
			};
		},
		async onShow() {
			await this.getUser()
			let userInfo = Cache.get(USER_INFO)
			this.userInfo = userInfo
		},
		onLoad() {
			this.getRobotDetails()
		},
		methods:{
			...mapActions(['getUser']),
			getRobotDetails(){
				getRobotDetail({
					robotId:1
				}).then(res=>{
					console.log('机器人明细',res)
					res.robotPhoto = JSON.parse(res.robotPhoto)
					res.robotDesc = res.robotDesc.replace(/\n/g,"<p></p>")
					res.robotPhoto = res.robotPhoto[0]
					this.robotInfo = res
				})
			},
			close(){
				this.show = false
			},
			authentication(){
				this.$Router.push('/pages/my/authentication')
				this.close()
			},
			subtract(){
				if(this.value==1){
					return
				}
				let number = this.value;
				number--;
				this.value = number;
			},
			add(){
				let number = this.value;
				number++;
				this.value = number;
			},
			purchase(){
				console.log(this.value)
				if(this.value<=0){
					uni.showToast({
						title:'数量不能为0~',
						icon:'none'
					})
					return
				}
				if(this.userInfo.certStatus != 1){
					this.show = true
					return
				}
				//购买接口
				robotBuy({
					payCount:this.value,
					robotId:this.robotInfo.robotId
				}).then(res=>{
					// console.log(222,res)
					res.qrCodePhoto = JSON.parse(res.qrCodePhoto)
					this.$Router.push({
						path:'/pages/purchase/payment',
						query:{
							payMoney:res.payMoney,
							robotOrderId:res.robotOrderId,
							qrCodePhoto:res.qrCodePhoto,
							platformWalletId:res.platformWalletId
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.purchaseRobot {
		padding: 0 32rpx 184rpx;
		position: relative;
		.contents {
			margin-top: 32rpx;
			.image {
				width: 100%;
				height: 590rpx;
			}
			.text {
				margin-top: 32rpx;
				color: #CCCAC8;
				line-height: 28px;
				font-size: 28rpx;
			}
		}
		.btns {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 152rpx;
			background: #1A1816;
			border-radius: 16rpx;
			position: fixed;
			bottom: calc(env(safe-area-inset-bottom) + 32rpx);
			width: 686rpx;
			padding: 0 32rpx;
			.left {
				display: flex;
				align-items: center;
				.subtract {
					width: 64rpx;
					height: 64rpx;
				}
				.input {
					width: 105rpx;
					margin: 0 20rpx;
					input {
						display: flex;
						color: #FFDFB2;
						font-size: 44rpx;
						text-align: center;
					}
				}
				.add {
					width: 64rpx;
					height: 64rpx;
				}
			}
			.right {
				width: 288rpx;
				height: 88rpx;
				background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
				border-radius: 88rpx;
				font-size: 32rpx;
				color: #0E0B06;
				display: flex;
				align-items: center;
				justify-content: center;
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
