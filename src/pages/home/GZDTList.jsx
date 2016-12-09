import React from 'react';
import {Link} from 'react-router';
import './GZDTList.scss';

export default class GZDTList extends React.Component{
    constructor(props) {
        super(props);
        this.state={filelist:[]}
    }
    componentDidMount(){
      $.ajax({
          url: ctx+'/admin/GZDTList8',
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
                        <span className="gzdt_time">{li.time.substring(0,10)}</span>
                        <Link to={`wordshow/工作动态/queryWord/${li.fileName.split('.')[0]}`}>                        
                        <span className="gzdt_name">{li.title}</span>
                        </Link>
                    </div>
            }
        );
        return  <div className="gzdt_body">
                    {list}
                </div>
        }
};

