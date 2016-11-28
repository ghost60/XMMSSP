//导航栏
import React from 'react';
import { Link } from 'react-router'
import * as menudata from '../../pages/menudata/menudata';
import './Aside.scss';

class aside extends React.Component {
    constructor(props) {
        super(props);
        this.state={name:'',list_item:[]};
    }
    updateaside(tprops){
        var list_item=[];
        var product = menudata.navlist[tprops.parent];
        var list=product.children[tprops.link].list;
        var name=product.children[tprops.link].name;
        list.map((li,i)=>{
            list_item.push(
                <span className="aside_li" key={i}>
                    <Link to={tprops.parent + '/' + tprops.link + '/' + tprops.parent + 'session/' + li.ename} activeClassName="active" key={i}>
                        {li.name}
                    </Link>
                </span>
            )
        })
        this.setState({name:name,list_item:list_item});
    }
    componentWillMount() {
        this.updateaside(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateaside(nextProps);
    }
    render() {
        return <div>
            <div className="aside_title">{this.state.name}</div>
            <div className="aside_list">
                {this.state.list_item}
            </div>
        </div>
    }
};

export default aside;
