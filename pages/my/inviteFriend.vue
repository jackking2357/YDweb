<template>
	<view class="inviteFriend">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="邀请好友" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="image">
			<canvas style="width: 686rpx; height: 940rpx;" canvas-id="shareCanvas" id="shareCanvas"></canvas>
		</view>
		<view style="position: absolute;left: 50%;transform: translateX(-50%);bottom: 400rpx;opacity: 0;z-index: -100;">
			<uqrcode ref="uqrcode" canvas-id="qrcode" :value="shareUrl" :options="{ margin: 5 }" @complete="wancheng"></uqrcode>
		</view>
		<view class="btns" @click="save">
			保存海报
		</view>
		<!-- h5的弹框 -->
		<u-popup v-model="show" @close="close" mode="center" :mask-close-able="false">
		    <view class="popup">
		    	<view class="tempFilePath">
		    		<image :src="tempFilePath" mode="widthFix"></image>
		    	</view>
				<view class="text">
					长按图片保存
				</view>
				<view class="close" @click="close">
					取消
				</view>
		    </view>
		</u-popup>
	</view>
</template>

<script>
	// import UQRCode from '../../uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js';
	import Cache from "@/utils/cache"
	import {
		USER_INFO,
	} from '@/config/cachekey';
	export default {
		data() {
			return {
				userInfo:{},
				shareUrl:'https://www.baidu.com/',
				option:{
					margin:5
				},
				codeUrl:'',
				tempFilePath:'',//h5保存的图片
				show:false
			};
		},
		onLoad() {
			let userInfo = Cache.get(USER_INFO)
			this.userInfo = userInfo
			this.shareUrl = 'http://yudianrobot.com/yudian-main/#/pages/login/register?invitationCode=' + userInfo.invitationCode
			console.log(userInfo)
		},
		mounted() {
			uni.showLoading({
				title:'生成海报中~',
				mask:true
			})
		},
		methods:{
			close(){
				this.show = false
			},
			//保存海报
			save(){
				let that = this;
				uni.showLoading({
					title:'保存中~',
					mask:true
				})
				uni.canvasToTempFilePath({
					canvasId:'shareCanvas',
					success(res) {
						// console.log(555,res)
						// #ifdef APP-PLUS
						uni.saveImageToPhotosAlbum({
							filePath:res.tempFilePath,
							success(image) {
								uni.hideLoading()
								uni.showToast({
									title:'保存成功',
									icon:'none'
								})
							}
						})
						// #endif
						// #ifdef H5
						uni.hideLoading()
						that.tempFilePath = res.tempFilePath
						that.show = true
						// #endif
					}
				})
			},
			//下载图片
			downloadFile(imgurl){
			  return new Promise((resolve,reject)=>{
			    uni.downloadFile({
					  url:imgurl,
					  success:(result)=>{
						  if (result.statusCode === 200) {
							resolve(result)
						  }
					  },
					  fail:(err)=>{
						reject(err)
					  }
			    })
			  })
			},
			// 获取元素宽高度
			getViewHeight(name) {
				return new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery()
				query.selectAll(name).boundingClientRect(data => {
					// this.tabbarHeight = data.height
					resolve(data)
				}).exec();
				})
			},
			async canvas(){
				let context = uni.createCanvasContext('shareCanvas')
				let width = 0
				let height = 0
				let shareCanvas = await this.getViewHeight('#shareCanvas')
				width = shareCanvas[0].width
				height = shareCanvas[0].height
				//绘制背景图片
				context.drawImage('/static/images/share.png',0,0,width,height)
				
				//绘制用户头像
				//下载用户头像到本地后渲染图片
				// let avatarUrl = await this.downloadFile(this.userInfo.avatarUrl)
				context.drawImage('/static/images/userImg.png',uni.upx2px(80),uni.upx2px(560),uni.upx2px(136),uni.upx2px(136))
				
				//绘制用户昵称
				context.fillStyle="#0E0B06";
				context.font= "normal bold " + uni.upx2px(32) + "px Arial"
				context.fillText(this.userInfo.nickName, uni.upx2px(232), uni.upx2px(640));
				
				//绘制用户邀请码
				context.fillStyle="#66635E";
				context.font= uni.upx2px(24) + "px Arial"
				context.fillText("邀请码: " + this.userInfo.invitationCode, uni.upx2px(232), uni.upx2px(680));
				
				//分割线
				context.beginPath();
				context.moveTo(uni.upx2px(80), uni.upx2px(728));
				context.lineTo(uni.upx2px(606), uni.upx2px(728));
				context.lineWidth='1'
				context.strokeStyle = '#CCCAC8'
				context.stroke();
				context.closePath();
				
				//绘制"扫码注册下载 >>>"文案
				context.fillStyle="#0E0B06";
				context.font= "normal bold " + uni.upx2px(36) + "px Arial"
				context.fillText("扫码注册下载 >>>", uni.upx2px(80), uni.upx2px(800));
				
				//绘制"立即加入赚钱"文案
				context.fillStyle="#66635E";
				context.font= uni.upx2px(24) + "px Arial"
				context.fillText("立即加入赚钱", uni.upx2px(80), uni.upx2px(846));
				
				//绘制二维码
				context.drawImage(this.codeUrl,uni.upx2px(504), uni.upx2px(760),uni.upx2px(100), uni.upx2px(100))
				
				//绘制完成
				context.draw()
				
				//关闭loading
				uni.hideLoading()
			},
			//生成二维码成功
			wancheng(){
				let that = this
				const ref = this.$refs['uqrcode'];
				/* ref通过v-for遍历后会自动包裹在数组里，所以要判断一下 */
				if (Array.isArray(ref)) {
				  ref[0].toTempFilePath({
				    success: res => {
					  // console.log(666,res)
					  that.codeUrl = res.tempFilePath
					  that.canvas()
				    }
				  });
				} else {
				  ref.toTempFilePath({
				    success: res => {
					  // console.log(555,res)
					  that.codeUrl = res.tempFilePath
					  that.canvas()
				    }
				  });
				}
			},
		}
	}
</script>

<style lang="scss">
	.inviteFriend {
		padding: 0 32rpx;
		.image {
			width: 100%;
			height: 940rpx;
			margin-top: 32rpx;
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
		.popup {
			display: flex;
			flex-direction: column;
			align-items: center;
			.tempFilePath {
				width: 500rpx;
			}
			.text {
				color: #FFFFFF;
				font-size: 30rpx;
				margin-top: 30rpx;
			}
			.close {
				margin-top: 30rpx;
				width: 500rpx;
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
	}
</style>
