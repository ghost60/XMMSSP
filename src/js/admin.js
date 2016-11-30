//主面板
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Grid, Row, Col
}
from '../components/grid/Grid';
import Title from '../components/title/Title';

import Header from '../components/header/Header';
import Footer from '../pages/footer/Footer';
import Admin from '../pages/admin/Admin';

class App extends React.Component {
  render() {
    return <Grid>
              <Row>
                <Col>
                  <Title backimg={'../images/titleback.png'} />
                </Col>
              </Row>
              <Admin/>
            </Grid>
  }
};

ReactDOM.render((<Header/>), document.getElementById('head'));
ReactDOM.render((<Footer/>), document.getElementById('foot'));

// 配置路由
ReactDOM.render((<App/>), document.getElementById('content'));