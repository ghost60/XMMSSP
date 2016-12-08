import React from 'react';
import LineChart from '../../components/highcharts/LineChart';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import { TabsPanel1, TabsPanel2, TabsPanel3, TabsPanel4, TabsPanel5} from '../home/TabPanel';

class zhybsession extends React.Component {
    constructor(props) {
    super(props);
    this.state = { name: '', data: '' };
  }
  addmenu(mprops) {
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.zhyb.children;
      menu = menu[Object.keys(menu)[0]];
      return menu.name;
    } else {
      menu = menudata.navlist.hyyb.children.zhyb.children;
      for (var key in menu) {
        if (key == mprops.params.cid) {
          return menu[key].name;
        }
      }
    }
  }
  querydata(name) {
    $.ajax({
      url: ctx+'/zhyb?name='+name,
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
          this.setState({ name: name, data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    let route = this.addmenu(this.props);
    this.querydata(route);
  }
  componentWillReceiveProps(nextProps) {
    let route = this.addmenu(nextProps);
    this.querydata(route);
  }
  render() {
    var img = '';
    if (this.state.data !== '') img = <Imgplayer data={this.state.data} />
    return <Session lastname={this.state.name} name={"/海洋预报/灾害预报"}>
      {img}
    </Session>
  }
};
export default zhybsession;
