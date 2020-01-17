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
  changeOperationType: void,
  devType: string,
  operationType: string,
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
    const param = {
      leftLowerlat:'9.16431047159709',
      leftLowerlot:'40.367865337386064',
      leftUpperLat:'60.43087008854596',
      leftUpperLot:'40.367865337386064',
      rightLowerlat:'9.16431047159709',
      rightLowerlot:'159.6921346626168',
      rightUpperLot:'159.6921346626168',
      rightUpperlat:'60.43087008854596',
    }
    const params = {monDevCategory:'01',...param};//摄像头
    const params1 = {monDevCategory:'02',...param};//传感器
    const params2 = {monDevCategory:'03',...param};//人
    const params3 = {monDevCategory:'04',...param};//车
    dispatch({
      type: 'index/fetchMondevicePointData',
      payload: params
    });
    dispatch({
      type: 'index/fetchMondevicePointData1',
      payload: params1
    });
    dispatch({
      type: 'index/fetchMondevicePointData2',
      payload: params2
    });
    dispatch({
      type: 'index/fetchMondevicePointData3',
      payload: params3
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

  fetchDevAttrInfo = (id:any) => {
    const { dispatch }:any = this.props;
    dispatch({
      type: 'index/fetchAttr',
      payload: {monDevIdent:id}
    });
  }

  render() {
    const { index, changeBounds, changeParams, changeOperationType, devType, devStatue, operationType } = this.props;
    const { proPointAllData, proPointData, moDevPointData, moDevPointData1, moDevPointData2, moDevPointData3, devAttrData } = index;
    const { areaCode } = this.state;
    const motheds = {
        fetchProjectInfo: this.fetchProjectInfo,
        fetchDevAttrInfo: this.fetchDevAttrInfo,
    }
    console.log(devAttrData);
    return (
        <div>
          <BackgroundComponentMap {...motheds} proPointAllData={proPointAllData} proPointData={proPointData} areaCode={areaCode}
          moDevPointData={moDevPointData} moDevPointData1={moDevPointData1} moDevPointData2={moDevPointData2} moDevPointData3={moDevPointData3} 
          changeBounds={changeBounds} changeParams={changeParams} changeOperationType={changeOperationType} devType={devType} devStatue={devStatue}
          operationType={operationType} devAttrData={devAttrData}/>
        </div>
    );
  }
}

export default MapPage;
