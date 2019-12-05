import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';


interface Props extends FormComponentProps{
  levData: [];
}

class ALarmLevelChart extends Component<Props> {
  componentDidMount(): void {

  }

  componentWillReceiveProps(nextProps:  any) {
    const { levData } = nextProps;
    if(levData && levData.length>0){
      this.initPieChart(levData);
    }
  }

  initPieChart = (levData:any) => {
    const myChartL = echarts.init(document.getElementById('pie'));
    let data1 =[];
    if(levData.length>0){
      data1= levData.map((item:any) => ({ value: item.value, name: item.name=='01'?'一级告警':item.name=='02'?'二级告警':item.name=='03'?'三级告警':item.name=='04'?'四级告警':item.name=='05'?'五级告警':'' }))
    }
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
          data:data1,
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
    const { levData } = this.props;
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="pie" className={styles.pieChart} />
        {
            levData && levData.length>0?
            <div className={styles.labels}>
              {levData.map((item:any) => (
                <div className={item.name=='01'?styles.lab1:item.name=='02'?styles.lab2:item.name=='03'?styles.lab3:item.name=='04'?styles.lab4:item.name=='05'?styles.lab5:''}>
                  <div>{item.value}</div>
                  <div>{item.name=='01'?'一级告警':item.name=='02'?'二级告警':item.name=='03'?'三级告警':item.name=='04'?'四级告警':item.name=='05'?'五级告警':''}</div>
                </div>
              ))}
            </div>
        :null}
        
      </div>
    );
  }
}

export default ALarmLevelChart;
