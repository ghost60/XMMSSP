import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';
import HykpSession from './HykpSession';


class hykp extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <div>
              {/*<Col width={[1,6]}>
                <Aside cid={this.props.params.cid} parent={"hykp"}/>
              </Col>*/}
              <Col width={[6,6]}>
                {this.props.children||(<HykpSession/>)}
              </Col>
              </div>
      }
};
export default hykp;
