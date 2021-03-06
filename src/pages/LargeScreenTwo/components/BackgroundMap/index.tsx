import React, { Component } from 'react';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import MapboxLanguage from '@mapbox/mapbox-gl-language';
// @ts-ignore
// import MapboxLanguage from 'mapbox-gl';
import styles from './index.less';
// @ts-ignore
import styleJson from '../../json/basic.json';
import HeatLayer from './layer/HeatLayer';
import ClusterPointLayer from './layer/ClusterPointLayer';
import MarkerPointLayer from './layer/MarkerPointLayer';
import VideoPointLayer from './layer/VideoPointLayer';
import ScenorPointLayer from './layer/ScenorPointLayer';
import CarPointLayer from './layer/CarPointLayer';
import PersonPointLayer from './layer/PersonPointLayer';
// @ts-ignore
import flvjs from 'flv.js';
// @ts-ignore
import chainJson from '../../json/data/china.json';
import ChinaLayer from './layer/ChinaLayer';
import ProvinceLayer from './layer/ProvinceLayer';
import CityLayer from './layer/CityLayer';

interface Props {
  proPointData: {},
  proPointAllData: {},
  fetchProjectInfo: void,
  fetchDevAttrInfo: void,
  changeBounds: void,
  changeParams: void,
  changeOperationType: void,
  moDevPointData: {},
  moDevPointData1: {},
  moDevPointData2: {},
  moDevPointData3: {},
  devType: string,
  operationType: string,
  areaCode: string,
  devAttrData: {},
}
class BackgroundComponentMap extends Component<Props> {

  state = {
    level: 0,
    defProCode: '',
    defCityCode: '',
    opeType: '',
  }
  mapbox:any;
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    // mapboxgl.accessToken =
    //   'pk.eyJ1IjoibHB5MjIyNjY2IiwiYSI6ImNrMzZxNnUzMjA0MmMzb21wMTMycGlwdDEifQ.gJ4NtkLjt4fmvFky4uJDLA';
    this.mapbox = new mapboxgl.Map({
      style: styleJson,
      center: [100.03,39.27], //地图中心经纬度
      // center: [106.504962,29.533155],
      zoom:3.5, //缩放级别
      minZoom: 1,
      source: '192.168.1.111:8088',
      interactive: true,
      maxZoom: 19,
      pitch: 0,
      container: 'map',
    });
    this.mapbox.style.sprite=require('../../json/sprites/sprite');
    this.bindMapboxInfo(this.mapbox);
  }

  componentWillReceiveProps(nextProps:  any) {
    const { moDevPointData,devType,devStatue,proPointData,areaCode,operationType }:any = nextProps;
    const { level,defCityCode,defProCode, opeType } = this.state;
    console.log(operationType);
    if(areaCode!=='' && operationType ==='1'){
      if(level == 2){
        this.setVisible(this.mapbox,'maine');
      }
    }
    if(operationType ==='2'){
      if(devType=='01'){
          // this.addVideoLayer(this.mapbox,moDevPointData);
          this.setDevVisibil(this.mapbox,'videoPoint');
      }else if(devType=='02'){
          // this.addScenorLayer(this.mapbox,moDevPointData);
          this.setDevVisibil(this.mapbox,'scenor');
      }else if(devType=='03'){
          // this.addPersonLayer(this.mapbox,moDevPointData);
          this.setDevVisibil(this.mapbox,'person');
      }else if(devType=='04'){
        // this.addCarLayer(this.mapbox,moDevPointData);
        this.setDevVisibil(this.mapbox,'car');
      }else if(devType=='all'){
        // setTimeout(() => {
        //   this.addAllDevLayer(this.mapbox,moDevPointData);
        // },500)
      }
    }
    
    // else {
    //   this.remveDevLayer(this.mapbox,moDevPointData,devType);
    // }
  }

  bindMapboxInfo = (mapbox:any) => {
    mapbox.on('load', () => {
      const { proPointAllData, changeBounds, changeParams, moDevPointData, moDevPointData1, moDevPointData2, moDevPointData3 }:any = this.props;
      this.addHeatLayer(mapbox,proPointAllData);
      this.addPointLayer(mapbox,proPointAllData,'');
      this.addMakerLayer(mapbox,proPointAllData,'');

      this.addVideoLayer(this.mapbox,moDevPointData);
      this.addScenorLayer(this.mapbox,moDevPointData1);
      this.addPersonLayer(this.mapbox,moDevPointData2);
      this.addCarLayer(this.mapbox,moDevPointData3);
      changeBounds(mapbox.getBounds()._ne,mapbox.getBounds()._sw);
      // this.addScenorLayer(mapbox);
      // this.addVideoLayer(mapbox);
      this.addMainLayer(mapbox);
      // console.log( mapbox.querySourceFeatures("openmaptiles", {
      //   sourceLayer: 'place',
      // }))
      mapbox.on('click', (e) => {
        // console.log( mapbox.getBounds());
        // console.log(e)
      })
      mapbox.on('moveend', () => {
        console.log(mapbox.getZoom())
        if(mapbox.getZoom()<8.5){
          var visibility = mapbox.getLayoutProperty(
            'maine',
            'visibility'
          ) /* getLayoutProperty(layer, name) 返回指定style layer上名为name的layout属性的值*/
          if (visibility != 'visible') {
            mapbox.setLayoutProperty('maine', 'visibility', 'visible')
          }
        }
        if(mapbox.getZoom()<3.5){
          changeParams({});
        }
        changeBounds(mapbox.getBounds()._ne,mapbox.getBounds()._sw);
      })
    });
  }

  setDevVisibil = (mapbox:any,id:string) => {
    var visibility = mapbox.getLayoutProperty(
      id,
      'visibility'
    ) /* getLayoutProperty(layer, name) 返回指定style layer上名为name的layout属性的值*/
    if (visibility != 'visible') {
      mapbox.setLayoutProperty(id, 'visibility', 'visible')
    }else{
      mapbox.setLayoutProperty(id, 'visibility', 'none' );
    } 
  }

  addMainLayer = (mapbox:any) => {
    //添加全国省市县id数据
    const chinalayer = new ChinaLayer(mapbox, chainJson, 'maine', 'maineSource');
    chinalayer.addLayer();
    mapbox.on('mouseenter', 'maine', (e) =>  {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
    mapbox.on('click', 'maine', (e) => {
      this.addProvinceLayer(mapbox,e);
      this.setState({
        level: 1
      })
    });
  }

  addProvinceLayer = (mapbox:any,info:any)=> {
    const { fetchProjectInfo, changeOperationType }:any = this.props;
    const { defProCode,defCityCode } =this.state;
    console.log(info.features[0].properties);
    const code = info.features[0].properties.adcode;
    const level = info.features[0].properties.level;
    fetchProjectInfo(code,level);
    changeOperationType('1');
    this.setState({
      opeType: '1'
    })
    const c1= info.features[0].properties.center.replace('[','').split(',')[0];
    const c2= info.features[0].properties.center.replace(']','').split(',')[1];
    mapbox.setCenter([c1,c2]);
    mapbox.setZoom(6);
    const proJson = require(`../../json/data/province/${code}.json`);
    const prolayer = new ProvinceLayer(mapbox,proJson,`province_${code}`,`proSource_${code}`);
    if (!mapbox.getLayer(`province_${code}`)) {
      if(mapbox.getLayer(`province_${defProCode}`)){
        const prolayer2 = new ProvinceLayer(mapbox,proJson,`province_${defProCode}`,`proSource_${defProCode}`);
        prolayer2.removeLayer();
        if(mapbox.getLayer(`city_${defCityCode}`)){
          const citylayer3 = new CityLayer(mapbox,{},`city_${defCityCode}`,`city_${defCityCode}`,'');
          citylayer3.removeLayer();
        }
      }
      prolayer.addLayer();
      this.setState({ 
        defProCode: code
      })
    }
    mapbox.on('mouseenter', `province_${code}`, (e) =>  {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
    mapbox.on('click', `province_${code}`, (e) => {
      this.addCityLayer(mapbox,e);
      this.setState({
        level: 2
      })
    })
  }

  addCityLayer = (mapbox:any,info:any) => {
    console.log(info.features[0].properties);
    const { fetchProjectInfo, changeOperationType }:any = this.props;
    const { defCityCode,defProCode } =this.state;
    const adcode = info.features[0].properties.adcode;
    const level = info.features[0].properties.level;
    fetchProjectInfo(adcode,level);
    changeOperationType('1');
    this.setState({
      opeType: '1'
    })
    const c1= info.features[0].properties.center.replace('[','').split(',')[0];
    const c2= info.features[0].properties.center.replace(']','').split(',')[1];
    mapbox.setCenter([c1,c2]);
    mapbox.setZoom(12.5);
    const cityJson = require(`../../json/data/city/${adcode}.json`);
    const citylayer = new CityLayer(mapbox,cityJson,`city_${adcode}`,`city_${adcode}`, `province_${defProCode}`);
    if (!mapbox.getLayer(`city_${adcode}`)) {
      if(mapbox.getLayer(`city_${defCityCode}`)){
        const citylayer2 = new CityLayer(mapbox,cityJson,`city_${defCityCode}`,`city_${defCityCode}`, '');
        citylayer2.removeLayer();
      }
      citylayer.addLayer();
      this.setState({
        defCityCode: adcode
      })
    }
   
    // mapbox.on('mouseenter', `city_${adcode}`, (e) =>  {
    //   mapbox.getCanvas().style.cursor = 'pointer';
    // });
    // mapbox.on('click', `city_${adcode}`, (e) => {
    //   // this.addAreaLayer(mapbox,e);
    // })
  }

  addAreaLayer = (mapbox:any,info:any) => {
    if(info.features[0].properties){
      const c1= info.features[0].properties.center.replace('[','').split(',')[0];
      const c2= info.features[0].properties.center.replace(']','').split(',')[1];
      mapbox.setCenter([c1,c2]);
      mapbox.setZoom(14);
    }
  }

  setVisible = (mapbox:any,layer:string) => {
    var visibility = mapbox.getLayoutProperty(
      layer,
      'visibility'
    ) /* getLayoutProperty(layer, name) 返回指定style layer上名为name的layout属性的值*/
    if (visibility === 'visible') {
      mapbox.setLayoutProperty(
        layer,
        'visibility',
        'none'
      ) /* setLayoutProperty(layer, name, value)设置指定layer上名为name的layou属性的值 */
    } 
    // mapbox.off('click', layer ,() => {
    //   console.log('off')
    // })
  }

  addHeatLayer =(mapbox:any,data:any) => {
    //项目热力
    const heatlayer = new HeatLayer(mapbox, data, 'heat', 'heatSource');
    heatlayer.addLayer();
  }

  addPointLayer = (mapbox:any,pointData:any,code:string) => {
    //项目点聚合
    const pointlayer = new ClusterPointLayer(mapbox, pointData, `pointCluster`, true, `pointClusterSource` );
     pointlayer.addLayer();
  }

  addMakerLayer =(mapbox:any,pointAllData:any,code:string) => {
    //项目点
    const markerlayer = new MarkerPointLayer(mapbox, pointAllData, `proMaker`, `proMakerSource`, 'maine');
     markerlayer.addLayer();
     //项目点绑定事件
    mapbox.on('mouseenter', `proMaker`, function() {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
    mapbox.on('click', `proMaker`, function(e) {
      console.log(e.features[0].geometry.coordinates);
      const proInfo = e.features[0].properties.proName;
      const infos = `<div style="height:80px;width:170px;display:flex;background:rgb(9, 16, 22, 0.5);">
        <div style="width:150px;margin:10px 10px;text-align:center;font-size:16px;">${proInfo}</div>
      </div>`;
      var coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup({ offset: -55 ,closeButton:false,})
        .setLngLat(coordinates)
        .setHTML(infos)
        .addTo(mapbox);
      // var visibility = mapbox.getLayoutProperty(
      //   'maine',
      //   'visibility'
      // ) /* getLayoutProperty(layer, name) 返回指定style layer上名为name的layout属性的值*/
      // if (visibility === 'visible') {
      //   mapbox.setLayoutProperty(
      //     'maine',
      //     'visibility',
      //     'none'
      //   ) /* setLayoutProperty(layer, name, value)设置指定layer上名为name的layou属性的值 */
      // } else {
      //   mapbox.setLayoutProperty('maine', 'visibility', 'visible')
      // }
    });
  }

  getDevInfo = () => {
    const { devAttrData }:any = this.props;
    return devAttrData.monitorDeviceName;
  }

  addVideoLayer = (mapbox:any,data:any) => {
    console.log(data);
    //摄像头点
    const videolayer = new VideoPointLayer(mapbox, data, `videoPoint`, 'videoSource');
    const { fetchDevAttrInfo, devAttrData }:any = this.props;
    videolayer.addLayer();
     //摄像头绑定事件
    mapbox.on('mouseenter', `videoPoint`, function() {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
    mapbox.on('click', `videoPoint`, (e:any) => {
      console.log(e.features[0].geometry.coordinates);
      console.log(e.features[0].properties.monitorDeviceIdent)
        console.log(devAttrData)   
      fetchDevAttrInfo(e.features[0].properties.monitorDeviceIdent);
      const proInfo = e.features[0].properties.monitorDeviceName;
      const infos = `<div style="height:250px;width:340px;display:flex;flex-warp:warp;flex-direction:row;background:url(${require('../../images/videoInfo.png')}) no-repeat;background-size:340px 250px;">
        <div style="width:150px;margin:5px 5px;text-align:center;">${proInfo}</div>
        <div style="width:320px;height:200px;margin-top:28px;margin-left:-150px;">
          <video style="width:100%;height:100%" id="videoElement"></video>
        </div>
      </div>`;
      var coordinates = e.features[0].geometry.coordinates.slice();
      new mapboxgl.Popup({ offset: [50,-40] ,closeButton:false,})
        .setLngLat(coordinates)
        .setHTML(infos)
        .addTo(mapbox);
      // e.addEventListener('click',(e) => {e.stopPropagation()}, false);
      // e.stopPropagation();
      // if(flvjs.isSupported()){
      //   var videoElement = document.getElementById('videoElement');
      //   var flvPlayer = flvjs.createPlayer({
      //       type: 'flv',
      //       url: 'http://example.com/flv/video.flv'
      //   });
      //   flvPlayer.attachMediaElement(videoElement);
      //   flvPlayer.load();
      //   flvPlayer.play();
      // }
    });
  }
  //传感器
  addScenorLayer = (mapbox:any,data:any) => {
    const scenorlayer = new ScenorPointLayer(mapbox, data, 'scenor', 'videoSource');
    scenorlayer.addLayer();
    mapbox.on('mouseenter', 'scenor', function() {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
    mapbox.on('click', 'scenor', function(e) {
      const proInfo = e.features[0].properties.monitorDeviceName;
      const infos = `<div style="height:80px;width:170px;display:flex;background:rgb(9, 16, 22, 0.5);">
        <div style="width:150px;margin:10px 10px;text-align:center;font-size:16px;">${proInfo}</div>
      </div>`;
      var coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup({ offset:-55 ,closeButton:false,})
        .setLngLat(coordinates)
        .setHTML(infos)
        .addTo(mapbox);
    });
  }
  //车
  addCarLayer = (mapbox:any,data:any) => {
    const carlayer = new CarPointLayer(mapbox, data, 'car', 'carSource');
    carlayer.addLayer();
    mapbox.on('mouseenter', 'car', function() {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
  }
  //人
  addPersonLayer = (mapbox:any,data:any) => {
    const personlayer = new PersonPointLayer(mapbox, data, 'person', 'personSource');
    personlayer.addLayer();
    mapbox.on('mouseenter', 'person', function() {
      mapbox.getCanvas().style.cursor = 'pointer';
    });
  }

  addAllDevLayer = (mapbox:any,data:any) => {
    // const data1 = JSON.parse(data);  
    let videoData = [], scenorData = [], personData = [], carData = [];
    if(data && data.features.length){
      for (let i =0;i<data.features.length;i++){
        if(data.features[i].properties.monitorDeviceCategory == '01'){
          videoData.push(data.features[i])
        }else if(data.features[i].properties.monitorDeviceCategory == '02'){
          scenorData.push(data.features[i])
        }else if(data.features[i].properties.monitorDeviceCategory == '03'){
          personData.push(data.features[i])
        }else if(data.features[i].properties.monitorDeviceCategory == '04'){
          carData.push(data.features[i])
        }
      }
    }
    const videoData2 = {
      type: 'FeatureCollection',
      features: videoData,
    };
    this.addVideoLayer(mapbox,videoData2);
    const scenorData2 = {
      type: 'FeatureCollection',
      features: scenorData,
    };
    this.addScenorLayer(this.mapbox,scenorData2);
    const personData2 = {
      type: 'FeatureCollection',
      features: personData,
    };
    this.addPersonLayer(this.mapbox,personData2);
    const carData2 = {
      type: 'FeatureCollection',
      features: carData,
    };
    this.addCarLayer(this.mapbox,carData2);
  }

  remveDevLayer = (mapbox:any,data:any,type:string) => {
    if(type=='01'){
      const videolayer = new VideoPointLayer(mapbox, data, `videoPoint`, 'videoSource');
      videolayer.removeLayer();
    }else if(type=='02'){
      const scenorlayer = new ScenorPointLayer(mapbox, data, 'scenor', 'videoSource');
      scenorlayer.removeLayer();
    }else if(type=='03'){
      const personlayer = new PersonPointLayer(mapbox, data, 'person', 'personSource');
      personlayer.removeLayer();
    }else if(type=='04'){
      const carlayer = new CarPointLayer(mapbox, data, 'car', 'carSource');
      carlayer.removeLayer();
    }else if(type == 'all'){
      const videolayer = new VideoPointLayer(mapbox, data, `videoPoint`, 'videoSource');
      videolayer.removeLayer();
      const scenorlayer = new ScenorPointLayer(mapbox, data, 'scenor', 'videoSource');
      scenorlayer.removeLayer();
      const personlayer = new PersonPointLayer(mapbox, data, 'person', 'personSource');
      personlayer.removeLayer();
      const carlayer = new CarPointLayer(mapbox, data, 'car', 'carSource');
      carlayer.removeLayer();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div id="map" className={styles.mapContainer}/>
      </div>
    );
  }
}
export default BackgroundComponentMap;
const aaaaData = {
	"features": [{
		"geometry": {
			"coordinates": ["116.854781", "40.381304"],
			"type": "Point"
		},
		"type": "Feature",
		"properties": {
			"monitoDevicerId": "8000000.0",
			"monitorDeviceIdent": 1,
			"monitorDeviceName": "网络高清球机P01106",
			"monitorDeviceNum": null,
			"monitorDeviceCategory": "01",
			"manufactor": null,
			"ip": null,
			"runTime": null,
			"runState": null,
			"monitorType": null,
			"deviceAddress": null,
			"proUser": null,
			"carType": null,
			"lot": "116.854781",
			"lat": "40.381304",
			"followState": null,
			"belongDeviceId": null,
			"stationId": null,
			"proId": null,
			"name": null,
			"value": null,
			"vgisDeviceCollection": null,
			"proName": null,
			"monitorDeviceType": "0101",
			"monitorTypeArr": null,
			"pointPosition": null,
			"addUserId": null,
			"addUserDate": null,
			"updateUserId": null,
			"updateUserDate": null,
			"c3LinkCodeNum": "52_#_51000005_1_101",
			"c3LinkCodeId": null,
			"c3MonAddress": null,
			"c3mvideoCamera": null
		}
	}],
	"type": "FeatureCollection"
}
