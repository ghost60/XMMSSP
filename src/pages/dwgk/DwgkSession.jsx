import React from 'react';
import Aside from '../../components/aside/Aside';
import Session from '../../components/session/Session';
// import './DwgkSession.scss';
import "./Dwgk.css"
var cdata = '';

class dwgksession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', data: '' };
  }
  componentDidMount() {
    $.ajax({
      url: './data/dwgk.json',
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
        cdata = data;
        if (!this.props.params.cid) {
          this.setState({ name: data[0]["name"], data: data[0] });
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i]["name"] == this.props.params.cid) {
            this.setState({ name: '', data: data[i] });
            break;
          }
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    debugger
    // var iframeWin = this.refs.iframe.contentWindow || this.refs.iframe.contentDocument.parentWindow;
    // if (iframeWin.document.body) {
    //   var height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
    //   this.refs.iframe.height = height+"px"
    //   console.log(height)
    // }
  }
  componentWillReceiveProps(nextProps) {
    if (cdata == '') return;
    for (var i = 0; i < cdata.length; i++) {
      if (cdata[i]["name"] == this.props.params.cid) {
        this.setState({ data: cdata[i], name: this.props.params.cid });
        break;
      }
    }
  }
  render() {
    var content = '';
    var path = [];
    if (this.state.data.type == "text") {
      content = <div>{this.state.data.content}</div>
    } else if (this.state.data.type == "img") {
      var imgs = this.state.data.content;
      var width = 100 / (imgs.length) + '%';
      for (var i = imgs.length - 1; i >= 0; i--) {
        const imgsrc = require(imgs[i]);
        path.push(<img src={imgsrc} style={{ width: width }} />);
      }
      content = path;
    }

    return <Session name={this.state.name}>
      {content}
      <iframe ref="iframe" src="data/DWGK/dwjs.html" className="dwjs-iframe" >
      </iframe>
    </Session>
  }
};

export default dwgksession;
