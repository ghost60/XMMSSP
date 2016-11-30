//主面板
import React from 'react';
import {Col} from '../../components/grid/Grid';
import Session from '../../components/session/Session';
import Lmap from '../../components/map/Lmap';


const hx=['厦门-金门','泉州-金门','马尾-马祖','基隆-马祖','台中-平潭','基隆-台州','台中-金门','台北港-平潭'];

class hxyb extends React.Component{
  constructor(props) {
      super(props);
      this.state={alldata:[],data:{},name:''};
  }
  componentDidMount(){
      $.ajax({
          url: './data/hxyb.json',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
              this.setState({alldata:data,data:{0:data.rows[0].latlon},name:data.rows[0].name});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  selectChange(e){
    console.log(e.target.value);
    var data={};
    for (var i = this.state.alldata.rows.length - 1; i >= 0; i--) {
      if(this.state.alldata.rows[i].name.indexOf(e.target.value)>=0){
          data[i]=this.state.alldata.rows[i].latlon;
      }
    }
    this.setState({alldata:this.state.alldata,data:data,name:e.target.value});
  }
  render() {
      const option = hx.map((li,i) => {
        return  <option value={li} key={i}>{li}</option>
        }
      );
      return  <Col>
              <Session name={'航线预报'}>
                <select ref="select" id="hz-select" onChange={this.selectChange.bind(this)}  style={{position:"absolute",zIndex:1000,right:"10px"}}>
                  {option}
                </select>
                <Lmap data={this.state.data} name={this.state.name}/>
              </Session>
              </Col>
      }
};
export default hxyb;

