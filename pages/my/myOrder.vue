<template>
	<view class="myOrder">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="我的订单" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :up="upOption" :down="downOption" @down="downCallback" :height="windowHeight">
			<view class="list">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="header">
						<view class="title">
							{{item.robotAcceleratorId?item.robotAcceleratorInfoVo && item.robotAcceleratorInfoVo.acceleratorName:'机器人'}}
						</view>
						<view class="price">
							{{item.price}}元
						</view>
					</view>
					<view class="center">
						<view class="number">
							数量：{{item.payCount}}
						</view>
						<view class="status">
							{{item.orderStatus==1?'待付款':item.orderStatus==2?'已完成':item.orderStatus==3?'已取消':item.orderStatus==4?'待审核':''}}
						</view>
					</view>
					<view class="bottom">
						<view class="confirmBtn" v-if="item.orderStatus==1" @click="isPay(item.robotOrderId)">
							我已付款
						</view>
						<view class="cancelBtn" @click="cancelOrder(item.robotOrderId)" v-if="item.orderStatus==1 || item.orderStatus == 4">
							取消订单
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
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
					<view class="confirm" @click="payCancel">
						确定
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import { getRobotOrderList,robotOrderCancel } from '@/api/user'
	import { robotOrderPaid } from '@/api/goods'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					empty: {
						icon: '/static/images/quesheng.png',
						tip: '暂无订单', // 提示
					},
					page:{
						size:10
					}
				},
				windowHeight:'',
				list:[],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				orderId:'',
				show:false,
				payshow:false
			};
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
			cancelOrder(robotOrderId){
				this.orderId = robotOrderId
				this.show = true
			},
			payclose(){
				this.payshow = false
			},
			close() {
				this.show = false
			},
			isPay(robotOrderId){
				this.orderId = robotOrderId
				this.payshow = true
			},
			payCancel(){
				uni.showLoading({
					title:'请求中~',
					icon:'none'
				})
				//已付款请求
				robotOrderPaid({
					robotOrderId:this.orderId
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'请求成功',
						icon:'none'
					})
					this.mescroll.resetUpScroll()
					this.payclose()
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
			},
			OrderCancel(){
				uni.showLoading({
					title:'取消中~',
					icon:'none'
				})
				robotOrderCancel({
					robotOrderId:this.orderId
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'取消成功',
						icon:'none'
					})
					this.mescroll.resetUpScroll()
					this.close()
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'取消失败',
						icon:'none'
					})
				})
			},
			upCallback(page) {
				console.log('page',page)
				let pageNum = page.num // 第几页
				let pageSize = page.size // 每页条数
				// this.mescroll.endSuccess(1, false);
				getRobotOrderList({
					pageNo:pageNum,
					pageSize:pageSize,
					orderByColumn:'createDatetime',
					isAsc:'descending'
				}).then(res=>{
					console.log(999,res)
					if (page.num == 1) this.list = []
					// 追加新数据
					this.list = [...this.list, ...res.records]
					this.mescroll.endSuccess(res.records.length, pageSize==res.pages?false:true);
				}).catch(() => {
			        // 请求失败,隐藏加载状态
			        this.mescroll.endErr()
			    })
			},
			downCallback(){
				this.mescroll.resetUpScroll()
			},
		}
	}
</script>

<style lang="scss">
	.myOrder {
		padding: 0 32rpx;
		.list {
			// & > .item:last-child {
			// 	border-bottom: 0;
			// }
			.item {
				padding: 32rpx 0;
				border-bottom: 2rpx solid #1A1816;
				.header {
					display: flex;
					justify-content: space-between;
					.title {
						font-size: 32rpx;
						color: #FFFFFF;
						font-weight: 600;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						width: 70%;
					}
					.price {
						color: #FFDFB2;
						font-weight: 600;
						font-size: 36rpx;
						width: 28%;
						text-align: right;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
					}
				}
				.center {
					margin-top: 8rpx;
					display: flex;
					justify-content: space-between;
					.number {
						color: #66635E;
						font-size: 26rpx;
					}
					.status {
						color: #B2AA9D;
						font-size: 26rpx;
					}
				}
				.bottom {
					margin-top: 16rpx;
					display: flex;
					justify-content: flex-end;
					.confirmBtn {
						width: 192rpx;
						height: 64rpx;
						background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
						border-radius: 40rpx;
						font-size: 28rpx;
						color: #0E0B06;
						font-weight: 600;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.cancelBtn {
						width: 192rpx;
						height: 64rpx;
						border: 2rpx solid #262524;
						border-radius: 40rpx;
						font-size: 28rpx;
						color: #B2AA9D;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 16rpx;
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
