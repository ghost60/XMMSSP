import React from 'react';
import Aside from '../../components/aside/Aside';
import Session from '../../components/session/Session';
import Imgplayer from '../../components/imgplayer/Imgplayer';
import * as menudata from '../../pages/menudata/menudata';
var cdata = '';

class szybsession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', data: '' };
  }
  addmenu(mprops) {
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.szyb.children;
      menu = menu[Object.keys(menu)[0]];
      menu = menu.children;
      menu = menu[Object.keys(menu)[0]];
      return menu.name;
    } else {
      menu = menudata.navlist.hyyb.children.szyb.children;
      for (var key in menu) {

        for (var skey in menu[key].children) {
          if (skey == mprops.params.cid) {
            return menu[key].children[skey].name;
          }
        }
      }
    }
  }
  querydata(name) {
    $.ajax({
      url: './data/szyb.json',
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
        // var cidSplit = [];
        // var _name = "";
        // if (this.props.params.cid) {
        //   cidSplit = this.props.params.cid.split("_");
        // }
        // if (cidSplit.length > 1) {
        //   _name = menudata.navlist.hyyb.children.szyb.children[cidSplit[0]].name;
        // }
        for (var i = 0; i < data.length; i++) {
          if (data[i]["name"] == name) {
            this.setState({ name: name, data: data[i] });
            break;
          }
        }
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
    if (this.state.data !== '') img = <Imgplayer list={this.state.data} />
    return <Session name={`海洋预报/数值预报/${this.state.name}`}>
      {img}
    </Session>
  }
};
export default szybsession;
