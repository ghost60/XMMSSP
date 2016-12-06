import React from 'react';
import {LayerGroup,Map,Polyline,Marker} from 'react-leaflet';
import './leaflet.css';
import ExWMSTileLayer from './ExWMSTileLayer';
import MarkerLayer from './MarkerLayer';

// const markers = [{
//     "position": {
//         "lng": 118.1872,
//         "lat": 24.5364
//     },
//     "text": "aa"
// },
// {
//     "position": {
//         "lng": 118.3872,
//         "lat": 24.8364
//     },
//     "text": "bb"
// }];

class ExampleMarkerComponent extends React.Component {
  render() {
    const style = {
      fontSize: '14px',
      fontWeight: 'bold',
      marginTop: '-12px',
      marginLeft: '-12px',
      width: '24px',
      height: '24px'
    };
    return (
      <div style={Object.assign({}, this.props.style, style)}>{this.props.text}</div>
    );
  }
}

class Lmap extends React.Component{
  constructor(props) {
      super(props);
  }
  lineclick(e){
    alert(e)
  }
  render() {
      let data = this.props.data;
      let polyline = [];
      let marker = [];
      let labels = [];
      let color = '#FF0033';
      let position={};
      debugger
      for (var i = data.length - 1; i >= 0; i--) {
        if(i%2==1){
          color='#68BBB5';
        }else{
          color = '#398BFA';
        }
        if (data.length===1) {
          var flatlon = data[i].latlon[0];
          var llatlon = data[i].latlon[data[i].latlon.length-1];
          var mlatlon = data[i].latlon[Math.ceil((data[i].latlon.length-1)/2)];
          position.lng=mlatlon[1];
          position.lat=mlatlon[0];
          let label = {};
          label.position=position;
          label.text=i;
          labels.push(label);
        }else{
          var flatlon = data[i].latlon[0];
          var llatlon = data[i].latlon[data[i].latlon.length-1];
          position.lng=(flatlon[1]+llatlon[1])/2;
          position.lat=(flatlon[0]+llatlon[0])/2;
          let label = {};
          label.position=position;
          label.text=i;
          labels.push(label);
        }
        polyline.push(<Polyline key={i} getCenter={this.getlinebound} onClick={this.lineclick.bind(this,data[i].name)} color={color} weight={5} positions={data[i].latlon}/>);       
      }      

      let myIcon = L.icon({
          iconUrl: './images/matou.png',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          // shadowUrl: './images/marker-shadow.png',
          // shadowSize: [24, 32],
          // shadowAnchor: [24, 32]
      });

      if (data.length>1) {
        marker.push(<Marker position={data[0].latlon[0]} icon={myIcon} />);
        marker.push(<Marker position={data[data.length-1].latlon[data[data.length-1].latlon.length-1]} icon={myIcon} />);
        this.refs.map.leafletElement.fitBounds([data[0].latlon[0],data[data.length-1].latlon[data[data.length-1].latlon.length-1]]);
      }else if(data.length>0){
        marker.push(<Marker ref='m' position={data[0].latlon[0]} icon={myIcon} />);
        marker.push(<Marker position={data[0].latlon[data[0].latlon.length-1]} icon={myIcon} />);
        this.refs.map.leafletElement.fitBounds([data[0].latlon[0],data[0].latlon[data[0].latlon.length-1]]);
      }
    return (
      <Map ref='map' style={{height:'550px'}} center={[24.5364,118.1872]} zoom={10}>
          <ExWMSTileLayer type={'GaoDe.Normal.Map'} options={{maxZoom: 18,minZoom: 5}} />
          <MarkerLayer
            markers={labels}
            markerComponent={ExampleMarkerComponent}
          />
          <LayerGroup>
            {polyline}
          </LayerGroup>
          {marker}
      </Map>
    )
  }
};
export default Lmap;
