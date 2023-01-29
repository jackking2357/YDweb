<template>
	<view class="incomeDetail">
		<u-navbar :is-fixed="true" :border-bottom="false" :background="{ background: '#0E0B06'}" title="收支明细" title-size="34" title-color="#fff" :is-back="true">
		</u-navbar>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" :up="upOption" :down="downOption" @down="downCallback" :height="windowHeight">
			<view class="list">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="title">
						{{item.outinName}}
					</view>
					<view class="time">
						{{item.createDatetime}}
					</view>
					<view class="number">
						{{item.outinAmount}}
					</view>
				</view>
			</view>
		</mescroll-body>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import { getAccountOutinList } from '@/api/user'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					empty: {
						icon: '/static/images/quesheng.png',
						tip: '暂无记录', // 提示
					},
					page:{
						size:20
					}
				},
				windowHeight:'',
				list:[],
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
				console.log('page',page)
				let pageNum = page.num // 第几页
				let pageSize = page.size // 每页条数
				getAccountOutinList({
					pageNo:pageNum,
					pageSize:pageSize,
					orderByColumn:'createDatetime',
					isAsc:'descending'
				}).then(res=>{
					console.log(999,res)
					if (page.num == 1) this.list = []
					// 追加新数据
					this.list = [...this.list, ...res.records]
					this.mescroll.endSuccess(res.records.length, pageSize==res.pages?false:true);
				}).catch(() => {
                    // 请求失败,隐藏加载状态
                    this.mescroll.endErr()
                })
			},
			downCallback(){
				this.mescroll.resetUpScroll()
			},
		}
	}
</script>

<style lang="scss">
	.incomeDetail {
		padding: 0 32rpx;
		.list {
			.item {
				height: 152rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative;
				border-bottom: 2rpx solid #1A1816;
				.title {
					font-size: 32rpx;
					font-weight: 600;
					margin-bottom: 10rpx;
				}
				.time {
					color: #66635E;
					font-size: 26rpx;
				}
				.number {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					color: #FFDFB2;
					font-size: 36rpx;
					font-weight: 600;
				}
			}
		}
	}
</style>
