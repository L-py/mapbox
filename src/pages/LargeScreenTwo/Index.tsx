import React, { Component } from 'react';
import BackgroundComponentMap from './components/BackgroundMap';
import ALarmLevelChart from './components/AlarmLevel';
import ALarmTotilChart from './components/AlarmTotal';
import ALarmAreaChart from './components/AlarmArea';
import ALarmConfirmationChart from './components/AlarmConfirmation';
import ProjectDivisionChart from './components/ProjectDivision';
import ProjectTypePage from './components/ProjectType';
import DeviceFunChart from './components/DeviceFun';
import MapPointPage from './components/MapPoint';
import { Switch } from 'antd';
import HeaderComponent from './components/Header';
import styles from './Index.less';
import { symbol } from 'prop-types';
import urlConfig from '@/../config/url.config';
const url = require('url');
const bgColor = `rgba(0,0,0,0.6)`;

class LargeScreenPage extends Component {
  state = {
    yearStatusL: false,
    monthStatusL: false,
    yearStatusT: false,
    monthStatusT: false,
    yearStatusA: false,
    monthStatusA: false,
  };

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

  componentDidMount(): void {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //         var appDOM = document.getElementById('app')
    //         let appScaleX = clientWidth / 3840
    //         let appScaleY = clientHeight / 1080
    //         appDOM.style.transform = 'scale(' + appScaleX + ',' + appScaleY + ')'
    //         appDOM.style.transformOrigin = 'left top'
    //         appDOM.style.transition = 'all 0.1s linear'
    //         var appNode = document.getElementsByClassName('map_container')[0]
    //         let scaleX = 1 / appScaleX
    //         let scaleY = 1 / appScaleY
    //         appNode.style.transform = 'scale(' + scaleX + ',' + scaleY + ')'
    //         appNode.style.transformOrigin = 'left top'
    //         appNode.style.width = clientWidth + 'px'
    //         appNode.style.height = clientHeight + 'px'

    const scaleX = clientWidth / 1920;
    const scaleY = clientHeight / 1080;
    document.getElementById('main-container').style.transform = `scale(${scaleX},${scaleY})`;
    // document.getElementById('main-container').style.transformOrigin  = 'left top'
  }

  render() {
    const {
      yearStatusL,
      monthStatusL,
      yearStatusT,
      monthStatusT,
      yearStatusA,
      monthStatusA,
    } = this.state;
    return (
      <div className={styles.container} id="main-container">
        <BackgroundComponentMap />
        <div className={styles.backGrounds}></div>
        <div className={styles.content1}>
          <HeaderComponent />
          <div className={styles.proNums}>
            <div className={styles.nums}>
              <div className={styles.num}>20119</div>
              <div className={styles.text}>总项目数</div>
            </div>
            <div className={styles.nums2}>
              <div className={styles.num}>2019</div>
              <div className={styles.text}>总设备数</div>
            </div>
            <div className={styles.nums2}>
              <div className={styles.num}>219</div>
              <div className={styles.text}>总告警数</div>
            </div>
          </div>
          <div className={styles.alarm}>
            <img
              alt=""
              style={{ width: 20, height: 20, marginTop: 10, marginLeft: 200 }}
              src={require('./images/alarmIcon.png')}
            />
            <div className={styles.info}>一级告警:xxx-xxx项目&nbsp;摄像头&nbsp;预警</div>
          </div>
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
            <ALarmLevelChart />
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
            <ALarmTotilChart />
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
            <ALarmAreaChart />
          </div>
          <div className={styles.proDistribution}>
            <div className={styles.modileTitle}>
              <label>省份项目分布</label>
            </div>
            <ProjectDivisionChart />
          </div>
        </div>
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
            <DeviceFunChart />
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
            <ALarmConfirmationChart />
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
            <ProjectTypePage />
          </div>
          <div className={styles.proType}>
            <div className={styles.modileTitle}>
              <label>地图撒点控制</label>
              <Switch
                defaultChecked
                style={{ marginLeft: 160, marginTop: 10, width: 50 }}
                size={'small'}
              />
            </div>
            <MapPointPage />
          </div>
        </div>
      </div>
    );
  }
}

export default LargeScreenPage;
