import React from 'react';
import {
  Link
}
from 'react-router';
import {
  Col
}
from '../../components/grid/Grid';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';

class dwgksession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',src:'',filelist:[]};
  }
  componentDidMount() {
    this.addname(this.props);    
  }
  addname(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.gzdt.children;
      var key = Object.keys(menu)[0];
      var key = Object.keys(menu)[0];
      menu = menu[key];
      this.setState({ name: menu.name, src: key });
    }else{
      menu = menudata.navlist.gzdt.children;
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
    var type='wordshow';
    var method='GZDTList';
    if (this.state.name==='工作动态') {
      type='wordshow';
      method='GZDTList';
    }else if (this.state.name==='党团建设') {
      type='wordshow';
      method='GZDTList';
    }  
    return  <Session lastname={this.state.name} name={"/工作动态"}>
              <Show type={type} method={method}/>
            </Session>
  }
};
export default dwgksession;


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filelist:[]};
  }
  componentDidMount() {
    $.ajax({
        url: ctx+'/admin/'+this.props.method,
        dataType: 'json',
        type: 'get',
        async: true,
        success: function(data) {
          this.setState({filelist:data});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }
  render() {
      const list = this.state.filelist.map((li,i) => {
            return  <div className="gzdt_show_li" key={i}>
                        <span className="gzdt_show_time">{li.time}</span>
                        <Link to={`${this.props.type}/工作动态/${this.props.type}/${li.filename}`}>                        
                        <span className="gzdt_show_name">{li.title}</span>
                        </Link>
                    </div>
            }
      );
      return  <Col>
                  <div className="gzdt_show_body">
                    {list}
                </div>
              </Col>
      }
};

