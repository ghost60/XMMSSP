//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import SzybSession from './SzybSession';

class szyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside parent={"hyyb"} link={"szyb"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children||(<SzybSession/>)}
              </Col>
              </Row>
      }
};
export default szyb;
