import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import Hightcharts from 'highcharts';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';

interface Props extends FormComponentProps{
  monData: [];
}

class DeviceFunChart extends Component<Props> {
  componentDidMount(): void {
  }

  componentWillReceiveProps(nextProps:  any) {
    const { monData } = nextProps;
    if(monData && monData.length>0){
      this.initPieChart2(monData);
    }
  }

  initPieChart2 = (monData:any) => {
    const myChartL = echarts.init(document.getElementById('pie2'));
    let data1 =[],lenData =[];
    if(monData.length>0){
      data1= monData.map((item:any) => {
        if(item.name){
          return { value: item.value, name: item.name }
        }else{
          return;
        }
      })
      lenData= monData.map((item:any) => ((item.name)))
    }
    myChartL.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      // legend: {
      //   orient: 'vertical',         // 标签名称垂直排列
      //   x: 'right',  
      //   data:lenData,
      //   textStyle: {
      //     color: '#fff'
      //   }
      // },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
          },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      color:[
        'rgba(98,234,234,0.8)',
        'rgba(115,205,255,0.8)',
        'rgba(131,156,254,0.8)',
        'rgba(193,130,255,0.8)',
        'rgba(231,131,251,0.8)',
        'rgba(57,114,250,0.8)',
        'rgba(58,200,221,0.8)',
        'rgba(206,91,136,0.8)',
      ],
      calculable: true,
      series: [
        {
          name: '设备特殊功能',
          type: 'pie',
          radius: [30, 100],
          roseType: 'area',
          labelLine: {
            normal: {
              length: 0.5,
            },
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 14, //文字的字体大小
              },
            },
          },
          
          data: data1,
        },
      ],
    });
  };

  render() {
    const { monData } = this.props;
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="pie2" className={styles.pieChart2} />
        {/* {
            monData && monData.length>0?
            <div className={styles.labels}>
              {monData.map((item:any) => (
                <div className={item.name=='01'?styles.lab1:item.name=='02'?styles.lab2:item.name=='03'?styles.lab3:item.name=='04'?styles.lab4:item.name=='05'?styles.lab5:''}>
                  <div>{item.value}</div>
                  <div>{item.name}</div>
                </div>
              ))}
            </div>
        :null} */}
      </div>
    );
  }
}

export default DeviceFunChart;
