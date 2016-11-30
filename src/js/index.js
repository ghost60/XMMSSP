//主面板
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router, Route, Link, hashHistory, browserHistory, IndexRoute, Redirect, IndexLink
}
from 'react-router'
import withBasename from '../components/basename/basename';
import {
  Grid, Row, Col
}
from '../components/grid/Grid';
import Nav from '../components/nav/Nav';
import Title from '../components/title/Title';

import Header from '../components/header/Header';
import Home from '../pages/home/Home';
import Footer from '../pages/footer/Footer';

import dwgk from '../pages/dwgk/Dwgk';
import dwgksession from '../pages/dwgk/DwgkSession';

import gzdt from '../pages/gzdt/Gzdt';

import hyyb from '../pages/hyyb/Hyyb';

import rcyb from '../pages/rcyb/Rcyb';
import rcybsession from '../pages/rcyb/RcybSession';

import hxyb from '../pages/hxyb/Hxyb';

import szyb from '../pages/szyb/Szyb';
import szybsession from '../pages/szyb/SzybSession';

import * as menudata from '../pages/menudata/menudata';

class App extends React.Component {
  render() {
    return <Grid>
              <Row>
                <Col>
                  <Title backimg={'../images/titleback.png'} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Nav navlist={menudata.navlist} />
                </Col>
              </Row>
              <Row><div style={{height:20}}></div></Row>
              <Row>
                {this.props.children||(<Home/>)}
              </Row>
            </Grid>
  }
};

ReactDOM.render((<Header/>), document.getElementById('head'));
ReactDOM.render((<Footer/>), document.getElementById('foot'));

// 配置路由
ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App}>

      <Route path="dwgk" component={dwgk}>
        <Route path="dwgksession/:cid" component={dwgksession} />
        <IndexRoute path="" component={dwgksession} />
      </Route>

      <Route path="gzdt" component={gzdt}>
      </Route>

      <Route path="hyyb" component={hyyb}>
        <Route path="rcyb" component={rcyb}>
          <Route path="rcybsession/:cid" component={rcybsession} />
        </Route>
        <Route path="szyb" component={szyb}>
          <Route path="szybsession/:cid" component={szybsession} />
        </Route>
        <Route path="hxyb" component={hxyb} />
      </Route>

    </Route>
  </Router>
), document.getElementById('content'));