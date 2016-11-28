import React from 'react';
import {Col} from '../../components/grid/Grid';
import Session from '../../components/session/Session';

var cdata='';

class dwgk extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:'',data:''};
  }
  componentDidMount(){
      $.ajax({
          url: './data/dwgk.json',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
            cdata=data;
            if (!this.props.params.id) {
              this.setState({name:data[0]["ename"],data:data[0]});
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i]["ename"]==this.props.params.id) {
                  this.setState({name:data[i]["name"],data:data[i]});
                  break;
                }
            }
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  componentWillReceiveProps(nextProps) {
    if(cdata=='')return;
    for (var i = 0; i < cdata.length; i++) {
        if (cdata[i]["ename"]==this.props.params.id) {
          this.setState({data:cdata[i],name:cdata[i]["name"]});
          break;
        }
      }
  }
  render() {
      var content = '';
      var path=[];
      if (this.state.data.type=="text") {
        content=<div>{this.state.data.content}</div>
      }else if (this.state.data.type=="img") {
        var imgs = this.state.data.content;
        var width = 100/(imgs.length)+'%';
        for (var i = imgs.length - 1; i >= 0; i--) {
          const imgsrc = require(imgs[i]);
          path.push(<img src={imgsrc} key={i} style={{width:width}}/>);
        }
        content=path;
      }

      return  <Col >
                <Session name={this.state.name}>
                  {content}
                </Session>
              </Col>
    }
};
export default dwgk;
