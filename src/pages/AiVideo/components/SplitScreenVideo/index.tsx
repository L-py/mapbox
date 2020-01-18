import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
import VideoPlayer from '../VideoPlayer/videoPlayer';
import { url } from 'inspector';

interface Props extends FormComponentProps{
  urls: [],
  names: [],
  changeScreenKey: void,
  setUrls: void,
  defScreenKey: number,
}
class SplitScreenVideoComponent extends Component<Props> {
  componentDidMount(): void {
   
  }

  componentWillUnmount(): void {

  }

  changeDefKey = (key: number) => {
    const { changeScreenKey, setUrls }:any = this.props;
    console.log(key);
    changeScreenKey(key);
    setUrls([],[]);
  }
  beFull = () => {
    window.open(window.location.href)
    // beFull(document.getElementById('main-container'));
  }
  render() {
    const { defScreenKey } = this.props;
    const { urls, names }:any = this.props;
    console.log(urls);
    let option = {};
    let option0 = {}, option1 = {}, option2 = {}, option3 = {};
    let optionS0 = {}, optionS1 = {}, optionS2 = {}, optionS3 = {}, optionS4 = {}, optionS5 = {};
    if(urls.length>0){
      if(defScreenKey==1){
        option={
          id: 'videoJs0',
          autoplay: true,  //自动播放
          language: 'zh-CN', 
          preload: 'auto',  //自动加载
          errorDisplay: true,  //错误展示
          width: 600,  //宽
          height: 350,  //高
          fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
          // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
          // textTrackDisplay: false,  // 不渲染字幕相关DOM
          userActions: {
            hotkeys: true  //是否支持热键
          },
          sources: [
            {
              src: urls[0],
              // src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
              type: "rtmp/flv",  //类型可加可不加，目前未看到影响
              // type: 'video/mp4',
            }
          ]
        }
      }else if(defScreenKey==4){
        if(urls.length>0){
          option0={
            id: 'videoJs0',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[0],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>1){
          option1={
            id: 'videoJs1',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[1],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>2){
          option2={
            id: 'videoJs2',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[2],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>3){
          option3={
            id: 'videoJs3',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[3],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
      }else if(defScreenKey==6){
        if(urls.length>0){
          optionS0={
            id: 'videoJs0',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[0],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>1){
          optionS1={
            id: 'videoJs1',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[1],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>2){
          optionS2={
            id: 'videoJs2',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[2],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>3){
          optionS3={
            id: 'videoJs3',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[3],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>4){
          optionS4={
            id: 'videoJs4',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[4],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
        if(urls.length>5){
          optionS5={
            id: 'videoJs5',
            autoplay: true,  //自动播放
            language: 'zh-CN', 
            preload: 'auto',  //自动加载
            errorDisplay: true,  //错误展示
            fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
            // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
            // textTrackDisplay: false,  // 不渲染字幕相关DOM
            userActions: {
              hotkeys: true  //是否支持热键
            },
            sources: [
              {
                src: urls[5],
                type: "rtmp/flv",  //类型可加可不加，目前未看到影响
                // type: 'video/mp4',
              }
            ]
          }
        }
      }
    }
    console.log(option);
    return (
      <div className={styles.container}>
        <div className={styles.header} onClick={() => this.beFull()}>
          <div className={styles.headerInfo}>
            摄像头周界布控视频
          </div>
        </div>
        <div className={styles.control}>
          <div className={styles.con1} onClick={() => this.changeDefKey(1)}></div>
          <div className={styles.con2} onClick={() => this.changeDefKey(4)}></div>
          <div className={styles.con3} onClick={() => this.changeDefKey(6)}></div>
        </div>
        {
          defScreenKey===1?
          <div className={styles.video1}>
            { urls.length>0?
              <VideoPlayer {...option} />
            :null}
            <div className={styles.header1}>{names[0]}</div>
          </div>
          :defScreenKey===4?
          <div className={styles.video4}>
            <div className={styles.v1}>
              {urls.length>0?
                <VideoPlayer {...option0} />
              :null}
               <div className={styles.header2}>{names[0]}</div>
            </div>
            <div className={styles.v1}>
              {urls.length>1?
                <VideoPlayer {...option1} />
              :null}
               <div className={styles.header2}>{names[1]}</div>
            </div>
            <div className={styles.v1}>
              {urls.length>2?
                <VideoPlayer {...option2} />
              :null}
               <div className={styles.header2}>{names[2]}</div>
            </div>
            <div className={styles.v1}>
              {urls.length>3?
                <VideoPlayer {...option3} />
              :null}
               <div className={styles.header2}>{names[3]}</div>
            </div>
          </div>
          :defScreenKey===6?
          <div className={styles.video6}>
            <div className={styles.v1}>
              {urls.length>0?
                <VideoPlayer {...optionS0} />
              :null}
              <div className={styles.header3}>{names[0]}</div>
            </div>
            <div className={styles.v2}>
              {urls.length>1?
                <VideoPlayer {...optionS1} />
              :null}
              <div className={styles.header4}>{names[1]}</div>
            </div>
            <div className={styles.v3}>
              {urls.length>3?
                <VideoPlayer {...optionS3} />
              :null}
              <div className={styles.header4}>{names[2]}</div>
            </div>
            <div className={styles.v4}>
              {urls.length>4?
                <VideoPlayer {...optionS4} />
              :null}
              <div className={styles.header4}>{names[3]}</div>
            </div>
            <div className={styles.v4}>
              {urls.length>5?
                <VideoPlayer {...optionS5} />
              :null}
              <div className={styles.header4}>{names[4]}</div>
            </div>
            <div className={styles.v5}>
              {urls.length>2?
                <VideoPlayer {...optionS2} />
              :null}
              <div className={styles.header4}>{names[5]}</div>
            </div>
          </div>
        :null}
        
      </div>
    );
  }
}

export default SplitScreenVideoComponent;
