import React from 'react'
import './Hykp.css'

export default class Hykp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: -1,
      imgHoverClass: 'hykp-img--div'
    }
  }
  imgListHoverHandler (i) {
    this.setState({currentIndex: i})
  }
  imgListClass (i) {
    return this.state.currentIndex === i ? 'hykp-img--div hykp-img--div__hover' : 'hykp-img--div'
  }
  render () {
    return (
      <div>
        <div className='hykp-title' />
        <div className='hykp-imgBg'>
          <div className='hykp__left'>
            <div className='hykp--imgContainer' onMouseOut={this.imgListHoverHandler.bind(this, -1)} onMouseOver={this.imgListHoverHandler.bind(this, 0)}>
              <a href='http://www.fjocean.com/#/wordshow/海洋科普/hykpword/海洋科普海啸--0'>
                <img src='./images/icon.png' className='hykp-icon' alt='' />
                <img src='./images/img1.png' className='hykp-img' alt='' />
                <div style={{ 'position': 'relative' }}>
                  <div className={this.imgListClass(0)}><span className='hykp-img--span'>海洋科普知识-海啸</span></div>
                </div>
              </a>
            </div>
          </div>
          <div className='hykp__right'>
            <div className='hykp--imgContainer' onMouseOut={this.imgListHoverHandler.bind(this, -1)} onMouseOver={this.imgListHoverHandler.bind(this, 1)}>
              <a href='http://www.fjocean.com/#/wordshow/海洋科普/hykpword/海洋科普潮汐--0'>
                <img src='./images/icon.png' className='hykp-icon' alt='' />
                <img src='./images/img2.png' className='hykp-img' alt='' />
                <div style={{ 'position': 'relative' }}>
                  <div className={this.imgListClass(1)}><span className='hykp-img--span'>海洋科普知识-潮汐</span></div>
                </div>
              </a>
            </div>
          </div>
          <div className='hykp__left'>
            <div className='hykp--imgContainer' onMouseOut={this.imgListHoverHandler.bind(this, -1)} onMouseOver={this.imgListHoverHandler.bind(this, 2)}>
              <a href='http://www.fjocean.com/#/wordshow/海洋科普/hykpword/海洋观测技术--0'>
                <img src='./images/icon.png' className='hykp-icon' alt='' />
                <img src='./images/img3.png' className='hykp-img' alt='' />
                <div style={{ 'position': 'relative' }}>
                  <div className={this.imgListClass(2)}><span className='hykp-img--span'>海洋科普知识-海洋观测</span></div>
                </div>
              </a>
            </div>
          </div>
          <div className='hykp__right'>
            <div className='hykp--imgContainer' onMouseOut={this.imgListHoverHandler.bind(this, -1)} onMouseOver={this.imgListHoverHandler.bind(this, 3)}>
              <a href='http://www.fjocean.com/#/wordshow/海洋科普/hykpword/海洋防灾减灾--0'>
                <img src='./images/icon.png' className='hykp-icon' alt='' />
                <img src='./images/img4.png' className='hykp-img' alt='' />
                <div style={{ 'position': 'relative' }}>
                  <div className={this.imgListClass(3)}><span className='hykp-img--span'>海洋科普知识-防灾常识</span></div>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>)
  }
}
