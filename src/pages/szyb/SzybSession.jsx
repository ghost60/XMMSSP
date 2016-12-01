import React from 'react';
import Aside from '../../components/aside/Aside';
import Session from '../../components/session/Session';
import Imgplayer from '../../components/imgplayer/Imgplayer';
// import './DwgkSession.scss';
import * as menudata from '../../pages/menudata/menudata';
var cdata='';

class szybsession extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:'',data:{}};
  }
  addmenu(mprops){
    debugger
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.szyb.aside[0].aside[0];   
      return menu.name;
    }else{
      menu = menudata.navlist.hyyb.children.szyb;
      for (var i = menu.aside.length - 1; i >= 0; i--) {
        for (var j = menu.aside[i].aside.length - 1; j >= 0; j--) {
          if(menu.aside[i].aside[j].name==mprops.params.cid){
            return menu.aside[i].aside[j].name;
          }
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
  render() {
      return  <Session name={`海洋预报/${this.state.name}`}>
                <Imgplayer list={this.state.data}/>
              </Session>
      }
};
export default szybsession;
