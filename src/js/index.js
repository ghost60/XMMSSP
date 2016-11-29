//主面板
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, Redirect, IndexLink } from 'react-router'
import withBasename from '../components/basename/basename';
import { Grid, Row, Col } from '../components/grid/Grid';
import Nav from '../components/nav/Nav';
import Title from '../components/title/Title';

import Header from '../components/header/Header';
import home from '../pages/home/Home';
import Footer from '../pages/footer/Footer';

import dwgk from '../pages/dwgk/Dwgk';

import hyfw from '../pages/hyfw/Hyfw';
import hyfwsession from '../pages/hyfw/HyfwSession';

import hygc from '../pages/hygc/Hygc';
import hygcsession from '../pages/hygc/HygcSession';

import gzdt from '../pages/gzdt/Gzdt';

import hyjc from '../pages/hyjc/Hyjc';

import hyyb from '../pages/hyyb/Hyyb';
import hyybsession from '../pages/hyyb/HyybSession';

import hxyb from '../pages/hxyb/Hxyb';
import hxybsession from '../pages/hxyb/HxybSession';

import szyb from '../pages/szyb/Szyb';
import szybsession from '../pages/szyb/SzybSession';

import * as menudata from '../pages/menudata/menudata';

class App extends React.Component {
  render() {
    return  <Grid>
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
                {this.props.children}
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
      <IndexRoute path="" component={home} />

      <Route path="dwgk/:id" component={dwgk} />

      <Route path="gzdt" component={gzdt} />

      <Route path="hyyb/:id" component={hyyb}>
        <Route path="hyybsession/:cid" component={hyybsession} />
        <IndexRoute path="" component={hyybsession} />
      </Route>

      <Route path="hxyb" component={hxyb}>
        <Route path="hxybsession" component={hxybsession} />
        <IndexRoute path="" component={hxybsession} />
      </Route>

      <Route path="szyb/:id" component={szyb}>
        <Route path="szybsession/:id" component={szybsession} />
        <IndexRoute path="" component={szybsession} />
      </Route>

      <Route path="hyjc/:id" component={hyjc} />

      <Route path="hygc" component={hygc}>
        <Route path="hygcsession/:id" component={hygcsession} />
        <IndexRoute path="" component={hygcsession} />
      </Route>

      <Route path="hyfw" component={hyfw}>
        <Route path="hyfwsession/:id" component={hyfwsession} />
        <IndexRoute path="" component={hyfwsession} />
      </Route>

    </Route>
  </Router>
), document.getElementById('content'));

