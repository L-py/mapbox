import React, { Component } from 'react';
import AlarmListComponent from './components/AlarmList';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { AlarmState } from './models/alarm';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  alarm: AlarmState,
  submitting: boolean
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
 
  render() {
    const { alarm } = this.props
    const { alarmListData }:any = alarm; 
    console.log(alarmListData);
    return (
      <div>
        { alarmListData && alarmListData.rows?
            <AlarmListComponent alarmListData={alarmListData}/>
        :null}
      </div>
    );
  }
}

export default AlarmPanelPage;
