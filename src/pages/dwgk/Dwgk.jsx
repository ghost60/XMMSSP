import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import DwgkSession from './DwgkSession';

class dwgk extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <div>
              <Col width={[1,6]}>
                <Aside cid={this.props.params.cid} parent={"dwgk"}/>
              </Col>
              <Col width={[5,6]}>
                {this.props.children||(<DwgkSession/>)}
              </Col>
              </div>
      }
};
export default dwgk;
