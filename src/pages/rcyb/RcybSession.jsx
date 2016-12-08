import React from 'react';
import LineChart from '../../components/highcharts/LineChart';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import { TabsPanel1, TabsPanel2, TabsPanel3, TabsPanel4, TabsPanel5, TabsPanel6 } from '../home/TabPanel';
class rcybsession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', data: {} };
  }
  addmenu(mprops) {
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.rcyb.children;
      menu = menu[Object.keys(menu)[0]];
      return menu.name;
    } else {
      menu = menudata.navlist.hyyb.children.rcyb.children;
      for (var key in menu) {
        if (key == mprops.params.cid) {
          return menu[key].name;
        }
      }
    }
  }
  querydata(name) {
    $.ajax({
      url: 'name',
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
        return data;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    let route = this.addmenu(this.props);
    let data = this.querydata(route);
    this.setState({ name: route, data: data });
  }
  componentWillReceiveProps(nextProps) {
    let route = this.addmenu(nextProps);
    let data = this.querydata(route);
    this.setState({ name: route, data: data });
  }
  renderContent(type) {
    if (type === "hlswyb") {
      return <TabsPanel1 mapSrc="/images/map1_cus.png" _className="tab-panel--right__cust" mapCfg={
        [
          { x: 60, y: 236, title: "漳州沿海" },
          { x: 99, y: 199, title: "厦门沿海" },
          { x: 139, y: 165, title: "泉州沿海" },
          { x: 198, y: 111, title: "莆田沿海" },
          { x: 231, y: 171, title: "台湾海峡北部" },
          { x: 183, y: 243, title: "台湾海峡南部" },
        ]
      } />
    } else if (type === "cxyb") {
      return <TabsPanel2 mapSrc="./images/map2_cus.png" _className="tab-panel--right__cust" mapCfg={
        [
          { x: 119, y: 242, title: "东山" },
          { x: 194, y: 201, title: "厦门" },
          { x: 250, y: 140, title: "崇武" },
          { x: 301, y: 91, title: "平潭" },
        ]
      } />
    } else if (type === "xmhlyb") {
      return <TabsPanel3 mapSrc="/images/map3_cus.png" _className="tab-panel--right__cust" mapCfg={
        [
          { x: 204, y: 157, title: "厦门大嶝海域" },
          { x: 243, y: 113, title: "厦门小嶝海域" },
          { x: 118, y: 81, title: "厦门同安湾" },
          { x: 36, y: 123, title: "厦门西海域" },
          { x: 146, y: 211, title: "厦门东部海域" },
          { x: 9, y: 240, title: "厦门九龙江口" },
          { x: 95, y: 271, title: "厦门南部海域" },
        ]
      } />
    } else if (type === "xmycyb") {
      return <TabsPanel4 mapSrc="/images/map4_cus.png" _className="tab-panel--right__cust" />
    } else if (type === "xmbhlyyb") {
      return <TabsPanel5 mapSrc="/images/map4_cus.png" _className="tab-panel--right__cust" mapCfg={
        [
          { x: 226, y: 165, title: "厦门环岛路东部" },
          { x: 67, y: 224, title: "厦门鼓浪屿" },
        ]
      } />
    } else if (type === "qzhyyb") {
      return <TabsPanel6 mapSrc="/images/map6_cus.png" _className="tab-panel--right__cust" />
    }
    else if (type === "hlybt")
      return <img src={ctx + "/forcast?type=hlyb"} />
  }
  render() {
    return <Session lastname={this.state.name} name={"/海洋预报/日常预报"}>
      {this.renderContent(this.props.params.cid)}
    </Session>
  }
};
export default rcybsession;
