import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

interface Props extends FormComponentProps{
  proSumData: [];
}

class ProjectDivisionChart extends Component<Props> {
  componentDidMount(): void {
  }

  componentWillReceiveProps(nextProps:  any) {
    const { proSumData } = nextProps;
    if(proSumData && proSumData.length>0){
      this.initLineChart(proSumData);
    }
  }

  initLineChart = (proSumData:any) => {
    const myChartL = echarts.init(document.getElementById('line3'));
    let xValue =[], num=[];
    if(proSumData.length>0){
      xValue= proSumData.map((item:any,index:number) => (item.name));
      num= proSumData.map((item:any,index:number) => (item.value));
    }
    myChartL.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xValue,
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
          data: num,
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
    const { proSumData } = this.props;
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="line3" className={styles.lineChart3} />
        {
          proSumData && proSumData.length>0?
          <div className={styles.provives}>
            {
              proSumData.map((item:any) => (
                <div className={styles.pro}>
                  <div className={styles.proName}>{item.name}</div>
                </div>
              ))
            }
          </div>
        :null}
      </div>
    );
  }
}

export default ProjectDivisionChart;
