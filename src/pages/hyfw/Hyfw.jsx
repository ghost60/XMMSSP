//主面板
import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Aside from '../../components/aside/Aside';

class hyfw extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <div>
              <Col md={2}>
                <Aside id={8} parent={"hyfw"}/>
              </Col>
              <Col md={10}>
                {this.props.children}
              </Col>
              </div>
      }
};
export default hyfw;
