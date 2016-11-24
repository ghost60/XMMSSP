//导航栏
import React from 'react';
import {Link} from 'react-router'
import * as menudata from '../../pages/menudata/menudata';
import './Aside.scss';

class aside extends React.Component{
    constructor(props) {
        super(props);
        this.state={list:[]};
    }
    componentDidMount(){
		var product = menudata.navlist[this.props.link];
		this.setState({list:product.children,name:product.name});
    }
    render() {
        var list = this.state.list;
        var list_item = [];
        var key_num = -1;
        for(var key in list){
            key_num++;
            list_item.push(
                <span className="aside_li" key={key_num}>
                        <Link to={this.props.link+'/'+this.props.link+'session/' + key} activeClassName="active" key={key_num}>
                            {list[key][name]}
                        </Link>
                    </span>
            )
        }
        return  <div>
                    <div className="aside_title">{this.state.name}</div>
                    <div className="aside_list">
                    {list_item}
                    </div>
                </div>
    }
};

export default aside;
