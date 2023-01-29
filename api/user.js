import request from '@/utils/request'

// 获取用户信息
export const apiUserCentre = () => request.get('/yudian-app/login-next/getInfo')

// 修改支付宝
export const editZfb = params => 
	request.post("/yudian-app/login-next/editZfb", {...params})
	
// 获取认证明细
export const getCertDetail = () => request.get('/yudian-app/login-next/getCertDetail')

// 提交认证
export const subCert = params => 
	request.post('/yudian-app/login-next/subCert', {...params})

// 用户机器人(列表)
export const getAccountRobotList = params => 
	request.post('/yudian-app/account-robot/getAccountRobotList', {...params})

// 用户机器人(列表)
export const accountExtractAdd = params => 
	request.post('/yudian-app/login-next/accountExtractAdd', {...params})

// 平台用户流水(列表)
export const getAccountOutinList = params => 
	request.post('/yudian-app/account-outin/getAccountOutinList', {...params})

// 我的团队
export const accountMyTeam = () => request.get('/yudian-app/login-next/accountMyTeam')

// 机器人订单(列表)
export const getRobotOrderList = params => 
	request.post('/yudian-app/robot-order/getRobotOrderList', {...params})

// 机器人订单(取消)
export const robotOrderCancel = params => 
	request.delete(`/yudian-app/robot-order/robotOrderCancel/${params.robotOrderId}`)
