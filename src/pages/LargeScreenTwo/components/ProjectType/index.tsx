import React, { Component } from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/es/form';
import { Progress } from 'antd';

interface Props extends FormComponentProps{
  proTypeData: [];
}

class ProjectTypePage extends Component<Props> {
  componentDidMount(): void {}

  render() {
    const { proTypeData } = this.props;
    const color = ['#d33974','#e15e93','#204fff','#07b9ff','#07b9ff'];
    return (
      <div className={styles.container} style={{ width: '100%', height: '100%' }}>
        {
          proTypeData && proTypeData.length>0?
            <div className={styles.content}>

              {
                proTypeData.map((item:any,index:number) => (
                  <div className={styles.con}>
                    1&nbsp;&nbsp;
                    <div className={styles.proName}>{item.proCategory}</div>
                    <div style={{ width: 220 }}>
                      <Progress percent={item.value} size="small" strokeColor={color[index]} />
                    </div>
                  </div>
                ))
              }
            </div>
        :null}
      </div>
    );
  }
}

export default ProjectTypePage;
