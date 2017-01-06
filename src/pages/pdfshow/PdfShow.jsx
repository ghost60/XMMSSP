import React from 'react';
// import PDF from './PDF';
import {Col} from '../../components/grid/Grid';
import './PdfShow.scss';


class PdfShow extends React.Component{
  constructor(props) {
      super(props);
      this.state={
        name:this.props.params.name,
        method:this.props.params.method,
        filename:this.props.params.filename,
        file:''
      };
  }
  componentDidMount(){
    var postdata = {filename:this.state.filename};
    if (this.state.filename.indexOf('-')!=-1) {
      postdata = {filename:this.state.filename.split('-')[0],type:this.state.filename.split('-')[1]};
    }
    $.ajax({
          url: ctx+'/'+this.state.method.replace('-','/'),
          dataType: 'json',
          type: 'post',
          async: true,
          data:postdata,
          success: function(data) {
            var container = document.querySelector("#pdf");
            PDFObject.embed(data.fullUrl, container);
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
           			<div className="pdfshow-body" id="pdf">   		       		
    	       		</div>
    		       </Col>	        
      }
};
export default PdfShow;
