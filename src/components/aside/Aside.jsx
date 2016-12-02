//导航栏
import React from 'react';
import { Link } from 'react-router'
import * as menudata from '../../pages/menudata/menudata';
import './Aside.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
var aside_content;
class aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', currentIndex: 0 };
    }
    asideParentTitleClick(index) {
        this.setState({ currentIndex: index });
    }
    getAsideChildUlCls(index) {
        return this.state.currentIndex === index ? "aside-ul aside-child-ul aside-child-ul__active" : "aside-ul aside-child-ul";
    }
    updateaside(tprops) {

        // debugger aside-child-ul__active
        var list_item = [];
        var ul_item = [];
        var product = menudata.navlist[tprops.parent];
        var list = product.secFloor ? product.children[tprops.link].children : product.children;//子项目
        var list_child_item = [];
        var child_link = "";
        for(var item_key in list){
             if (list[item_key].children) {
                for (var item_child_key in list[item_key].children) {
                    child_link = tprops.parent + "/" + (!product.secFloor ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session/") +item_child_key;
                    list_child_item.push(<li className="aside-child-li" key={"child_" + item_key + "_" + item_child_key}><Link to={child_link} activeClassName="aside__active">{list[item_key].children[item_child_key].name}</Link></li>);
                }
                list_item.push(<li key={item_key} className="aside-parent-li"><div className="aside-parent-title" onClick={this.asideParentTitleClick.bind(this, list[item_key].id)}><Link activeClassName="aside__active">{list[item_key].name}</Link></div><ul className={this.getAsideChildUlCls(list[item_key].id)}>{list_child_item}</ul></li>);
                list_child_item = [];
            }
            else {
                //侧边栏一级路由
                child_link = tprops.parent + "/" + (!product.secFloor ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session/") + item_key;
                list_item.push(<li key={item_key} className="aside-parent-li"><div className="aside-parent-title"><Link to={child_link}>{list[item_key].name}</Link></div></li>)
            }
        }
        // for (var i = 0; i < list.length; ++i) {
        //     //侧边栏二级子路由
        //     if (list[i].aside && list[i].aside.length > 0) {
        //         for (var j = 0; j < list[i].aside.length; ++j) {
        //             child_link = tprops.parent + "/" + (product.aside ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session/") + list[i].aside[j].name;
        //             list_child_item.push(<li className="aside-child-li" key={"child_" + i + "_" + j}><Link to={child_link} activeClassName="aside__active">{list[i].aside[j].name}</Link></li>);
        //         }
        //         list_item.push(<li key={i} className="aside-parent-li"><div className="aside-parent-title" onClick={this.asideParentTitleClick.bind(this, i)}><Link activeClassName="aside__active">{list[i].name}</Link></div><ul className={this.getAsideChildUlCls(i)}>{list_child_item}</ul></li>);
        //         list_child_item = [];
        //     }
        //     else {
        //         //侧边栏一级路由
        //         child_link = tprops.parent + "/" + (product.aside ? tprops.parent + "Session/" : tprops.link + "/" + tprops.link + "Session/") + list[i].name;
        //         list_item.push(<li key={i} className="aside-parent-li"><div className="aside-parent-title"><Link to={child_link}>{list[i].name}</Link></div></li>)
        //     }
        // }
        ul_item.push(<ul className="aside-ul aside-parent-ul" key={'aside_ul'}>{list_item}</ul>)
        list_item = null;
        return  ul_item 
    }
    componentDidMount() {
        // this.updateaside(this.props);
        var name = menudata.navlist[this.props.parent].name;//一级中文名与路由同名
        this.setState({ name: name });
    }
    getContent() {
        return aside_content
    }
    componentWillReceiveProps(nextProps) {
        // this.updateaside(nextProps);
    }
    render() {
        return <div>
            <div className="aside_title">{this.state.name}</div>
            <div className="aside_list">
                {this.updateaside(this.props)}
            </div>
        </div>
    }
};

export default aside;
//<ReactCSSTransitionGroup key={"animate_" + i} component="div" transitionName="asideAnimate" transitionAppear={false} transitionAppearTimeout={300000} transitionEnterTimeout={300} transitionLeaveTimeout={300} style={{height:"100%"}}><ul className={this.getAsideChildUlCls(i)}>{list_child_item}</ul></ReactCSSTransitionGroup>