//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';

class szyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside id={5} parent={"szyb"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children}
              </Col>
              </Row>
      }
};
export default szyb;
