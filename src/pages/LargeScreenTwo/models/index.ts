import { EffectsCommandMap, Model } from 'dva';
import { queryAlarmConfirmStatis,queryAlarmLevelStatis,queryAlarmTotalStatis,queryAlarmRegionStatis,
  queryMonitorDevStatis,queryProTypeStatis,queryProSum,queryTotalStatis,queryMonitorDevNumber,queryProPointData } from '../services/index';

export interface indexState {
  conData: [],
  levData: [],
  totData: [],
  regData: [],
  monData: [],
  proTypeData: [],
  proSumData: [],
  totalData: [],
  monDevData: [],
  proPointAllData: {},
  proPointData: {},
}

const index: Model = {
    namespace: 'index',
  
    state: {
      conData: [],
      levData: [],
      totData: [],
      regData: [],
      monData: [],
      proTypeData: [],
      proSumData: [],
      totalData: [],
      monDevData: [],
      proPointAllData: {},
      proPointData: {},
    },
  
    effects: {
      * initAlarmConfirmStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryAlarmConfirmStatis, payload);
          yield put({
            type: 'initAlarmConfirm',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initAlarmLevelStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryAlarmLevelStatis, payload);
          yield put({
            type: 'initAlarmLevel',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initAlarmTotalStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryAlarmTotalStatis, payload);
          yield put({
            type: 'initAlarmTotal',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initAlarmRegionStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryAlarmRegionStatis, payload);
          yield put({
            type: 'initAlarmRegion',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initMonitorDevStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryMonitorDevStatis, payload);
          yield put({
            type: 'initMonitorDev',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initProTypeStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryProTypeStatis, payload);
          yield put({
            type: 'initProType',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initProSum({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryProSum, payload);
          yield put({
            type: 'initProSu',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initTotalStati({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryTotalStatis, payload);
          yield put({
            type: 'initTotal',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * initMonitorDevNumber({ payload }, { call, put }: EffectsCommandMap) {
        try{
          const response = yield call(queryMonitorDevNumber, payload);
          yield put({
            type: 'initMonitorDevNum',
            payload: response,
          });
        }catch(e){
          console.log(e)
        }
      },
      * fetchProPointData({ payload }, { call, put }: EffectsCommandMap) {
        try{
          let response=null;
          if(payload.fetchAll){
            response = yield call(queryProPointData, {});
            yield put({
              type: 'initProPointAllData',
              payload: response,
            });
          }else{
            response = yield call(queryProPointData, payload.fetchData);
            yield put({
              type: 'initProPointData',
              payload: response,
            });
          }
        }catch(e){
          console.log(e)
        }
      },
      
    },
  
    reducers: {
        initAlarmConfirm(state, { payload }: any): [] {
            return {
                ...state,
                conData: payload,
            };
        },
        initAlarmLevel(state, { payload }: any): [] {
          return {
              ...state,
              levData: payload,
          };
        },
        initAlarmTotal(state, { payload }: any): [] {
          return {
              ...state,
              totData: payload,
          };
        },
        initAlarmRegion(state, { payload }: any): [] {
          return {
              ...state,
              regData: payload,
          };
        },
        initMonitorDev(state, { payload }: any): [] {
          return {
              ...state,
              monData: payload,
          };
        },
        initProType(state, { payload }: any): [] {
          return {
              ...state,
              proTypeData: payload,
          };
        },
        initProSu(state, { payload }: any): [] {
          return {
              ...state,
              proSumData: payload,
          };
        },
        initTotal(state, { payload }: any): [] {
          return {
              ...state,
              totalData: payload,
          };
        },
        initMonitorDevNum(state, { payload }: any): [] {
          return {
              ...state,
              monDevData: payload,
          };
        },
        initProPointAllData(state, { payload }: any): [] {
          return {
              ...state,
              proPointAllData: payload,
          };
        },
        initProPointData(state, { payload }: any): [] {
          return {
              ...state,
              proPointData: payload,
          };
        },
    },
  };
  
  export default index;
  