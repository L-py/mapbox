import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/line';

interface Props extends FormComponentProps{
  totData: [];
}

class ALarmTotalChart extends Component<Props> {
  componentDidMount(): void {
  }

  componentWillReceiveProps(nextProps:  any) {
    const { totData } = nextProps;
    if(totData && totData.length>0){
      this.initLineChart(totData);
    }
  }

  initLineChart = (totData:any) => {
    const myChartL = echarts.init(document.getElementById('line'));
    let xValue =[], num=[];
    if(totData.length>0){
      xValue= totData.map((item:any,index:number) => (item.name));
      num= totData.map((item:any,index:number) => (item.value));
    }
    myChartL.setOption({
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
          data: num,
          type: 'line',
          smooth: true,
          areaStyle: {
            color: 'rgba(20,154,180,0.5)',
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
