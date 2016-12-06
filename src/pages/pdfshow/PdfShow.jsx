import React from 'react';
import PDF from './PDF';
import {Col} from '../../components/grid/Grid';
import './PdfShow.scss';


class PdfShow extends React.Component{
  constructor(props) {
      super(props);
      this.state={method:this.props.params.method,filename:this.props.params.filename};
  }
  render() {
       return  <Col offset={[1,20]} width={[18,20]}>
       			<div className="pdfshow-title">
       				<span className="pdfshow-name">测试</span>
       				<span className="pdfshow-back">返回</span>
       			</div>
       			<div className="pdfshow-body">
		       		<PDF file={'./pdf/(第二版).pdf'} />
	       		</div>
		       </Col>	        
      }
};
export default PdfShow;
