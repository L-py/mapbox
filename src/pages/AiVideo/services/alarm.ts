import request from '@/utils/request';

//告警历史信息
export async function queryAlarmList(params: any): Promise<any> {
  return request('/server/api/ai/aiIndex/alarmList', { params });
}

export async function queryAlarmListById(params: any): Promise<any> {
  return request('/server/api/vgis/alarm/getAlarmByID', { params });
}
