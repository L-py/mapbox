import React, { Component } from 'react';
import ALarmLevelChart from './components/AlarmLevel';
import ALarmTotilChart from './components/AlarmTotal';
import ALarmAreaChart from './components/AlarmArea';
import ProjectDivisionChart from './components/ProjectDivision';
import HeaderComponent from './components/Header';
import AlarmInfoComponent from './components/AlarmInfo';
import ProNumComponent from './components/ProNum';
import styles from './Index.less';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { indexState } from './models/index';


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
class LeftPanelPage extends Component<Props> {
  state = {
    yearStatusL: false,
    monthStatusL: false,
    yearStatusT: false,
    monthStatusT: false,
    yearStatusA: false,
    monthStatusA: false,
  };

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/initAlarmLevelStati',
      payload: {dataType:'0'}
    });
    dispatch({
      type: 'index/initAlarmTotalStati',
      payload: {dataType:'0'}
    });
    dispatch({
      type: 'index/initAlarmRegionStati',
      payload: {dataType:'0'}
    });
    dispatch({
      type: 'index/initProSum',
    });
    dispatch({
      type: 'index/initTotalStati',
    });
  }

  changeStatus = (type: string, time: string, bol: boolean, bol2: boolean) => {
    if (type == 'level') {
      if (time == 'month') {
        this.setState({
          monthStatusL: !bol,
          yearStatusL: bol2 ? false : false,
        });
      } else {
        this.setState({
          yearStatusL: !bol,
          monthStatusL: bol2 ? false : false,
        });
      }
    } else if (type == 'totil') {
      if (time == 'month') {
        this.setState({
          monthStatusT: !bol,
          yearStatusT: bol2 ? false : false,
        });
      } else {
        this.setState({
          yearStatusT: !bol,
          monthStatusT: bol2 ? false : false,
        });
      }
    } else {
      if (time == 'month') {
        this.setState({
          monthStatusA: !bol,
          yearStatusA: bol2 ? false : false,
        });
      } else {
        this.setState({
          yearStatusA: !bol,
          monthStatusA: bol2 ? false : false,
        });
      }
    }
  };

  render() {
    const { index } = this.props;
    const { levData, totData, regData, proSumData, totalData, }:any = index;
    const {
      yearStatusL,
      monthStatusL,
      yearStatusT,
      monthStatusT,
      yearStatusA,
      monthStatusA,
    } = this.state;
    return (
        <div className={styles.content1}>
          <HeaderComponent />
          <ProNumComponent totalData={totalData}/>
          <AlarmInfoComponent/>
          <div className={styles.alarmLevel}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/alarmLevelIcon.png')}
              />
              <span>告警级别分布</span>
              <div
                className={styles.timeIcon}
                onClick={() => this.changeStatus('level', 'month', monthStatusL, yearStatusL)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!monthStatusL
                    ? './images/monthSelOff.png'
                    : './images/monthSelOn.png')}
                />
              </div>
              <div
                className={styles.timeIcon2}
                onClick={() => this.changeStatus('level', 'year', yearStatusL, monthStatusL)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!yearStatusL ? './images/yearSelOff.png' : './images/yearSelOn.png')}
                />
              </div>
            </div>
            <ALarmLevelChart levData={levData}/>
          </div>
          <div className={styles.alarmLevel2}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/alarmTotilIcon.png')}
              />
              <span>告警总量趋势</span>
              <div
                className={styles.timeIcon}
                onClick={() => this.changeStatus('totil', 'month', monthStatusT, yearStatusT)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!monthStatusT
                    ? './images/monthSelOff.png'
                    : './images/monthSelOn.png')}
                />
              </div>
              <div
                className={styles.timeIcon2}
                onClick={() => this.changeStatus('totil', 'year', yearStatusT, monthStatusT)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!yearStatusT ? './images/yearSelOff.png' : './images/yearSelOn.png')}
                />
              </div>
            </div>
            <ALarmTotilChart totData={totData}/>
          </div>
          <div className={styles.alarmLevel2}>
            <div className={styles.modileTitle}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 5 }}
                src={require('./images/alarmAreaIcon.png')}
              />
              <span>告警区域分布TOP</span>
              <div
                style={{ marginLeft: 80 }}
                onClick={() => this.changeStatus('area', 'month', monthStatusA, yearStatusA)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!monthStatusA
                    ? './images/monthSelOff.png'
                    : './images/monthSelOn.png')}
                />
              </div>
              <div
                className={styles.timeIcon2}
                onClick={() => this.changeStatus('area', 'year', yearStatusA, monthStatusA)}
              >
                <img
                  alt=""
                  style={{ width: 30, height: 30, marginLeft: 5 }}
                  src={require(!yearStatusA ? './images/yearSelOff.png' : './images/yearSelOn.png')}
                />
              </div>
            </div>
            <ALarmAreaChart regData={regData}/>
          </div>
          <div className={styles.proDistribution}>
            <div className={styles.modileTitle}>
              <label>省份项目分布</label>
            </div>
            <ProjectDivisionChart proSumData={proSumData}/>
          </div>
        </div>
    );
  }
}

export default LeftPanelPage;
