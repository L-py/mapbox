import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';

class ALarmAreaChart extends Component {
  componentDidMount(): void {
    this.initLineChart();
  }

  initLineChart = () => {
    const myChartL = echarts.init(document.getElementById('linea'));
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
        data: ['无双镇', '无双镇', '无双镇', '无双镇', '无双镇', '无双镇', '无双镇', '无双镇'],
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
          data: [120, 132, 101, 134, 90, 230, 210, 160],
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
          data: [220, 182, 191, 234, 290, 330, 310, 210],
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
          data: [150, 232, 201, 154, 190, 330, 410, 310],
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
          data: [320, 332, 301, 334, 390, 330, 320, 280],
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
          data: [220, 232, 201, 234, 290, 230, 220, 190],
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
