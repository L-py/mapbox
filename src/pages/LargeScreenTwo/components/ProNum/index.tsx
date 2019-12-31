import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps{
  totalData: [];
}

class ProNumComponent extends Component<Props> {

  componentDidMount(): void {
  
  }

  componentWillUnmount(): void {
  }

  render() {
    const { totalData }:any = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.proNums}>
            <div className={styles.nums}>
              <div className={styles.num}>{totalData && totalData.proTotal?totalData.proTotal:0}</div>
              <div className={styles.text}>总项目数</div>
            </div>
            <div className={styles.nums2}>
              <div className={styles.num}>{totalData && totalData.proDeviceTotal?totalData.proDeviceTotal:0}</div>
              <div className={styles.text}>总设备数</div>
            </div>
            <div className={styles.nums2}>
              <div className={styles.num}>{totalData && totalData.proAlarmTotal?totalData.proAlarmTotal:0}</div>
              <div className={styles.text}>总告警数</div>
            </div>
        </div>
      </div>
    );
  }
}

export default ProNumComponent;
