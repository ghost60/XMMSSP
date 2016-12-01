import React from 'react';
import { LayersControl,LayerGroup,Circle,CircleMarker,Map,MultiPolygon,MultiPolyline,Polygon,Polyline,Popup,Rectangle,TileLayer,Marker,GeoJson} from 'react-leaflet';
import './leaflet.css';
import ExWMSTileLayer from './ExWMSTileLayer';

const { BaseLayer,Overlay } = LayersControl

class Lmap extends React.Component{
  constructor(props) {
      super(props);
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
          color='#009966';
        }else{
          color = '#FF0033';
        }
        polyline.push(<Polyline color={color} stroke-width={5} positions={data[i]}><Popup popupContent={<h1>AAA</h1>}/></Polyline>);
      }


      var myIcon = L.icon({
          iconUrl: './images/marker-icon.png',
          iconSize: [24, 32],
          iconAnchor: [24, 32],
          shadowUrl: './images/marker-shadow.png',
          shadowSize: [24, 32],
          shadowAnchor: [24, 32]
      });

      var x=118.1872;
      var y=24.5364;

      var position = [y,x];

      if (nums.length>1) {
        position=nums[parseInt((num-1)/2)][0];
        marker.push(<Marker position={nums[0][0]} icon={myIcon} />);
        marker.push(<Marker position={nums[num-1][nums[num-1].length-1]} icon={myIcon} />);
      }else if(nums.length>0){
        position=nums[0][0];
        marker.push(<Marker position={nums[0][0]} icon={myIcon}><Popup><span>AAA<br/>BBB</span></Popup></Marker>);
        marker.push(<Marker position={nums[0][nums[0].length-1]} icon={myIcon} />);
      }
    return (
      <Map style={{height:'550px'}} center={position} zoom={10}>
          <ExWMSTileLayer type={'GaoDe.Normal.Map'} options={{maxZoom: 18,minZoom: 5}} />
          {polyline}
          {marker}
      </Map>
    )
  }
};
export default Lmap;
