import React, { Component } from 'react';
import styles from './index.less';

class MapPointPage extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div className={styles.content}>
          <div className={styles.ss1}>10</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/car.png')}
          />
          <div className={styles.ss2}>车辆</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>320</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/video.png')}
          />
          <div className={styles.ss2}>摄像头</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>20</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/person.png')}
          />
          <div className={styles.ss2}>人员</div>
        </div>
        <div className={styles.content}>
          <div className={styles.ss1}>20</div>
          <img
            alt=""
            style={{ width: 80, height: 100, marginTop: -10 }}
            src={require('../../images/other.png')}
          />
          <div className={styles.ss2}>人员</div>
        </div>
      </div>
    );
  }
}

export default MapPointPage;
