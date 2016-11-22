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
		var product = menudata.navlist[this.props.id];
		this.setState({list:product.aside[1].list,name:product.aside[0].name});
    }
    render() {
        const list = this.state.list.map((li,i) => {
            return  <span className="aside_li" key={i}>
                        <Link to={this.props.parent+'/'+this.props.parent+'session/' + li} activeClassName="active" key={i}>
                            {li}
                        </Link>
                    </span>
        });
        return  <div>
                    <div className="aside_title">{this.state.name}</div>
                    <div className="aside_list">
                    {list}
                    </div>
                </div>
    }
};

export default aside;
