<template>
    <view class="index">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="雨点" title-size="34" title-color="#fff" :is-back="false">
		</u-navbar>
		<view class="robot">
			<view class="accelerating" v-if="usernumber && usernumber.acceleratorCount>0">
				<view class="">{{usernumber.acceleratorRate}}加速中</view>
				<view class="">有效期至{{usernumber.acceleratorDate}}</view>
		<!-- 		<view class="background">
					<image src="../../static/images/header.png" mode=""></image>
				</view> -->
			</view>
			<view class="robotNoRun">
		<!-- 		<view class="background">
					<image src="../../static/images/noRun.png" mode=""></image>
				</view> -->
				<view class="number">
					<view class="">{{usernumber && usernumber.robotCount || 0}}</view>
					<view class="">台机器人运行中</view>
				</view>
				<view class="all">
					<router-link to="/pages/my/myRobot">
						<view class="view">
							<view class="my">我的机器人</view>
							<view class="icon"><image src="../../static/images/right.png" mode=""></image></view>
						</view>
					</router-link>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btns">
			<view class="">
				<router-link to="/pages/purchase/purchaseRobot">购买机器人</router-link>
			</view>
			<view class="">
				<router-link to="/pages/purchase/purchaseBoost">购买加速器</router-link>
			</view>
		</view>
		<!-- 通告栏 -->
		<!-- <view class="noticeBoard">
			<view class="" style="position: absolute;left: 0;top: 0;z-index: 10;width: 100%;height: 100%;"></view>
			<view class="labaIcon">
				<image src="../../static/images/labaIcon.png" mode=""></image>
			</view>
			<swiper :autoplay="true" :interval="5000" :duration="500" class="swiper" vertical circular>
				<swiper-item>
					<view class="swiper-item">李四点赞42次，获得17元收益</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">张三点赞84次，获得34元收益</view>
				</swiper-item>
			</swiper>
		</view> -->
		<!-- 任务列表 -->
		<view class="taskList">
			<view class="title">
				<image src="../../static/images/taskTitle.png" mode=""></image>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in workTaskList" :key="index">
					<view class="leftImg">
						<image :src="item.taskIcon[0]" mode=""></image>
					</view>
					<view class="contents">
						<view class="titles">{{item.taskName}}</view>
						<view class="text">{{item.taskDesc}}</view>
					</view>
					<view class="btn">
						<view class="gongzuozhong" v-if="usernumber && usernumber.robotCount>0">
							工作中
						</view>
						<view class="daikaiqi" v-else>
							待开启
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 公告弹出层 -->
		<u-popup v-model="show" @close="close" mode="center" :mask-close-able="false">
		    <view class="">
		    	<view class="announcementPopup">
		    		<view class="title">
		    			公告
		    		</view>
		    		<view class="text">
		    			<rich-text :nodes="protocolDetail.protocolContent"></rich-text>
		    		</view>
		    		<!-- <view class="dataTime">
		    			2022-12-12
		    		</view> -->
		    	</view>
		    	<view class="close" @click="close">
		    		<image src="../../static/images/close.png" mode=""></image>
		    	</view>
		    </view>
		</u-popup>
    </view>
</template>
<script>
	import {
		getWorkTaskList
	} from '@/api/store'
	import { index,getPlatformProtocolDetail } from '@/api/app'
    export default {
        data() {
            return {
                show:false,//控制公告弹出层
				workTaskList:[],
				usernumber:{},
				protocolDetail:{}
            }
        },
		onLoad() {
			// console.log('弹框')
			this.getPlatformProtocolDetails()
		},
		onShow() {
			this.getWorkTaskLists()
			this.getuseheader()
		},
        methods: {
			getPlatformProtocolDetails(){
				getPlatformProtocolDetail({
					platformProtocolId:4
				}).then(res=>{
					// console.log(999,res)
					this.protocolDetail = res
					if(res.protocolContent && res.protocolContent != "<p><br></p>"){
						this.show = true
					}
				})
			},
			getuseheader(){
				index({}).then(res=>{
					// console.log(555,res)
					this.usernumber = res
				})
			},
			getWorkTaskLists(){
				getWorkTaskList({
					pageNo:1,
					pageSize:-1
				}).then(res=>{
					// console.log(666,res.records)
					res.records.forEach(item=>{
						item.taskIcon = JSON.parse(item.taskIcon)
					})
					this.workTaskList = res.records
				})
			},
			close(){
				this.show = false
			},
        }
    }
</script>

<style lang="scss">
    .index {
		padding: 32rpx 32rpx 32rpx;
		.robot {
			border-radius: 16rpx;
			overflow: hidden;
			.accelerating {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 32rpx;
				width: 100%;
				height: 64rpx;
				position: relative;
				background-image: url('../../static/images/header.png');
				background-size: 100% 100%;
				& > view:nth-child(1){
					color: #262524;
					font-size: 28rpx;
					font-weight: 600;
				}
				& > view:nth-child(2){
					color: #262524;
					font-size: 24rpx;
				}
				// .background {
				// 	position: absolute;
				// 	left: 0;
				// 	top: 0;
				// 	width: 100%;
				// 	height: 100%;
				// 	z-index: -1;
				// }
			}
			.robotNoRun {
				width: 100%;
				height: 196rpx;
				background-image: url('../../static/images/noRun.png');
				background-size: 100% 100%;
				position: relative;
				padding: 32rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.background {
					// width: 100%;
					// height: 196rpx;
					// position: absolute;
					// top: 0;
					// left: 0;
					// z-index: -1;
				}
				.number {
					display: flex;
					align-items: center;
					& > view:nth-child(1){
						font-size: 52rpx;
						margin-right: 8rpx;
					}
					& > view:nth-child(2){
						font-size: 28rpx;
					}
				}
				.all {
					display: flex;
					.view {
						display: flex;
						align-items: center;
						.my{
							color: #B2AA9D;
							font-size: 26rpx;
						}
						.icon{
							width: 32rpx;
							height: 32rpx;
						}
					}
				}
			}
		}
		
		.btns {
			display: flex;
			justify-content: space-between;
			margin-top: 24rpx;
			view {
				width: 332rpx;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FF9433;
				font-size: 28rpx;
				font-weight: 600;
				background: linear-gradient(180deg, #262524 0%, #1A1816 50%);
				border-radius: 16rpx;
				border: 2rpx solid #302E2D;
			}
		}
		.noticeBoard {
			display: flex;
			align-items: center;
			background: #1A1816;
			border-radius: 4rpx;
			height: 64rpx;
			margin-top: 24rpx;
			padding: 0 24rpx;
			position: relative;
			.labaIcon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 16rpx;
			}
			.swiper {
				width: 100%;
				height: 64rpx;
				swiper-item {
					display: flex;
					align-items: center;
					.swiper-item {
						color: #B2AA9D;
						font-size: 24rpx;
					}
				}
				
			}
		}
		.taskList {
			margin-top: 48rpx;
			.title {
				width: 336rpx;
				height: 50rpx;
				margin: 0 auto;
			}
			.list {
				margin-top: 24rpx;
				.item {
					position: relative;
					display: flex;
					align-items: center;
					padding: 0 32rpx;
					width: 100%;
					height: 168rpx;
					background: #1A1816;
					border-radius: 16rpx;
					margin-bottom: 24rpx;
					.leftImg {
						width: 104rpx;
						height: 104rpx;
					}
					.contents {
						margin-left: 32rpx;
						height: 88rpx;
						.titles {
							font-size: 32rpx;
							font-weight: 600;
							width: 340rpx;
							overflow:hidden; //超出的文本隐藏
							text-overflow:ellipsis; //溢出用省略号显示
							white-space:nowrap; //溢出不换行
						}
						.text {
							color: #66635E;
							font-size: 24rpx;
							margin-top: 8rpx;
							width: 340rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display:-webkit-box; //作为弹性伸缩盒子模型显示。
							-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
							-webkit-line-clamp:2; //显示的行数
						}
					}
					.btn {
						position: absolute;
						right: 32rpx;
						top: 50%;
						transform: translateY(-50%);
						.daikaiqi {
							width: 148rpx;
							height: 56rpx;
							background: #262524;
							border-radius: 40rpx;
							color: #FFDFB2;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 600;
						}
						.gongzuozhong {
							width: 148rpx;
							height: 56rpx;
							background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
							border-radius: 40rpx;
							color: #0E0B06;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 600;
						}
					}
				}
			}
		}
		.announcementPopup {
			width: 558rpx;
			height: 468rpx;
			background-color: #262524;
			border-radius: 16rpx;
			overflow: hidden;
			position: relative;
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
				height: 368rpx;
				padding: 32rpx 32rpx 0;
				font-size: 28rpx;
				color: #CCCAC8;
				line-height: 56rpx;
			}
			.dataTime {
				font-size: 28rpx;
				color: #CCCAC8;
				text-align: right;
				margin: 24rpx 32rpx 0;
			}
		}
		.close {
			width: 64rpx;
			height: 64rpx;
			margin: 48rpx auto 0;
			image {
				display: block;
			}
		}
		
    }
</style>
