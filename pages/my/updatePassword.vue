<template>
	<view class="updatePassword">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="修改登录密码" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<view class="item">
				<view class="header">
					请输入旧登录密码
				</view>
				<view class="inputView">
					<input type="text" v-model="oldPassword" placeholder="输入旧登录密码"/>
				</view>
			</view>
			<view class="item">
				<view class="header">
					请输入新登录密码
				</view>
				<view class="inputView">
					<input type="text" v-model="password" placeholder="输入新登录密码"/>
				</view>
			</view>
			<view class="item">
				<view class="header">
					请确认新登录密码
				</view>
				<view class="inputView">
					<input type="text" placeholder="输入新登录密码" v-model="confirmPwd"/>
				</view>
			</view>
		</view>
		<view class="btns" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import { editLoginPwd } from '@/api/account'
	export default {
		data() {
			return {
				oldPassword:'',
				password:'',
				confirmPwd:''
			};
		},
		onLoad() {
			
		},
		methods:{
			submit(){
				if(this.password!==this.confirmPwd){
					uni.showToast({
						title:'密码不一致,请重新输入~',
						icon:"none"
					})
					return
				}
				editLoginPwd({
					newLoginPwd:this.confirmPwd,
					oldLoginPwd:this.oldPassword
				}).then(res=>{
					uni.showToast({
						title:'修改成功',
						icon:"none"
					})
					setTimeout(()=>{
						this.$Router.back()
					},1000)
				})
			},
		}
	}
</script>

<style lang="scss">
	.updatePassword {
		.list {
			padding: 0 32rpx;
			margin-top: 64rpx;
			& > .item:last-child {
				margin-bottom: 0;
			}
			.item {
				margin-bottom: 48rpx;
				.header {
					font-size: 32rpx;
					font-weight: 600;
				}
				.inputView {
					height: 96rpx;
					border-radius: 16rpx;
					border: 2rpx solid #262524;
					margin-top: 24rpx;
					display: flex;
					align-items: center;
					padding: 0 28rpx;
					input {
						flex: 1;
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
