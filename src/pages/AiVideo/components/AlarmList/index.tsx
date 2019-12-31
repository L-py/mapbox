import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
const url = require('url');

interface Props extends FormComponentProps {
  alarmListData:{},
}
class AlarmListComponent extends Component<Props> {

  componentWillmount(): void {
   
  }

  componentDidMount(): void {
   
  }

  render() {
    const { alarmListData }:any = this.props
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
        {
          alarmListData && alarmListData.rows.length>0?
            <div className={styles.alarmInfos}>
                {
                  alarmListData.rows.map((item:any) => (
                    <div className={styles.infos}>
                        <div className={styles.imageI}><img alt="" style={{width:'100%'}} src={url.resolve(item.alarmImages?item.alarmImages:'','')} /></div>
                        <div style={{width:480,transform:'scale(0.6)',transformOrigin:'top left',margin:'6px 5px'}}>{item.alarmCategory}&nbsp;&nbsp;&nbsp;&nbsp;{item.alarmDate}</div>
                        <div style={{transform:'scale(0.7)',transformOrigin:'top left',margin:'-12px 5px'}}>{item.alarmInfo}</div>
                    </div>
                  ))
                }
            </div>
        :null}
      </div> 
    );
  }
}

export default AlarmListComponent;
