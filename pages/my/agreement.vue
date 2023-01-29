<template>
	<view class="agreement">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="用户协议" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<rich-text :nodes="obj.protocolContent"></rich-text>
	</view>
</template>

<script>
	import { getPlatformProtocolDetail } from '@/api/app'
	export default {
		data() {
			return {
				obj:{}
			};
		},
		onLoad() {
			this.getPlatformProtocolDetails()
		},
		methods:{
			getPlatformProtocolDetails(){
				getPlatformProtocolDetail({
					platformProtocolId:1
				}).then(res=>{
					console.log(res)
					this.obj = res
				})
			}
		}
	}
</script>

<style lang="scss">
	.agreement {
		padding: 0 32rpx;
	}
</style>
