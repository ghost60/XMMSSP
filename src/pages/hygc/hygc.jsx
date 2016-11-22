//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';

class hygc extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside id={7} parent={"hygc"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children}
              </Col>
              </Row>
      }
};
export default hygc;
