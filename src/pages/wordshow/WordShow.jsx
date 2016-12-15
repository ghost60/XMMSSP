import React from 'react';
import {Col} from '../../components/grid/Grid';
import './WordShow.scss';


class WordShow extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:this.props.params.name,method:this.props.params.method,filename:this.props.params.filename,file:''};
  }
  componentWillMount(){
    var postdata = {filename:this.state.filename.split('--')[0],type:this.state.filename.split('--')[1]};
    $.ajax({
          url: ctx+'/'+this.state.method,
          dataType: 'html',
          type: 'post',
          async: true,
          data:postdata,
          success: function(data) {
            this.setState({file:data});
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
       			<div className="wordshow-title">
       				<span className="wordshow-name">{this.state.name}</span>
       				<span className="wordshow-back" onClick={this.back.bind(this)}>返回</span>
       			</div>
       			<div className="wordshow-body">
              <div dangerouslySetInnerHTML={{__html: this.state.file}}></div>
	       		</div>
		       </Col>	        
      }
};
export default WordShow;
