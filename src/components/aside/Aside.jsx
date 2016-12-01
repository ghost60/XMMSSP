//导航栏
import React from 'react';
import { Link } from 'react-router'
import * as menudata from '../../pages/menudata/menudata';
import './Aside.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', ul_item: [] };
    }
    updateaside(tprops) {
        // debugger
        var list_item = [];
        var ul_item = [];
        var product = menudata.navlist[tprops.parent];
        var list = product.aside || product.children[tprops.link].aside;//子项目
        var name = product.name;//一级中文名与路由同名
        var list_child_item = [];
        var child_link = "";
        for (var i = 0; i < list.length; ++i) {
            //侧边栏二级子路由
            if (list[i].aside && list[i].aside.length > 0) {
                for (var j = 0; j < list[i].aside.length; ++j) {
                    child_link = tprops.parent + "/" + (product.aside ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session")+ list[i].aside[j].name;
                    list_child_item.push(<li className="aside-child-li" key={"_child_" + i + "_" + j}><Link to={child_link} activeClassName="active">{list[i].aside[j].name}</Link></li>);
                }
                list_item.push(<li key={i} className="aside-parent-li"><div className="aside-parent-title"><Link>{list[i].name}</Link></div><ReactCSSTransitionGroup key={"animate_" + i} component="div" transitionName="asideAnimate" transitionAppear={true} transitionAppearTimeout={300000} transitionEnterTimeout={300} transitionLeaveTimeout={300}><ul className="aside-ul aside-child-ul">{list_child_item}</ul></ReactCSSTransitionGroup></li>);
                list_child_item =[];
            }
            else {
                child_link = tprops.parent + "/" + (product.aside ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session") + "/" + list[i].name;
                list_item.push(<li key={i} className="aside-parent-li"><div className="aside-parent-title"><Link to={child_link}>{list[i].name}</Link></div></li>)
            }
        }
        ul_item.push(<ul className="aside-ul aside-parent-ul" key={'aside_ul'}>{list_item}</ul>)
        list_item = null;
        this.setState({ name: name, ul_item: ul_item });
        ul_item = null;
    }
    componentWillMount() {
        this.updateaside(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // this.updateaside(nextProps);
    }
    render() {
        return <div>
            <div className="aside_title">{this.state.name}</div>
            <div className="aside_list">
                {this.state.ul_item}
            </div>
        </div>
    }
};

export default aside;
