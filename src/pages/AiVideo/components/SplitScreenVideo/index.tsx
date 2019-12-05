import React, { Component } from 'react';
import styles from './index.less';

class SplitScreenVideoComponent extends Component {

  componentDidMount(): void {
   
  }

  componentWillUnmount(): void {
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            摄像GDA345436周界布控视频
          </div>
        </div>
        <div className={styles.control}>
          <div className={styles.con1}></div>
          <div className={styles.con2}></div>
          <div className={styles.con3}></div>
        </div>
        <div className={styles.video1}>
          
        </div>
      </div>
    );
  }
}

export default SplitScreenVideoComponent;
