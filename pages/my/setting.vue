<template>
	<view class="setting">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="账号设置" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<router-link to="/pages/my/authentication">
				<view class="item">
					<view class="title">实名认证</view>
					<view class="icon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/withdrawSetting">
				<view class="item">
					<view class="title">提现账号设置</view>
					<view class="icon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
			<router-link to="/pages/my/updatePassword">
				<view class="item">
					<view class="title">修改登录密码</view>
					<view class="icon">
						<image src="../../static/images/FunctionRight.png" mode=""></image>
					</view>
				</view>
			</router-link>
		</view>
		<view class="btns" @click="outLogin">
			退出登录
		</view>
	</view>
</template>

<script>
	import { logout } from '@/api/account'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			outLogin(){
				logout({}).then(res=>{
					this.$store.commit("logout");
					this.$toast({
					    title: '退出成功'
					})
					setTimeout(()=>{
						this.$Router.pushTab('/pages/index/index')
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	.setting {
		.list {
			padding: 0 32rpx;
			& > .item:last-child {
				border-bottom: 0;
			}
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 124rpx;
				border-bottom: 2rpx solid #1A1816;
				.title {
					font-size: 32rpx;
					font-weight: 600;
				}
				.icon {
					width: 48rpx;
					height: 48rpx;
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
