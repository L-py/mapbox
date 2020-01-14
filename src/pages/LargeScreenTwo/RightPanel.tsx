import React, { Component } from 'react';
import ALarmConfirmationChart from './components/AlarmConfirmation';
import ProjectTypePage from './components/ProjectType';
import DeviceFunChart from './components/DeviceFun';
import MapPointPage from './components/MapPoint';
import { Switch } from 'antd';
import styles from './Index.less';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { indexState } from './models/index';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  index: indexState,
  submitting: boolean,
  boundNe: {},
  boundSw: {},
  changeDevType: void,
}

@connect(({ index, loading }: {
  index: indexState,
  loading: {
    effects: {
      [key: string]: boolean;
    };
  },
}) => ({
  index,
  submitting: loading.effects[''],
}))
class RightPanelPage extends Component<Props> {
  state = {
    allStatus: false,
  }
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/initAlarmConfirmStati',
    });
    dispatch({
      type: 'index/initMonitorDevStati',
    });
    dispatch({
      type: 'index/initProTypeStati',
    });
    dispatch({
      type: 'index/initMonitorDevNumber',
    });
  }


  onSelect = (type:string,status:boolean) => {
    const { dispatch, boundNe, boundSw, changeDevType }:any = this.props;
    changeDevType(type,status);
    const typeValue = type=='all'?{}:{monDevCategory:type};
    const params = {
      ...typeValue,
      leftLowerlat:boundSw.lat,
      leftLowerlot:boundSw.lng,
      leftUpperLat:boundNe.lat,
      leftUpperLot:boundSw.lng,
      rightLowerlat:boundSw.lat,
      rightLowerlot:boundNe.lng,
      rightUpperLot:boundNe.lng,
      rightUpperlat:boundNe.lat,
    }
    dispatch({
      type: 'index/fetchMondevicePointData',
      payload: params
    });
  }

  changeSwitchStatus = (status:boolean) => {
    this.onSelect('01',!status);
    this.onSelect('02',!status);
    this.onSelect('03',!status);
    this.onSelect('04',!status);
    this.setState({
      allStatus: !status,
    })
  }
  
  render() {
    const { index } = this.props;
    const { conData,  monData, proTypeData, monDevData }:any = index;
    const { allStatus } = this.state;
    const motheds = {
      onSelect: this.onSelect,
    }
    return (
        <div className={styles.content2}>
          <div className={styles.alarmLevel3}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/devProsIcon.png')}
              />
              <span>设备特殊功能占比</span>
            </div>
            <DeviceFunChart monData={monData}/>
          </div>
          <div className={styles.alarmLevel4}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/alarmSureIcon.png')}
              />
              <span>告警确认情况分布</span>
            </div>
            <ALarmConfirmationChart conData={conData}/>
          </div>
          <div className={styles.alarmLevel4}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/proTypeIcon.png')}
              />
              <span>项目类型分布TOP</span>
            </div>
            <ProjectTypePage proTypeData={proTypeData}/>
          </div>
          <div className={styles.proType}>
            <div className={styles.modileTitle}>
              <label>地图撒点控制</label>
              <Switch
                checked = {allStatus}
                onClick = {() => this.changeSwitchStatus(allStatus)} 
                style={{ marginLeft: 160, marginTop: 10, width: 50 }}
                size={'small'}
              />
            </div>
            <MapPointPage monDevData={monDevData} {...motheds} allStatus={allStatus}/>
          </div>
        </div>
    );
  }
}

export default RightPanelPage;
