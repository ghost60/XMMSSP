//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import ZhybSession from './ZhybSession';

class Zhyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
      console.log(this.props.params.cid)
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside cid={this.props.params.cid} parent={"hyyb"} link={"zhyb"} />
              </Col>
              <Col width={[5,6]}>
                {this.props.children||(<ZhybSession/>)}
              </Col>
              </Row>
      }
};
export default Zhyb;
