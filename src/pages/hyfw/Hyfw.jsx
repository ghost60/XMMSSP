//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';

class hyfw extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside id={8} parent={"hyfw"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children}
              </Col>
              </Row>
      }
};
export default hyfw;
