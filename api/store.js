import request from '@/utils/request'

// 任务(列表)
export const getWorkTaskList = (params) => request.post('/yudian-app/public/work-task/getWorkTaskList', params)

