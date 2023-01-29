<template>
    <view class="pages">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="登录" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<view class="registerBtn">
			<view class="btn" @click="register">
				注册账号
			</view>
		</view>
		<view class="title">
			欢迎登录
		</view>
        <view class="login">
			<view class="phoneInput">
				<view class="icon">
					<image src="../../static/images/phoneIcon.png" mode=""></image>
				</view>
				<view class="input">
					<input type="number" placeholder="请输入手机号" maxlength="11" v-model="account"/>
				</view>
			</view>
			<view class="passwordInput">
				<view class="icon">
					<image src="../../static/images/passwordIcon.png" mode=""></image>
				</view>
				<view class="input">
					<input type="text" :password="isPassword" placeholder="请输入登录密码" v-model="password"/>
				</view>
				<view class="ShowPswd" @click="showPassword">
					<image src="../../static/images/noShowPswd.png" mode="" v-show="isPassword"></image>
					<image src="../../static/images/ShowPswd.png" mode="" v-show="!isPassword"></image>
				</view>
			</view>
            <!-- <view class="acount-login">
                <view class="input">
                    <u-field label-width="0" clear-size="38" icon="account" v-model="account" placeholder="请输入账号"
                        :input-border="false" />
                </view>
                <view class="input">
                    <u-field label-width="0" icon="lock-open" @right-icon-click="showPassword" :right-icon="isPassword?'eye':'eye-fill'" :password="isPassword" v-model="password" placeholder="请输入密码"
                        :input-border="false" />
                </view>

                <view class="other-login flex-col flex-1">
                    <view class="sm flex row-left" style="justify-content: center;">
                        <u-checkbox activeColor="#40AFFA" v-model="checked" shape="circle"><text class="sm">已阅读并同意</text></u-checkbox>
                        <router-link to="/bundle/pages/server_explan/server_explan?type=2">
                            <view class="agreement primary">《用户协议》</view>
                        </router-link>
                    </view>
                </view>

                <button class="login-btn white" size="lg" @tap="loginFun">登录</button>
            </view> -->

        </view>
		<view class="xieyi">
			<view class="check" @click="isCheck">
				<image src="../../static/images/noSelect.png" mode="" v-show="!checked"></image>
				<image src="../../static/images/select.png" mode="" v-show="checked"></image>
			</view>
			<view class="text" @click="isCheck">我已阅读并同意</view>
			<view class="userxieyi">
				<router-link to="/pages/my/agreement">《用户协议》</router-link>
			</view>
		</view>
		<view class="loginBtn" @click="loginFun">登录</view>
    </view>
</template>

<script>
    import {
        mapMutations,
        mapActions,
        mapGetters
    } from 'vuex'
    import {
        loginEqPwd
    } from '@/api/account';
    import wechath5 from '@/utils/wechath5'
    import {
        isWeixinClient,
        currentPage,
        client,
        trottle
    } from '@/utils/tools'
    import Cache from "@/utils/cache"
    import {
        BACK_URL,
        INVITE_CODE
    } from '@/config/cachekey'
    import {
        getWxCode,
        getUserProfile
    } from '@/utils/login'
    import store from 'store'
    export default {
        data() {
            return {
                password: '',
                account: '',
                checked: false,
                isPassword: true,
                client: store.getters.client //1-微信小程序 2-微信公众号 3-安卓app 4-苹果app 5-pc端 6-h5
            };
        },

        methods: {
            ...mapMutations(['login']),
            ...mapActions(['getUser']),
			// ...mapMutations(['setUserInfo']),
            // 账号登录
            async loginFun() {
                const {
                    account,
                    password,
                    checked
                } = this
                if (!checked) return this.$toast({
                    title: '请阅读并同意隐私协议'
                })
                
                if (!account) return this.$toast({
                    title: '请输入账号'
                })

                if (!password) return this.$toast({
                    title: '请输入密码'
                })

                loginEqPwd({
                    phoneNumber:account,
                    loginPwd: password
                }).then(res => {
                    this.loginHandle(res)
                })
            },
			//跳转至注册页面
			register(){
				this.$Router.push('/pages/login/register')
			},
			isCheck(){
				this.checked = !this.checked
			},
            // 登录结果处理
            async loginHandle(data) {
                this.login(data)
                // this.setUserInfo(data)
				this.getUser()
                // uni.hideLoading()
				uni.showToast({
					title:'登录成功',
					icon:'none'
				})
				setTimeout(()=>{
					this.$Router.pushTab('/pages/index/index')
					// if (getCurrentPages().length > 1) {
					// 	uni.navigateBack({})
					// } else if (Cache.get(BACK_URL)) {
					// 	this.$Router.replace(Cache.get(BACK_URL))
					// } else {
						
					// }
					Cache.remove(BACK_URL)
				},1000)
				
            },
            
            showPassword() {
                this.isPassword = !this.isPassword
            }
        },

        onLoad() {
            const account = Cache.get('account')
            
            if(account) this.account = account
            
            this.getCodeUrl = trottle(this.getCodeUrl)
            // #ifdef H5
            // this.oaAutoLogin()
            // #endif
			// #ifdef APP-PLUS
			console.log(333)
				uni.hideTabBar()
			// #endif
        },
        onUnload() {

        },
    };
</script>
<style lang="scss">
	.pages {
		padding: 0 32rpx;
		.registerBtn {
			margin-top: 32rpx;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			.btn {
				width: 176rpx;
				height: 64rpx;
				border-radius: 40rpx;
				border: 2rpx solid #FFDFB2;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFDFB2;
				font-size: 28rpx;
			}
		}
		.title {
			font-size: 64rpx;
			font-weight: 600;
			margin-top: 56rpx;
		}
		.login {
		    // display: flex;
		    // flex-direction: column;
		    // align-items: center;
		    // text-align: center;
			margin-top: 68rpx;
			.phoneInput {
				display: flex;
				height: 104rpx;
				align-items: center;
				border-bottom: 2rpx solid #262524;
				margin-bottom: 32rpx;
				padding: 0 28rpx;
				.icon {
					width: 48rpx;
					height: 48rpx;
				}
				.input {
					flex: 1;
					margin-left: 24rpx;
				}
			}
			.passwordInput {
				display: flex;
				height: 104rpx;
				align-items: center;
				border-bottom: 2rpx solid #262524;
				padding: 0 28rpx;
				.icon {
					width: 48rpx;
					height: 48rpx;
				}
				.input {
					flex: 1;
					margin-left: 24rpx;
				}
				.ShowPswd {
					width: 48rpx;
					height: 48rpx;
					margin-left: 24rpx;
				}
			}
			
			// margin-top: 68rpx;
		//     .logo {
		//         height: 126rpx;
		//         text-align: center;
		
		//         view:first-child {
		//             font-size: 52rpx;
		//         }
		
		//         view:last-child {
		//             font-size: 36rpx;
		//         }
		//     }
		//     .acount-login,
		//     .other-login {
		//         margin-top: 63rpx;
		//         width: calc(100%);
		
		//         .input {
		//             padding-top: 20rpx;
		//         }
		
		//         .login-btn {
		//             border-radius: 8rpx;
		//             margin: 30rpx 0 50rpx;
		//             background-color: $-color-primary;
		//         }
		//     }
		
		//     .agreement {
		//         color: $-color-primary;
		//     }
		}
		.xieyi {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 196rpx;
			.check {
				width: 32rpx;
				height: 32rpx;
				margin-right: 8rpx;
			}
			.text {
				color: #66635E;
				font-size: 24rpx;
				margin-right: 8rpx;
			}
			.userxieyi {
				color: #FF9433;
				font-size: 24rpx;
				text-decoration:underline
			}
		}
		.loginBtn {
			margin-top: 32rpx;
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
