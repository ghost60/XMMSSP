//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import Hxyb from '../hxyb/Hxyb';

class Rcyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
      debugger
  }
  render() {
      return  <Row>
              <Col width={[1,6]}>
                <Aside parent={"rcyb"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children}
              </Col>
              </Row>
      }
};
export default Rcyb;
