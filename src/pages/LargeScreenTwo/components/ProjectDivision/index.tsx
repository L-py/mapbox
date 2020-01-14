import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

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
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xValue,
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLine:{
          lineStyle:{
            color: '#174382',
          } 
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgb(255,255,255,0.3)', //更改坐标轴文字颜色
          },
        },
        axisLine:{
          lineStyle:{
            color: '#174382',
          } 
        },
      },
      series: [
        {
          name:'项目数量',
          type:'line',
          stack: '总量',
          label: {
              normal: {
                  show: true,
                  position: 'top'
              }
          },
          areaStyle: {
            color: 'rgba(20,154,180,0.5)',
          },
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3,
                color: '#38c1f2',
              },
              label: {
                show: true,
                position: 'top',
                color:'#fff',
                fontSize:16
              }
            },
          },
          data:num
      }
        // {
        //   data: num,
        //   type: 'line',
        //   areaStyle: {
        //     color: '#149ab4',
        //   },
        //   stack: '总量',
        //   symbol: 'none',
        //   // itemStyle : { normal: {label : {show: true}}}
        //   // label: {
        //   //   normal: {
        //   //     show: true,
        //   //     position: 'top'
        //   //   }
        //   // },
        //   smooth: true,
        //   itemStyle: {
        //     normal: {
        //       lineStyle: {
        //         width: 3,
        //         color: '#38c1f2',
        //       },
        //       label: {
        //         show: true,
        //         position: 'top'
        //       }
        //     },
        //   },
        // },
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
