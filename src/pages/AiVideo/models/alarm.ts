import { EffectsCommandMap, Model } from 'dva';
import { queryAlarmList } from '../services/alarm';

export interface AlarmState {
  alarmListData: {},
}

const alarm: Model = {
    namespace: 'alarm',
  
    state: {
        alarmListData: {},
    },
  
    effects: {
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
      
        initAlarmListData(state, { payload }: any): [] {
            return {
                ...state,
                alarmListData: payload,
            };
        },
    },
  };
  
  export default alarm;
  