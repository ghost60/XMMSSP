//主页
import React from 'react';
import { Link } from 'react-router'
import Slider from '../../components/slider/Slider';
import Card from '../../components/card/Card';
import Panel from '../../components/panel/Panel';
import Tabs, { TabContent } from '../../components/tabs/Tabs';
import { TabsPanel1, TabsPanel2, TabsPanel3, TabsPanel4 } from './TabPanel';
import Dtjs from './Dtjs.jsx'
import Hykp from './Hykp'
import './Home.css'


import { Grid, Row, Col } from '../../components/grid/Grid';
import SZYBImgList from './SZYBImgList';
import YJBDList from './YJBDList';
import GZDTList from './GZDTList';

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fimgs: [], simgs: [] }
  }
  componentDidMount() {
    $.ajax({
      url: ctx + '/admin/getThreeImg',
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
        this.setState({ fimgs: data.imgMessage });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: ctx + '/picture',
      dataType: 'json',
      type: 'get',
      async: true,
      success: function (data) {
        this.setState({ simgs: data.img });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  render() {
    return <Row style={{ minHeight: "604px", marginTop: "20px" }}>
      <Row>
        <Col width={[1, 2]}>
          <Slider items={this.state.fimgs} speed={1.2} delay={2.1} pause={true} autoplay={true} dots={true} arrows={false} istext={true} height={"306px"} />
        </Col>
        <Col width={[1, 2]}>
          <Card title={'工作动态'} card_body={{ marginTop: "12px" }} card_content={{ minHeight: "267px" }} icon_url={require('./images/gzdt_icon.png')} more_img={require('./images/more.png')} morelink={'gzdt/gzdtSession/gzdt'} card_title={{ background: "#4b9bd7", height: "32px", lineHeight: "32px" }}>
            <GZDTList />
          </Card>
        </Col>
      </Row>
      <Row>
        <Panel>
          <Row>
            <Col>
              <div style={{ "position": "relative" }}>
                <Link to="/hyyb/hxyb"><img src="./images/btn_hxyb.png" style={{ "position": "absolute","zIndex":1,"left":"495px","height":"45px","top":"2px" }}></img></Link>
              </div>
              <Tabs>
                <TabContent name="海区预报" imgSrc="./images/icon1">
                  <TabsPanel1 mapSrc="./images/map1_cus.png" />
                </TabContent>
                <TabContent name="潮汐预报" imgSrc="./images/icon2">
                  <TabsPanel2 mapSrc="./images/map2_cus.png" />
                </TabContent>
                <TabContent name="厦门海域预报" imgSrc="./images/icon3"><TabsPanel3 mapSrc="./images/map3_cus.png" /></TabContent>
                <TabContent name="浴场度假区预报" imgSrc="./images/icon4"><TabsPanel4 mapSrc="./images/map4_cus.png" /></TabContent>
              </Tabs>
            </Col>
          </Row>
          <Row style={{ marginTop: 18 }}>
            <Col width={[18, 30]}>
              <Card title={'数值预报'} icon_url={require('./images/szyb_icon.png')} more_img={require('./images/more.png')} morelink={'hyyb/szyb/szybsession/hmf_xtpy'} card_title={{ background: "#1ea0ff", height: "58px", lineHeight: "58px" }}>
                <SZYBImgList />
              </Card>
            </Col>
            <Col width={[12, 30]} pdl={18}>
              <Card title={'预警报单'} icon_url={require('./images/yjbd_icon.png')} more_img={require('./images/more.png')} morelink={'hyyb/zhyb/zhybSession/yjbd'} card_title={{ background: "#e64f3c", height: "58px", lineHeight: "58px" }}>
                <YJBDList />
              </Card>
            </Col>
          </Row>
        </Panel>
      </Row>
      <Row>
        <Col>
          <Slider
            items={this.state.simgs}
            speed={1.2}
            delay={2.1}
            pause={true}
            autoplay={true}
            dots={true}
            arrows={false}
            height={"170px"}
            />
        </Col>
      </Row>
      <Row>
        <Panel panel_body={{ minHeight: "400px", clear: "both" }}>
          <div className="dtjs">
            <Dtjs />
          </div>
          <div className="hykp">
            <Hykp />
          </div>
        </Panel>
      </Row>
    </Row>
  }
};
export default home;
