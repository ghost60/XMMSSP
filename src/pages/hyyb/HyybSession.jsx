import React from 'react';
import {Row,Col} from 'react-bootstrap';
import LineChart from '../../components/highcharts/LineChart';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

class Hyybsession extends React.Component{
  constructor(props) {
      super(props);
      this.state={data:''};
      debugger
  }
  componentDidMount(){
    debugger
    var rood = menudata.navlist.hyyb.children[this.props.params.id];
    var tname='';
    for (var i = rood.list.length - 1; i >= 0; i--) {
      if(rood.list[i].ename==this.props.params.cid){
        tname=rood.list[i].name;
        break;
      }
    }
    this.setState({sname:rood.name,tname:tname});
  }
  componentWillReceiveProps(nextProps) {
    debugger
    var rood = menudata.navlist.hyyb.children[this.props.params.id];
    var tname='';
    for (var i = rood.list.length - 1; i >= 0; i--) {
      if(rood.list[i].ename==this.props.params.cid){
        tname=rood.list[i].name;
        break;
      }
    }
    this.setState({sname:rood.name,tname:tname});
  }
  render() {
    var content='';
    if (this.state.tname=='航线预报') {

    }
      return  <Session name={`海洋预报/${this.state.sname}/${this.state.tname}`}>
                {this.state.tname}
              </Session>
      }
};
export default Hyybsession;
