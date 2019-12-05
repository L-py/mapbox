class ProvinceLayer {
    constructor(map, data, layername, sourceName) {
      this.map = map;
      this.data = data;
      this.layername = layername;
      this.sourceName = sourceName;
    }
  
    addLayer = () => {
      this.map.addSource(this.sourceName, {
        'type': 'geojson',
        'data': {
          type: "FeatureCollection",
          features: this.data.features
        }
      })

      if (!this.map.getLayer(this.layername)){
        this.map.addLayer({
          'id': this.layername,
          'type': 'fill',
          'source': this.sourceName,
          'maxzoom': 9,
          'minzoom': 5,
          'layout': {},
          'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.2
            }
        });
      }
    };
  
    removeLayer = () => {
      this.map.removeLayer(this.layername);
      this.map.removeSource(this.sourceName);
    };
  }
  
  export default ProvinceLayer;
  