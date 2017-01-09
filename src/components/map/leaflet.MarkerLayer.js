L.MarkerLayer = L.Layer.extend({

	attachEvents: function() {
		const map: Map = this.props.map;
		map.on('zoomend', () => this.updatePosition());
	},
	getLocationForMarker: function(marker) {
		return {
			lat: marker.position.lat,
			lng: marker.position.lng
		};
	},
	updatePosition: function() {
		this.props.markers.forEach((marker, i) => {
			const markerElement = ReactDOM.findDOMNode(
				this.refs[this.getMarkerRefName(i)]
			);
			const points = this.props.map.latLngToLayerPoint(L.latLng(this.getLocationForMarker(marker)));
			L.DomUtil.setPosition(markerElement, points);
		});
	},
});

L.markerLayer = function(type, options) {
	return new L.MarkerLayer(type, options);
};

export default L.markerLayer;