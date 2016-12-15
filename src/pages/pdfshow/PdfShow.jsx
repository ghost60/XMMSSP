import React from 'react';
import PDF from './PDF';
import {Col} from '../../components/grid/Grid';
import './PdfShow.scss';


class PdfShow extends React.Component{
  constructor(props) {
      super(props);
      this.state={
        name:this.props.params.name,
        method:this.props.params.method,
        filename:this.props.params.filename,
        file:'',
        page:1,
        pages:1
      };
  }
  componentWillMount(){
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
            this.setState({file:data.fullUrl});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  back(){
    window.history.back(-1); 
  }
  onDocumentComplete(pages){
    this.setState({pages:pages});
  }
  bef(){
    if (this.state.page-1===0) return;
    this.setState({page:this.state.page-1});
  }
  aft(){
    if (this.state.page-1===this.state.pages) return;
    this.setState({page:this.state.page+1});
  }
  render() {
       return  <Col offset={[1,20]} width={[18,20]}>
           			<div className="pdfshow-title">
           				<span className="pdfshow-name">{this.state.name}</span>
           				<span className="pdfshow-back" onClick={this.back.bind(this)}>返回</span>
           			</div>
           			<div className="pdfshow-body">
    		       		<PDF file={this.state.file} page={this.state.page} onDocumentComplete={this.onDocumentComplete.bind(this)}/>              
                  <div className="pdfshow-page"><span className="pdfshow-page-bef" onClick={this.bef.bind(this)}>前一页</span><span className="pdfshow-page-num">{this.state.page+'/'+this.state.pages}</span><span className="pdfshow-page-aft" onClick={this.aft.bind(this)}>后一页</span></div>
    	       		</div>
    		       </Col>	        
      }
};
export default PdfShow;
