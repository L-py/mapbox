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
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('video')) {
        this.map.addImage('video', image);
      }
      this.map.addSource(this.sourceName, {
        'type': 'geojson',
        'data': this.data
      })
      if (!this.map.getLayer(this.layername)){
        this.map.addLayer({
          id: this.layername,
          type: 'symbol',
          source: this.sourceName,
          layout: {
            'icon-image': 'video',
            'icon-size': 0.3,
            'icon-offset': [0, -15],
          },
        });
      } 
    });
  };

  removeLayer = () => {
    this.map.removeLayer(this.layername);
    this.map.removeSource(this.sourceName);
  };
}

export default VideoPointLayer;
