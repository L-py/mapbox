import React, { Component } from 'react';
import SplitScreenVideoComponent from './components/SplitScreenVideo';
import VideoListComponent from './components/VideoList';
import AlarmListComponent from './components/AlarmList';
import styles from './Index.less';

class AiVideoPage extends Component {
  componentDidMount(): void {
    const scale = window.innerWidth / 960;
    document.getElementById('main-container').style.transform = `scale(${scale})`;
    document.getElementById('root').style.overflow = 'hidden';
  }

  componentWillReceiveProps(){
  }


  render() {
    return (
    <div className={styles.container} id="main-container">
        <div style={{position:'absolute'}}>
            <SplitScreenVideoComponent/>
        </div>
        <div style={{position:'absolute'}}>
            <VideoListComponent/>
        </div>
        <div style={{position:'absolute'}}>
            <AlarmListComponent/>
        </div>
    </div>
    );
  }
}

export default AiVideoPage;
