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
    const scale = window.innerWidth / 960;
    document.getElementById('main-container').style.transform = `scale(${scale})`;
    document.getElementById('root').style.overflow = 'hidden';
  }

  componentWillReceiveProps(){

  }

  setUrls = (urls:[]) => {
    this.setState({
      urls1: urls
    })
  }

  changeScreenKey = (key:number) => {
    this.setState({
      defScreenKey: key
    })
  }

  render() {
    const { aiIndex } = this.props
    const { playListData, alarmListData }:any = aiIndex; 
    const { urls1, defScreenKey } = this.state;
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
              <SplitScreenVideoComponent urls={urls1} {...motheds1} defScreenKey={defScreenKey}/>
          </div>
          <div>
              {playListData && playListData.length>0?
                <VideoListComponent playListData={playListData} total={playListData.length} current={1} pageSize={5}  {...motheds} defScreenKey={defScreenKey}/>
              :null}
          </div>
          <AlarmPanelPage/>
      </div>
    );
  }
}

export default AiVideoPage;
