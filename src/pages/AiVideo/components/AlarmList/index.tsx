import React, { Component } from 'react';
import { Divider } from 'antd';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
import { Form, Modal } from 'antd';
const url = require('url');

interface Props extends FormComponentProps {
  alarmListData:{},
}

const ViewImageForm = Form.create()((props: any) => {
  const { viewImageVisible, handleViewImageVisible, imgUrl }:any = props;
  return (
    <Modal
      destroyOnClose
      title="告警详情图"
      width={1000}
      footer={false}
      onCancel={() => handleViewImageVisible()}
      visible={viewImageVisible}
    >
      {imgUrl && imgUrl!=='' ? <img alt="" style={{width:'100%'}} src={url.resolve(imgUrl,'')} /> : null}
    </Modal>
  );
});


class AlarmListComponent extends Component<Props> {
  state ={
    viewImageVisible: false,
    imgUrl: '',
  }
  componentWillmount(): void {
   
  }

  componentDidMount(): void {
   
  }

  handleViewImageVisible = (flag: boolean, urls?: string): void  => {
    this.setState({
      viewImageVisible: !!flag,
      imgUrl: urls || '',
    });
  };

  render() {
    const { alarmListData }:any = this.props;
    const { viewImageVisible, imgUrl }: any = this.state;
    const parentMethods = {
      handleViewImageVisible: this.handleViewImageVisible,
    };
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
                        <div className={styles.imageI}>
                          <div className={styles.icon} onClick={() => this.handleViewImageVisible(true, item.alarmImages?item.alarmImages:'')}></div>
                          <img alt="" style={{width:'100%',marginTop:-23,zIndex:1}} src={url.resolve(item.alarmImages?item.alarmImages:'','')} />
                        </div>
                        <div style={{width:480,transform:'scale(0.6)',transformOrigin:'top left',margin:'6px 5px'}}>{item.alarmCategory}&nbsp;&nbsp;&nbsp;&nbsp;{item.alarmDate}</div>
                        <div style={{transform:'scale(0.7)',transformOrigin:'top left',margin:'-12px 5px'}}>{item.alarmInfo}</div>
                    </div>
                  ))
                }
            </div>
        :null}
        <ViewImageForm {...parentMethods} imgUrl={imgUrl} viewImageVisible={viewImageVisible} />
      </div> 
    );
  }
}

export default AlarmListComponent;
