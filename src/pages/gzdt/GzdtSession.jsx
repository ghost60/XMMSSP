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
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './GzdtSession.scss'

class gzdtsession extends React.Component {
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
    var list='/admin/GZDTList';
    var type='工作动态';
    if (this.state.name==='工作动态') {
      list='/admin/GZDTList';
      type='工作动态';
    }else if (this.state.name==='党团建设') {
      list='/pubNews/getJsonList';
      type='党团建设';
    }  
    return  <Session lastname={this.state.name} name={"/工作动态"}>
              <Show list={list} type={type}/>
            </Session>
  }
};
export default gzdtsession;


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filelist:[],current: 1, total: 1};
  }
  queryData(url){
    $.ajax({
        url: url,
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
  componentDidMount() {
    this.queryData(ctx+this.props.list);
  }
  componentWillReceiveProps(nextProps) {
    this.queryData(ctx+nextProps.list);
  }
  onChange(page) {
    this.setState({
      current: page,
    });
  }
  render() {
    var sdata=this.state.filelist.slice((this.state.current-1)*15,(this.state.current-1)*15+15);
    const list = sdata.map((li,i) => {
          return  <div className="gzdt_show_li" key={i}>                        
                      <Link to={`wordshow/${this.props.type}/queryWord/${li.fileName.split('.')[0]}`}>
                      <span className="gzdt_show_name">{li.title}</span>
                      </Link>
                      <span className="gzdt_show_time">{li.time.substring(0,10)}</span>
                  </div>
          }
    );
    return  <Col>
                <div className="gzdt_show_body">
                  {list}
                  <div className="gzdt_page"><Pagination onChange={this.onChange.bind(this)} current={this.state.current} total={this.state.total} /></div>
              </div>
            </Col>
    }
};

