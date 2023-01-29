import request from '@/utils/request'

/** S 商品 **/

// 机器人(明细)
export const getRobotDetail = (params) => request.get(`/yudian-app/robot/getRobotDetail/${params.robotId}`)

// 加速器(列表)
export const getRobotAcceleratorList = params => 
	request.post("/yudian-app/robot-accelerator/getRobotAcceleratorList", {...params})

// 加速器(购买)
export const robotAcceleratorBuy = params => 
	request.post(`/yudian-app/robot-accelerator/robotAcceleratorBuy/${params.robotAcceleratorId}`, {...params})

// 机器人(购买)
export const robotBuy = params => 
	request.post(`/yudian-app/robot/robotBuy`, {...params})

// 机器人订单(我已付款)
export const robotOrderPaid = params => 
	request.put(`/yudian-app/robot-order/robotOrderPaid/${params.robotOrderId}`, {...params})
