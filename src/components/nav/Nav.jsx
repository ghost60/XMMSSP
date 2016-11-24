//导航栏
import React from 'react';
import { Link, IndexLink } from 'react-router';
import './Nav.scss';
var nav_li = [];
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentIndex:-1,
            childUlClass:"nav-child--ul"
        }
        var navlist = this.props.navlist;
        var key_num = -1;
       
       
    }
    getChildUlClass(index) {
        return this.state.currentIndex === index ? "nav-child--ul ul-active":"nav-child--ul"
    } 
    setCurrentIndex(index) {
        this.setState({currentIndex:index})
    }
    render() {
        var navlist = this.props.navlist;
        var key_num = -1;
        var nav_li = [];
        for (var key in navlist) {
            key_num++;
            var child_li = [];
            var child_ul;
            for (var child_key in navlist[key].children) {
                child_li.push(<li><Link to={child_key}>{navlist[key].children[child_key].name}</Link></li>)
            }
            if (child_li.length > 0) {
                child_ul = <ul className={this.getChildUlClass(key_num)}>{child_li}</ul>;
            }
            if (key_num === 0) {
                nav_li.push(<div className="nav_li" onMouseLeave={this.setState({currentIndex:-1})} onMouseEnter={this.setCurrentIndex.bind(this,key_num)} key={key_num}>
                    <span>
                        <IndexLink to="/" activeClassName="active">
                            {navlist[key].name}
                        </IndexLink>
                    </span>
                    {child_ul}
                </div>)
            }
            else {

                nav_li.push(<div className="nav_li"  onMouseLeave={this.setState({currentIndex:-1})} onMouseEnter={this.setCurrentIndex.bind(this,key_num)} key={key_num}>
                    <span>
                        {
                            child_li.length > 0 ? (<a>{navlist[key].name}</a>) : (<Link to={key} activeClassName="active">
                                    {navlist[key].name}
                                </Link>)
                        }

                    </span>
                    {child_ul}
                </div>)
            }
            child_li = null;
            child_ul = null;
        }
        return <div className="nav_body">{nav_li}</div>
    };
}
export default Nav;
  // <Link to={key} activeClassName="active">
                        //     {navlist[key].name}
                        // </Link>
 //     if (key_num == 0) {
        //         return <div className="nav_li" key={key_num}>
        //             <span>
        //                 <IndexLink to="/" activeClassName="active">
        //                     {list.name}
        //                 </IndexLink>
        //             </span>

        //         </div>
        //     } else {
        //         return <div className="nav_li" key={key_num}>
        //             <span>
        //                 <Link to={list.type} activeClassName="active">
        //                     {list.name}
        //                 </Link>
        //             </span>
        //         </div>
        //     }

        // }
        // const __list = this.props.navlist.map((list, i) => {
        //   var childListLi;

        //              childListLi = list.children.map((child, index) => {
        //                 return <li>{child.name}</li>
        //             })

        //         debugger
        //         var childListUl = <ul>{childListLi}</ul>


        //     if (i == 0) {
        //         return <div className="nav_li" key={list.id}>
        //             <span>
        //                 <IndexLink to="/" activeClassName="active">
        //                     {list.name}
        //                 </IndexLink>
        //             </span>

        //         </div>
        //     } else {
        //         return <div className="nav_li" key={list.id}>
        //             <span>
        //                 <Link to={list.type} activeClassName="active">
        //                     {list.name}
        //                 </Link>
        //             </span>
        //         </div>

        //     }
        // }
        // );