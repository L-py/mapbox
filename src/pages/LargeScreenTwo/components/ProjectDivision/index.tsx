import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

class ProjectDivisionChart extends Component {
  componentDidMount(): void {
    this.initLineChart();
  }

  initLineChart = () => {
    const myChartL = echarts.init(document.getElementById('line3'));
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
          show: false,
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
          data: [220, 332, 401, 434, 490, 430, 420, 332, 401, 434, 390, 330, 420, 432, 412, 332],
          type: 'line',
          areaStyle: {
            color: '#149ab4',
          },
          symbol: 'none',
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3,
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
        <div id="line3" className={styles.lineChart3} />
        <div className={styles.provives}>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
          <div className={styles.pro}>
            <div className={styles.proName}>北京</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDivisionChart;
