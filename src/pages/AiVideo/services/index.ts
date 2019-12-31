import request from '@/utils/request';
//获取摄像头列表
// eslint-disable-next-line 
export async function queryPlayList(params: any): Promise<any> {
  return request('/server/api/ai/aiIndex/picList', { params });
}
//告警历史信息
export async function queryAlarmList(params: any): Promise<any> {
  return request('/server/api/ai/aiIndex/alarmList', { params });
}