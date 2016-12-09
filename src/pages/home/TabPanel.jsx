import React from 'react';
import './TabPanel.css'
import TabPanelMap from './TabPanelMap'
import TabPanelTitle2 from './TabPanelTitle2'
import LineChart from '../../components/highcharts/LineChart'
let mapCfg;
let _this;
export class TabsPanel1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: "-",
            forcastInfo: '-',
            lgInfo: "-",
            waterTemp: "-"
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 11, y: 185, title: "漳州沿海" },
            { x: 57, y: 140, title: "厦门沿海" },
            { x: 101, y: 106, title: "泉州沿海" },
            { x: 128, y: 62, title: "莆田沿海" },
            { x: 200, y: 92, title: "台湾海峡北部" },
            { x: 118, y: 182, title: "台湾海峡南部" },
        ]
        this.handlerMapCilck(0)
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "haiqu", name: this.mapCfg[i]['title'] },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: this.mapCfg[i]['title'],
                    pubTime: data.pubTime,
                    forcastInfo: data.forcastInfo,
                    lgInfo: data.lgInfo,
                    waterTemp: data.waterTemp
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo={this.state.forcastInfo} />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            <div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1">浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>
                            <div className="tab-panel-info--right">
                                <span className="tab-panel-info--span1">水温</span>
                                <span className="tab-panel-info--span2">{this.state.waterTemp}</span>
                            </div>
                        </div>
                        <div className="tab-panel--tips">
                            <div dangerouslySetInnerHTML={{ __html: "微浪&lt0.1m<br />4=&lt巨浪&lt6m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.1=&lt小浪&lt0.5m<br />6=&lt狂狼&lt9m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.5=&lt轻浪&lt1.25m<br />9=&lt狂涛&lt14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "1.25=&lt中浪&lt2.5m<br />怒涛&gt=14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "2.5=&lt大浪&lt4m" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class TabsPanel2 extends React.Component {

    constructor(props) {
        super(props)
        _this = this;
        this.mapCfg = this.props.mapCfg || [
            { x: 69, y: 242, title: "东山" },
            { x: 146, y: 165, title: "厦门" },
            { x: 238, y: 87, title: "崇武" },
            { x: 314, y: 39, title: "平潭" },
        ]
        this.state = {
            title: this.mapCfg[0]['title'],
            forcastTime: ["", ""],
            data: [[], []],
            chartData: [],
            dataPickerClass: "tab-panel--datePicker",
            currentDateIndex: 0
        }
      
    }
    componentDidMount(){
          this.handlerMapCilck(0);
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "chaoxi", name: this.mapCfg[i]['title'] },
            before: function () {
            },
            success: function (data) {  
                var forcastTime = [data[0]["month"] + "/" + data[0]["day"], data[1]["month"] + "/" + data[1]["day"]]
                this.setState({
                    title: this.mapCfg[i]['title'],
                    forcastTime: forcastTime,
                    data: [data[0]["data"], data[1]["data"]],
                })
                this.handlerDatePickerClick(0)
            }.bind(this),
            error: function () {
               
            }
        });
    }
    handlerDatePickerClick(i) {
      
        _this.setState({
            chartData: [
                {
                    name: _this.state.title,
                    data: _this.state.data[i],
                }
            ],
            currentDateIndex: i
        })
    }
    getCurrentDatePickerClass(index) {
        return this.state.currentDateIndex === index ? "tab-panel--datePicker tab-panel--datePicker__active" : "tab-panel--datePicker"
    }
    render() {

        return (

            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={"潮汐预报"} forcastInfo={this.state.forcastTime[0] + "-" + this.state.forcastTime[1]} />
                    <div className="tab-panel-info--container">
                        <div style={{ "margin": "10px 0 10px 0" }}>
                            {
                                _this.state.forcastTime.map(function (item, index) {
                                  
                                    return (
                                        <div key={index} onClick={_this.handlerDatePickerClick.bind(_this, index)} className={_this.getCurrentDatePickerClass(index)}>{item}</div>
                                    )
                                })
                            }
                        </div>
                        <LineChart config={{
                            "series": this.state.chartData, xAxis: {
                                categories: ['01:30', '07:39', '13:51', '20:30']
                            }
                        }} />
                    </div>

                </div>
            </div>
        )
    }
}


export class TabsPanel3 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: '-',
            forcastInfo: '-',
            lgInfo: "-",
            waterTemp: "-"
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 178, y: 181, title: "厦门大嶝海域" },
            { x: 233, y: 156, title: "厦门小嶝海域" },
            { x: 97, y: 106, title: "厦门同安湾" },
            { x: 36, y: 154, title: "厦门西海域" },
            { x: 135, y: 215, title: "厦门东部海域" },
            { x: 9, y: 240, title: "厦门九龙江口" },
            { x: 95, y: 271, title: "厦门南部海域" },
        ]
        this.handlerMapCilck(0)
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "xmhaiyu", name: this.mapCfg[i]['title'] },
            before: function () {
              
            },
            success: function (data) {
              
                this.setState({
                    title: this.mapCfg[i]['title'],
                    pubTime: data.pubTime,
                    forcastInfo: data.forcastInfo,
                    lgInfo: data.lgInfo,
                })
            }.bind(this),
            error: function () {
               
            }
        });
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo={this.state.forcastInfo} />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            <div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1">浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>
                        </div>
                        <div className="tab-panel--tips">
                            <div dangerouslySetInnerHTML={{ __html: "微浪&lt0.1m<br />4=&lt巨浪&lt6m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.1=&lt小浪&lt0.5m<br />6=&lt狂狼&lt9m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.5=&lt轻浪&lt1.25m<br />9=&lt狂涛&lt14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "1.25=&lt中浪&lt2.5m<br />怒涛&gt=14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "2.5=&lt大浪&lt4m" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class TabsPanel4 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: '-',
            forcastInfo: '-',
            lgInfo: "-",
            waterTemp: "-",
            swimingtime: {name:"-",info:"-"},
            swimming: {name:"-",info:"-"},
            "stylzs": "-",
            "jsymsd": ["00:00-10:53", "14:19-23:59"]

        }
        this.mapCfg = this.props.mapCfg || [
            { x: 250, y: 148, title: "观音山" },
            { x: 222, y: 210, title: "黄厝" },
            { x: 108, y: 253, title: "曾厝垵" },
            { x: 56, y: 228, title: "港仔后" },
            { x: 53, y: 194, title: "大德记" },
            { x: 186, y: 234, title: "太阳湾" },

        ]
        this.handlerMapCilck(0)
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "yuchang", name: this.mapCfg[i]['title'] },
            before: function () {
            },
            success: function (data) {          
                this.setState({
                    title: this.mapCfg[i]['title'],
                    pubTime: data.pubTime,
                    forcastInfo: data.forcastInfo,
                    lgInfo: data.lgInfo,
                    waterTemp: data.waterTemp,
                    swimming: data.swimming,
                    swimingtime: data.swimingtime,
                    "stylzs": data.stylzs,
                    "jsymsd": data.jsymsd
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo={this.state.forcastInfo} />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            <div style={{ "padding": "20px" }}>
                                <table>
                                    <tbody>
                                        <tr className="tab-panel-info--thead">
                                            <td>{this.state.swimming.name}</td>
                                            <td>{this.state.swimingtime.name}</td>
                                            <td>沙滩娱乐指数</td>
                                        </tr>
                                        <tr className="tab-panel-info--tbody">
                                            <td>{this.state.swimming.info}</td>
                                            <td>{this.state.swimingtime.info}</td>
                                            <td>{this.state.stylzs}</td>
                                        </tr>
                                        <tr className="tab-panel-info--thead">
                                            <td>浪高</td>
                                            <td>水温</td>
                                            <td>礁石淹没时段</td>
                                        </tr>
                                        <tr className="tab-panel-info--tbody">
                                            <td>{this.state.lgInfo}</td>
                                            <td>{this.state.waterTemp}</td>
                                            <td>
                                                {
                                                    this.state.jsymsd.map(function (item, index) {
                                                        return (<div key={index}>{item}</div>)
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class TabsPanel5 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: '-',
            forcastInfo: '-',
            lgInfo: "-",
            waterTemp: "-",
            "dysyd": "-",
            "zjdysj": "-",
            "stylzs": "-",
            "jsymsd": ["00:00-10:53", "14:19-23:59"]

        }
        this.mapCfg = this.props.mapCfg || [
            { x: 250, y: 148, title: "观音山" },
            { x: 222, y: 210, title: "黄厝" },
            { x: 108, y: 253, title: "曾厝垵" },
            { x: 56, y: 228, title: "港仔后" },
            { x: 53, y: 194, title: "大德记" },
            { x: 186, y: 234, title: "太阳湾" },

        ]
        this.handlerMapCilck(0)
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "binhailvyou", name: this.mapCfg[i]['title'] },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: this.mapCfg[i]['title'],
                    pubTime: data.pubTime,
                    hbggzs: data.hbggzs,
                    hsylzs: data.hsylzs
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo="未来24小时海洋预报" />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            <div style={{ "padding": "20px" }}>
                                <table style={{ "width": "100%" }}>
                                    <tbody>
                                        <tr className="tab-panel-info--thead">
                                            <td>海上游览指数</td>
                                            <td>海滨观光指数</td>
                                        </tr>
                                        <tr className="tab-panel-info--tbody">
                                            <td>{this.state.hsylzs}</td>
                                            <td>{this.state.hbggzs}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class TabsPanel6 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: '-',
            lgInfo: "-",
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 107, y: 191, title: "泉州湾" },
            { x: 82, y: 257, title: "深沪湾" },
            { x: 44, y: 289, title: "围头湾" },
            { x: 160, y: 133, title: "大港湾" },
            { x: 245, y: 82, title: "湄洲湾南部" },
            { x: 207, y: 52, title: "湄洲湾北部" },
        ]
        this.handlerMapCilck(0)
    }
    handlerMapCilck(i) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "qzhyyb", name: this.mapCfg[i]['title'] },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: this.mapCfg[i]['title'],
                    pubTime: data.pubTime,
                    forcastInfo: data.forcastInfo,
                    lgInfo: data.lgInfo,
                })
            }.bind(this),
            error: function () {              
            }
        });
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo="未来24小时海洋预报" />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            <div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1">浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>
                        </div>
                        <div className="tab-panel--tips">
                            <div dangerouslySetInnerHTML={{ __html: "微浪&lt0.1m<br />4=&lt巨浪&lt6m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.1=&lt小浪&lt0.5m<br />6=&lt狂狼&lt9m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "0.5=&lt轻浪&lt1.25m<br />9=&lt狂涛&lt14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "1.25=&lt中浪&lt2.5m<br />怒涛&gt=14m" }}></div>
                            <div dangerouslySetInnerHTML={{ __html: "2.5=&lt大浪&lt4m" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TabsPanel1.defaultProps = {
    _className: "",
    mapCfg: null
}
TabsPanel2.defaultProps = {
    _className: "",
    mapCfg: null
}
TabsPanel3.defaultProps = {
    _className: "",
    mapCfg: null
}
TabsPanel4.defaultProps = {
    _className: "",
    mapCfg: null
}
TabsPanel5.defaultProps = {
    _className: "",
    mapCfg: null
}
TabsPanel6.defaultProps = {
    _className: "",
    mapCfg: null
}