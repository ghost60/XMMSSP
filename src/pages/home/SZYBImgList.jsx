import React from 'react'
import {Link} from 'react-router'
import './SZYBImgList.scss'

export default class SZYBImgList extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <div className='szybimg-body' style={this.props.card_body}>
      <div className='szybimg-li' style={{background: 'url(./images/haimianfeng.png) no-repeat'}}><Link to={'hyyb/szyb/szybsession/hmf_xtpy'}><span className='szybimg-text'>海面风场</span></Link></div>
      <div className='szybimg-li' style={{background: 'url(./images/hailang.png) no-repeat'}}><Link to={'hyyb/szyb/szybsession/hailang_twhx'}><span className='szybimg-text'>海浪</span></Link></div>
      <div className='szybimg-li' style={{background: 'url(./images/hailiu.png) no-repeat'}}><Link to={'hyyb/szyb/szybsession/hailiu_twhx'}><span className='szybimg-text'>海流</span></Link></div>
      <div className='szybimg-li' style={{background: 'url(./images/chaoxi.png) no-repeat'}}><Link to={'hyyb/szyb/szybsession/chaoxi_twhx'}><span className='szybimg-text'>潮汐</span></Link></div>
    </div>
  }
};

