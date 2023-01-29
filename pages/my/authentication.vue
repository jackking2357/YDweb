<template>
	<view class="authentication">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="实名认证" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="status">
			<view :class="status==0?'select':'text'">
				提交审核
			</view>
			<view class="icon">
				<image src="../../static/images/jindu.png" mode=""></image>
			</view>
			<view :class="status==1?'select':'text'">
				审核中
			</view>
			<view class="icon">
				<image src="../../static/images/jindu.png" mode=""></image>
			</view>
			<view :class="status==2 || status==3?'select':'text'">
				{{status==3?'认证失败':'认证成功'}}
			</view>
		</view>
		<view class="infoImage">
			<view class="title">
				请上传身份证正面与反面
			</view>
			<view class="cardImage" @click="cardImageZ">
				<view class="noUploading" v-if="!zImage">
					<view class="icon">
						<image src="../../static/images/paizhao.png" mode=""></image>
					</view>
					<view class="text">
						请上传身份证人像面
					</view>
				</view>
				<view class="noUploading" v-if="zImage">
					<image :src="zImage" mode=""></image>
				</view>
			</view>
			<view class="cardImage" @click="cardImageF">
				<view class="noUploading" v-if="!fImage">
					<view class="icon">
						<image src="../../static/images/paizhao.png" mode=""></image>
					</view>
					<view class="text">
						请上传身份证国徽面
					</view>
				</view>
				<view class="noUploading" v-if="fImage">
					<image :src="fImage" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btns" @click="tijiao" v-if="status == 0 || status == 3">
			提交
		</view>
	</view>
</template>

<script>
	import { getCertDetail,subCert } from '@/api/user'
	import { uploadFile } from '@/utils/tools'
	export default {
		data() {
			return {
				status:0,   //0未提交  1待审核  2已通过  3未通过
				obj:{},
				zImage:'',
				fImage:'',
			};
		},
		onLoad() {
			this.getCert()
		},
		methods:{
			async tijiao(){
				//判断是否上传图片
				if(!this.zImage){
					uni.showToast({
						title:'请上传身份证人像面',
						icon:'none'
					})
					return
				}
				if(!this.fImage){
					uni.showToast({
						title:'请上传身份证国徽面',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title:'提交中'
				})
				let zFile = await uploadFile(this.zImage)
				let fFile = await uploadFile(this.fImage)
				subCert({
					certPhotoFront:zFile,
					certPhotoReverse:fFile
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:"提交成功",
						icon:"none"
					})
					this.status = 1
					setTimeout(()=>{
						this.$Router.back()
					},1000)
					
				})
			},
			chooseImage(type){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: (res)=> {
					    // console.log(res.tempFilePaths[0]);
						if(type=='z'){
							this.zImage = res.tempFilePaths[0]
						}else {
							this.fImage = res.tempFilePaths[0]
						}
					}
				})
			},
			cardImageZ(){
				if(this.status==1 || this.status == 2){
					return
				}
				this.chooseImage('z')
			},
			cardImageF(){
				if(this.status==1 || this.status == 2){
					return
				}
				this.chooseImage('f')
			},
			getCert(){
				getCertDetail({}).then(res=>{
					console.log(res)
					if(!res){
						this.status = 0
					}else if(res.reviewStatus==0){
						this.status = 1
						this.obj = res
						this.zImage = res.certPhotoFront
						this.fImage = res.certPhotoReverse
					}else if(res.reviewStatus==1){
						this.status = 2
						this.obj = res
						this.zImage = res.certPhotoFront
						this.fImage = res.certPhotoReverse
					}else if(res.reviewStatus==2){
						this.status = 3
						this.obj = res
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.authentication {
		.status {
			height: 104rpx;
			background: #1A1816;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 70rpx;
			margin-bottom: 32rpx;
			.text {
				color: #66635E;
				font-size: 28rpx;
			}
			.icon {
				width: 32rpx;
				height: 32rpx;
			}
			.select {
				color: #FFDFB2;
				font-size: 28rpx;
				font-weight: 600;
			}
		}
		.infoImage {
			padding: 32rpx;
			background: #1A1816;
			border-radius: 16rpx;
			margin: 0 32rpx;
			.title {
				font-size: 32rpx;
				font-weight: 600;
			}
			.cardImage {
				margin-top: 24rpx;
				.noUploading {
					height: 392rpx;
					background: #262524;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					overflow: hidden;
					.icon {
						width: 92rpx;
						height: 92rpx;
					}
					.text {
						margin-top: 24rpx;
						color: #FFDFB2;
						font-size: 26rpx;
					}
				}
			}
		}
		.btns {
			position: fixed;
			width: 686rpx;
			left: 50%;
			transform: translateX(-50%);
			bottom: calc(env(safe-area-inset-bottom) + 32rpx);
			height: 88rpx;
			background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
			border-radius: 16rpx;
			color: #0E0B06;
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
