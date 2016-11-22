import React from 'react';
import {Grid,Row,Col} from '../../components/grid/Grid';
import './Footer.scss';
import Panel from '../../components/panel/Panel';

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
					<div className="footer_img" style={{background:'url(./images/footimg.png)'}}></div>
					<p>&copy;版权所有 2005-2011 国家海洋局厦门预报台 <br/> 电话：0592-2065005 地址：厦门市思明区环岛东路3909号 邮编：361008</p>
	            </div>
          	</div>

      }
};

export default Footer;

