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
    this.map.loadImage(require('../../../images/Scenor.png'), (error: any, image: any) => {
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('scenor')) {
        this.map.addImage('scenor', image);
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
          minzoom: 10,
          maxzoom: 18,
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
    if(this.map.getLayer(this.layername)){
      this.map.removeLayer(this.layername);
    }
    if(this.map.getSource(this.sourceName)){
      this.map.removeSource(this.sourceName);
    }
  };
}

export default ScenorPointLayer;
