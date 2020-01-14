// @ts-ignore
import mapboxgl from 'mapbox-gl';

class VideoPointLayer {
  constructor(map, data, layername, sourceName) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.sourceName = sourceName;
  }

  addLayer = () => {
    this.map.loadImage(require('../../../images/videos.png'), (error: any, image: any) => {
      console.log(data)
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('videoImg')) {
        this.map.addImage('videoImg', image);
      }
      if(!this.map.getSource(this.sourceName)){
        this.map.addSource(this.sourceName, {
          'type': 'geojson',
          'data': this.data
        })
      }
      if (!this.map.getLayer(this.layername)){
        this.map.addLayer({
          id: this.layername,
          type: 'symbol',
          source: this.sourceName,
          minzoom: 8,
          // maxzoom: 18,
          layout: {
            'icon-image': 'videoImg',
            'icon-size': 0.3,
            'icon-offset': [0, -15],
          },
        });
        // this.map.on('mouseenter', 'video', function() {
        //   this.map.getCanvas().style.cursor = 'pointer';
        // });
        // this.map.on('click', 'video', function(e:any) {
        //   console.log(e.features[0].geometry.coordinates);
        //   const infos = `<div style="height:250px;width:340px;display:flex;flex-warp:warp;flex-direction:row;background:url(${require('../../../images/videoInfo.png')}) no-repeat;background-size:340px 250px;">
        //     <div style="width:150px;margin:5px 5px;text-align:center;">监控点名称</div>
        //     <div style="width:320px;height:200px;margin-top:28px;margin-left:-150px;">
        //       <video style="width:100%;height:100%" id="videoElement"></video>
        //     </div>
        //   </div>`;
        //   var coordinates = e.features[0].geometry.coordinates.slice();
        //   console.log(coordinates);
        //   new mapboxgl.Popup({ offset: [50,-40] ,closeButton:false,})
        //     .setLngLat(coordinates)
        //     .setHTML(infos)
        //     .addTo(this.map);
        // });
      } 
    });
  };

  removeLayer = () => {
    if(this.map.getLayer(this.layername)){
      this.map.removeLayer(this.layername);
    }
    if(this.map.getSource(this.sourceName)){
      this.map.removeSource(this.sourceName);
    }
  };
}

export default VideoPointLayer;
