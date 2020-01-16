import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps{
  monDevData: [];
  onSelect: void;
  allStatus: boolean;
}

class MapPointPage extends Component<Props> {
  state = {
    carStatus: false,
    videoStatus: false,
    personStatus: false,
    sensorStatus: false,
  };

  componentDidMount(): void {

  }

  componentWillReceiveProps(nextProps:  any) {
    const { allStatus }:any = nextProps;
    // this.setState({
    //   carStatus: allStatus,
    //   videoStatus: allStatus,
    //   personStatus: allStatus,
    //   sensorStatus: allStatus,
    // })
  }

  changeStatus = (type:string,status:boolean) => {
    const { onSelect }:any = this.props;
    if(type==='car'){
      onSelect('04',!status);
      this.setState({
        carStatus: !status,
      })
    }else if(type==='video'){
      onSelect('01',!status);
      this.setState({
        videoStatus: !status,
      })
    }else if(type==='person'){
      onSelect('03',!status);
      this.setState({
        personStatus: !status,
      })
    }else if(type==='sensor'){
      onSelect('02',!status);
      this.setState({
        sensorStatus: !status,
      })
    }
  }

  render() {
    const { monDevData, allStatus }:any = this.props;
    const {
      carStatus,
      videoStatus,
      personStatus,
      sensorStatus,
    } = this.state;
    let carValue =0,videoValue=0,personValue=0,sensorValue=0;
    monDevData.map((item:any) => {
      if(item.name=='01'){
        videoValue= item.value
      }else if(item.name=='02'){
        sensorValue= item.value
      }else if(item.name=='03'){
        personValue= item.value
      }else if(item.name=='04'){
        carValue= item.value
      }
    })
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div className={styles.content} onClick={() => this.changeStatus('car',carStatus)}>
          <div className={styles.ss1}>{carValue?carValue:0}</div>
          <img
            alt=""
            style={{ width: 90, height: 90, marginTop: -10 }}
            src={require(!carStatus && !allStatus
              ? '../../images/carOff.png'
              : '../../images/carOn.png')}
          />
          <div className={styles.ss2}>车辆</div>
        </div>
        <div className={styles.content} onClick={() => this.changeStatus('video',videoStatus)}>
          <div className={styles.ss1}>{videoValue?videoValue:0}</div>
          <img
            alt=""
            style={{ width: 90, height: 90, marginTop: -10 }}
            src={require(!videoStatus && !allStatus
              ? '../../images/videoOff.png'
              : '../../images/videoOn.png')}
          />
          <div className={styles.ss2}>摄像头</div>
        </div>
        <div className={styles.content} onClick={() => this.changeStatus('person',personStatus)}>
          <div className={styles.ss1}>{personValue?personValue:0}</div>
          <img
            alt=""
            style={{ width: 90, height: 90, marginTop: -10 }}
            src={require(!personStatus && !allStatus
              ? '../../images/personOff.png'
              : '../../images/personOn.png')}
          />
          <div className={styles.ss2}>机器人</div>
        </div>
        <div className={styles.content} onClick={() => this.changeStatus('sensor',sensorStatus)}>
          <div className={styles.ss1}>{sensorValue?sensorValue:0}</div>
          <img
            alt=""
            style={{ width: 90, height: 90, marginTop: -10 }}
            src={require(!sensorStatus && !allStatus
              ? '../../images/sensorOff.png'
              : '../../images/sensorOn.png')}
          />
          <div className={styles.ss2}>传感器</div>
        </div>
      </div>
    );
  }
}

export default MapPointPage;
