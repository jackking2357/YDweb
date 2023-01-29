<template>
	<view class="myRobot">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="我的机器人" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :up="upOption" :down="downOption" @down="downCallback" :height="windowHeight">
			<view class="list">
				<view class="item" v-for="(item,index) in robotList" :key="index">
					<view class="image">
						<image :src="item.robotInfoVo && item.robotInfoVo.robotPhoto[0]" mode=""></image>
					</view>
					<view class="text">
						<view class="number">
							累计收益 : {{item.cumulativeIncome}}
						</view>
						<view class="time">
							购买时间 : {{item.purchaseDatetime}}
						</view>
					</view>
				</view>
				
				
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import { getAccountRobotList } from '@/api/user'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					empty: {
						icon: '/static/images/quesheng.png',
						tip: '暂无机器人', // 提示
					}
				},
				robotList:[],
				windowHeight:'',
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
		
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
			upCallback(page) {
				console.log(666,page)
				getAccountRobotList({
					pageNo: 1,
					pageSize: -1,
				}).then(res=>{
					res.records.forEach(item=>{
						item.robotInfoVo.robotPhoto = JSON.parse(item.robotInfoVo.robotPhoto)
					})
					this.robotList = res.records
					this.mescroll.endSuccess(res.records.length, false);
				})
			},
			downCallback(){
				getAccountRobotList({
					pageNo: 1,
					pageSize: -1,
				}).then(res=>{
					res.records.forEach(item=>{
						item.robotInfoVo.robotPhoto = JSON.parse(item.robotInfoVo.robotPhoto)
					})
					this.robotList = res.records
					this.mescroll.endSuccess(res.records.length, false);
				})
			},
		}
	}
</script>

<style lang="scss">
	.myRobot {
		padding: 0 32rpx;
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 32rpx;
			.item {
				width: 330rpx;
				height: 410rpx;
				background: #1A1816;
				border-radius: 16rpx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				margin-bottom: 24rpx;
				.image {
					width: 330rpx;
					height: 280rpx;
				}
				.text {
					flex: 1;
					padding: 24rpx 16rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.number {
						color: #FFDFB2;
						font-size: 28rpx;
						font-weight: 600;
					}
					.time {
						color: #66635E;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
