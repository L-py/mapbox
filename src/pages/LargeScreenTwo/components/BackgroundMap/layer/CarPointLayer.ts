// @ts-ignore
import mapboxgl from 'mapbox-gl';

class CarPointLayer {
  constructor(map, data, layername, sourceName) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.sourceName = sourceName;
  }

  addLayer = () => {
    this.map.loadImage(require('../../../images/car.png'), (error: any, image: any) => {
      if (error) throw error;
      if (!this.map.hasImage('car')) {
        this.map.addImage('car', image);
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
            'icon-image': 'car',
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

export default CarPointLayer;
