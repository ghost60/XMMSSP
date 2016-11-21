import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Aside from '../../components/aside/Aside';
import Mlist from '../../components/list/Mlist';
import Card from '../../components/card/Card';

const LIST_DATA=[
  {
    content:'厦门中心站完成福建南部海域八月综合“体检”任务',
    tag:'2016-10-24'
  },
  {
    content:'东山湾生态浮标完成大修并重新布放',
    tag:'2016-08-10'
  },
  {
    content:'莆田海洋站站部正式动工',
    tag:'2016-08-04'
  },
  {
    content:'厦门中心站第三党支部开展“两学一做”专题党课教育',
    tag:'2016-08-04'
  },
  {
    content:'厦门中心站创新培训方式凝聚团队精神',
    tag:'2016-07-04'
  },
  {
    content:'“苏迪罗”强台风登陆福建，厦门中心站精心部署全力应对',
    tag:'2016-07-04'
  }
];

class dwgk extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
      return  <div>
              <Col md={12}>
                <Card title={'工作动态'} card_content={{minHeight:"568px"}}>
                  <Mlist list={LIST_DATA} />
                </Card>
              </Col>
              </div>
      }
};
export default dwgk;
