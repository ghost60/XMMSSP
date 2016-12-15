import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

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
      var key = Object.keys(menu)[0];
      var key = Object.keys(menu)[0];
      menu = menu[key];
      this.setState({ name: menu.name, src: key });
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
    this.addname(nextProps);
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
              <iframe ref="iframe" src={src} className="iframe" onLoad={this.setIframe.bind(this)}>
              </iframe>
            </Session>
  }
};

export default dwgksession;
