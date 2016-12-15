import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import {Link} from 'react-router';
import './ZhybSession.scss';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class zhybsession extends React.Component {
    constructor(props) {
    super(props);
    this.state = { name: ''};
  }
  addmenu(mprops) {
    if (!mprops.params) {
      var menu = menudata.navlist.hyyb.children.zhyb.children;
      menu = menu[Object.keys(menu)[0]];
      this.setState({name:menu.name});
    } else {
      menu = menudata.navlist.hyyb.children.zhyb.children;
      for (var key in menu) {
        if (key == mprops.params.cid) {
          this.setState({name:menu[key].name});
          return;
        }
      }
    }
  }
  componentDidMount() {
    this.addmenu(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.addmenu(nextProps);
  }
  render() {
    var com = <YJBDList/>;
    if (this.state.name==="预警报单") {
        com = <YJBDList/>;
    }else{
        com = '';
    }
    return <Session lastname={this.state.name} name={"/海洋预报/灾害预报"}>
      {com}
    </Session>
  }
};
export default zhybsession;


class YJBDList extends React.Component{
    constructor(props) {
        super(props);
        this.state={yjbdlist:[],current: 1, total: 1};
    }
    componentDidMount(){
        $.ajax({
            url: ctx+'/yjbd/getAllYJBD',
            dataType: 'json',
            type: 'get',
            async: true,
            success: function(data) {
               var total = Math.ceil(data.data.length / 8) * 10;
              this.setState({yjbdlist:data.data,total:total});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    onChange(page) {
        this.setState({
            current: page,
        });
    }
    render() {  
        var sdata = this.state.yjbdlist.slice((this.state.current - 1) * 8, (this.state.current) * 8);
        const list = sdata.map((li,i) => {
            return  <div className="zhyb_yjbd_li" key={i}>
                        <Link to={`pdfshow/预警报单/yjbd/${li.url}`}>
                        <span className="zhyb_yjbd_name">{li.name}</span>
                        </Link>
                        <span className="zhyb_yjbd_time">{li.time}</span>
                    </div>
            }
        );
        return  <div className="zhyb_yjbd_body">
                    {list}
                    <Pagination onChange={this.onChange.bind(this)} current={this.state.current} total={this.state.total} />;
                </div>
        }
};
