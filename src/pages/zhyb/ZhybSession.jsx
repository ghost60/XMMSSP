import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import {Link} from 'react-router';

class zhybsession extends React.Component {
    constructor(props) {
    super(props);
    this.state = { name: ''};
  }
  addmenu(mprops) {
    debugger
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
        this.state={yjbdlist:[]};
    }
    componentDidMount(){
      debugger
        $.ajax({
            url: ctx+'/yjbd/getFourYJBD',
            dataType: 'json',
            type: 'get',
            async: true,
            success: function(data) {
              this.setState({yjbdlist:data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        const list = this.state.yjbdlist.map((li,i) => {
            return  <div className="yjbd_li" key={i}>
                        <Link to={`pdfshow/预警报单/querypdf/${li.name}`}>
                        <span className="yjbd_name">{li.name}</span>
                        </Link>
                        <span className="yjbd_time">{li.time}</span>
                    </div>
            }
        );
        return  <div className="yjbd_body">
                    {list}
                </div>
        }
};
