<template>
	<view class="myTeam">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="我的团队" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :up="upOption" @down="downCallback" :height="windowHeight">
			<view class="allNumber">
				<view class="left">
					<view class="number">
						{{obj.accountTeamInfoVos && obj.accountTeamInfoVos.length}}
					</view>
					<view class="text">
						邀请好友总数
					</view>
				</view>
				<view class="right">
					<view class="number">
						{{obj.teamRobotCount}}
					</view>
					<view class="text">
						团队机器人总数
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in obj.accountTeamInfoVos" :key="index">
					<view class="image">
						<image :src="item.avatarUrl" mode=""></image>
					</view>
					<view class="userInfo">
						<view class="userName">{{item.nickName}}</view>
						<view class="userPhone">{{item.phoneNumber}}</view>
					</view>
					<view class="numberTime">
						<view class="number">
							<text>{{item.accountRobotCount}}</text>台
						</view>
						<view class="time">
							{{item.createDatetime}}加入
						</view>
					</view>
				</view>
				
				
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import { accountMyTeam } from '@/api/user'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					empty: {
						icon: '/static/images/quesheng.png',
						tip: '暂无成员', // 提示
					}
				},
				windowHeight:'',
				obj:{}
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
				accountMyTeam({}).then(res=>{
					console.log(111,res)
					this.obj = res
					this.mescroll.endSuccess(res.accountTeamInfoVos.length, false);
				})
			},
			downCallback(){
				accountMyTeam({}).then(res=>{
					console.log(111,res)
					this.obj = res
					this.mescroll.endSuccess(res.accountTeamInfoVos.length, false);
				})
			},
		}
	}
</script>

<style lang="scss">
	.myTeam {
		.allNumber {
			height: 200rpx;
			background: #1A1816;
			display: flex;
			margin-bottom: 32rpx;
			.left::after {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 2rpx;
				height: 80rpx;
				background-color: #262524;
			}
			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				.number {
					color: #FF9433;
					font-weight: 600;
					font-size: 44rpx;
				}
				.text {
					color: #66635E;
					font-size: 24rpx;
					margin-top: 8rpx;
				}
			}
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.number {
					color: #FF9433;
					font-weight: 600;
					font-size: 44rpx;
				}
				.text {
					color: #66635E;
					font-size: 24rpx;
					margin-top: 8rpx;
				}
			}
		}
		.list {
			margin: 0 32rpx;
			background: #1A1816;
			border-radius: 16rpx;
			padding: 0 32rpx;
			& > .item:last-child {
				border-bottom: 0;
			}
			.item {
				display: flex;
				align-items: center;
				position: relative;
				height: 168rpx;
				border-bottom: 2rpx solid #262524;
				.image {
					width: 104rpx;
					height: 104rpx;
					border-radius: 50%;
					overflow: hidden;
				}
				.userInfo {
					margin-left: 24rpx;
					.userName {
						font-size: 32rpx;
						font-weight: 600;
						margin-bottom: 20rpx;
					}
					.userPhone {
						font-size: 28rpx;
						color: #B2AA9D;
					}
				}
				.numberTime {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.number {
						color: #FFDFB2;
						font-size: 28rpx;
						display: flex;
						align-items: center;
						text {
							font-size: 44rpx;
							color: #FFDFB2;
							font-weight: 600;
							margin-right: 8rpx;
						}
					}
					.time {
						font-size: 24rpx;
						color: #66635E;
					}
				}
			}
		}
	}
</style>
