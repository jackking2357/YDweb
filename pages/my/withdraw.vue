<template>
	<view class="withdraw">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="提现" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="list">
			<view class="accountNumber">
				<view class="">
					支付宝账号
				</view>
				<view class="">
					{{userInfo.zfbUsername}}
				</view>
			</view>
			<view class="number">
				<view class="header">
					<view class="icon">
						￥
					</view>
					<view class="input">
						<input type="digit" placeholder="0.00" v-model="number" />
					</view>
					<view class="allBtn" @click="all">
						全部提现
					</view>
				</view>
				<view class="bottom">
					可提现余额￥{{userInfo.score}}
				</view>
			</view>
			<view class="notesBtn">
				<router-link to="/pages/my/incomeDetail">提现记录</router-link>
			</view>
			<view class="btn" @click="tixian">
				确认提现
			</view>
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
	import { accountExtractAdd } from '@/api/user'
	export default {
		data() {
			return {
				userInfo:{},
				number:''
			};
		},
		onShow() {
			let userInfo = Cache.get(USER_INFO)
			this.userInfo = userInfo
		},
		methods:{
			...mapActions(['getUser']),
			all(){
				this.number = this.userInfo.score
			},
			tixian(){
				if(this.number<=0){
					uni.showToast({
						title:"提现金额不能小于0",
						icon:"none"
					})
					return
				}
				if(!this.userInfo.zfbUsername){
					uni.showToast({
						title:"请前往设置页面,完善提现账号信息~",
						icon:"none"
					})
					return
				}
				uni.showLoading({
					title:'提交中~',
					icon:'none',
					mask:true
				})
				accountExtractAdd({
					extractAmount:this.number
				}).then(res=>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:"提交成功",
						icon:"none"
					})
					// this.getUser()
					setTimeout(()=>{
						this.$Router.back()
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	.withdraw {
		.list {
			display: flex;
			flex-direction: column;
			padding: 0 32rpx;
			margin-top: 32rpx;
			.accountNumber {
				height: 114rpx;
				background: #1A1816;
				border-radius: 16rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 32rpx;
				& > view:nth-child(1){
					color: #CCCAC8;
					font-size: 28rpx;
				}
				& > view:nth-child(2){
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			.number {
				margin-top: 30rpx;
				height: 224rpx;
				background: #1A1816;
				border-radius: 16rpx;
				padding: 0 32rpx;
				display: flex;
				flex-direction: column;
				.header {
					display: flex;
					height: 126rpx;
					align-items: center;
					position: relative;
					border-bottom: 2rpx solid #262524;
					.icon {
						color: #FFDFB2;
						font-size: 26rpx;
					}
					.input {
						width: 400rpx;
						margin-left: 8rpx;
						input {
							color: #FFDFB2;
							font-size: 44rpx;
							font-weight: 600;
						}
					}
					.allBtn {
						color: #FF9433;
						font-size: 28rpx;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
				.bottom {
					flex: 1;
					display: flex;
					align-items: center;
					color: #66635E;
					font-size: 24rpx;
				}
			}
			.notesBtn {
				color: #B2AA9D;
				font-size: 28rpx;
				margin: 152rpx auto 0;
			}
			.btn {
				margin-top: 40rpx;
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
