<script>
	import {
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	import Cache from '@/utils/cache'
	export default {
		async onLaunch(options) {
            // 获取配置
            // this.getConfig();
			// 获取个人信息
			// this.getUser()
			//获取app版本号
			// #ifdef APP-PLUS
				// plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				// 	console.log('版本号:',inf.versionCode)
				// 	uni.showModal({
				// 		title: "发现新版本",
				// 		content: "确认下载更新",
				// 		showCancel:false,
				// 		success: (res) => {
				// 			if (res.confirm){
				// 				uni.showLoading({
				// 				    title: '更新中……'
				// 				})
				// 				//判断ios或者安卓进行对应的更新
				// 			}
				// 		}
				// 	})
				// })
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapActions([
				'getUser',
                'getConfig',
                'isLogin'
			]),
			...mapMutations(['logout']),
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'styles/common.scss';
	@import "components/uview-ui/index.scss";
	
</style>
