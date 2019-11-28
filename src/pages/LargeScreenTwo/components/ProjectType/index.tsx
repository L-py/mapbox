import React, { Component } from 'react';
import styles from './index.less';
import { Progress } from 'antd';

class ProjectTypePage extends Component {
  componentDidMount(): void {}

  render() {
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div className={styles.content}>
          <div className={styles.con}>
            1&nbsp;&nbsp;
            <div className={styles.proName}>化工工程</div>
            <div style={{ width: 220 }}>
              <Progress percent={75} size="small" strokeColor={'#d33974'} />
            </div>
          </div>
          <div className={styles.con}>
            2&nbsp;&nbsp;
            <div className={styles.proName}>海洋石油工程</div>
            <div style={{ width: 220 }}>
              <Progress percent={60} size="small" strokeColor={'#e15e93'} />
            </div>
          </div>
          <div className={styles.con}>
            3&nbsp;&nbsp;
            <div className={styles.proName}>市政工程</div>
            <div style={{ width: 220 }}>
              <Progress percent={50} size="small" strokeColor={'#204fff'} />
            </div>
          </div>
          <div className={styles.con}>
            4&nbsp;&nbsp;
            <div className={styles.proName}>石化工程</div>
            <div style={{ width: 220 }}>
              <Progress percent={40} size="small" strokeColor={'#07b9ff'} />
            </div>
          </div>
          <div className={styles.con}>
            5&nbsp;&nbsp;
            <div className={styles.proName}>天然气工程</div>
            <div style={{ width: 220 }}>
              <Progress percent={30} size="small" strokeColor={'#07b9ff'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTypePage;
