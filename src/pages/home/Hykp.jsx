import React from 'react';
import './Hykp.css'



export default class Hykp extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="hykp-title">
                </div>
                <div className="hykp-imgBg">
                    <div className="hykp__left">
                        <div className="hykp--imgContainer">
                            <img src="/images/icon.png" className="hykp-icon" alt="" />
                            <img src="/images/img1.png" className="hykp-img" alt="" />
                            <div style={{ "position": "relative" }}>
                                <div className="hykp-img--div"><span className="hykp-img--span">海浪观测情况</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="hykp__right">
                        <div className="hykp--imgContainer">
                            <img src="/images/icon.png" className="hykp-icon" alt="" />
                            <img src="/images/img2.png" className="hykp-img" alt="" />
                            <div style={{ "position": "relative" }}>
                                <div className="hykp-img--div"><span className="hykp-img--span">潮汐观测情况</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="hykp__left">
                        <div className="hykp--imgContainer ">
                            <img src="/images/icon.png" className="hykp-icon" alt="" />
                            <img src="/images/img3.png" className="hykp-img" alt="" />
                            <div style={{ "position": "relative" }}>
                                <div className="hykp-img--div"><span className="hykp-img--span">气象观测概况</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="hykp__right">
                        <div className="hykp--imgContainer">
                            <img src="/images/icon.png" className="hykp-icon" alt="" />
                            <img src="/images/img4.png" className="hykp-img" alt="" />
                            <div style={{ "position": "relative" }}>
                                <div className="hykp-img--div"><span className="hykp-img--span">海啸灾情应急响应标准等级划分</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="hykp-class--container">
                        <div className="hykp-class">
                            <img src="/images/title-icon.png" alt="" />
                            <span>海浪灾害应急响应标准等级划分</span>
                        </div>
                        <div className="hykp-class">
                            <img src="/images/title-icon.png" alt="" />
                            <span>风暴潮应急响应标准等级划分</span>
                        </div>
                        <div className="hykp-class">
                            <img src="/images/title-icon.png" alt="" />
                            <span>风暴潮预警启动标准等级划分</span>
                        </div>
                    </div>
                </div>

            </div>)
    }
}