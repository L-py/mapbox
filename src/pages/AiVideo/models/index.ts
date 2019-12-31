import { EffectsCommandMap, Model } from 'dva';
import { queryPlayList,queryAlarmList } from '../services/index';

export interface AiIndexState {
  playListData: [],
  alarmListData: {},
}

const aiIndex: Model = {
    namespace: 'aiIndex',
  
    state: {
        playListData: [],
        alarmListData: {},
    },
  
    effects: {
      * initPlayList({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryPlayList, payload);
          yield put({
            type: 'initPlayListData',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initAlarmList({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryAlarmList, payload);
          yield put({
            type: 'initAlarmListData',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
    },
  
    reducers: {
        initPlayListData(state, { payload }: any): [] {
            return {
                ...state,
                playListData: payload,
            };
        },
        initAlarmListData(state, { payload }: any): [] {
            return {
                ...state,
                alarmListData: payload,
            };
        },
    },
  };
  
  export default aiIndex;
  