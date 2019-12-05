import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps{
  monDevData: [];
}

class MapPointPage extends Component<Props> {
  componentDidMount(): void {}

  render() {
    const { monDevData } = this.props;
    console.log(monDevData);
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div className={styles.content}>
          <div className={styles.ss1}>0</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/car.png')}
          />
          <div className={styles.ss2}>车辆</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>{monDevData.length}</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/video.png')}
          />
          <div className={styles.ss2}>摄像头</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>0</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/person.png')}
          />
          <div className={styles.ss2}>人员</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>0</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/other.png')}
          />
          <div className={styles.ss2}>传感器</div>
        </div>
      </div>
    );
  }
}

export default MapPointPage;
