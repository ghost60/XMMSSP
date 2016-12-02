import React from 'react';
import {LayerGroup,Map,Polyline,Marker} from 'react-leaflet';
import './leaflet.css';
import ExWMSTileLayer from './ExWMSTileLayer';
import MarkerLayer from './MarkerLayer';

const markers = [{
    "position": {
        "lng": 118.1872,
        "lat": 24.5364
    },
    "text": "aa"
},
{
    "position": {
        "lng": 118.3872,
        "lat": 24.8364
    },
    "text": "bb"
}];

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
      this.state={markers:markers};
  }
  lineclick(e){

  }
  render() {
      var data = this.props.data;
      var polyline = [];
      var marker = [];
      var nums=[];
      var color = '#FF0033';
      var num = 0;
      for(var i in data){
        num++;
        nums.push(data[i]);
        if(i%2==1){
          color='#68BBB5';
        }else{
          color = '#398BFA';
        }
        polyline.push(<Polyline getCenter={this.getlinebound} onClick={this.lineclick.bind(this,'a')} color={color} weight={5} positions={data[i]}/>);
      }

      var myIcon = L.icon({
          iconUrl: './images/matou.png',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          // shadowUrl: './images/marker-shadow.png',
          // shadowSize: [24, 32],
          // shadowAnchor: [24, 32]
      });

      var x=118.1872;
      var y=24.5364;

      var position = [y,x];

      if (nums.length>1) {
        position=nums[parseInt((num-1)/2)][0];
        marker.push(<Marker position={nums[0][0]}  title={'aaa'} alt={'bbb'}/>);
        marker.push(<Marker position={nums[num-1][nums[num-1].length-1]} icon={myIcon} />);
        this.refs.map.leafletElement.fitBounds([nums[0][0],nums[num-1][nums[num-1].length-1]]);
      }else if(nums.length>0){
        position=nums[0][0];
        marker.push(<Marker ref='m' position={nums[0][0]} icon={myIcon} />);
        marker.push(<Marker position={nums[0][nums[0].length-1]} icon={myIcon} />);
        this.refs.map.leafletElement.fitBounds([nums[0][0],nums[0][nums[0].length-1]]);
      }
    return (
      <Map ref='map' style={{height:'550px'}} center={position} zoom={10}>
          <ExWMSTileLayer type={'GaoDe.Normal.Map'} options={{maxZoom: 18,minZoom: 5}} />
          <MarkerLayer
            markers={this.state.markers}
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
