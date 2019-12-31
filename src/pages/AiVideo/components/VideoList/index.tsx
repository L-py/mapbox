import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps{
  playListData: [];
  total: number;
  current: number;
  pageSize: number;
  setUrls: void;
  defScreenKey: any;
}

class VideoListComponent extends Component<Props> {
  state = {
    defKey: 0,
    total: this.props.total,
    current: this.props.current,
    pageSize: this.props.pageSize,
    urls: [],
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

  changeDefKey = (key:any,addRess:string) => {
    const { setUrls, defScreenKey }:any = this.props;
    const { urls }:any = this.state;
    this.setState({
      defKey: key
    })
    if(defScreenKey==1){
      let url = [];
      url.push(addRess);
      setUrls(url);
      // this.setState({
      //   urls: url
      // })
    }else if(defScreenKey==4){
      if(urls.length<4){
        urls.push(addRess);
        setUrls(urls);
      }
    }else if(defScreenKey==6){
      if(urls.length<6){
        urls.push(addRess);
        setUrls(urls);
      }
    }
  }

  render() {
    const { playListData } = this.props;
    const { current, pageSize, defKey } = this.state;
    let data:any=null;
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
                <div className={styles.vid}  onClick={() => this.changeDefKey(item.monitoDevicerId,item.rtmpAddress)}>
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
