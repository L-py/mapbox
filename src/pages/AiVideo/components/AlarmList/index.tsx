import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './index.less';

class AlarmListComponent extends Component {

  componentDidMount(): void {
   
  }

  componentWillUnmount(): void {
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.headerInfo}>
                实时告警信息
            </div>
        </div>
        <div className={styles.control}>
            <a>当前</a>
            <Divider type="vertical" />
            <a>全部</a>
        </div>
        <div className={styles.alarmInfos}>
            <div className={styles.infos}>
                <div className={styles.imageI}></div>
                <div style={{width:480,transform:'scale(0.6)',transformOrigin:'top left',margin:'6px 5px'}}>万达广场01号枪机&nbsp;&nbsp;&nbsp;&nbsp;2019-11-17 12:25:00</div>
                <div style={{transform:'scale(0.7)',transformOrigin:'top left',margin:'-12px 5px'}}>安全帽识别告警</div>
            </div>
            <div className={styles.infos}>
                <div className={styles.imageI}></div>
                <div style={{width:480,transform:'scale(0.6)',transformOrigin:'top left',margin:'6px 5px'}}>万达广场01号枪机&nbsp;&nbsp;&nbsp;&nbsp;2019-11-17 12:25:00</div>
                <div style={{transform:'scale(0.7)',transformOrigin:'top left',margin:'-12px 5px'}}>安全帽识别告警</div>
            </div>
            <div className={styles.infos}>
                <div className={styles.imageI}></div>
                <div style={{width:480,transform:'scale(0.6)',transformOrigin:'top left',margin:'6px 5px'}}>万达广场01号枪机&nbsp;&nbsp;&nbsp;&nbsp;2019-11-17 12:25:00</div>
                <div style={{transform:'scale(0.7)',transformOrigin:'top left',margin:'-12px 5px'}}>安全帽识别告警</div>
            </div>
        </div>
      </div>
    );
  }
}

export default AlarmListComponent;
