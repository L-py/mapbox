// @ts-ignore
import mapboxgl from 'mapbox-gl';

class MarkerPointLayer {
  constructor(map, data, layername, islabel) {
    this.map = map;
    this.data = data;
    this.layername = layername;
  }

  addData = () => {
    return {
      id: this.layername,
      type: 'symbol',
      source: {
        type: 'geojson',
        data: this.data,
      },
      layout: {
        'icon-image': 'cluster',
        'icon-size': 1,
        'icon-offset': [0, -15],
      },
    };
  };

  addLayer = () => {
    const option = this.addData();
    this.map.loadImage(require('../../../images/proIcon.png'), (error: any, image: any) => {
      if (error) throw error;
      console.log(image);
      if (!this.map.hasImage('cluster')) {
        this.map.addImage('cluster', image);
      }
      if (!this.map.getLayer(this.layername)) this.map.addLayer(option);
    });
  };

  removeLayer = () => {
    if (this.map.getLayer(this.layername)) this.map.removeLayer(this.layername);
  };
}

export default MarkerPointLayer;
