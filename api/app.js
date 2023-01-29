import request from '@/utils/request'
import wechath5 from '@/utils/wechath5'
import store from 'store'

// 协议
export const getPlatformProtocolDetail = data => 
	request.get(`/yudian-app/public/getPlatformProtocolDetail/${data.platformProtocolId}`)

// 建议档案(添加)
export const suggestionAdd = params => 
	request.post('/yudian-app/suggestion/suggestionAdd', {...params})

// 首页信息
export const index = data => 
	request.get(`/yudian-app/login-next/index`)
