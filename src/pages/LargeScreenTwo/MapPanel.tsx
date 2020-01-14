import React, { Component } from 'react';
import BackgroundComponentMap from './components/BackgroundMap';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction } from 'redux';
import { connect } from 'dva';
import { indexState } from './models/index';


interface Props extends FormComponentProps {
  dispatch: (args: AnyAction) => void,
  index: indexState,
  submitting: boolean,
  changeBounds: void,
  changeParams: void,
  devType: string,
  devStatue: boolean,
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
class MapPage extends Component<Props> {
  state = {
    areaCode:'',
  }
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/fetchProPointData',
      payload: {fetchAll:true}
    });
  }

  fetchProjectInfo = (code:any,level:string) => {
    const { dispatch, changeParams }:any = this.props;
    let params = {};
    this.setState({
      areaCode: code
    })
    if(level==='province'){
      // params = {provId:code,leftLowerlat:'',leftLowerlot:'',leftUpperLat:'',leftUpperLot:'',rightLowerlat:'',rightLowerlot:'',rightUpperLot:'',rightUpperlat:'',}
      params = {provId:code}
    }else if(level==='city' || level === 'district'){
      params = {cityId:code}
    }
    changeParams(params);
    dispatch({
        type: 'index/fetchProPointData',
        payload: {fetchData:params,fetchAll:false}
    });
  }

  render() {
    const { index, changeBounds, changeParams, devType, devStatue } = this.props;
    const { proPointAllData, moDevPointData, proPointData } = index;
    const { areaCode } = this.state;
    const motheds = {
        fetchProjectInfo: this.fetchProjectInfo,
    }
    return (
        <div>
          <BackgroundComponentMap {...motheds} proPointAllData={proPointAllData} proPointData={proPointData} areaCode={areaCode}
          moDevPointData={moDevPointData} changeBounds={changeBounds} changeParams={changeParams} devType={devType} devStatue={devStatue}/>
        </div>
    );
  }
}

export default MapPage;
