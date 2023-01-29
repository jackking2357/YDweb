<template>
	<view class="feedback">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="在线反馈" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<view class="describe">
				<view class="title">
					请输入问题描述
				</view>
				<view class="input">
					<textarea placeholder="请输入问题" v-model="inputProblem" maxlength="140"/>
				</view>
			</view>
			<view class="screenshot">
				<view class="title">
					请上传问题截图（选填）
				</view>
				<view class="" style="display: flex;flex-wrap: wrap;">
					<view class="images" v-for="(item,index) in imageList" :key="index">
						<image :src="item" mode="" style="width: 194rpx;height: 194rpx;"></image>
					</view>
					<view class="image" @click="loading">
						<view class="back">
							<view class="icon">
								<image src="../../static/images/uploadIcon.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btns" @click="sub">
			提交
		</view>
	</view>
</template>

<script>
	import { suggestionAdd } from '@/api/app'
	import { uploadFile } from '@/utils/tools'
	export default {
		data() {
			return {
				inputProblem:'',
				imageList:[]
			};
		},
		onLoad() {
			
		},
		methods:{
			async sub(){
				if(!this.inputProblem){
					uni.showToast({
						title:'请输入问题描述',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title:'提交中'
				})
				let arr = []
				for (var i = 0; i < this.imageList.length; i++) {
					let file = await uploadFile(this.imageList[i])
					arr.push(file)
				}
				suggestionAdd({
					suggestionContent:this.inputProblem,
					suggestionPhotos:arr
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:"提交成功",
						icon:"none"
					})
					setTimeout(()=>{
						this.$Router.back()
					},1000)
				})
			},
			loading(){
				if(this.imageList.length>=5){
					uni.showToast({
						title:'最多上传5张~',
						icon:'none'
					})
					return
				}
				uni.chooseImage({
					count: 5 - this.imageList.length,
					sizeType: ['original', 'compressed'],
					success: (res)=> {
					    // console.log(res.tempFilePaths[0]);
						let list = this.imageList
						res.tempFilePaths.forEach(item=>{
							list.push(item)
						})
						this.imageList = list
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.feedback {
		padding: 0 32rpx;
		.list {
			margin-top: 64rpx;
			.describe {
				margin-bottom: 48rpx;
				.title {
					margin-bottom: 24rpx;
					font-size: 32rpx;
					font-weight: 600;
				}
				.input {
					height: 280rpx;
					border-radius: 16rpx;
					border: 2rpx solid #262524;
					display: flex;
					align-items: center;
					padding:28rpx;
					textarea {
						width: 100%;
						height: 100%;
						font-size: 28rpx;
					}
				}
			}
			.screenshot {
				.title {
					margin-bottom: 24rpx;
					font-size: 32rpx;
					font-weight: 600;
				}
				.images {
					width: 33.33%;
					border-radius: 16rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 40rpx;
					height: 194rpx;
				}
				.image {
					width: 33.33%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 40rpx;
					height: 194rpx;
					.back {
						width: 194rpx;
						height: 194rpx;
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
