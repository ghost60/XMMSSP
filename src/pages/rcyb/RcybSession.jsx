import React from 'react';
import LineChart from '../../components/highcharts/LineChart';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import { TabsPanel1, TabsPanel2, TabsPanel3, TabsPanel4 } from '../home/TabPanel';
class rcybsession extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:'',data:{}};
  }
  addmenu(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.rcyb.children;
      menu = menu[Object.keys(menu)[0]];   
      return menu.name;
    }else{
      menu = menudata.navlist.hyyb.children.rcyb.children;
      for (var key in menu) {
        if(key==mprops.params.cid){
          return menu[key].name;
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
    let data = this.querydata(route);
    this.setState({name:route,data:data});
  }
  componentWillReceiveProps(nextProps) {
    let route = this.addmenu(nextProps);  
    let data = this.querydata(route);
    this.setState({name:route,data:data});
  }
  renderContent(type){
    if(type==="hlswyb"){
      return <TabsPanel1 mapSrc="./images/map1.png"/>
    }else if(type==="cxyb"){
      return <TabsPanel2 mapSrc="./images/map2.png"/>
    }else if(type==="xmhlyb"){
      return <TabsPanel3 mapSrc="./images/map3.png"/>
    }else if(type==="xmycyb"){
      return <TabsPanel4 mapSrc="./images/map4.png"/>
    }
    
  }
  render() {
    return  <Session name={`海洋预报/日常预报/${this.state.name}`}>
              {this.renderContent(this.props.params.cid)}
            </Session>
    }
};
export default rcybsession;
