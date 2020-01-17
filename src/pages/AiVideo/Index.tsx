import React, { Component } from 'react';
import SplitScreenVideoComponent from './components/SplitScreenVideo';
import VideoListComponent from './components/VideoList';
import AlarmListComponent from './components/AlarmList';
import AlarmPanelPage from './AlarmInfoPanel';
import styles from './Index.less';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { AiIndexState } from './models/index';
import cookie from 'react-cookies';
import {beFull} from 'be-full';

interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  aiIndex: AiIndexState,
  submitting: boolean
}

@connect(({ aiIndex, loading }: {
  aiIndex: AiIndexState,
  loading: {
    effects: {
      [key: string]: boolean;
    };
  },
}) => ({
  aiIndex,
  submitting: loading.effects[''],
}))
class AiVideoPage extends Component<Props> {
  state = {
    defScreenKey : 1,
    urls1: [],
    devName: [],
  }
  componentWillMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'aiIndex/initPlayList',
    });
    // dispatch({
    //   type: 'aiIndex/initAlarmList',
    // });
    // setInterval(()=>{
    //   dispatch({
    //     type: 'aiIndex/initAlarmList',
    //   });
    // },60000);
  }
  componentDidMount(): void {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scaleX = clientWidth / 960;
    const scaleY = clientHeight / 540;
    const scale = window.innerWidth / 960;
    document.getElementById('main-container').style.transform = `scale(${scaleX},${scaleY})`;
    document.getElementById('root').style.overflow = 'hidden';

    if(window.location.href.indexOf('?')!=-1){
      const token = window.location.href.split('?')[1].split('=')[1];
      cookie.save('token', token, { path: '/' });
    }
  }

  componentWillUnmount(): void {
    cookie.remove('token', { path: '/' })
  }
  componentWillReceiveProps(){

  }

  setUrls = (urls:any,names:any) => {
    this.setState({
      urls1: urls,
      devName: names,
    })
  }

  changeScreenKey = (key:number) => {
    this.setState({
      defScreenKey: key
    })
  }

  beFull = () => {
    beFull(document.getElementById('main-container'));
  }

  render() {
    const { aiIndex } = this.props
    const { playListData, alarmListData }:any = aiIndex; 
    const { urls1, defScreenKey, devName } = this.state;
    const motheds = {
      setUrls: this.setUrls,
    }
    const motheds1 = {
      changeScreenKey: this.changeScreenKey,
      setUrls: this.setUrls,
    }
    console.log(playListData);
    console.log(alarmListData);
    return (
      <div className={styles.container} id="main-container">
          <div>
              <SplitScreenVideoComponent urls={urls1} names={devName} {...motheds1} defScreenKey={defScreenKey}/>
          </div>
          <div>
              {playListData && playListData.length>0?
                <VideoListComponent playListData={playListData} total={playListData.length} current={1} pageSize={5}  {...motheds} defScreenKey={defScreenKey}/>
              :null}
          </div>
          <AlarmPanelPage/>
          <div className={styles.btn} onClick={() => this.beFull()}>全屏</div>
      </div>
    );
  }
}

export default AiVideoPage;