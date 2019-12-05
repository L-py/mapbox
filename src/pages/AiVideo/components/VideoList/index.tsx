import React, { Component } from 'react';
import styles from './index.less';

class VideoListComponent extends Component {

  componentDidMount(): void {
   
  }

  componentWillUnmount(): void {
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.videos}>
          <div className={styles.left}>
            <div className={styles.leftCon}>

            </div>
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
          </div>
          <div className={styles.video}>
            <div className={styles.vid}></div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightCon}>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoListComponent;
