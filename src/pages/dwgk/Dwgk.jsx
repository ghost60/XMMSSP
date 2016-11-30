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
              <Col width={[1,6]}>
                <Aside parent={"dwgk"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children}
              </Col>
              </div>
      }
};
export default dwgk;
