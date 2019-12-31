class HeatLayer {
  constructor(map, data, layername, sourceName) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.sourceName = sourceName;
  }
  addLayer = () => {
    this.map.addSource(this.sourceName, {
      'type': 'geojson',
      'data': this.data
    });
    if (!this.map.getLayer(this.layername)){
      this.map.addLayer({
        id: this.layername,
        type: 'heatmap',
        source: this.sourceName,
        maxzoom: 7,
        paint: {
          // Increase the heatmap weight based on frequency and property magnitude
          'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
          // Increase the heatmap color weight weight by zoom level
          // heatmap-intensity is a multiplier on top of heatmap-weight
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          // Begin color ramp at 0-stop with a 0-transparancy color
          // to create a blur-like effect.
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgba(87,162,232,.9)',
            0.4,
            'rgba(70,228,235,.9)',
            0.6,
            'rgba(118,234,105,.9)',
            0.8,
            'rgba(245,241,72,.9)',
            1,
            'rgba(241,192,72,.9)',
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
        },
      })
    };
  };

  removeLayer = () => {
    this.map.removeLayer(this.layername);
    this.map.removeSource(this.sourceName);
  };
}

export default HeatLayer;
