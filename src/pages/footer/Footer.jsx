import React from 'react';
import {Grid,Row,Col} from '../../components/grid/Grid';
import './Footer.scss';
import Panel from '../../components/panel/Panel';
import Visitors from '../../components/visitors/Visitors';

class Footer extends React.Component{
  constructor(props) {
      super(props);
  }
  goto(e){
  	console.log(e.target.value);
  	window.open(e.target.value);
  }
  render() {  	
	return  <div className="footer_div">				
				<div className="footer_link">
					<div className="footer_link_name">网站推荐</div>
					<select className="footer_link_select" onChange={this.goto.bind(this)}>
						<option value="#">选择跳转链接</option>
						<option value="http://www.soa.gov.cn">国家海洋局</option>
						<option value="http://www.nmemc.org.cn">国家海洋环境监测中心</option>
						<option value="http://www.nmefc.gov.cn">国家海洋预报中心</option>
						<option value="http://www.coi.gov.cn">国家海洋信息中心</option>
						<option value="http://www.notcsoa.org.cn/cn/">国家海洋技术中心</option>
						<option value="http://www.eastsea.gov.cn">国家海洋局东海分局</option>
						<option value="http://www.dhjczx.org/displayIndex.do">东海监测中心</option>
						<option value="http://www.dhybzx.org/OceanPortal/pages/index.html">东海预报中心</option>
						<option value="http://www.ntjczxz.com/Default.aspx">南通海洋环境监测中心站</option>
						<option value="http://www.nbhyjc.cn">宁波海洋环境监测中心站</option>
						<option value="http://www.ntjczxz.com/Default.aspx">温州海洋环境监测中心站</option>
						<option value="http://www.mdocean.cn">宁德海洋环境监测中心站</option>
					</select>
				</div>
				<div className="footer_content">					
					<p>&copy;版权所有 2005-2016 国家海洋局厦门海洋预报台 <br/> 
					技术支持：北京超图软件股份有限公司<br/>
					闽ICP备11014332号-1<br/>
					电话：0592-2065005 地址：厦门市思明区环岛东路3909号 邮编：361008
					</p>
	            	<Visitors />
	            </div>
          	</div>

      }
};

export default Footer;

