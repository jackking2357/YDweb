import axios from '@/js_sdk/uniapp-axios/dist/uni-axios'
import store from '@/store'
import {
	paramsToStr,
	currentPage,
	toast,
} from './tools'
import {
	APICodeEnum
} from './enum'
import Cache from './cache'
import {
	TOKEN
} from '@/config/cachekey'
import {
	baseURL,
	version
} from '@/config/app'
import {
	toLogin
} from './login'
import {
	router
} from '@/router'

function checkParams(params) {
	if (typeof params != 'object') return params
	for (let key in params) {
		const value = params[key];
		if (value === null || value === undefined || value === "") {
			delete params[key];
		}
	}
	return params;
}

const events = {
	// 成功
	success({
		data
	}) {
		return Promise.resolve(data)
	},
	// 失败
	fail({
		msg
	}) {
		return Promise.reject(msg)
	},
	// 重定向到登录
	redirect({
		msg
	}) {
		store.commit('logout')
		toLogin()
		return Promise.reject(msg)
	}

}


const service = axios.create({
	baseURL: baseURL + '/',
	timeout: 10000,
	headers: {
		'content-type': 'application/json',
	}
});


// request拦截器
service.interceptors.request.use(
	config => {
		// 清楚空的字段
		config.data = checkParams(config.data)
		config.params = checkParams(config.params)
		// 请求头token
		config.headers.Authorization = store.getters.token||''
		// 接口版本号
		// config.headers.version = version
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		const {
			statusMsg,
			statusCode,
			data,
		} = response.data
        if(statusMsg == 'token不能为空' || statusCode == '40002' || statusCode == '40001') {
            uni.navigateTo({
                url: '/pages/login/login',
            })
            toast({
            	title: '请先登录~'
            })
            return
        }
		if (statusCode == '50000') {
			toast({
				title: statusMsg
			})
		}
		return events[APICodeEnum[statusCode]](response.data)

	},
	error => {
		uni.showToast({
			title: "系统错误，请稍候再试",
			icon: "none"
		})
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)

export default service
