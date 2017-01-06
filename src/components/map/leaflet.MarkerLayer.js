L.MarkerLayer = L.Layer.extend({

});

L.markerLayer = function(type, options) {
  return new L.MarkerLayer(type, options);
};

export default L.markerLayer;