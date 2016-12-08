import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import GzdtSession from './GzdtSession';


class gzdt extends React.Component{
    constructor(props) {
      super(props);
  }
  render() {
      return  <div>
              <Col width={[1,6]}>
                <Aside cid={this.props.params.cid} parent={"gzdt"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children||(<GzdtSession/>)}
              </Col>
              </div>
      }
};
export default gzdt;
