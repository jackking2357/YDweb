<template>
	<view class="purchaseBoost">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="购买加速器" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="downOption" :up="upOption" @down="downCallback" :height="windowHeight">
			<view class="list">
				<view class="item" v-for="(item,index) in boostList" :key="index">
					<view class="left">
						<image :src="item.acceleratorPhoto[0]" mode=""></image>
					</view>
					<view class="right">
						<view class="title">
							{{item.acceleratorName}}
						</view>
						<view class="describe">
							{{item.acceleratorDesc}}
						</view>
						<view class="priceBtn">
							<view class="price">
								{{item.acceleratorPrice}}元
							</view>
							<view class="btn" @click="purchaseBtn(item)">
								购买
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
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
	import Cache from "@/utils/cache"
	import {
		USER_INFO,
	} from '@/config/cachekey';
	import {
		getRobotAcceleratorList,
		robotAcceleratorBuy
	} from '@/api/goods'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					empty: {
						icon: '/static/images/quesheng.png',
						tip: '暂无加速器', // 提示
					}
				},
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				windowHeight:'',
				boostList:[],
				show:false,
				userInfo:''
			};
		},
		async onShow() {
			await this.getUser()
			let userInfo = Cache.get(USER_INFO)
			this.userInfo = userInfo
		},
		onLoad() {
			let that = this;
			uni.getSystemInfo({
				success: function (res) {
					that.windowHeight = (res.windowHeight - res.statusBarHeight - res.safeAreaInsets.bottom - 48) + 'px'
				}
			});
		},
		methods:{
			...mapActions(['getUser']),
			upCallback(page) {
				getRobotAcceleratorList({
					pageNo:1,
					pageSize:10
				}).then(res=>{
					// console.log(666,res)
					res.records.forEach(item=>{
						item.acceleratorPhoto = JSON.parse(item.acceleratorPhoto)
					})
					this.boostList = res.records
					this.mescroll.endSuccess(res.records.length, false);
				})
			},
			authentication(){
				this.$Router.push('/pages/my/authentication')
				this.close()
			},
			close(){
				this.show = false
			},
			downCallback(){
				getRobotAcceleratorList({
					pageNo:1,
					pageSize:10
				}).then(res=>{
					// console.log(666,res)
					res.records.forEach(item=>{
						item.acceleratorPhoto = JSON.parse(item.acceleratorPhoto)
					})
					this.boostList = res.records
					this.mescroll.endSuccess(res.records.length, false);
				})
			},
			purchaseBtn(item){
				if(this.userInfo.certStatus != 1){
					this.show = true
					return
				}
				robotAcceleratorBuy({
					robotAcceleratorId:item.robotAcceleratorId
				}).then(res=>{
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
	.purchaseBoost {
		padding: 0 32rpx;
		.list {
			margin-top: 32rpx;
			.item {
				display: flex;
				margin-bottom: 48rpx;
				.left {
					width: 240rpx;
					height: 240rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}
				.right {
					flex: 1;
					position: relative;
					margin-left: 24rpx;
					.title {
						font-size: 32rpx;
						font-weight: 600;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						width: 380rpx;
					}
					.describe {
						// width: 380rpx;
						margin-top: 16rpx;
						color: #66635E;
						font-size: 24rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display:-webkit-box; //作为弹性伸缩盒子模型显示。
						-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
						-webkit-line-clamp:3; //显示的行数
					}
					.priceBtn {
						position: absolute;
						bottom: 0;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 100%;
						.price {
							color: #FFDFB2;
							font-size: 44rpx;
							font-weight: 600;
						}
						.btn {
							width: 168rpx;
							height: 64rpx;
							background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
							border-radius: 40rpx;
							color: #0E0B06;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
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
