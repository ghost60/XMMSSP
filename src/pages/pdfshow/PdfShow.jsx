import React from 'react';
import PDF from './PDF';
import {Col} from '../../components/grid/Grid';
import './PdfShow.scss';


class PdfShow extends React.Component{
  constructor(props) {
      super(props);
      debugger
      this.state={name:this.props.params.name,method:this.props.params.method,filename:this.props.params.filename,file:''};
  }
  componentWillMount(){
    $.ajax({
          url: ctx+this.state.method,
          dataType: 'json',
          type: 'post',
          async: true,
          data:{filename:this.state.filename},
          success: function(data) {
            this.setState({file:file});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  back(){
    window.history.back(-1); 
  }
  render() {
       return  <Col offset={[1,20]} width={[18,20]}>
       			<div className="pdfshow-title">
       				<span className="pdfshow-name">{this.state.name}</span>
       				<span className="pdfshow-back" onClick={this.back.bind(this)}>返回</span>
       			</div>
       			<div className="pdfshow-body">
		       		<PDF file={'./pdf/2016001福建海浪.pdf'} />
	       		</div>
		       </Col>	        
      }
};
export default PdfShow;
