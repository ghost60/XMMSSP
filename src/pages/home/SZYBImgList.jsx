import React from 'react';
import {Link} from 'react-router';
import './SZYBImgList.scss';

export default class SZYBImgList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return  <div className="szybimg-body" style={this.props.card_body}>
                    <div className="szybimg-li" style={{background:'url(./images/hailang.png) no-repeat'}}><span className="szybimg-text">海面风场</span></div>
                    <div className="szybimg-li" style={{background:'url(./images/hailang.png) no-repeat'}}><span className="szybimg-text">海浪</span></div>
                    <div className="szybimg-li" style={{background:'url(./images/hailiu.png) no-repeat'}}><span className="szybimg-text">海流</span></div>
                    <div className="szybimg-li" style={{background:'url(./images/chaoxi.png) no-repeat'}}><span className="szybimg-text">潮汐</span></div>
                </div>
        }
};

