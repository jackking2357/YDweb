<template>
	<view class="register">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="注册" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="fromList">
			<view class="item">
				<view class="header">
					<text>*</text>请输入手机号码
				</view>
				<view class="inputView">
					<input type="number" v-model="phone" placeholder="输入手机号码" maxlength="11" />
				</view>
			</view>
			<view class="item">
				<view class="header">
					<text>*</text>请输入登录密码
				</view>
				<view class="inputView">
					<input type="text" v-model="password" placeholder="输入登录密码"/>
				</view>
			</view>
			<view class="item">
				<view class="header">
					<text>*</text>请确认登录密码
				</view>
				<view class="inputView">
					<input type="text" placeholder="输入登录密码" v-model="confirmPwd"/>
				</view>
			</view>
			<view class="item">
				<view class="header">
					<text>*</text>请输入邀请码
				</view>
				<view class="inputView">
					<input type="text" placeholder="输入邀请码" v-model="code"/>
				</view>
			</view>
		</view>
		<view class="btns" @click="register">
			注册账号
		</view>
	</view>
</template>

<script>
	import {
	    registered
	} from '@/api/account';
	export default {
		data() {
			return {
				phone:'',
				code:'',
				password:'',
				confirmPwd:''
			};
		},
		onLoad() {
			console.log(this.$Route.query.invitationCode)
			if(this.$Route.query.invitationCode){
				this.code = this.$Route.query.invitationCode
			}
		},
		methods:{
			register(){
				if(!this.phone){
					uni.showToast({
						title:"请输入手机号码~",
						icon:'none'
					})
					return
				}
				if(!this.password){
					uni.showToast({
						title:"请输入密码~",
						icon:'none'
					})
					return
				}
				if(!this.confirmPwd){
					uni.showToast({
						title:"请输入确认密码~",
						icon:'none'
					})
					return
				}
				
				if(!this.code){
					uni.showToast({
						title:"请输入邀请码~",
						icon:'none'
					})
					return
				}
				if(this.password!==this.confirmPwd){
					uni.showToast({
						title:"密码不一致,请重新输入~",
						icon:'none'
					})
					return
				}
				registered({
					invitationCode: this.code,
					loginPwd: this.confirmPwd,
					phoneNumber: this.phone
				}).then(res=>{
					let that = this;
					uni.showToast({
						title:'注册成功',
						icon:'none'
					})
					// #ifdef APP-PLUS
						setTimeout(function(){
							that.$Router.back(1)
						},1000)
					// #endif
					// #ifdef H5
						setTimeout(function(){
							window.open('http://yudianrobot.com/yudian-download/#/')
						},1000)
					// #endif
				})
			},
		}
	}
</script>

<style lang="scss">
	.register {
		padding: 0 32rpx;
		.fromList {
			margin-top: 64rpx;
			& > .item:last-child {
				margin-bottom: 0;
			}
			.item {
				margin-bottom: 48rpx;
				.header {
					font-size: 32rpx;
					font-weight: 600;
					text {
						color: #FF9433;
						font-size: 32rpx;
					}
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
			height: 88rpx;
			background: linear-gradient(135deg, #FFDFB2 0%, #F9C590 100%);
			border-radius: 16rpx;
			color: #0E0B06;
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 300rpx;
		}
	}
</style>
