import React, { Component } from 'react';
import styles from './index.less';
// @ts-ignore
import Hightcharts from 'highcharts';
// @ts-ignore
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';

class DeviceFunChart extends Component {
  componentDidMount(): void {
    this.initPieChart2();
  }
  initPieChart2 = () => {
    const myChartL = echarts.init(document.getElementById('pie2'));
    myChartL.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
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
      calculable: true,
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          labelLine: {
            normal: {
              length: 2,
            },
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 14, //文字的字体大小
              },
            },
          },
          data: [
            { value: 10, name: '人脸比对' },
            { value: 5, name: '热力图统计' },
            { value: 15, name: '夜间抓拍' },
            { value: 25, name: '场景变更侦测' },
            { value: 20, name: '道路监控' },
            { value: 35, name: '遮挡告警' },
            { value: 30, name: '区域入侵检测' },
            { value: 40, name: '越界侦测' },
          ],
        },
      ],
    });
  };
  initPieChart = () => {
    let data = {
      // title: {
      //     text: '浏览器<br>占比',
      //     align: 'center',
      //     verticalAlign: 'middle',
      //     y: 50
      // },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      credits: {
        //去掉版权logo
        enabled: false,
      },
      chart: {
        backgroundColor: 'rgb(255,255,255,0.001)',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: 0,
            style: {
              fontSize: '8px',
              color: '#fff',
            },
          },
          startAngle: -90, // 圆环的开始角度
          endAngle: 90, // 圆环的结束角度
          center: ['50%', '75%'],
        },
      },
      series: [
        {
          type: 'pie',
          innerSize: '80%',
          data: [
            ['人脸比对', 45.0],
            ['夜间抓拍', 26.8],
            ['区域入侵检测', 12.8],
            ['遮挡报警', 8.5],
            ['道路监控', 6.2],
          ],
        },
      ],
    };
    Hightcharts.chart('pie2', data);
  };

  render() {
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        <div id="pie2" className={styles.pieChart2} />
      </div>
    );
  }
}

export default DeviceFunChart;
