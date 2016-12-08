import React from 'react';
import {Grid,Row,Col} from '../../components/grid/Grid';
import './Footer.scss';
import Panel from '../../components/panel/Panel';
import Visitors from '../../components/visitors/Visitors';

class Footer extends React.Component{
  constructor(props) {
      super(props);
  }
  render() {
	return  <div className="footer_div">
				<div className="footer_link">
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
					<div style={{background:'url(./images/dyhys.png)'}}></div>
				</div>
				<div className="footer_content">					
					<p>&copy;版权所有 2005-2016 国家海洋局厦门预报台 <br/> 电话：0592-2065005 地址：厦门市思明区环岛东路3909号 邮编：361008</p>
	            	<Visitors />
	            </div>
          	</div>

      }
};

export default Footer;

