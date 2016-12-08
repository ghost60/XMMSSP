import React from 'react';
import {Link} from 'react-router';
import './YJBDList.scss';

const yjbdlist=[
    {
        "grade":"blue",
        "name":"福建海浪三级预警报",
        "time":"2016-10-1",
        "code":"编号：海浪2016-001"
    },
    {
        "grade":"yellow",
        "name":"福建海浪三级预警报",
        "time":"2016-10-1",
        "code":"编号：海浪2016-001"
    },
    {
        "grade":"orange",
        "name":"福建海浪三级预警报",
        "time":"2016-10-1",
        "code":"编号：海浪2016-001"
    },
    {
        "grade":"red",
        "name":"福建海浪三级预警报",
        "time":"2016-10-1",
        "code":"编号：海浪2016-001"
    }
]

export default class YJBDList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const list = yjbdlist.map((li,i) => {
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

