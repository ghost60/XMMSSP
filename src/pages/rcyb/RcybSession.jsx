import React from 'react';
import {Row,Col} from 'react-bootstrap';
import LineChart from '../../components/highcharts/LineChart';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

class rcybsession extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:'',data:{}};
  }
  addmenu(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.rcyb.aside[0];   
      return menu.name;
    }else{
      menu = menudata.navlist.hyyb.children.rcyb.[mprops.params.cid];
      for (var i = menu.aside.length - 1; i >= 0; i--) {
        if(menu.aside[i].name==mprops.params.cid){
          return menu.aside[i].name;
        }
      }
    }
  }
  querydata(name){
        $.ajax({
            url: 'name',
            dataType: 'json',
            type: 'get',
            async: true,
            success: function(data) {
              return data;  
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());              
            }.bind(this)
        });
  }
  componentDidMount(){
    let route = this.addmenu(this.props);  
    let data = this.querydata(route.ename);
    this.setState({name:route,data:data});
  }
  componentWillReceiveProps(nextProps) {
    let route = this.addmenu(nextProps);  
    let data = this.querydata(route);
    this.setState({name:route,data:data});
  }
  render() {
    return  <Session name={`海洋预报/${this.state.name}`}>
              {this.state.name}
            </Session>
    }
};
export default rcybsession;
