//主面板
import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Aside from '../../components/aside/Aside';

class hyjc extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <div>
              <Col md={2}>
                <Aside id={6} parent={"hyjc"}/>
              </Col>
              <Col md={10}>
                {this.props.children}
              </Col>
              </div>
      }
};
export default hyjc;
