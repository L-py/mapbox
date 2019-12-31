import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';

interface Props extends FormComponentProps{
  regData: [];
}

class ALarmAreaChart extends Component<Props> {
  componentDidMount(): void {
  }
  componentWillReceiveProps(nextProps:  any) {
    const { regData } = nextProps;
    if(regData && regData.length>0){
      this.initLineChart(regData);
    }
  }
  initLineChart = (regData:any) => {
    const myChartL = echarts.init(document.getElementById('linea'));
    let xValue =[], num1=[], num2=[], num3=[], num4=[], num5=[];
    if(regData.length>0){
      xValue= regData.map((item:any) => (item.name));
      num1= regData.map((item:any) => (item.valueMap.一级告警?item.valueMap.一级告警:0));
      num2= regData.map((item:any) => (item.valueMap.二级告警?item.valueMap.二级告警:0));
      num3= regData.map((item:any) => (item.valueMap.三级告警?item.valueMap.三级告警:0));
      num4= regData.map((item:any) => (item.valueMap.四级告警?item.valueMap.四级告警:0));
      num5= regData.map((item:any) => (item.valueMap.五级告警?item.valueMap.五级告警:0));
    }
    myChartL.setOption({
      title: {
        text: '折线图堆叠',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        left: 'center',
        data: [
          {
            name: '一级告警',
            textStyle: {
              color: '#f6b120',
            },
          },
          {
            name: '二级告警',
            textStyle: {
              color: '#e56195',
            },
          },
          {
            name: '三级告警',
            textStyle: {
              color: '#43abe0',
            },
          },
          {
            name: '四级告警',
            textStyle: {
              color: '#a17bf8',
            },
          },
          {
            name: '五级告警',
            textStyle: {
              color: '#bda2fb',
            },
          },
        ],
        width: 250,
        height: 10,
        color: '#fff',
        tooltip: {
          show: true,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xValue,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff', //更改坐标轴文字颜色
          },
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(255,255,255,0.3)', //更改坐标轴文字颜色
          },
        },
      },
      series: [
        {
          name: '一级告警',
          type: 'line',
          stack: '总量',
          data: num1,
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#f6b120',
              },
            },
          },
        },
        {
          name: '二级告警',
          type: 'line',
          stack: '总量',
          data: num2,
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#e56195',
              },
            },
          },
        },
        {
          name: '三级告警',
          type: 'line',
          stack: '总量',
          data: num3,
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#43abe0',
              },
            },
          },
        },
        {
          name: '四级告警',
          type: 'line',
          stack: '总量',
          data: num4,
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#a17bf8',
              },
            },
          },
        },
        {
          name: '五级告警',
          type: 'line',
          stack: '总量',
          data: num5,
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#bda2fb',
              },
            },
          },
        },
      ],
    });
  };

  render() {
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="linea" className={styles.lineCharta} />
      </div>
    );
  }
}

export default ALarmAreaChart;
