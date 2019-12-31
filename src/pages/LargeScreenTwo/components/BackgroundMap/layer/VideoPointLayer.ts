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
          layout: {
            'icon-image': 'videoImg',
            'icon-size': 0.3,
            'icon-offset': [0, -15],
          },
        });
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
