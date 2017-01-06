import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

class hykpsession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',src:''};
  }
  componentDidMount() {
    this.addname(this.props);
  //   $.ajax({
  //         url: ctx+'/'+gethykphtml,
  //         dataType: 'json',
  //         type: 'get',
  //         async: true,
  //         data:postdata,
  //         success: function(data) {
  //           this.setState({file:data});
  //         }.bind(this),
  //         error: function(xhr, status, err) {
  //             console.error(this.props.url, status, err.toString());
  //         }.bind(this)
  //     });
  }
  addname(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.hykp.children;
      var key = Object.keys(menu)[0];
      menu = menu[key];
      this.setState({ name: menu.name, src: key });
    }else{
      menu = menudata.navlist.hykp.children;
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
    var src=`data/HYKP/${this.state.src}.html`;
    return  <Session lastname={this.state.name} name={"/海洋科普"}>
              <iframe ref="iframe" src={src} className="iframe" onLoad={this.setIframe.bind(this)}>
              </iframe>
            </Session>
  }
};

export default hykpsession;

// class htmlShow extends React.Component{
//   constructor(props) {
//       super(props);     
//   }
//   back(){
//     window.history.back(-1); 
//   }
//   setIframe() {
//     var iframeWin = this.refs.iframe.contentWindow || this.refs.iframe.contentDocument.parentWindow;
//     if (iframeWin.document.body) {
//       var height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
//       this.refs.iframe.height = height+"px"
//     }
//   }
//   render() {
//        return  <Col offset={[1,20]} width={[18,20]}>
//             <div className="wordshow-title">
//               <span className="wordshow-name">{this.state.name}</span>
//               <span className="wordshow-back" onClick={this.back.bind(this)}>返回</span>
//             </div>
//             <div className="wordshow-body">
//               <iframe ref="iframe" src={this.props.src} className="iframe" onLoad={this.setIframe.bind(this)}>
//               </iframe>
//             </div>
//            </Col>         
//       }
// };