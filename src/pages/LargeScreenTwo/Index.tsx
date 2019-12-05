import React, { Component } from 'react';
import BackgroundComponentMap from './components/BackgroundMap';
import LeftPanelPage from './LeftPanel';
import RightPanelPage from './RightPanel';
import MapPage from './MapPanel';
import styles from './Index.less';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { indexState } from './models/index';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  index: indexState,
  submitting: boolean
}
@connect(({ index, loading }: {
  index: indexState,
  loading: {
    effects: {
      [key: string]: boolean;
    };
  },
}) => ({
  index,
  submitting: loading.effects[''],
}))
class LargeScreenPage extends Component<Props> {

  componentDidMount(): void {
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1080;
    console.log(scaleX)
    document.getElementById('main-container').style.transform = `scale(${scaleX})`;
    document.getElementById('main-container').style.transformOrigin  = 'left top';
    document.getElementById('main-container').style.transition = 'all 0.1s linear';
    const scaX = 1 /scaleX;
    const scaY = 1 /scaleY;
    console.log(scaX);
    document.getElementById('map').style.transform = `scale(${scaX})`;
    document.getElementById('map').style.transformOrigin = 'left top';
    document.getElementById('map').style.transition = 'all 0.1s linear';
    document.getElementById('map').style.width = clientWidth + 'px';
    document.getElementById('map').style.height = clientHeight + 'px';
  }
  render() {
    return (
      <div className={styles.container} id="main-container">
        <MapPage />
        {/* <div className={styles.backGrounds}></div>
        <LeftPanelPage/>
        <RightPanelPage/> */}
      </div>
    );
  }
}

export default LargeScreenPage;
