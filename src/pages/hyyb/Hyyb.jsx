//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import Rcyb from '../rcyb/Rcyb';

class hyyb extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
            
               
                {this.props.children||(<Rcyb/>)}
            
            
                    
              </Row>
      }
};
export default hyyb;
