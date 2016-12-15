import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

class hyjcsession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',src:''};
  }
  componentDidMount() {
    this.addname(this.props);
  }
  addname(mprops){
    debugger
    if (!mprops.params) {
      var menu = menudata.navlist.hyjc.children;
      var smenu = menu[Object.keys(menu)[0]];
      if ('children' in smenu) {               
        menu = menu.children;
        menu = menu[Object.keys(menu)[0]];
      }else{
        var key = Object.keys(menu)[0];
        menu = menu[key];
        this.setState({ name: menu.name, src: key });
      }
    }else{
      menu = menudata.navlist.hyjc.children;
      for (var key in menu) {
        if (key == mprops.params.cid.split('_')[0]) {
          menu=menu[key];
          if ('children' in menu) {               
            for (var key in menu.children) {
              if (key == mprops.params.cid) {
                this.setState({ name: menu.children[key].name, src: key });
                return;
              }
            }
          }else{
            this.setState({ name: menu.name, src: key });
            return;
          } 
          
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
    var src=`data/HYJC/${this.state.src}.html`;
    return  <Session lastname={this.state.name} name={"/海洋监测"}>
              <iframe ref="iframe" src={src} className="iframe" onLoad={this.setIframe.bind(this)}>
              </iframe>
            </Session>
  }
};
export default hyjcsession;
