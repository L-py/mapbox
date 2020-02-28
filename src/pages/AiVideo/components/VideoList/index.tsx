import React, { Component } from 'react';
import styles from './index.less';
import { message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
const url = require('url');

interface Props extends FormComponentProps{
  playListData: [];
  total: number;
  current: number;
  pageSize: number;
  setUrls: void;
  defScreenKey: any;
  ids : [];
  urls: [];
  names: [];
}

class VideoListComponent extends Component<Props> {
  state = {
    defKey: 0,
    total: this.props.total,
    current: this.props.current,
    pageSize: this.props.pageSize,
    
  }

  componentDidMount(): void {
  }

  componentWillUnmount(): void {
  }

  curAdd = () => {
    const { current, pageSize, total } = this.state;
    if(current<Math.ceil(total / pageSize)){
      this.setState({
        current: current+1
      })
    }
  }

  curRed = () => {
    const { current } = this.state;
    if(current>1){
      this.setState({
        current: current-1
      })
    }
  }

  changeDefKey = (key:any,addRess:string,deviceName:string) => {
    const { setUrls, defScreenKey, ids, urls, names }:any = this.props;
    // const { ids, urls, names }:any = this.state;
    this.setState({
      defKey: key
    })
    if(defScreenKey==1){
      ids.indexOf(key) === -1 ? ids.push(key) && urls.push(addRess) && names.push(deviceName) : message.warning('此设备已选，请选择其他设备查看监控！');
      setUrls(ids.slice(-1),urls.slice(-1),names.slice(-1));
    }else if(defScreenKey==4){
      if(urls.length<4){
        ids.indexOf(key) === -1 ? ids.push(key) && urls.push(addRess) && names.push(deviceName) : message.warning('此设备已选，请选择其他设备查看监控！');
        setUrls(ids,urls,names);
      }else{
        ids.indexOf(key) === -1 ? ids.push(key) && urls.push(addRess) && names.push(deviceName) : message.warning('此设备已选，请选择其他设备查看监控！');
        setUrls(ids.slice(-4),urls.slice(-4),names.slice(-4));
      }
    }else if(defScreenKey==6){
      if(urls.length<6){
        ids.indexOf(key) === -1 ? ids.push(key) && urls.push(addRess) && names.push(deviceName) : message.warning('此设备已选，请选择其他设备查看监控！');
        setUrls(ids,urls,names);
      }else{
        ids.indexOf(key) === -1 ? ids.push(key) && urls.push(addRess) && names.push(deviceName) : message.warning('此设备已选，请选择其他设备查看监控！');
        setUrls(ids.slice(-6),urls.slice(-6),names.slice(-6));
      }
    }
  }

  render() {
    const { playListData } = this.props;
    const { current, pageSize, defKey } = this.state;
    let data:any=null;
    console.log(playListData);
    if(playListData && playListData.length>0){
      data = playListData.slice((current-1)*pageSize,(current-1)*pageSize+pageSize);
    }
    return (
      <div className={styles.container}>
        <div className={styles.videos}>
          <div className={styles.left}>
            <div className={styles.leftCon} onClick={() => this.curRed()}></div>
          </div>
          {
            data.map((item:any) => (
              <div className={styles.video}>
                <div  className={defKey==item.monitoDevicerId?styles.bg:styles.bg1}>
                <div className={styles.vid} style={{background:`url(${url.resolve(item.pic?item.pic:'','')})`,backgroundSize: 'cover'}} onClick={() => this.changeDefKey(item.monitoDevicerId,item.rtmpAddress,item.monitorDeviceName)}>
                  {item.monitorDeviceName}
                </div>
                </div>
              </div>
            ))
          }
          {/* <div className={styles.video}>
            <div className={styles.vid}></div>
          </div>
          <div className={styles.video}>
            <div className={styles.vid}></div>
          </div>
          <div className={styles.video}>
            <div className={styles.vid}></div>
          </div>
          <div className={styles.video}>
            <div className={styles.vid}></div>
          </div>
          <div className={styles.video}>
            <div className={styles.vid}></div>
          </div> */}
          <div className={styles.right}>
            <div className={styles.rightCon} onClick={() => this.curAdd()}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoListComponent;
