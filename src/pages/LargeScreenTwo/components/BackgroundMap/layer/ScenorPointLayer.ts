// @ts-ignore
import mapboxgl from 'mapbox-gl';

class ScenorPointLayer {
  constructor(map, data, layername, sourceName) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.sourceName = sourceName;
  }

  addLayer = () => {
    const option = this.addData();
    this.map.loadImage(require('../../../images/Scenor.png'), (error: any, image: any) => {
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('scenor')) {
        this.map.addImage('scenor', image);
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
            'icon-image': 'scenor',
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

export default ScenorPointLayer;
