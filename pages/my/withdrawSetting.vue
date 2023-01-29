<template>
	<view class="withdrawSetting">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="提现账号设置" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<view class="moneyCode" @click="selectImage">
				<view class="title">
					请上传支付宝收款码
				</view>
				<view class="image" v-if="!imageCode">
					<view class="icon">
						<image src="../../static/images/uploadIcon.png" mode=""></image>
					</view>
				</view>
				<view class="image" v-if="imageCode">
					<image :src="imageCode" mode=""></image>
				</view>
			</view>
			<view class="AlipayAccount">
				<view class="title">
					请输入支付宝账号
				</view>
				<view class="input">
					<input type="text" placeholder="输入支付宝账号" v-model="apliy">
				</view>
			</view>
		</view>
		<view class="btns" @click="tijiao">
			提交
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations,
	    mapActions,
	    mapGetters
	} from 'vuex'
	import { uploadFile } from '@/utils/tools'
	import { editZfb } from '@/api/user'
	import Cache from "@/utils/cache"
	import {
		USER_INFO,
	} from '@/config/cachekey';
	export default {
		data() {
			return {
				imageCode:'',
				apliy:'',
				imageLoading:'',
				isUP:true
			};
		},
		onShow() {
			let userInfo = Cache.get(USER_INFO)
			console.log(999,userInfo)
			this.imageCode = userInfo.zfbQrCode
			this.imageLoading = userInfo.zfbQrCode
			if(userInfo.zfbQrCode){
				this.isUP = true
			}else {
				this.isUP = false
			}
			this.apliy = userInfo.zfbUsername
		},
		onLoad() {
			
		},
		methods:{
			...mapActions(['getUser']),
			selectImage(){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: (res)=> {
					    console.log(res.tempFilePaths[0]);
						this.imageCode = res.tempFilePaths[0]
						this.isUP = false
					}
				})
			},
			async tijiao(){
				if(!this.imageCode){
					uni.showToast({
						title:'请上传支付宝收款码',
						icon:'none'
					})
					return
				}
				if(!this.apliy){
					uni.showToast({
						title:'请输入支付宝账号~',
						icon:'none'
					})
					return
				}
				
				uni.showLoading({
					title:'提交中'
				})
				
				if(!this.isUP){
					this.imageLoading = await uploadFile(this.imageCode)
				}
				
				
				editZfb({
					zfbQrCode:this.imageLoading,
					zfbUsername:this.apliy
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:"提交成功",
						icon:"none"
					})
					this.getUser()
					setTimeout(()=>{
						this.$Router.back()
					},1000)
				})
			},
		}
	}
</script>

<style lang="scss">
	.withdrawSetting {
		padding: 0 32rpx;
		.list {
			margin-top: 64rpx;
			.moneyCode {
				.title {
					margin-bottom: 24rpx;
					font-size: 32rpx;
					font-weight: 600;
				}
				.image {
					width: 400rpx;
					height: 400rpx;
					background: #262524;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					.icon {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
			.AlipayAccount {
				margin-top: 48rpx;
				.title {
					margin-bottom: 24rpx;
					font-size: 32rpx;
					font-weight: 600;
				}
				.input {
					height: 96rpx;
					border-radius: 16rpx;
					border: 2rpx solid #262524;
					display: flex;
					align-items: center;
					padding: 0 28rpx;
					input {
						width: 100%;
						font-size: 28rpx;
					}
				}
			}
		}
		.btns {
			// position: fixed;
			width: 686rpx;
			// left: 50%;
			// transform: translateX(-50%);
			// bottom: calc(env(safe-area-inset-bottom) + 32rpx);
			height: 88rpx;
			background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
			border-radius: 16rpx;
			color: #0E0B06;
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 80rpx;
		}
	}
</style>
