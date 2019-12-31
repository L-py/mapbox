import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/bar';

interface Props extends FormComponentProps{
  conData: [];
}

class ALarmConfirmationChart extends Component<Props> {
  componentDidMount(): void {
   
  }

  componentWillReceiveProps(nextProps:  any) {
    const { conData } = nextProps;
    if(conData && conData.length>0){
      this.initBarChart(conData);
    }
  }

  initBarChart = (conData:any) => {
    
    let xValue = [],onCon = [],unCon = [],num = [];
    if(conData.length>0){
      xValue=conData.map((item:any) => (item.name));
      onCon=conData.map((item:any) => (item.valueMap.confirmed));
      unCon=conData.map((item:any) => (item.valueMap.unconfirmed));
      num=conData.map((item:any) => (item.valueMap.total));
    }
    const myChartL = echarts.init(document.getElementById('bar'));
    myChartL.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: xValue,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', //更改坐标轴文字颜色
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', //更改坐标轴文字颜色
            },
          },
        },
      ],
      series: [
        {
          name: '已确认',
          type: 'bar',
          barWidth: '16%',
          stack: '确认情况',
          data: onCon,
          itemStyle: {
            // normal: {
            //   color: '#4860ff',
            // },
            normal: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#0ae8ff'},
                      {offset: 1, color: '#4860ff'}
                  ]
              )
            },
          },
        },
        {
          name: '未确认',
          type: 'bar',
          barWidth: '16%',
          stack: '确认情况',
          data: unCon,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#6decf9'},
                      {offset: 1, color: '#0ae8ff'}
                  ]
              )
            },
          },
        },
        {
          name: '告警总量',
          data:num,
          type: 'line',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#d4387c',
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
        <div id="bar" className={styles.barChart} />
      </div>
    );
  }
}

export default ALarmConfirmationChart;
