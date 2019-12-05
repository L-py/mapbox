import React, { Component } from 'react';
import BackgroundComponentMap from './components/BackgroundMap';
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
class MapPage extends Component<Props> {
 

  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/fetchProPointData',
      payload: {fetchAll:true}
    });
  }

  fetchProjectInfo = (code:any,level:string) => {
    const { dispatch } = this.props;
    let params = {};
    if(level==='province'){
      params = {provId:code}
    }else if(level==='city'){
      params = {cityId:code}
    }
    dispatch({
        type: 'index/fetchProPointData',
        payload: {fetchData:params,fetchAll:false}
    });
  }

  render() {
    const { index } = this.props;
    const { proPointAllData } = index;
    const motheds = {
        fetchProjectInfo: this.fetchProjectInfo
    }
    return (
        <div>
          <BackgroundComponentMap {...motheds} proPointAllData={proPointAllData}/>
        </div>
    );
  }
}

export default MapPage;
