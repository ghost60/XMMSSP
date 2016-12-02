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
      this.state={alldata:[],data:{},name:'',tpkey:'lzq'};
  }
  componentWillMount(){
      $.ajax({
          url: './data/hxyb.json',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
              this.setState({alldata:data,data:{0:data.rows[0].latlon},name:data.rows[0].name});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  selectChange(e){
    console.log(e.target.innerText);
    var data={};
    for (var i = this.state.alldata.rows.length - 1; i >= 0; i--) {
      if(this.state.alldata.rows[i].name.indexOf(e.target.innerText)>=0){
          data[i]=this.state.alldata.rows[i].latlon;
      }
    }
    this.setState({alldata:this.state.alldata,data:data,name:e.target.innerText});
  }
  tpselect(e){
    this.setState({tpkey:e.target.dataset.key});

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
                             <img src="./images/xm-jm_period.png" alt="" />
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

