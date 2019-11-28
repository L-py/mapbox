import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';

class ALarmTotalChart extends Component {
  componentDidMount(): void {
    this.initLineChart();
  }

  initLineChart = () => {
    const myChartL = echarts.init(document.getElementById('line'));
    myChartL.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1',
          '3',
          '5',
          '7',
          '9',
          '11',
          '13',
          '15',
          '17',
          '19',
          '21',
          '23',
          '25',
          '27',
          '29',
          '30',
        ],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff', //更改坐标轴文字颜色
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ',
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
          data: [220, 332, 401, 434, 490, 430, 420, 332, 401, 434, 390, 330, 420, 432, 412, 432],
          type: 'line',
          smooth: true,
          areaStyle: {
            color: '#149ab4',
          },
          symbol: 'none',
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                color: '#38c1f2',
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
        <div id="line" className={styles.lineChart} />
      </div>
    );
  }
}

export default ALarmTotalChart;
