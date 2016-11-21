//主面板
import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Card from '../../components/card/Card';

class hyyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <div>
              <Col md={12}>
              <Card title={'航线预报'} mborder_content={{minHeight:"568px"}}>
                  {this.props.children}
              </Card>
              </Col>
              </div>
      }
};
export default hyyb;
