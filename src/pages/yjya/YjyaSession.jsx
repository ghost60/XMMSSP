import React from 'react';
import Session from '../../components/session/Session';
import * as menudata from '../../pages/menudata/menudata';
import './YjyaSession.scss';

class yjyasession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',src:'',data:[]};
  }
  componentDidMount() {
    this.addname(this.props);
  }
  addname(mprops){
    if (!mprops.params) {
      var menu = menudata.navlist.yjya.children;
      var key = Object.keys(menu)[0];
      menu = menu[key];
      this.setState({ name: menu.name, src: key });
    }else{
      menu = menudata.navlist.yjya.children;
      for (var key in menu) {
        if (key == mprops.params.cid) {
          this.setState({ name: menu[key].name, src: key });
        }
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.addname(this.props);
  }
  downloadlist(name){
    $.ajax({
          url: ctx+'/getHXYB/download',
          dataType: 'json',
          type: 'post',
          async: true,
          data:{fileName:name},
          success: function(data) {
              this.setState({data:data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  render() {  
    const list = this.state.data.map((li,i) => {
          return  <div className="yjya_show_li" key={i}>                        
                      <Link to={`pdfshow/应急预案/yjya/${li.url}`}>
                      <span className="yjya_show_name">{li.title}</span>
                      </Link>
                  </div>
          }
    );
    return  <Session lastname={this.state.name.replace('<br/>','')} name={"/应急预案"}>
              {list}
            </Session>
  }
};
export default yjyasession;
