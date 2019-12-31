import React, { Component } from 'react';
import moment from 'moment';
import styles from './index.less';

class HeaderComponent extends Component {
  timeInterval: any;

  state = {
    currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  };

  componentDidMount(): void {
    this.timeInterval = setInterval(() => {
      this.setState({
        currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timeInterval);
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.times}>{currentTime}</div>
          <div className={styles.search}>
              <img
                alt=""
                style={{ width: 20, height: 20, marginTop: 8, marginLeft: 10 }}
                src={require('../../images/search.png')}
              />
              <div className={styles.info}>请输入项目</div>
              <div className={styles.sear}>搜索</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
