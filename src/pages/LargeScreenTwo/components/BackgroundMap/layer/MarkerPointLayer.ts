// @ts-ignore
import mapboxgl from 'mapbox-gl';

class MarkerPointLayer {
  constructor(map, data, layername, sourceName, code) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.sourceName = sourceName;
    this.code = code;
  }

  addLayer = () => {
    this.map.loadImage(require('../../../images/proIcon.png'), (error: any, image: any) => {
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('cluster')) {
        this.map.addImage('cluster', image);
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
          minzoom:10,
          maxzoom:16,
          layout: {
            'icon-image': 'cluster',
            'icon-size': 1,
            'icon-offset': [0, -15],
          },
        },this.code);
      }
    });
  };

  removeLayer = () => {
    this.map.removeLayer(this.layername);
    this.map.removeSource(this.sourceName);
  };
}

export default MarkerPointLayer;
