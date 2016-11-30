//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Aside from '../../components/aside/Aside';

class hyyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
                <Col width={[1,6]}>
                  <Aside parent={"hyyb"} link={this.props.params.id}/>
                </Col>
                <Col >
                  {this.props.children}
                </Col>
              </Row>
      }
};
export default hyyb;
