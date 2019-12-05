import React, { Component } from 'react';
import styles from './index.less';

class AlarmInfoComponent extends Component {

  componentDidMount(): void {
  
  }

  componentWillUnmount(): void {
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.alarm}>
            <img
              alt=""
              style={{ width: 20, height: 20, marginTop: 10, marginLeft: 200 }}
              src={require('../../images/alarmIcon.png')}
            />
            <div className={styles.info}>一级告警:xxx-xxx项目&nbsp;摄像头&nbsp;预警</div>
        </div>
      </div>
    );
  }
}

export default AlarmInfoComponent;
