<template>
    <view class="user">
		<u-navbar :is-back="false" title="我的" :is-fixed="true" :border-bottom="false"
			:background="{ background: navBg > 0.5 ? '#0E0B06' : 'transparent'}" title-color="#fff">
		</u-navbar>
		<!-- 背景图片 -->
		<view class="" style="position: absolute;top: 0;left: 0;width: 100%;z-index: -1;">
			<image src="../../static/images/userBack.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<!-- 用户头像信息 -->
		<view class="userInfo" @click="login">
			<view class="userPhoto">
				<image :src="userInfo.avatarUrl || '/static/images/userImg.png'" mode=""></image>
			</view>
			<view class="right">
				<view class="name">{{userInfo.nickName || '点击登录'}}</view>
				<view class="inviteCode" v-if="userInfo.invitationCode">邀请码：{{userInfo.invitationCode}}</view>
			</view>
		</view>
		<!-- 账号余额 -->
		<view class="accountBalance">
			<view class="header">
				<view class="">
					可提现余额 : ￥<text>{{userInfo.score || 0}}</text>
				</view>
				<view class="">
					<router-link to="/pages/my/withdraw">立即提现</router-link>
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="topTitle">
						今日收益
					</view>
					<view class="number">
						{{userInfo.todayIncome || 0}}
					</view>
				</view>
				<view class="right">
					<view class="topTitle">
						<view class="">
							总收益
						</view>
						<view class="">
							<view class="">
								<router-link to="/pages/my/incomeDetail">收支明细</router-link>
							</view>
							<view class="">
								<image src="../../static/images/userRight.png" mode=""></image>
							</view>
						</view>
					</view>
					<view class="number">
						{{userInfo.sumIncome || 0}}
					</view>
				</view>
			</view>
			<!-- <view class="background">
				<image src="../../static/images/yueBack.png" mode=""></image>
			</view> -->
		</view>
		<!-- 功能列表 -->
		<view class="functionList">
			<router-link to="/pages/my/myOrder">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/orderIcon.png" mode=""></image>
					</view>
					<view class="text">
						我的订单
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/setting">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/setting.png" mode=""></image>
					</view>
					<view class="text">
						账号设置
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/myTeam">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/myTeam.png" mode=""></image>
					</view>
					<view class="text">
						我的团队
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/inviteFriend">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/yaoqing.png" mode=""></image>
					</view>
					<view class="text">
						邀请好友
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/feedback">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/fankui.png" mode=""></image>
					</view>
					<view class="text">
						在线反馈
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/agreement">
				<view class="item">
					<view class="leftIcon">
						<image src="../../static/images/xieyi.png" mode=""></image>
					</view>
					<view class="text">
						用户协议
					</view>
					<view class="backIcon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
		</view>
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
    import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins";
    export default {
        mixins: [MescrollMixin, ],
        data() {
            return {
                navBg:0,
				userInfo:''
            }
        },
        methods: {
			...mapActions(['getUser']),
			login(){
				if(!this.userInfo){
					this.$Router.push('/pages/login/login')
				}
			}
        },
		onPageScroll(e) {
			const top = uni.upx2px(100)
			const {
				scrollTop
			} = e
			let percent = scrollTop / top > 1 ? 1 : scrollTop / top
			this.navBg = percent
		},
        async onShow() {
			await this.getUser()
            let userInfo = Cache.get(USER_INFO)
			this.userInfo = userInfo
			console.log(userInfo)
			
        },
    }
</script>

<style lang="scss" scoped>
    .user {
		padding: 0 32rpx;
        .userInfo {
			display: flex;
			margin-top: 48rpx;
			.userPhoto {
				width: 136rpx;
				height: 136rpx;
				margin-right: 32rpx;
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.name {
					font-size: 36rpx;
				}
				.inviteCode {
					color: #B2AA9D;
					font-size: 26rpx;
					margin-top: 24rpx;
				}
			}
		}
		.accountBalance {
			height: 268rpx;
			width: 100%;
			position: relative;
			margin-top: 48rpx;
			padding: 32rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-image: url('../../static/images/yueBack.png');
			background-size: 100% 100%;
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				& > view:nth-child(1){
					font-size: 26rpx;
					display: flex;
					align-items: center;
					& > text {
						font-size: 44rpx;
						font-weight: 600;
					}
				}
				& > view:nth-child(2){
					width: 176rpx;
					height: 56rpx;
					background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
					border-radius: 40rpx;
					color: #0E0B06;
					font-size: 28rpx;
					font-weight: 600;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.bottom {
				display: flex;
				.left {
					flex: 1;
					border-right: 2rpx solid #FFDFB2;
					.topTitle {
						color: #FFDFB2;
						font-size: 24rpx;
						margin-bottom: 8rpx;
					}
					.number {
						font-size: 36rpx;
						font-weight: 600;
					}
				}
				.right {
					flex: 1;
					padding-left: 32rpx;
					.topTitle {
						color: #FFDFB2;
						display: flex;
						margin-bottom: 8rpx;
						display: flex;
						justify-content: space-between;
						& > view:nth-child(1){
							font-size: 24rpx;
						}
						& > view:nth-child(2){
							display: flex;
							& > view:nth-child(1){
								color: #FFFFFF;
								font-size: 24rpx;
							}
							& > view:nth-child(2){
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
					.number {
						font-size: 36rpx;
						font-weight: 600;
					}
				}
			}
			.background {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
			}
		}
		.functionList {
			margin-top: 48rpx;
			& > view:last-child {
				border-bottom: 0;
			}
			.item {
				display: flex;
				align-items: center;
				position: relative;
				height: 140rpx;
				width: 100%;
				border-bottom: 2rpx solid #1A1816;
				.leftIcon {
					width: 56rpx;
					height: 56rpx;
					margin-right: 24rpx;
				}
				.text {
					color: #B2AA9D;
					font-size: 32rpx;
				}
				.backIcon {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
    }
</style>
