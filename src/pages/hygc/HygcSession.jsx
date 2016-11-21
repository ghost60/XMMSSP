import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Aside from '../../components/aside/Aside';
import Session from '../../components/session/Session';
// import './DwgkSession.scss';

var cdata='';

class hygcsession extends React.Component{
  constructor(props) {
      super(props);
      this.state={name:'',data:''};
  }
  componentDidMount(){
        $.ajax({
            url: './data/hygc.json',
            dataType: 'json',
            type: 'get',
            async: true,
            success: function(data) {
              cdata=data;
              if (!this.props.params.id) {
                this.setState({name:data[0]["name"],data:data[0]});
              }
              for (var i = 0; i < data.length; i++) {
                  if (data[i]["name"]==this.props.params.id) {
                    this.setState({name:'',data:data[i]});
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
        if (cdata[i]["name"]==this.props.params.id) {
          this.setState({data:cdata[i],name:this.props.params.id});
          break;
        }
      }
  }
  render() {
      var content = '';
      if (this.state.data.type=="text") {
        content=<div>{this.state.data.content}</div>;
      }
      return  <Session name={this.state.name}>
                {content}
              </Session>
      }
};
export default hygcsession;
