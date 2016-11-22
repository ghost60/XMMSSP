import React from 'react';
import {Link} from 'react-router';
import './GZDTList.scss';

const gzdtlist=[
  {
    name:'厦门中心站完成福建南部海域八月综合“体检”任务',
    time:'10-24'
  },
  {
    name:'东山湾生态浮标完成大修并重新布放',
    time:'08-10'
  },
  {
    name:'莆田海洋站站部正式动工',
    time:'08-04'
  },
  {
    name:'厦门中心站第三党支部开展“两学一做”专题党课教育',
    time:'08-04'
  },
  {
    name:'厦门中心站创新培训方式凝聚团队精神',
    time:'07-04'
  },
  {
    name:'“苏迪罗”强台风登陆福建，厦门中心站精心部署全力应对',
    time:'07-04'
  }
];

export default class GZDTList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const list = gzdtlist.map((li,i) => {
            return  <div className="gzdt_li" key={i}>
                        <span className="gzdt_time">{li.time}</span>
                        <span className="gzdt_name">{li.name}</span>
                    </div>
            }
        );
        return  <div className="gzdt_body">
                    {list}
                </div>
        }
};

