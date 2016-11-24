//主页
import React from 'react';

import Slider from '../../components/slider/Slider';
import Card from '../../components/card/Card';
import Panel from '../../components/panel/Panel';
import Tabs,{TabContent} from '../../components/tabs/Tabs';
import { TabsPanel1, TabsPanel2, TabsPanel3, TabsPanel4 } from './TabPanel';
import Dtjs from './Dtjs.jsx'
import Hykp from './Hykp'
import './Home.css'


import {Grid,Row,Col} from '../../components/grid/Grid';
import SZYBImgList from './SZYBImgList';
import YJBDList from './YJBDList';
import GZDTList from './GZDTList';

const IMAGE_DATA_1 = [
  {
    src: require('./images/1.jpg'),
    alt: 'images-1',
  },
  {
    src: require('./images/2.jpg'),
    alt: 'images-2',
  }
];
const IMAGE_DATA_2 = [
  {
    src: require('./images/东山湾生态浮标.jpg'),
    alt: '东山湾生态浮标',
  },
  {
    src: require('./images/厦门中心站完成福建.jpg'),
    alt: '厦门中心站完成福建',
  },
  {
    src: require('./images/厦门中心站.jpg'),
    alt: '厦门中心站',
  }
];

class home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return  <Row style={{minHeight:"604px",marginTop:"20px"}}>
                <Row>
                  <Col width={[1,2]}>
                    <Slider items={IMAGE_DATA_2} speed={1.2} delay={2.1} pause={true} autoplay={true} dots={true} arrows={false} istext={true} height={"300px"}/>
                  </Col>
                  <Col width={[1,2]}>
                    <Card title={'工作动态'} card_body={{marginTop:"48px"}} icon_url={require('./images/gzdt_icon.png')} more_img={require('./images/more.png')} card_title={{background:"#4b9bd7",height:"32px",lineHeight:"32px"}}>
                      <GZDTList />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Panel>
                    <Row>
                    <Col>
                     <Tabs>
                        <TabContent name="海区预报" imgSrc="./images/icon1">
                          <TabsPanel1 />
                        </TabContent>
                        <TabContent name="潮汐预报" imgSrc="./images/icon2">
                          <TabsPanel2 />
                        </TabContent>
                        <TabContent name="厦门海域预报" imgSrc="./images/icon3"><TabsPanel3 /></TabContent>
                        <TabContent name="浴场度假区预报" imgSrc="./images/icon4"><TabsPanel4 /></TabContent>
                    </Tabs>
                    </Col>
                    </Row>
                    <Row style={{marginTop:18}}>
                    <Col width={[18,30]}>
                      <Card title={'数值预报'} icon_url={require('./images/szyb_icon.png')} more_img={require('./images/more.png')} card_title={{background:"#1ea0ff",height:"58px",lineHeight:"58px"}}>
                        <SZYBImgList />
                      </Card>
                    </Col>
                    <Col width={[12,30]} pdl={18}>
                      <Card title={'预警报单'} icon_url={require('./images/yjbd_icon.png')} more_img={require('./images/more.png')} card_title={{background:"#e64f3c",height:"58px",lineHeight:"58px"}}>
                        <YJBDList />
                      </Card>
                    </Col>
                    </Row>
                   </Panel>
                </Row>                
                <Row>
                  <Col>
                    <Slider
                        items={IMAGE_DATA_1}
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
                <Panel panel_body={{ minHeight: "400px",clear:"both" }}>
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
