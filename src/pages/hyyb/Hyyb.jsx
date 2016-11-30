//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Hxyb from '../hxyb/Hxyb';

class hyyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
                {this.props.children||(<Hxyb/>)}
              </Row>
      }
};
export default hyyb;
