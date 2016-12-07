import React from 'react';
import Mlist from '../../components/list/Mlist';
import Card from '../../components/card/Card';
import Session from '../../components/session/Session';
import {Col} from '../../components/grid/Grid';

class dwgk extends React.Component{
  constructor(props) {
      super(props);
      this.state={filelist:[]}
  }
  componentDidMount(){
      $.ajax({
          url: ctx+'/admin/GZDTList',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
            this.setState({filelist:data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    }
  render() {
      const list = this.state.filelist.map((li,i) => {
            return  <div className="gzdt_li" key={i}>
                        <span className="gzdt_time">{li.time}</span>
                        <Link to={`wordshow/工作动态/gzdtShow/${li.filename}`}>                        
                        <span className="gzdt_name">{li.title}</span>
                        </Link>
                    </div>
            }
      );
      return  <Col>
                <Session name={'工作动态'}>
                  <div className="gzdt_body">
                    {list}
                </div>
                </Session>
              </Col>
      }
};
export default dwgk;
