import React, { Component } from 'react';
import BackgroundComponentMap from './components/BackgroundMap';
import LeftPanelPage from './LeftPanel';
import RightPanelPage from './RightPanel';
import MapPage from './MapPanel';
import styles from './Index.less';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { indexState } from './models/index';
import cookie from 'react-cookies';
import {beFull} from 'be-full';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  index: indexState,
  submitting: boolean
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
class LargeScreenPage extends Component<Props> {
  state = {
    boundNe: {},
    boundSw: {},
    devType: '',
    devStatue: false,
    fatchParams: {},
    operationType:'',
    dataTypeL: '0',
    dataTypeT: '0',
    dataTypeA: '0',
  }
  changeBounds = (ne:any,sw:any) => {
    this.setState({
      boundNe: ne,
      boundSw: sw
    })
  }
  changeDevType = (type:string,status:boolean) =>{
    this.setState({
      devType: type,
      devStatue: status
    })
  }
  changeOperationType = (type:string) => {
    this.setState({
      operationType: type
    })
  }
  changeDataType = (type:string,status:string) => {
    const { dispatch }:any = this.props;
    const { fatchParams } = this.state;
    if(type == 'level'){
      this.setState({
        dataTypeL:status
      })
      dispatch({
        type: 'index/initAlarmLevelStati',
        payload: {...fatchParams,dateType:status}
      });
    }else if(type == 'total') {
      this.setState({
        dataTypeT:status
      })
      dispatch({
        type: 'index/initAlarmTotalStati',
        payload: {...fatchParams,dateType:status}
      });
    }else if(type == 'area') {
      this.setState({
        dataTypeA:status
      })
      dispatch({
        type: 'index/initAlarmRegionStati',
        payload: {...fatchParams,dateType:status}
      });
    }
  }
  changeParams = (params:any) => {
    this.setState({
      fatchParams:params
    })
    const { dispatch }:any = this.props;
    const { dataTypeL, dataTypeT, dataTypeA } = this.state;
    dispatch({
      type: 'index/initAlarmLevelStati',
      payload: {...params,dateType:dataTypeL}
    });
    dispatch({
      type: 'index/initAlarmTotalStati',
      payload: {...params,dateType:dataTypeT}
    });
    dispatch({
      type: 'index/initAlarmRegionStati',
      payload: {...params,dateType:dataTypeA}
    });
    dispatch({
      type: 'index/initProSum',
      payload: {...params}
    });
    dispatch({
      type: 'index/initTotalStati',
      payload: {...params}
    });
    dispatch({
      type: 'index/initAlarmConfirmStati',
      payload: {...params}
    });
    dispatch({
      type: 'index/initMonitorDevStati',
      payload: {...params}
    });
    dispatch({
      type: 'index/initProTypeStati',
      payload: {...params}
    });
    dispatch({
      type: 'index/initMonitorDevNumber',
      payload: {...params}
    });
  }
  componentDidMount(): void {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scaleX = clientWidth / 1920;
    const scaleY = clientHeight / 1080;
    document.getElementById('main-container').style.transform = `scale(${scaleX},${scaleY})`;
    document.getElementById('main-container').style.transformOrigin  = 'left top';
    document.getElementById('main-container').style.transition = 'all 0.1s linear';
    const scaX = 1 /scaleX;
    const scaY = 1 /scaleY;
    document.getElementById('map').style.transform = `scale(${scaX},${scaY})`;
    document.getElementById('map').style.transformOrigin = 'left top';
    // document.getElementById('backgrond').style.transform = `scale(${scaX})`;
    // document.getElementById('backgrond').style.transformOrigin = 'left top';
    if(window.location.href.indexOf('?')!=-1){
      const token = window.location.href.split('?')[1].split('=')[1];
      cookie.save('token', token, { path: '/' });
    }
  }

  componentWillUnmount(): void {
    cookie.remove('token', { path: '/' })
  }

  beFull = () => {
    beFull(document.getElementById('main-container'));
  }

  render() {
    const { boundNe, boundSw, devType, devStatue, operationType } = this.state;
    const motheds = {
      changeBounds: this.changeBounds,
      changeParams: this.changeParams,
      changeOperationType: this.changeOperationType,
    }
    const motheds1 = {
      changeDataType: this.changeDataType,
    }
    const motheds2 = {
      changeDevType: this.changeDevType,
      changeOperationType: this.changeOperationType,
    }
    return (
      <div className={styles.container} id="main-container">
        <MapPage {...motheds} devType={devType} operationType={operationType} devStatue={devStatue}/>
        <div id="backgrond" className={styles.backGrounds}></div>
        <LeftPanelPage {...motheds1}/>
        <RightPanelPage boundNe={boundNe} boundSw={boundSw} {...motheds2}/>
        <div className={styles.btn} onClick={() => this.beFull()}>全屏</div>
      </div>
    );
  }
}

export default LargeScreenPage;
