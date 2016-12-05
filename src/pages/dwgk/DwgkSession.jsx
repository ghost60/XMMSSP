import React from 'react';
import Aside from '../../components/aside/Aside';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import "./Dwgk.css"
var cdata = '';

class dwgksession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',src:''};
  }
  componentDidMount() {
    this.addname(this.props);
  }
  addname(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.dwgk.children;
      menu = menu[Object.keys(menu)[0]];
      this.setState({ name: menu.name, src: Object.keys(menu)[0] });
    }else{
      menu = menudata.navlist.dwgk.children;
      for (var key in menu) {
        if (key == mprops.params.cid) {
          this.setState({ name: menu[key].name, src: key });
        }
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.addname(this.props);
  }
  setIframe() {
    var iframeWin = this.refs.iframe.contentWindow || this.refs.iframe.contentDocument.parentWindow;
    if (iframeWin.document.body) {
      var height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
      this.refs.iframe.height = height+"px"
    }
  }
  render() {  
    var src=`data/DWGK/${this.state.src}.html`;
    return  <Session lastname={this.state.name} name={"/单位概况"}>
              <iframe ref="iframe" src={src} className="dwjs-iframe" onLoad={this.setIframe.bind(this)}>
              </iframe>
            </Session>
  }
};

export default dwgksession;
