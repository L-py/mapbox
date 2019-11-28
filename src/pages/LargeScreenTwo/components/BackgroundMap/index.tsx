import React, { Component } from 'react';
// @ts-ignore
import APILoader from 'react-amap/lib/utils/APILoader';
// @ts-ignore
import Map from 'react-amap/lib/map';
// @ts-ignore
import Marker from 'react-amap/lib/marker';
import Heatmap from 'react-amap-plugin-heatmap';
// @ts-ignore
import * as L7 from '@antv/l7';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import MapboxLanguage from '@mapbox/mapbox-gl-language';
// @ts-ignore
// import MapboxLanguage from 'mapbox-gl';
import styles from './index.less';
import styleJson from '../../json/style.json';
import HeatLayer from './layer/HeatLayer';
import ClusterPointLayer from './layer/ClusterPointLayer';
import MarkerPointLayer from './layer/MarkerPointLayer';

interface Props {
  styleSheet?: {
    height: number;
  };
}
class BackgroundComponentMap extends Component<Props> {
  // heatmap:any=null;
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibHB5MjIyNjY2IiwiYSI6ImNrMzZxNnUzMjA0MmMzb21wMTMycGlwdDEifQ.gJ4NtkLjt4fmvFky4uJDLA';
    let mapbox = new mapboxgl.Map({
      style: styleJson,
      // center: [104.93, 37.27], //地图中心经纬度
      center: [109.93, 34.27],
      // center: [113.22332296629585,22.7491244227423],
      zoom: 7, //缩放级别
      minZoom: 1,
      maxZoom: 19,
      pitch: 0,
      container: 'map',
    });
    mapbox.on('load', () => {
      if (mapbox.loaded()) {
        const heatlayer = new HeatLayer(mapbox, heatData2, 'earthquakes');
        const markerlayer = new MarkerPointLayer(mapbox, points2, 'earthquakes3', true);
        const pointlayer = new ClusterPointLayer(mapbox, points2, 'earthquakes2', true);
        // heatlayer.addLayer();
        markerlayer.addLayer();
        // pointlayer.addLayer();
      }
      mapbox.on('mouseenter', 'earthquakes3', function() {
        mapbox.getCanvas().style.cursor = 'pointer';
      });
      mapbox.on('click', 'earthquakes3', function(e) {
        console.log(e.features[0].geometry.coordinates);
        var coordinates = e.features[0].geometry.coordinates.slice();
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('11111111111')
          .addTo(mapbox);
      });
    });

    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }

    // mapbox.loadImage(require( '../../images/proIcon.png'), (error:any,image:any)=>{
    //   if (error) throw error
    //   console.log(image);
    //   if (!mapbox.hasImage('cluster')) {
    //     mapbox.addImage('cluster', image)
    //   }
    // })
    // mapbox.addLayer({
    //   "id": "places",
    //   "type": "symbol",
    //   "source": {
    //     "type": "geojson",
    //     "data": points2,
    //   },
    //   "layout": {
    //       "icon-image": "cluster",
    //       "icon-size": 1,
    //   }
    // });
    // mapbox.on('moveend', () =>{
    //   console.log(mapbox.getZoom());
    // })
    // mapbox.on('click', "places", function (e) {
    //   console.log(e.features[0].geometry.coordinates)
    //   var coordinates = e.features[0].geometry.coordinates.slice();
    //   new mapboxgl.Popup()
    //   .setLngLat(coordinates)
    //   .setHTML('11111111111')
    //   .addTo(mapbox);
    // });

    //地图数据获取
    // var features = mapbox.querySourceFeatures('composite',{sourceLayer:'place_label'})
    // console.log(features);
    // for(let i=0;i<features.length;i++){
    //   if(features[i].properties['name']=="ASSAM"){
    //     console.log(features[i]);
    //   }
    // }

    // mapbox.on('moveend', () =>{
    // console.log(mapbox.getZoom());
    // if(mapbox.getZoom()>6.5 && mapbox.getZoom()<10){
    //   heatlayer.removeLayer();
    //   markerlayer.addLayer();
    //   pointlayer.addLayer();
    // }else if(mapbox.getZoom()<6.5){
    //   // const heatlayer2 = new HeatLayer(mapbox, heatData2, 'earthquakes');
    //   // heatlayer.addLayer();
    //   // markerlayer.removeLayer();
    //   // pointlayer.removeLayer();
    // }
    // })
    // mapbox.on('click', (e:any) => {
    //   console.log(e)
    // });

    // var marker = new mapboxgl.Marker()
    // .setLngLat([104.93, 37.27])
    // .addTo(mapbox);
    // var accomodation = L.icon({
    //   iconUrl: require('../../images/clusterBg.png'),
    //   iconSize: [72, 72],
    //   iconAnchor: [8, 60],
    // });

    // eslint-disable-next-line
    // var map = new AMap.Map('map', {
    //   pitch: 50,
    //   zoom: 7, //缩放级别
    //   // zoom: 5,
    //   minZoom: 1,
    //   maxZoom: 19,
    //   // center: [104.93, 37.27],
    //   center: [109.93, 34.27],
    //   mapStyle: 'amap://styles/a1e148fb8a2aee743d5ea7d5b09407a3',
    //   // layers:[
    //   //   disCountry,
    //   // ],
    // });
    // // this.heatmapLoad(map);
    // console.log(map)
    // map.on('zoomstart',() => {//缩放开始

    // })
    // map.clearMap();

    // var endIcon = new AMap.Icon({
    //   size: new AMap.Size(24, 24),
    //   image:require( '../../images/proIcon.png'),
    //   imageSize: new AMap.Size(24, 24),
    // });
    // var markerContent = `` +
    // `<div style="height:80px;width:100px;display:flex;background:#0a177d;">xxx-xxx项目</div>`;
    // markers.forEach(function(marker) {//点标记
    //   let mark = new AMap.Marker({
    //       map: map,
    //       icon: marker.icon,
    //       position: [marker.position[0], marker.position[1]],
    //       offset: new AMap.Pixel(-13, -30)
    //   });
    //   mark.on('click', () => {
    //     console.log(mark.getLabel());
    //     if(!mark.getLabel()){
    //       mark.setLabel({
    //         offset: new AMap.Pixel(0, 40),
    //         content: markerContent, //设置文本标注内容
    //         direction: 'right' //设置文本标注方位
    //       });
    //     }else{
    //       mark.setLabel();
    //     }
    //   });
    // });

    // let cluster,markersT = [];//点聚合
    // for (var i = 0; i < points.length; i += 1) {
    //   markersT.push(new AMap.Marker({
    //       position: points[i]['center'],
    //       content: `<div style="background: url(${require('../../images/clusterBg.png')}); height: 72px; width: 72px;background-size:72px 72px;text-align:center;padding-top:26px;">${points[i]['count']}</div>`,
    //       offset: new AMap.Pixel(-15, -15),
    //   }))
    // }
    // cluster = new AMap.MarkerClusterer(map, markersT, {gridSize: 80});

    // map.on('zoomchange',() => {//缩放级别改变
    //   var zoom = map.getZoom();
    //   var center = map.getCenter();
    //   console.log('当前地图层级',zoom);
    //   console.log('当前地图中心点',center);
    //   if(zoom==7){

    //   }
    // })
    // map.on('zoomend',() => {//缩放结束

    // })
    // map.on('movestart',() => {//地图移动开始  缩放或者拖拽
    //   var center = map.getCenter();
    // })
    // map.on('mapmove',() => {//地图正在移动

    // })
    // map.on('moveend',() =>{//地图移动结束

    // })
  }

  // heatmapLoad = (map:any)=>{//热力图
  //   let heatmap;
  //   map.plugin(["AMap.Heatmap"], function () {
  //       //初始化heatmap对象
  //       //eslint-disable-next-line
  //       heatmap = new AMap.Heatmap(map, {
  //           radius: 25, //给定半径
  //           opacity: [0, 0.8],
  //           gradient:{          //热力图的颜色渐变区间。   {JSON}:key 插值的位置, 0-1;  value颜色值
  //             0.5: 'blue',
  //             0.65: 'rgb(117,211,248)',
  //             0.7: 'rgb(0, 255, 0)',
  //             0.9: '#ffea00',
  //             1.0: 'red'
  //           }
  //       });
  //       //设置数据集：该数据为北京部分“公园”数据
  //       heatmap.setDataSet({
  //           data: heatData, //热力图数据
  //           max: 100
  //       });
  //   });
  // };

  render() {
    return (
      <div className={styles.container}>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }
}
const geojsonPoints = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 1,
        name: 'point1',
      },
      geometry: {
        type: 'Point',
        coordinates: [113.22332296629585, 22.7491244227423],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 2,
        name: 'point2',
      },
      geometry: {
        type: 'Point',
        coordinates: [113.22332296629585, 22.7391244227423],
      },
    },
  ],
};
const markers = [
  {
    icon: require('../../images/proIcon.png'),
    position: [109.93, 34.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [109.93, 35.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [108.93, 34.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [106.93, 34.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [106.93, 33.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [107.93, 35.27],
  },
  {
    icon: require('../../images/proIcon.png'),
    position: [108.93, 32.27],
  },
];
const points = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [107.93, 35.27],
      },
    },
  ],
};
const points2 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [110.93, 34.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.293, 33.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [112.93, 35.17],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.93, 33.17],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.93, 33.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.93, 32.17],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.23, 33.17],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.23, 33.37],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [111.23, 33.67],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [107.93, 32.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [109.93, 39.127],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [109.93, 39.227],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [109.23, 39.127],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [109.2293, 39.127],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [107.93, 35.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [107.93, 34.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.93, 34.27],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.93, 33.27],
      },
    },
  ],
};
const heatData2 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.191031, 32.988585],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.389275, 39.925818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.389275, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.389275, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.389275, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [108.389275, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 35.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [116.321512, 39.625818],
      },
    },
  ],
};

const heatData = [
  {
    lng: 108.191031,
    lat: 32.988585,
    count: 10,
  },
  {
    lng: 108.389275,
    lat: 39.925818,
    count: 11,
  },
  {
    lng: 109.287444,
    lat: 39.810742,
    count: 12,
  },
  {
    lng: 109.481707,
    lat: 39.940089,
    count: 13,
  },
  {
    lng: 108.410588,
    lat: 39.880172,
    count: 14,
  },
  {
    lng: 108.394816,
    lat: 39.91181,
    count: 15,
  },
  {
    lng: 108.416002,
    lat: 39.952917,
    count: 16,
  },
  {
    lng: 116.39671,
    lat: 39.924903,
    count: 17,
  },
  {
    lng: 116.180816,
    lat: 39.957553,
    count: 18,
  },
  {
    lng: 116.382035,
    lat: 39.874114,
    count: 19,
  },
  {
    lng: 116.316648,
    lat: 39.914529,
    count: 20,
  },
  {
    lng: 116.395803,
    lat: 39.908556,
    count: 21,
  },
  {
    lng: 116.74553,
    lat: 39.875916,
    count: 22,
  },
  {
    lng: 116.352289,
    lat: 39.916475,
    count: 23,
  },
  {
    lng: 116.441548,
    lat: 39.878262,
    count: 24,
  },
  {
    lng: 116.318947,
    lat: 39.942735,
    count: 25,
  },
  {
    lng: 116.382585,
    lat: 39.941949,
    count: 26,
  },
  {
    lng: 116.42042,
    lat: 39.884017,
    count: 27,
  },
  {
    lng: 116.31744,
    lat: 39.892561,
    count: 28,
  },
  {
    lng: 116.407059,
    lat: 39.912438,
    count: 29,
  },
  {
    lng: 116.412351,
    lat: 39.888082,
    count: 30,
  },
  {
    lng: 116.444341,
    lat: 39.915891,
    count: 31,
  },
  {
    lng: 116.335385,
    lat: 39.741756,
    count: 32,
  },
  {
    lng: 116.3926,
    lat: 40.008733,
    count: 33,
  },
  {
    lng: 116.389731,
    lat: 39.92292,
    count: 34,
  },
  {
    lng: 116.413371,
    lat: 39.874483,
    count: 35,
  },
  {
    lng: 116.199752,
    lat: 39.911717,
    count: 36,
  },
  {
    lng: 116.278472,
    lat: 40.254994,
    count: 37,
  },
  {
    lng: 116.464252,
    lat: 39.925828,
    count: 38,
  },
  {
    lng: 116.479475,
    lat: 39.937945,
    count: 39,
  },
  {
    lng: 116.415599,
    lat: 39.956902,
    count: 40,
  },
  {
    lng: 116.355675,
    lat: 39.870089,
    count: 41,
  },
  {
    lng: 116.295267,
    lat: 39.987171,
    count: 42,
  },
  {
    lng: 116.323634,
    lat: 39.911692,
    count: 43,
  },
  {
    lng: 116.692769,
    lat: 40.173307,
    count: 44,
  },
  {
    lng: 116.287888,
    lat: 39.928531,
    count: 45,
  },
  {
    lng: 116.386502,
    lat: 39.922747,
    count: 46,
  },
  {
    lng: 116.236773,
    lat: 40.218341,
    count: 47,
  },
  {
    lng: 116.490636,
    lat: 39.804253,
    count: 48,
  },
  {
    lng: 116.391095,
    lat: 39.925791,
    count: 49,
  },
  {
    lng: 116.472402,
    lat: 39.769178,
    count: 50,
  },
  {
    lng: 116.38657,
    lat: 39.956731,
    count: 51,
  },
  {
    lng: 116.427536,
    lat: 39.943671,
    count: 52,
  },
  {
    lng: 116.374547,
    lat: 39.967588,
    count: 53,
  },
  {
    lng: 116.380383,
    lat: 39.871634,
    count: 54,
  },
  {
    lng: 116.376092,
    lat: 39.965485,
    count: 55,
  },
  {
    lng: 116.352424,
    lat: 39.91811,
    count: 56,
  },
  {
    lng: 116.020157,
    lat: 40.348526,
    count: 57,
  },
  {
    lng: 116.416201,
    lat: 39.951736,
    count: 58,
  },
  {
    lng: 116.405392,
    lat: 39.908738,
    count: 59,
  },
  {
    lng: 116.49238,
    lat: 39.926248,
    count: 60,
  },
  {
    lng: 116.389282,
    lat: 39.988391,
    count: 61,
  },
  {
    lng: 116.396683,
    lat: 39.923487,
    count: 62,
  },
  {
    lng: 116.41718,
    lat: 39.905213,
    count: 63,
  },
  {
    lng: 116.321512,
    lat: 39.913192,
    count: 64,
  },
  {
    lng: 116.260028,
    lat: 40.03353,
    count: 65,
  },
  {
    lng: 116.394846,
    lat: 39.911168,
    count: 66,
  },
  {
    lng: 116.374767,
    lat: 39.96608,
    count: 67,
  },
  {
    lng: 116.6841,
    lat: 39.909762,
    count: 68,
  },
  {
    lng: 116.3838,
    lat: 39.95811,
    count: 69,
  },
  {
    lng: 116.39243,
    lat: 40.01143,
    count: 70,
  },
  {
    lng: 116.661912,
    lat: 40.121137,
    count: 71,
  },
  {
    lng: 116.333056,
    lat: 39.90123,
    count: 72,
  },
  {
    lng: 116.484839,
    lat: 39.881729,
    count: 73,
  },
  {
    lng: 116.360923,
    lat: 39.935745,
    count: 74,
  },
  {
    lng: 116.408531,
    lat: 39.953194,
    count: 75,
  },
  {
    lng: 116.417916,
    lat: 39.954029,
    count: 76,
  },
  {
    lng: 116.412215,
    lat: 39.992282,
    count: 77,
  },
  {
    lng: 116.181532,
    lat: 40.048762,
    count: 78,
  },
  {
    lng: 116.434848,
    lat: 40.070463,
    count: 79,
  },
  {
    lng: 116.385039,
    lat: 39.956937,
    count: 80,
  },
  {
    lng: 116.755067,
    lat: 39.854499,
    count: 81,
  },
  {
    lng: 116.396061,
    lat: 39.912841,
    count: 82,
  },
  {
    lng: 116.474303,
    lat: 39.971398,
    count: 83,
  },
  {
    lng: 116.376262,
    lat: 39.85811,
    count: 84,
  },
  {
    lng: 116.403783,
    lat: 39.954469,
    count: 85,
  },
  {
    lng: 116.339136,
    lat: 39.729159,
    count: 86,
  },
  {
    lng: 116.240159,
    lat: 39.947003,
    count: 87,
  },
  {
    lng: 117.107541,
    lat: 40.141457,
    count: 88,
  },
  {
    lng: 116.341813,
    lat: 40.078786,
    count: 89,
  },
  {
    lng: 116.320648,
    lat: 39.706455,
    count: 90,
  },
  {
    lng: 116.402566,
    lat: 39.960873,
    count: 91,
  },
  {
    lng: 114.849261,
    lat: 40.402999,
    count: 92,
  },
  {
    lng: 116.521064,
    lat: 39.834187,
    count: 93,
  },
  {
    lng: 116.329942,
    lat: 39.925327,
    count: 94,
  },
  {
    lng: 116.479852,
    lat: 39.974856,
    count: 95,
  },
  {
    lng: 116.399185,
    lat: 39.925736,
    count: 96,
  },
  {
    lng: 116.193166,
    lat: 39.911953,
    count: 1,
  },
  {
    lng: 116.400916,
    lat: 39.870614,
    count: 2,
  },
  {
    lng: 116.518041,
    lat: 39.956615,
    count: 3,
  },
  {
    lng: 116.388981,
    lat: 39.997716,
    count: 4,
  },
  {
    lng: 114.285852,
    lat: 39.863497,
    count: 5,
  },
  {
    lng: 116.294167,
    lat: 39.884599,
    count: 6,
  },
  {
    lng: 116.394235,
    lat: 39.996845,
    count: 7,
  },
  {
    lng: 116.32471,
    lat: 39.970486,
    count: 8,
  },
  {
    lng: 116.496828,
    lat: 39.99335,
    count: 9,
  },
  {
    lng: 116.482534,
    lat: 39.934086,
    count: 10,
  },
  {
    lng: 116.454662,
    lat: 39.974981,
    count: 11,
  },
  {
    lng: 116.387076,
    lat: 39.87631,
    count: 12,
  },
  {
    lng: 116.433341,
    lat: 39.92803,
    count: 13,
  },
  {
    lng: 115.382196,
    lat: 39.941606,
    count: 14,
  },
  {
    lng: 115.244286,
    lat: 39.82905,
    count: 15,
  },
  {
    lng: 116.566672,
    lat: 40.176097,
    count: 16,
  },
  {
    lng: 116.686862,
    lat: 39.908507,
    count: 17,
  },
  {
    lng: 117.240166,
    lat: 40.175796,
    count: 18,
  },
  {
    lng: 116.428661,
    lat: 39.866958,
    count: 19,
  },
  {
    lng: 116.443292,
    lat: 39.917447,
    count: 20,
  },
  {
    lng: 116.356538,
    lat: 39.926711,
    count: 21,
  },
  {
    lng: 116.194086,
    lat: 39.912242,
    count: 22,
  },
  {
    lng: 116.379861,
    lat: 39.971831,
    count: 23,
  },
  {
    lng: 116.377966,
    lat: 39.874647,
    count: 24,
  },
  {
    lng: 116.466778,
    lat: 39.926304,
    count: 25,
  },
  {
    lng: 116.692078,
    lat: 40.170197,
    count: 26,
  },
  {
    lng: 116.428651,
    lat: 39.94275,
    count: 27,
  },
  {
    lng: 116.322655,
    lat: 39.939517,
    count: 28,
  },
  {
    lng: 116.445601,
    lat: 39.98439,
    count: 29,
  },
  {
    lng: 116.662833,
    lat: 39.912238,
    count: 30,
  },
  {
    lng: 116.394183,
    lat: 39.925557,
    count: 31,
  },
  {
    lng: 116.312788,
    lat: 39.860017,
    count: 32,
  },
  {
    lng: 116.104708,
    lat: 40.065563,
    count: 33,
  },
  {
    lng: 116.204443,
    lat: 39.938295,
    count: 34,
  },
  {
    lng: 116.310917,
    lat: 39.89381,
    count: 35,
  },
  {
    lng: 116.265851,
    lat: 39.834247,
    count: 36,
  },
  {
    lng: 116.33501,
    lat: 39.742507,
    count: 37,
  },
  {
    lng: 116.397519,
    lat: 39.99794,
    count: 38,
  },
  {
    lng: 116.441252,
    lat: 39.915566,
    count: 39,
  },
  {
    lng: 116.441898,
    lat: 39.856454,
    count: 40,
  },
  {
    lng: 116.446552,
    lat: 39.946418,
    count: 41,
  },
  {
    lng: 116.359761,
    lat: 39.895327,
    count: 42,
  },
  {
    lng: 116.349168,
    lat: 39.893551,
    count: 43,
  },
  {
    lng: 116.476819,
    lat: 39.94388,
    count: 44,
  },
  {
    lng: 116.29912,
    lat: 39.988433,
    count: 45,
  },
  {
    lng: 116.467912,
    lat: 39.770524,
    count: 46,
  },
  {
    lng: 116.382134,
    lat: 39.862204,
    count: 47,
  },
  {
    lng: 116.483378,
    lat: 39.93431,
    count: 48,
  },
  {
    lng: 116.35395,
    lat: 39.910738,
    count: 49,
  },
  {
    lng: 116.398771,
    lat: 39.976433,
    count: 50,
  },
  {
    lng: 116.462189,
    lat: 39.925864,
    count: 51,
  },
  {
    lng: 116.378957,
    lat: 39.806676,
    count: 52,
  },
  {
    lng: 116.334199,
    lat: 39.900985,
    count: 53,
  },
  {
    lng: 116.443961,
    lat: 39.913511,
    count: 54,
  },
  {
    lng: 116.388829,
    lat: 39.95053,
    count: 55,
  },
  {
    lng: 116.319655,
    lat: 39.892339,
    count: 56,
  },
  {
    lng: 117.431959,
    lat: 40.630521,
    count: 57,
  },
  {
    lng: 117.108914,
    lat: 40.140406,
    count: 58,
  },
  {
    lng: 116.43019,
    lat: 39.880486,
    count: 59,
  },
  {
    lng: 116.250698,
    lat: 39.907186,
    count: 60,
  },
  {
    lng: 116.341065,
    lat: 39.766082,
    count: 61,
  },
  {
    lng: 116.290335,
    lat: 39.812431,
    count: 62,
  },
  {
    lng: 116.360813,
    lat: 39.936362,
    count: 63,
  },
  {
    lng: 116.400282,
    lat: 39.995027,
    count: 64,
  },
  {
    lng: 116.317257,
    lat: 39.889092,
    count: 65,
  },
  {
    lng: 116.482537,
    lat: 39.954978,
    count: 66,
  },
  {
    lng: 116.38496,
    lat: 39.954428,
    count: 67,
  },
  {
    lng: 116.391803,
    lat: 39.911587,
    count: 68,
  },
  {
    lng: 116.4266,
    lat: 39.867228,
    count: 69,
  },
  {
    lng: 116.145997,
    lat: 39.790856,
    count: 70,
  },
  {
    lng: 116.430265,
    lat: 39.867451,
    count: 71,
  },
  {
    lng: 116.315479,
    lat: 39.940668,
    count: 72,
  },
  {
    lng: 116.359393,
    lat: 39.975431,
    count: 73,
  },
  {
    lng: 116.382347,
    lat: 39.968935,
    count: 74,
  },
  {
    lng: 115.987169,
    lat: 40.454625,
    count: 75,
  },
  {
    lng: 115.489292,
    lat: 39.931242,
    count: 76,
  },
  {
    lng: 115.368238,
    lat: 33.879807,
    count: 77,
  },
  {
    lng: 115.493761,
    lat: 39.923885,
    count: 78,
  },
  {
    lng: 115.53666,
    lat: 39.8778,
    count: 79,
  },
  {
    lng: 113.501743,
    lat: 39.79602,
    count: 80,
  },
  {
    lng: 116.582818,
    lat: 39.932646,
    count: 81,
  },
  {
    lng: 116.417364,
    lat: 39.869292,
    count: 82,
  },
  {
    lng: 116.354305,
    lat: 39.872022,
    count: 83,
  },
  {
    lng: 116.375162,
    lat: 40.01344,
    count: 84,
  },
  {
    lng: 116.400523,
    lat: 39.881031,
    count: 85,
  },
  {
    lng: 116.315365,
    lat: 39.945005,
    count: 86,
  },
  {
    lng: 113.44088,
    lat: 43.810753,
    count: 87,
  },
  {
    lng: 116.679285,
    lat: 39.916527,
    count: 88,
  },
  {
    lng: 116.483694,
    lat: 39.946929,
    count: 89,
  },
  {
    lng: 116.341678,
    lat: 40.080021,
    count: 90,
  },
  {
    lng: 116.017167,
    lat: 39.889175,
    count: 91,
  },
  {
    lng: 116.454692,
    lat: 39.954167,
    count: 92,
  },
  {
    lng: 116.410129,
    lat: 40.050952,
    count: 93,
  },
  {
    lng: 116.418556,
    lat: 39.872365,
    count: 94,
  },
  {
    lng: 116.25432,
    lat: 40.142367,
    count: 95,
  },
  {
    lng: 116.658763,
    lat: 39.891072,
    count: 96,
  },
  {
    lng: 116.305312,
    lat: 39.9953,
    count: 97,
  },
  {
    lng: 116.388761,
    lat: 39.951259,
    count: 98,
  },
  {
    lng: 116.68017,
    lat: 39.873413,
    count: 99,
  },
  {
    lng: 116.090539,
    lat: 39.796301,
    count: 1,
  },
  {
    lng: 116.380305,
    lat: 39.78354,
    count: 2,
  },
  {
    lng: 116.348831,
    lat: 40.022543,
    count: 3,
  },
  {
    lng: 116.438133,
    lat: 39.960988,
    count: 4,
  },
  {
    lng: 116.199587,
    lat: 39.911,
    count: 5,
  },
  {
    lng: 116.081743,
    lat: 39.788321,
    count: 6,
  },
  {
    lng: 117.24044,
    lat: 40.1752,
    count: 7,
  },
  {
    lng: 116.636141,
    lat: 40.327724,
    count: 8,
  },
  {
    lng: 116.453166,
    lat: 39.973511,
    count: 9,
  },
  {
    lng: 116.583381,
    lat: 39.953315,
    count: 10,
  },
  {
    lng: 116.236326,
    lat: 39.90595,
    count: 11,
  },
  {
    lng: 116.328305,
    lat: 39.781647,
    count: 12,
  },
  {
    lng: 116.260012,
    lat: 39.984951,
    count: 13,
  },
  {
    lng: 116.254938,
    lat: 39.916206,
    count: 14,
  },
  {
    lng: 116.85469,
    lat: 40.474419,
    count: 15,
  },
  {
    lng: 116.309389,
    lat: 39.971918,
    count: 16,
  },
  {
    lng: 116.310732,
    lat: 39.971517,
    count: 17,
  },
  {
    lng: 116.401885,
    lat: 39.847641,
    count: 18,
  },
  {
    lng: 116.427771,
    lat: 39.880572,
    count: 19,
  },
  {
    lng: 116.430537,
    lat: 39.880968,
    count: 20,
  },
  {
    lng: 116.550673,
    lat: 39.895212,
    count: 21,
  },
  {
    lng: 116.345906,
    lat: 39.815152,
    count: 22,
  },
  {
    lng: 116.512016,
    lat: 39.868573,
    count: 23,
  },
  {
    lng: 115.894604,
    lat: 39.803644,
    count: 24,
  },
  {
    lng: 116.32497,
    lat: 40.083198,
    count: 25,
  },
  {
    lng: 116.315523,
    lat: 39.858242,
    count: 26,
  },
  {
    lng: 116.465052,
    lat: 39.903055,
    count: 27,
  },
  {
    lng: 116.464814,
    lat: 39.924176,
    count: 28,
  },
  {
    lng: 115.959538,
    lat: 39.727218,
    count: 29,
  },
  {
    lng: 116.478895,
    lat: 39.954472,
    count: 30,
  },
  {
    lng: 116.337546,
    lat: 39.741337,
    count: 31,
  },
  {
    lng: 116.504757,
    lat: 39.83778,
    count: 32,
  },
  {
    lng: 116.393143,
    lat: 40.02725,
    count: 33,
  },
  {
    lng: 116.23419,
    lat: 40.217361,
    count: 34,
  },
  {
    lng: 116.368688,
    lat: 39.829561,
    count: 35,
  },
  {
    lng: 116.460134,
    lat: 39.983721,
    count: 36,
  },
  {
    lng: 116.381539,
    lat: 39.746766,
    count: 37,
  },
  {
    lng: 116.291759,
    lat: 39.983886,
    count: 38,
  },
  {
    lng: 116.377613,
    lat: 39.817895,
    count: 39,
  },
  {
    lng: 116.306646,
    lat: 39.956296,
    count: 40,
  },
  {
    lng: 116.160747,
    lat: 39.818863,
    count: 41,
  },
  {
    lng: 116.392912,
    lat: 40.001989,
    count: 42,
  },
  {
    lng: 116.199115,
    lat: 39.91276,
    count: 43,
  },
  {
    lng: 116.434577,
    lat: 39.812232,
    count: 44,
  },
  {
    lng: 116.495843,
    lat: 39.925538,
    count: 45,
  },
  {
    lng: 116.333803,
    lat: 39.913224,
    count: 46,
  },
  {
    lng: 116.489277,
    lat: 39.941842,
    count: 47,
  },
  {
    lng: 116.510514,
    lat: 39.973547,
    count: 48,
  },
  {
    lng: 116.474685,
    lat: 39.936648,
    count: 49,
  },
  {
    lng: 116.418054,
    lat: 39.905091,
    count: 50,
  },
  {
    lng: 116.285529,
    lat: 39.926274,
    count: 51,
  },
  {
    lng: 116.289399,
    lat: 39.948054,
    count: 52,
  },
  {
    lng: 116.508241,
    lat: 39.920234,
    count: 53,
  },
  {
    lng: 116.317979,
    lat: 40.000721,
    count: 54,
  },
  {
    lng: 116.428324,
    lat: 39.868263,
    count: 55,
  },
  {
    lng: 116.407517,
    lat: 40.016715,
    count: 56,
  },
  {
    lng: 116.338841,
    lat: 39.969646,
    count: 57,
  },
  {
    lng: 116.495703,
    lat: 39.992607,
    count: 58,
  },
  {
    lng: 116.369659,
    lat: 39.97595,
    count: 59,
  },
  {
    lng: 116.291709,
    lat: 39.96228,
    count: 60,
  },
  {
    lng: 116.311003,
    lat: 39.998264,
    count: 61,
  },
  {
    lng: 116.391429,
    lat: 39.93324,
    count: 62,
  },
  {
    lng: 116.406033,
    lat: 39.95407,
    count: 63,
  },
  {
    lng: 116.391856,
    lat: 39.912004,
    count: 64,
  },
  {
    lng: 116.356434,
    lat: 39.871474,
    count: 65,
  },
  {
    lng: 116.477081,
    lat: 39.970334,
    count: 66,
  },
  {
    lng: 116.475337,
    lat: 39.939749,
    count: 67,
  },
  {
    lng: 116.752911,
    lat: 39.916369,
    count: 68,
  },
  {
    lng: 116.470361,
    lat: 39.874606,
    count: 69,
  },
  {
    lng: 116.489172,
    lat: 39.949033,
    count: 70,
  },
  {
    lng: 116.502514,
    lat: 39.973734,
    count: 71,
  },
  {
    lng: 116.186985,
    lat: 39.920185,
    count: 72,
  },
  {
    lng: 116.583743,
    lat: 39.95335,
    count: 73,
  },
  {
    lng: 116.119183,
    lat: 39.732055,
    count: 74,
  },
  {
    lng: 116.391902,
    lat: 39.93331,
    count: 75,
  },
  {
    lng: 116.488588,
    lat: 39.953371,
    count: 76,
  },
  {
    lng: 116.381798,
    lat: 39.975717,
    count: 77,
  },
  {
    lng: 116.384689,
    lat: 39.827773,
    count: 78,
  },
  {
    lng: 116.445287,
    lat: 39.894354,
    count: 79,
  },
  {
    lng: 116.24048,
    lat: 39.947687,
    count: 80,
  },
  {
    lng: 116.413605,
    lat: 40.04902,
    count: 81,
  },
  {
    lng: 116.239012,
    lat: 39.904288,
    count: 82,
  },
  {
    lng: 116.408522,
    lat: 40.016971,
    count: 83,
  },
  {
    lng: 116.475833,
    lat: 39.947107,
    count: 84,
  },
  {
    lng: 116.43476,
    lat: 39.901671,
    count: 85,
  },
  {
    lng: 116.40229,
    lat: 39.869205,
    count: 86,
  },
  {
    lng: 116.226013,
    lat: 40.213485,
    count: 87,
  },
  {
    lng: 116.689042,
    lat: 39.889192,
    count: 88,
  },
  {
    lng: 116.377252,
    lat: 39.873622,
    count: 89,
  },
  {
    lng: 116.53061,
    lat: 40.103146,
    count: 90,
  },
  {
    lng: 116.416271,
    lat: 39.905187,
    count: 91,
  },
  {
    lng: 116.531169,
    lat: 39.91276,
    count: 92,
  },
  {
    lng: 116.17849,
    lat: 40.075692,
    count: 93,
  },
  {
    lng: 116.188616,
    lat: 40.102413,
    count: 94,
  },
  {
    lng: 116.531799,
    lat: 39.84939,
    count: 95,
  },
  {
    lng: 116.443707,
    lat: 39.87558,
    count: 96,
  },
  {
    lng: 116.814298,
    lat: 40.53416,
    count: 97,
  },
  {
    lng: 116.428247,
    lat: 39.873118,
    count: 98,
  },
  {
    lng: 116.290774,
    lat: 39.963116,
    count: 99,
  },
  {
    lng: 116.299918,
    lat: 39.936094,
    count: 100,
  },
  {
    lng: 116.489325,
    lat: 39.944556,
    count: 101,
  },
  {
    lng: 116.339297,
    lat: 40.038739,
    count: 102,
  },
  {
    lng: 116.485631,
    lat: 39.804667,
    count: 103,
  },
  {
    lng: 116.480549,
    lat: 39.955012,
    count: 104,
  },
  {
    lng: 116.381977,
    lat: 39.878496,
    count: 1,
  },
  {
    lng: 116.259586,
    lat: 40.043622,
    count: 2,
  },
  {
    lng: 116.587813,
    lat: 40.015618,
    count: 3,
  },
  {
    lng: 116.35472,
    lat: 39.975865,
    count: 4,
  },
  {
    lng: 116.644011,
    lat: 40.299776,
    count: 5,
  },
  {
    lng: 116.299449,
    lat: 39.95324,
    count: 6,
  },
  {
    lng: 116.332228,
    lat: 39.900741,
    count: 7,
  },
  {
    lng: 116.377459,
    lat: 39.80869,
    count: 8,
  },
  {
    lng: 116.657873,
    lat: 40.120521,
    count: 9,
  },
  {
    lng: 116.154466,
    lat: 39.731616,
    count: 10,
  },
  {
    lng: 116.845418,
    lat: 40.375612,
    count: 11,
  },
  {
    lng: 116.466696,
    lat: 39.766475,
    count: 12,
  },
  {
    lng: 116.45685,
    lat: 40.011172,
    count: 13,
  },
  {
    lng: 116.406651,
    lat: 39.970182,
    count: 14,
  },
  {
    lng: 116.428161,
    lat: 39.866144,
    count: 15,
  },
  {
    lng: 116.504801,
    lat: 39.836822,
    count: 16,
  },
  {
    lng: 116.439995,
    lat: 39.81546,
    count: 17,
  },
  {
    lng: 116.559057,
    lat: 39.936131,
    count: 18,
  },
  {
    lng: 116.225584,
    lat: 39.842961,
    count: 19,
  },
  {
    lng: 116.64103,
    lat: 40.141812,
    count: 20,
  },
  {
    lng: 116.306028,
    lat: 39.860581,
    count: 21,
  },
  {
    lng: 116.403426,
    lat: 40.066843,
    count: 22,
  },
  {
    lng: 116.399935,
    lat: 40.009504,
    count: 23,
  },
  {
    lng: 116.309222,
    lat: 39.913107,
    count: 24,
  },
  {
    lng: 116.295396,
    lat: 39.784501,
    count: 25,
  },
  {
    lng: 116.289673,
    lat: 39.963462,
    count: 26,
  },
  {
    lng: 116.445731,
    lat: 40.051509,
    count: 27,
  },
  {
    lng: 116.395362,
    lat: 39.975426,
    count: 28,
  },
  {
    lng: 116.605608,
    lat: 40.0489,
    count: 29,
  },
  {
    lng: 116.421157,
    lat: 39.975636,
    count: 30,
  },
  {
    lng: 116.452161,
    lat: 39.977081,
    count: 31,
  },
  {
    lng: 116.242604,
    lat: 40.22134,
    count: 32,
  },
  {
    lng: 112.32532,
    lat: 33.970535,
    count: 33,
  },
  {
    lng: 116.685587,
    lat: 39.926874,
    count: 34,
  },
  {
    lng: 116.39186,
    lat: 39.912056,
    count: 35,
  },
  {
    lng: 116.326004,
    lat: 39.974148,
    count: 36,
  },
  {
    lng: 116.677542,
    lat: 39.892667,
    count: 37,
  },
  {
    lng: 116.835958,
    lat: 40.375008,
    count: 38,
  },
  {
    lng: 116.484969,
    lat: 39.956518,
    count: 39,
  },
  {
    lng: 115.95685,
    lat: 39.732297,
    count: 40,
  },
  {
    lng: 116.380024,
    lat: 39.872133,
    count: 41,
  },
  {
    lng: 116.396477,
    lat: 39.928246,
    count: 42,
  },
  {
    lng: 116.390986,
    lat: 39.92675,
    count: 43,
  },
  {
    lng: 116.346845,
    lat: 40.018932,
    count: 44,
  },
  {
    lng: 116.381966,
    lat: 39.970729,
    count: 45,
  },
  {
    lng: 116.337349,
    lat: 39.752131,
    count: 46,
  },
  {
    lng: 116.494995,
    lat: 39.99648,
    count: 47,
  },
  {
    lng: 116.314029,
    lat: 39.516896,
    count: 48,
  },
  {
    lng: 116.662237,
    lat: 40.122764,
    count: 49,
  },
  {
    lng: 116.841367,
    lat: 40.379938,
    count: 50,
  },
  {
    lng: 116.365928,
    lat: 39.975824,
    count: 51,
  },
  {
    lng: 116.489236,
    lat: 39.939992,
    count: 52,
  },
  {
    lng: 116.363994,
    lat: 39.852943,
    count: 53,
  },
  {
    lng: 116.34283,
    lat: 39.754081,
    count: 54,
  },
  {
    lng: 116.361183,
    lat: 39.894634,
    count: 55,
  },
  {
    lng: 116.412822,
    lat: 39.9769,
    count: 56,
  },
  {
    lng: 116.40433,
    lat: 39.97541,
    count: 57,
  },
  {
    lng: 116.413478,
    lat: 39.948868,
    count: 58,
  },
  {
    lng: 116.406129,
    lat: 39.932386,
    count: 59,
  },
  {
    lng: 116.451852,
    lat: 39.995137,
    count: 60,
  },
  {
    lng: 116.349718,
    lat: 39.870509,
    count: 61,
  },
  {
    lng: 116.568628,
    lat: 39.926382,
    count: 62,
  },
  {
    lng: 116.643881,
    lat: 40.300758,
    count: 63,
  },
  {
    lng: 116.440445,
    lat: 39.881325,
    count: 64,
  },
  {
    lng: 116.48299,
    lat: 39.869588,
    count: 65,
  },
  {
    lng: 116.323732,
    lat: 40.082528,
    count: 66,
  },
  {
    lng: 116.257834,
    lat: 39.876782,
    count: 67,
  },
  {
    lng: 116.3596,
    lat: 40.034545,
    count: 68,
  },
  {
    lng: 116.349841,
    lat: 39.875597,
    count: 69,
  },
  {
    lng: 116.403928,
    lat: 39.879252,
    count: 70,
  },
  {
    lng: 116.42005,
    lat: 39.833467,
    count: 71,
  },
  {
    lng: 116.663001,
    lat: 39.91046,
    count: 72,
  },
  {
    lng: 116.406568,
    lat: 39.908939,
    count: 73,
  },
  {
    lng: 116.405188,
    lat: 39.909159,
    count: 74,
  },
  {
    lng: 116.415107,
    lat: 39.872521,
    count: 75,
  },
  {
    lng: 116.321197,
    lat: 39.767552,
    count: 76,
  },
  {
    lng: 116.211721,
    lat: 39.688611,
    count: 77,
  },
  {
    lng: 116.451346,
    lat: 39.882833,
    count: 78,
  },
  {
    lng: 116.557492,
    lat: 39.875288,
    count: 79,
  },
  {
    lng: 116.420546,
    lat: 39.899053,
    count: 80,
  },
  {
    lng: 116.440968,
    lat: 39.898035,
    count: 81,
  },
  {
    lng: 116.096699,
    lat: 39.94052,
    count: 82,
  },
  {
    lng: 116.410422,
    lat: 39.996992,
    count: 83,
  },
  {
    lng: 116.376382,
    lat: 40.040343,
    count: 84,
  },
  {
    lng: 116.664304,
    lat: 39.912656,
    count: 85,
  },
  {
    lng: 116.477188,
    lat: 39.972973,
    count: 86,
  },
  {
    lng: 116.400057,
    lat: 39.883241,
    count: 87,
  },
  {
    lng: 116.287055,
    lat: 39.865057,
    count: 88,
  },
  {
    lng: 113.47842,
    lat: 39.975087,
    count: 89,
  },
  {
    lng: 114.481061,
    lat: 39.973994,
    count: 90,
  },
  {
    lng: 116.428439,
    lat: 34.943564,
    count: 91,
  },
  {
    lng: 116.507173,
    lat: 36.815616,
    count: 92,
  },
  {
    lng: 113.405081,
    lat: 33.959449,
    count: 93,
  },
  {
    lng: 116.40121,
    lat: 39.869219,
    count: 94,
  },
  {
    lng: 118.437595,
    lat: 32.878214,
    count: 95,
  },
  {
    lng: 116.448647,
    lat: 39.981149,
    count: 96,
  },
  {
    lng: 116.239298,
    lat: 40.218372,
    count: 97,
  },
  {
    lng: 116.402223,
    lat: 39.960511,
    count: 98,
  },
  {
    lng: 116.664158,
    lat: 40.120092,
    count: 99,
  },
  {
    lng: 116.119102,
    lat: 40.233172,
    count: 99,
  },
  {
    lng: 116.666931,
    lat: 39.917685,
    count: 100,
  },
  {
    lng: 115.977448,
    lat: 40.456067,
    count: 101,
  },
  {
    lng: 116.355541,
    lat: 39.911069,
    count: 1,
  },
  {
    lng: 116.474525,
    lat: 39.944593,
    count: 2,
  },
  {
    lng: 116.35277,
    lat: 39.910566,
    count: 3,
  },
  {
    lng: 116.310743,
    lat: 39.915123,
    count: 4,
  },
  {
    lng: 116.384415,
    lat: 39.948468,
    count: 5,
  },
  {
    lng: 116.470283,
    lat: 39.92274,
    count: 6,
  },
  {
    lng: 116.545304,
    lat: 39.632635,
    count: 7,
  },
  {
    lng: 116.358194,
    lat: 39.898647,
    count: 8,
  },
  {
    lng: 116.311002,
    lat: 39.917643,
    count: 9,
  },
  {
    lng: 116.387084,
    lat: 39.959407,
    count: 10,
  },
  {
    lng: 116.399161,
    lat: 39.972319,
    count: 11,
  },
  {
    lng: 116.41415,
    lat: 40.048341,
    count: 12,
  },
  {
    lng: 116.283811,
    lat: 39.862684,
    count: 13,
  },
  {
    lng: 116.154671,
    lat: 39.793723,
    count: 14,
  },
  {
    lng: 116.338059,
    lat: 40.034402,
    count: 15,
  },
  {
    lng: 116.564921,
    lat: 40.336754,
    count: 16,
  },
  {
    lng: 116.396465,
    lat: 39.928236,
    count: 17,
  },
  {
    lng: 116.345465,
    lat: 39.815134,
    count: 18,
  },
  {
    lng: 117.105997,
    lat: 40.140457,
    count: 19,
  },
  {
    lng: 116.458762,
    lat: 40.011334,
    count: 20,
  },
  {
    lng: 116.330312,
    lat: 39.892811,
    count: 21,
  },
  {
    lng: 116.246434,
    lat: 39.981835,
    count: 22,
  },
  {
    lng: 116.482718,
    lat: 39.967001,
    count: 23,
  },
  {
    lng: 116.531887,
    lat: 39.91018,
    count: 24,
  },
  {
    lng: 116.303479,
    lat: 40.030135,
    count: 25,
  },
  {
    lng: 116.567226,
    lat: 39.897282,
    count: 26,
  },
  {
    lng: 116.443197,
    lat: 39.810833,
    count: 27,
  },
  {
    lng: 116.271062,
    lat: 40.205664,
    count: 28,
  },
  {
    lng: 116.430094,
    lat: 39.975569,
    count: 29,
  },
  {
    lng: 116.320701,
    lat: 40.030695,
    count: 30,
  },
  {
    lng: 116.318237,
    lat: 39.945583,
    count: 31,
  },
  {
    lng: 116.384177,
    lat: 39.976624,
    count: 32,
  },
  {
    lng: 116.609751,
    lat: 39.67949,
    count: 33,
  },
  {
    lng: 116.470793,
    lat: 39.976487,
    count: 34,
  },
  {
    lng: 116.451952,
    lat: 39.994476,
    count: 35,
  },
  {
    lng: 116.898355,
    lat: 40.465999,
    count: 36,
  },
  {
    lng: 116.324261,
    lat: 39.97006,
    count: 37,
  },
  {
    lng: 116.345849,
    lat: 39.902789,
    count: 38,
  },
  {
    lng: 116.392448,
    lat: 39.949775,
    count: 39,
  },
  {
    lng: 116.404969,
    lat: 39.869671,
    count: 40,
  },
  {
    lng: 116.391978,
    lat: 39.951331,
    count: 41,
  },
  {
    lng: 116.293389,
    lat: 39.963228,
    count: 42,
  },
  {
    lng: 116.354359,
    lat: 39.871352,
    count: 43,
  },
  {
    lng: 116.250473,
    lat: 39.905799,
    count: 44,
  },
  {
    lng: 116.529661,
    lat: 39.912838,
    count: 45,
  },
  {
    lng: 116.400244,
    lat: 39.953832,
    count: 46,
  },
  {
    lng: 116.33445,
    lat: 39.790326,
    count: 47,
  },
  {
    lng: 116.327622,
    lat: 39.795556,
    count: 48,
  },
  {
    lng: 116.394292,
    lat: 39.948671,
    count: 49,
  },
  {
    lng: 116.841248,
    lat: 40.382222,
    count: 50,
  },
  {
    lng: 116.39621,
    lat: 39.912717,
    count: 51,
  },
  {
    lng: 116.29526,
    lat: 39.839011,
    count: 52,
  },
  {
    lng: 116.390165,
    lat: 39.949776,
    count: 53,
  },
  {
    lng: 116.521784,
    lat: 39.83616,
    count: 54,
  },
  {
    lng: 116.393875,
    lat: 39.996715,
    count: 55,
  },
  {
    lng: 116.724049,
    lat: 39.951418,
    count: 56,
  },
  {
    lng: 116.434731,
    lat: 39.90149,
    count: 57,
  },
  {
    lng: 116.356244,
    lat: 39.910916,
    count: 58,
  },
  {
    lng: 116.457003,
    lat: 40.008583,
    count: 59,
  },
  {
    lng: 116.4954,
    lat: 39.922626,
    count: 60,
  },
  {
    lng: 116.451481,
    lat: 39.81428,
    count: 61,
  },
  {
    lng: 116.33145,
    lat: 39.891865,
    count: 62,
  },
  {
    lng: 116.2393,
    lat: 40.236043,
    count: 63,
  },
  {
    lng: 116.424888,
    lat: 39.976048,
    count: 64,
  },
  {
    lng: 116.336565,
    lat: 39.751957,
    count: 65,
  },
  {
    lng: 116.225132,
    lat: 39.872326,
    count: 66,
  },
  {
    lng: 116.564558,
    lat: 39.886867,
    count: 67,
  },
  {
    lng: 116.12651,
    lat: 39.735538,
    count: 68,
  },
  {
    lng: 117.008136,
    lat: 40.376266,
    count: 69,
  },
  {
    lng: 116.420949,
    lat: 39.87321,
    count: 70,
  },
  {
    lng: 115.994695,
    lat: 39.701187,
    count: 71,
  },
  {
    lng: 116.400738,
    lat: 39.908585,
    count: 72,
  },
  {
    lng: 116.424696,
    lat: 39.962873,
    count: 73,
  },
  {
    lng: 116.3266,
    lat: 40.08181,
    count: 74,
  },
  {
    lng: 116.331061,
    lat: 39.892843,
    count: 75,
  },
  {
    lng: 116.29248,
    lat: 39.988895,
    count: 76,
  },
  {
    lng: 116.466217,
    lat: 39.92232,
    count: 77,
  },
  {
    lng: 116.324551,
    lat: 39.940216,
    count: 78,
  },
  {
    lng: 116.289698,
    lat: 39.815009,
    count: 79,
  },
  {
    lng: 116.366762,
    lat: 40.240256,
    count: 80,
  },
  {
    lng: 116.331123,
    lat: 39.890995,
    count: 81,
  },
  {
    lng: 116.416662,
    lat: 39.869136,
    count: 82,
  },
  {
    lng: 116.417434,
    lat: 39.833862,
    count: 83,
  },
  {
    lng: 116.489063,
    lat: 39.950495,
    count: 84,
  },
  {
    lng: 116.425088,
    lat: 39.834288,
    count: 85,
  },
  {
    lng: 116.288801,
    lat: 39.965264,
    count: 86,
  },
  {
    lng: 116.29665,
    lat: 39.805464,
    count: 87,
  },
  {
    lng: 116.154403,
    lat: 39.792215,
    count: 88,
  },
  {
    lng: 116.320248,
    lat: 39.945852,
    count: 89,
  },
  {
    lng: 115.957457,
    lat: 39.599769,
    count: 90,
  },
  {
    lng: 116.353289,
    lat: 39.915624,
    count: 91,
  },
  {
    lng: 116.438992,
    lat: 39.876785,
    count: 92,
  },
  {
    lng: 116.10987,
    lat: 39.93606,
    count: 1,
  },
  {
    lng: 116.42478,
    lat: 39.9665,
    count: 2,
  },
  {
    lng: 116.295136,
    lat: 39.927262,
    count: 3,
  },
  {
    lng: 116.579446,
    lat: 39.846365,
    count: 4,
  },
  {
    lng: 116.507268,
    lat: 39.859229,
    count: 5,
  },
  {
    lng: 116.246201,
    lat: 39.943989,
    count: 6,
  },
  {
    lng: 116.321964,
    lat: 39.767435,
    count: 7,
  },
  {
    lng: 116.543317,
    lat: 39.877525,
    count: 8,
  },
  {
    lng: 116.402726,
    lat: 39.962996,
    count: 9,
  },
  {
    lng: 116.533757,
    lat: 39.916293,
    count: 10,
  },
  {
    lng: 116.297368,
    lat: 39.936267,
    count: 11,
  },
  {
    lng: 116.281225,
    lat: 39.947723,
    count: 12,
  },
  {
    lng: 116.651846,
    lat: 40.119239,
    count: 13,
  },
  {
    lng: 116.399739,
    lat: 39.960987,
    count: 14,
  },
  {
    lng: 116.316824,
    lat: 39.862571,
    count: 15,
  },
  {
    lng: 107.316824,
    lat: 33.862571,
    count: 85,
  },
  {
    lng: 108.316824,
    lat: 34.862571,
    count: 85,
  },
  {
    lng: 108.216824,
    lat: 34.262571,
    count: 15,
  },
  {
    lng: 107.316824,
    lat: 35.862571,
    count: 85,
  },
  {
    lng: 106.216824,
    lat: 38.862571,
    count: 85,
  },
];
export default BackgroundComponentMap;
