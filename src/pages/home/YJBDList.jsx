import React from 'react';
import {Link} from 'react-router';
import './YJBDList.scss';

export default class YJBDList extends React.Component{
    constructor(props) {
        super(props);
        this.state={fimgs:[]};
    }
    componentDidMount(){
        $.ajax({
            url: ctx+'/yjbd/getFourYJBD',
            dataType: 'json',
            type: 'get',
            async: true,
            success: function(data) {
              this.setState({fimgs:data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        const list = this.state.fimgs.map((li,i) => {
            return  <div className="yjbd_li" key={i}>
                        <span className="yjbd_grade" style={{background:li.grade}}></span>
                        <Link to={`pdfshow/预警报单/querypdf/${li.name}`}>
                        <span className="yjbd_name">{li.name}</span>
                        </Link>
                        <span className="yjbd_time">{li.time}</span>
                        <span className="yjbd_code">{li.code}</span>
                    </div>
            }
        );
        return  <div className="yjbd_body">
                    {list}
                </div>
        }
};

