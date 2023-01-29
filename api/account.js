import request from '@/utils/request'


// 账户注册
export const registered = params => 
	request.post("/yudian-app/public/registered", {...params})

// 密码登录
export const loginEqPwd = params => 
	request.post("/yudian-app/public/loginEqPwd", {...params})

// 修改密码
export const editLoginPwd = params => 
	request.post("/yudian-app/login-next/editLoginPwd", {...params})

// 修改密码
export const logout = params => 
	request.post("/yudian-app/public/logout", {...params})
