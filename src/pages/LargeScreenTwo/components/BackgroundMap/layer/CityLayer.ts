class CityLayer {
    constructor(map, data, layername, sourceName, parent) {
      this.map = map;
      this.data = data;
      this.layername = layername;
      this.sourceName = sourceName;
      this.parent = parent;
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
          'maxzoom': 14,
          'minzoom': 5,
          'layout': {},
          'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.1
            }
        },this.parent);
      }
    };
  
    removeLayer = () => {
      this.map.removeLayer(this.layername);
      this.map.removeSource(this.sourceName);
    };
  }
  
  export default CityLayer;
  