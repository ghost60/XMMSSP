//主面板
import React from 'react';
import {Row, Col} from '../../components/grid/Grid';
import Session from '../../components/session/Session';
import Lmap from '../../components/map/Lmap';
import './Hxyb.scss';


const hx=['厦门-金门','泉州-金门','马尾-马祖','基隆-马祖','台中-平潭','基隆-台州','台中-金门','台北港-平潭'];

class hxyb extends React.Component{
  constructor(props) {
      super(props);
      this.state={data:{}, name:'厦门-金门',tpkey:0,pic:[],list:[]};
  }
  componentDidMount(){
    this.querylatlng('厦门-金门');
    this.querylist();
    this.querypic(0,'厦门-金门');
  }
  selectChange(e){
    var name = e.target.innerText;
    this.querylatlng(name);
    this.querylist();
    this.querypic(0,name);
  }
  querylatlng(name){
    $.ajax({
          url: ctx+'/getHXYB/getHXZB',
          dataType: 'json',
          type: 'post',
          async: true,
          data:{'routeName':name},
          success: function(data) {
            this.setState({data:data.data,name:name});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  querylist(){
    $.ajax({
          url: ctx+'/getHXYB/getDownloadList',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
              this.setState({list:data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  querypic(type,routeName){
    $.ajax({
          url: ctx+'/getHXYB/getYBTP',
          dataType: 'json',
          type: 'post',
          async: true,
          data:{type:type,routeName:routeName},
          success: function(data) {
              this.setState({pic:data.data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  downloadlist(name,path){
    // $.ajax({
    //       url: ctx+'/getHXYB/download',
    //       dataType: 'file',
    //       type: 'post',
    //       async: true,
    //       data:{fileName:name,path:path},
    //       success: function(data) {
    //           alert("下载成功！");
    //       }.bind(this),
    //       error: function(xhr, status, err) {
    //           console.error(this.props.url, status, err.toString());
    //       }.bind(this)
    //   });
      this.jdownload(ctx+'/getHXYB/download',`fileName=${name}&path=${path}`,"download");
  }
  jdownload(url, data, method){
    if( url && data ){ 
      data = typeof data == 'string' ? data : jQuery.param(data);
      var inputs = '';
      $.each(data.split('&'), function(){ 
        var pair = this.split('=');
        inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
      });
      $('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
      .appendTo('body').submit().remove();
    };
  }
  tpselect(e){
    this.setState({tpkey:e.target.dataset.key});
  }
  tpactive(key){
    if(key==this.state.tpkey){
      return "hxyb-tp active";
    }else{
      return "hxyb-tp";
    }
  }
  bddownload(name,path){
    this.downloadlist(name,path);
  }
  routeclick(name){
    this.querypic(1,name);
  }
  render() {
      const option = hx.map((li,i) => {
        return  <span key={i} onClick={this.selectChange.bind(this)}>{li}</span>
        }
      ); 
      const xml = !this.state.list.xml?[]:this.state.list.xml.map((li,i)=>{
        return <span onClick={this.bddownload.bind(this,li,"xml")}>{li}</span>
      }) 
      const excel = !this.state.list.excel?[]:this.state.list.excel.map((li,i)=>{
        return <span onClick={this.bddownload.bind(this,li,"xls")}>{li}</span>
      })      
      return  <Col>
              <Session lastname={'航线预报'}>
                <Row>
                  <Col width={[1,2]}>
                    <Lmap data={this.state.data} routecallback={this.routeclick.bind(this)}/>
                  </Col>
                  <Col  width={[1,2]}>
                    <div className="hxyb-xz">
                      <div className="hxyb-xz-title">航线选择</div>
                      <div className="hxyb-hx">{option}</div>
                    </div>
                    <div className="hxyb-tp">
                      <div className="hxyb-tp-title">
                        {this.state.name}
                      </div>
                      <div>
                        <div className="hxyb-tp-xz">
                            <span className={this.tpactive(0)} data-key={0} onClick={this.tpselect.bind(this)}>浪周期</span>
                            <span className={this.tpactive(1)} data-key={1} onClick={this.tpselect.bind(this)}>浪高</span>
                            <span className={this.tpactive(2)} data-key={2} onClick={this.tpselect.bind(this)}>风速</span>
                        </div>
                        <div className="hxyb-tp-tp">
                             <img style={{width:"544px",maxHeight:"178px"}} src={this.state.pic[this.state.tpkey]} alt="" />
                        </div>
                       </div>
                    </div>                    
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="hxyb-bd">
                      <div className="hxyb-bd-title">表单下载</div>
                      <div className="hxyb-bd-list">
                        <span className="hxyb-xml-body">{xml}</span>
                        <span className="hxyb-excel-body">{excel}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Session>
              </Col>
      }
};
export default hxyb;

