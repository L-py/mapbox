import React, { Component } from 'react';
import AlarmListComponent from './components/AlarmList';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { message } from 'antd';
import { AlarmState } from './models/alarm';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  alarm: AlarmState,
  submitting: boolean,
  ids: [],
}

@connect(({ alarm, loading }: {
  alarm: AlarmState,
  loading: {
    effects: {
      [key: string]: boolean;
    };
  },
}) => ({
    alarm,
  submitting: loading.effects[''],
}))
class AlarmPanelPage extends Component<Props> {
  componentWillMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'alarm/initAlarmList',
    });
    setInterval(()=>{
      dispatch({
        type: 'alarm/initAlarmList',
      });
    },60000);
  }

  fetchAlarmList = (type:string) => {
    const { dispatch, ids }:any = this.props;
   
    if(type === 'now'){
      if(ids.length===0){
        message.warning('请先选择设备后再查看告警信息！') ;
        return;
      } 
      dispatch({
        type: 'alarm/fetchAlarmList',
        payload: {alarmID: ids[0]}
      });
    }else{
      dispatch({
        type: 'alarm/initAlarmList',
      });
    }
    
  }
 
  render() {
    const { alarm, ids } = this.props
    const { alarmListData }:any = alarm; 
    console.log(alarmListData);
    const methods = {
      fetchAlarmList: this.fetchAlarmList
    }
    return (
      <div>
        { alarmListData && alarmListData.rows?
            <AlarmListComponent {...methods} alarmListData={alarmListData} ids={ids}/>
        :null}
      </div>
    );
  }
}

export default AlarmPanelPage;
