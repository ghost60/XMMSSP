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

import hyjc from '../pages/hyjc/Hyjc';
import hyjcsession from '../pages/hyjc/HyjcSession';

import hygc from '../pages/hygc/Hygc';
import hygcsession from '../pages/hygc/HygcSession';

import hyfw from '../pages/hyfw/Hyfw';
import hyfwsession from '../pages/hyfw/HyfwSession';

import hykp from '../pages/hykp/Hykp';
import hykpsession from '../pages/hykp/HykpSession';

import gzdt from '../pages/gzdt/Gzdt';

import hyyb from '../pages/hyyb/Hyyb';

import rcyb from '../pages/rcyb/Rcyb';
import rcybsession from '../pages/rcyb/RcybSession';

import hxyb from '../pages/hxyb/Hxyb';

import szyb from '../pages/szyb/Szyb';
import szybsession from '../pages/szyb/SzybSession';

import * as menudata from '../pages/menudata/menudata';

import pdfshow from '../pages/pdfshow/PdfShow';
import wordshow from '../pages/wordshow/WordShow';

class App extends React.Component {
  render() {
    return <Grid>
      <Row>
        <Col>
          <Title backimg={'./images/titleback.png'} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav navlist={menudata.navlist} />
        </Col>
      </Row>
      <Row><div style={{ height: 20 }}></div></Row>
      <Row>
        {this.props.children || (<Home />)}
      </Row>
    </Grid>
  }
};

ReactDOM.render((<Header />), document.getElementById('head'));
ReactDOM.render((<Footer />), document.getElementById('foot'));

// 配置路由
ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App}>
      <Redirect from="/hyyb" to="/hyyb/rcyb/rcybsession/hlswyb" />
      <Redirect from="/hyyb/rcyb" to="/hyyb/rcyb/rcybsession/hlswyb" />
      <Redirect from="/hyyb/szyb" to="/hyyb/szyb/szybsession/hmf_xtpy" />

      <Route path="pdfshow/:name/:method/:filename" component={pdfshow} />
      <Route path="wordshow/:name/:method/:filename" component={wordshow} />

      <Route path="dwgk" component={dwgk}>
        <Route path="dwgksession/:cid" component={dwgksession} />
      </Route>

      <Route path="hyjc" component={hyjc}>
        <Route path="hyjcsession/:cid" component={hyjcsession} />
      </Route>

      <Route path="hygc" component={hygc}>
        <Route path="hygcsession/:cid" component={hygcsession} />
      </Route>

      <Route path="hyfw" component={hyfw}>
        <Route path="hyfwsession/:cid" component={hyfwsession} />
      </Route>

      <Route path="hykp" component={hykp}>
        <Route path="hykpsession/:cid" component={hykpsession} />
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