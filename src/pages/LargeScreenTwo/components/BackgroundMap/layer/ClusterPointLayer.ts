class ClusterPointLayer {
  constructor(map, data, layername, islabel, sourceName) {
    this.map = map;
    this.data = data;
    this.layername = layername;
    this.islabel = islabel;
    this.sourceName = sourceName;
  }

  addLayer = () => {
    this.map.addSource(this.sourceName, {
      type: 'geojson',
      data: this.data,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    })
    if (!this.map.getLayer(this.layername)){
      this.map.addLayer({
        id: this.layername,
        type: 'circle',
        source: this.sourceName,
        minzoom: 7,
        maxzoom: 12,
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            1050,
            '#f28cb1',
          ],
          'circle-radius': ['step', ['get', 'point_count'], 0, 100, 30, 750, 40],
        },
      });
    } 
    if (this.islabel) {
      this.map.loadImage(require('../../../images/clusterBg.png'), (error: any, image: any) => {
        if (error) throw error;
        console.log(image);
        if (!this.map.hasImage('cluster2')) {
          this.map.addImage('cluster2', image);
        }
        this.map.addSource(`${this.sourceName}-count`, {
          type: 'geojson',
          data: this.data,
        })
        const name = this.layername;
        if (!this.map.getLayer(`${this.layername}-count`)){
          this.map.addLayer({
            id: `${this.layername}-count`,
            type: 'symbol',
            source: this.sourceName  ,
            minzoom: 7,
            maxzoom: 12,
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-size': 25,
              'icon-image': 'cluster2',
              'icon-size': 1,
            },
            paint: {
              'text-color': '#fff',
            },
          });
        } 
      });
    }
  };

  removeLayer = () => {
    this.map.removeLayer(this.layername);
    this.map.removeSource(this.sourceName);
    this.map.removeLayer(`${this.layername}-count`);
    // this.map.removeSource(`${this.sourceName}-count`);
  };
}

export default ClusterPointLayer;
