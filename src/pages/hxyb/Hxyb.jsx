//主面板
import React from 'react';
import {Row, Col} from '../../components/grid/Grid';
import Session from '../../components/session/Session';
import Lmap from '../../components/map/Lmap';
import './Hxyb.scss';


const hx=['厦门-金门','泉州-金门','马尾-马祖','基隆-马祖','台中-平潭','基隆-台州','台中-金门','台北港-平潭'];
const pic=[
  'upload/img/PNG/xm-jm_period.png',
  'upload/img/PNG/xm-jm_wave.png',
  'upload/img/PNG/xm-jm_wind.png'
]
class hxyb extends React.Component{
  constructor(props) {
      super(props);
      this.state={data:{}, name:'',tpkey:'lzq',pic:'',list:[]};
  }
  componentDidMount(){
    debugger
    querylatlng('厦门-金门');
    var list = querylist();
    var pic = querypic('浪周期');
    this.setState({data:latlng,pic:querypic(e.target.innerText),list:list});
  }
  selectChange(e){
    var name = e.target.innerText;
    var latlng = querylatlng(name);
    var list = querylist();
    var pic = querypic('浪周期');
    this.setState({data:latlng,tpkey:'lzq',pic:querypic(e.target.innerText)});
  }
  querylatlng(name){
    $.ajax({
          url: ctx+'/getHXYB/getHXZB',
          dataType: 'json',
          type: 'post',
          async: true,
          data:{'routeName':name},
          success: function(data) {
              return data.data;
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
              return data;
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  querypic(name){
    $.ajax({
          url: ctx+'/getHXYB/getDownloadList',
          dataType: 'json',
          type: 'get',
          async: true,
          data:{name:name},
          success: function(data) {
              return data;
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  downloadlist(name){
    $.ajax({
          url: ctx+'/getHXYB/download',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
              alert("下载成功！");
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  tpselect(e){
    this.setState({tpkey:e.target.dataset.key,pic:querypic(e.target.innerText)});
  }
  tpactive(key){
    if(key===this.state.tpkey){
      return "hxyb-tp active";
    }else{
      return "hxyb-tp";
    }
  }
  render() {
      const option = hx.map((li,i) => {
        return  <span key={i} onClick={this.selectChange.bind(this)}>{li}</span>
        }
      );      
      return  <Col>
              <Session name={'航线预报'}>
                <Row>
                  <Col width={[1,2]}>
                    <Lmap data={this.state.data} />
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
                            <span className={this.tpactive("lzq")} data-key="lzq" onClick={this.tpselect.bind(this)}>浪周期</span>
                            <span className={this.tpactive("lg")} data-key="lg" onClick={this.tpselect.bind(this)}>浪高</span>
                            <span className={this.tpactive("fs")} data-key="fs" onClick={this.tpselect.bind(this)}>风速</span>
                        </div>
                        <div className="hxyb-tp-tp">
                             <img src={this.state.pic} alt="" />
                        </div>
                       </div>
                    </div>                    
                  </Col>
                </Row>
                  <Col>
                    <div className="hxyb-bd-title">表单下载</div>
                    <div className="hxyb-bd-list">
                    </div>
                  </Col>
                <Row>
                </Row>
              </Session>
              </Col>
      }
};
export default hxyb;

