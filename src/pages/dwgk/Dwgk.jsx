import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Aside from '../../components/aside/Aside';

class dwgk extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      if (true) {}
      return  <div>
              <Col md={2}>
                <Aside id={1} parent={"dwgk"}/>
              </Col>
              <Col md={10}>
                {this.props.children}
              </Col>
              </div>
      }
};
export default dwgk;
