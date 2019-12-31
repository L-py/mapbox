import request from '@/utils/request';
//告警级别统计
// eslint-disable-next-line 
export async function queryAlarmLevelStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/alarmLevelStatis', { params });
}
//告警总量统计
export async function queryAlarmTotalStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/alarmTotalStatis', { params });
}
//告警区域统计
export async function queryAlarmRegionStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/alarmRegionStatis', { params });
}
//监控设备特殊功能统计
export async function queryMonitorDevStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/monitorDevStatis', { params });
}
//告警确认统计
export async function queryAlarmConfirmStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/alarmConfirmStatis', { params });
}
//项目类型统计
export async function queryProTypeStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/proTypeStatis', { params });
}
//省份项目分布
export async function queryProSum(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/proSum', { params });
}

//获取属性信息？？
export async function queryAttr(params: any): Promise<any> {
  return request('/server/api/vgis/device/getColleDeviceAttr', { params });
}
//  /api/ai/aiIndex/picList  /api/vgis/proHomePage/proSum   /api/ai/aiIndex/alarmList   /api/vgis/device/getColleDeviceAttr
//总量统计。总项目数，总设备数...
export async function queryTotalStatis(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/totalStatis', { params });
}
//监控设备数量统计
export async function queryMonitorDevNumber(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/monitorDevNumber', { params });
}
//获取项目撒点信息
export async function queryProPointData(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/proPointData', { params });
}
//获取设备撒点信息
export async function queryMondevicePointData(params: any): Promise<any> {
  return request('/server/api/vgis/proHomePage/mondevicePointData', { params });
}

