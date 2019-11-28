import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/bar';

class ALarmConfirmationChart extends Component {
  componentDidMount(): void {
    this.initBarChart();
  }

  initBarChart = () => {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sat', 'Sun'],
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
          barWidth: '60%',
          stack: '确认情况',
          data: [30, 52, 200, 334, 390, 350, 220, 170, 234],
          itemStyle: {
            normal: {
              color: '#4860ff',
            },
          },
        },
        {
          name: '未确认',
          type: 'bar',
          barWidth: '60%',
          stack: '确认情况',
          data: [20, 52, 100, 54, 100, 30, 120, 70, 134],
          itemStyle: {
            normal: {
              color: '#0ae8ff',
            },
          },
        },
        {
          name: '告警总量',
          data: [50, 104, 300, 388, 590, 380, 330, 240, 364],
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
