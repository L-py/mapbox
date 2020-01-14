import React from 'react';
// @ts-ignore
import videojs from 'video.js';
// @ts-ignore
import videozhCN from 'video.js/dist/lang/zh-CN.json'; //播放器中文，不能使用.js文件
import 'video.js/dist/video-js.css';  //样式文件注意要加上
import 'videojs-flash';  //如果要播放RTMP要使用flash 需要先npm i videojs-flash

export default class VideoPlayer extends React.Component {
  
  componentDidMount(): void {
    // instantiate Video.js
    //这里的this.props是上级传进来的video的options
    console.log(this.props);
    this.player = videojs('videoJs', this.props, function onPlayerReady() {
      this.play();
      console.log('onPlayerReady', this)
    });
    videojs.addLanguage('zh-CN', videozhCN);
    // this.player.liveTracker.on('liveedgechange', () => {
      // console.log('跟随直播');
      // this.player.liveTracker.seekToLiveEdge();
    // });
  }

  componentWillReceiveProps(nextProps:  any) {
    console.log(nextProps);
    if (this.player) {
      this.player.dispose()
    }
    const id = nextProps.id;
    let video = document.createElement('video');
    video.setAttribute('id', id);
    video.setAttribute('class', 'video-js');
    let div  = document.getElementById(`videos${this.props.id}`);
    console.log(div);
    div.appendChild(video);
    if(document.getElementById(id)){
      console.log(111)
      this.player = videojs(id, this.props, function onPlayerReady() {
        console.log('onPlayerReady', this)
      });
      videojs.addLanguage('zh-CN', videozhCN);
    }
   
    // console.log(nextProps);
    // this.player.options=nextProps;
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div id={`videos${this.props.id}`}>
         <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js" id='videoJs'  autoplay="autoplay"></video>
         </div>
      </div>
    )
  }
}