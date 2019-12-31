class ChinaLayer {
    constructor(map, data, layername, sourceName) {
      this.map = map;
      this.data = data;
      this.layername = layername;
      this.sourceName = sourceName;
    }
  
    addData = () => {
      return ;
    };
  
    addLayer = () => {
      this.map.addSource(this.sourceName, {
        'type': 'geojson',
        'data': this.data
      })
      if (!this.map.getLayer(this.layername)){
        this.map.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source':this.sourceName,
          'layout': {},
          'paint': {
            'fill-color': '#001fe6',
            'fill-opacity': 0.1
            }
        });
      }
    };
  
    removeLayer = () => {
      this.map.removeLayer(this.layername);
      this.map.removeSource(this.sourceName);
    };
  }
  
  export default ChinaLayer;
  