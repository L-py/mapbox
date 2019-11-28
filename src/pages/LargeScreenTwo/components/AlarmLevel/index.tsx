import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';

class ALarmLevelChart extends Component {
  componentDidMount(): void {
    this.initPieChart();
  }

  initPieChart = () => {
    const myChartL = echarts.init(document.getElementById('pie'));
    myChartL.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },

      series: [
        {
          name: '访问来源',
          type: 'pie',
          smooth: true,
          radius: ['55%', '70%'],
          avoidLabelOverlap: false,
          data: [
            { value: 335, name: '一级告警' },
            { value: 310, name: '二级告警' },
            { value: 234, name: '三级告警' },
            { value: 135, name: '四级告警' },
            { value: 1548, name: '五级告警' },
          ],
        },
      ],
      color: [
        //自定义的颜色
        '#44245b',
        '#8c55bc',
        '#aa4174',
        '#4775e9',
        '#02f0ff',
      ],
    });
  };

  render() {
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="pie" className={styles.pieChart} />
        <div className={styles.labels}>
          <div className={styles.lab1}>
            <div>1233</div>
            <div>一级告警</div>
          </div>
          <div className={styles.lab2}>
            <div>1233</div>
            <div>二级告警</div>
          </div>
          <div className={styles.lab3}>
            <div>1233</div>
            <div>三级告警</div>
          </div>
          <div className={styles.lab4}>
            <div>1233</div>
            <div>四级告警</div>
          </div>
          <div className={styles.lab5}>
            <div>1233</div>
            <div>五级告警</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ALarmLevelChart;
