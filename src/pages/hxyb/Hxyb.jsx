//主面板
import React from 'react';
import {Col} from '../../components/grid/Grid';
import Session from '../../components/session/Session';

class hyyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Col>
              <Session name={'航线预报'}>
                  {this.props.children}
              </Session>
              </Col>
      }
};
export default hyyb;
