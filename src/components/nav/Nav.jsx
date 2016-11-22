//导航栏
import React from 'react';
import {Link,IndexLink} from 'react-router';
import './Nav.scss';

class Nav extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const list = this.props.navlist.map( (list,i) => {
            if (list.id==0) {
                return  <div className="nav_li" key={list.id}>
                        <span>
                            <IndexLink to = "/" activeClassName="active">
                            {list.name}
                            </IndexLink>
                        </span>
                        </div>
            }else{
                return  <div className="nav_li" key={list.id}>
                        <span>
                            <Link to={list.type} activeClassName="active">
                            {list.name}
                            </Link>
                        </span>
                        </div>

            }
        }
        );
        return  <div className="nav_body">
                  {list}
                </div>
    }
};
export default Nav;
