import React from 'react';
import './TabPanel.css'
import TabPanelMap from './TabPanelMap'
import TabPanelTitle2 from './TabPanelTitle2'
import LineChart from '../../components/highcharts/LineChart'

import Table from '../../components/table/table'
let mapCfg;
let _this;
export class TabsPanel1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "-",
            pubTime: "-",
            data: null,
            currentIndex: 0
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 60, y: 236, title: "漳州沿海" },
            { x: 99, y: 199, title: "厦门沿海" },
            { x: 139, y: 165, title: "泉州沿海" },
            { x: 188, y: 111, title: "莆田沿海" },
            { x: 237, y: 161, title: "台湾海峡北部" },
            { x: 179, y: 253, title: "台湾海峡南部" },
        ]
    }
    componentDidMount() {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "haiqu" },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: "海浪预报",
                    pubTime: data.pubTime,
                    data: data.data
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    handlerMapCilck(i) {
        this.setState({ currentIndex: i })
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo="未来24小时海洋预报" />
                    <div className="tab-panel-info">
                        {/*<div className="tab-panel-info--container">
                            <div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1"><img src="./images/lg_icon.png"/>浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>
                            <div className="tab-panel-info--right">
                                <span className="tab-panel-info--span1"><img style={{paddingLeft:"25px"}} src="./images/sw_icon.png"/>水温</span>
                                <span className="tab-panel-info--span2">{this.state.waterTemp}</span>
                            </div>
                        </div>*/}
                        <Table data={this.state.data} col={["预报海域", "浪高", "浪级", "水温"]} currentIndex={this.state.currentIndex} />
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
            { x: 25, y: 307, title: "东山" },
            { x: 107, y: 233, title: "厦门" },
            { x: 197, y: 181, title: "崇武" },
            { x: 308, y: 100, title: "平潭" },
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
    componentDidMount() {
        this.handlerMapCilck(0);
    }
    handlerMapCilck(k) {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "chaoxi", name: this.mapCfg[k]['title'] },
            before: function () {
            },
            success: function (data) {
                var forcastTime = [data[0]["month"] + "/" + data[0]["day"], data[1]["month"] + "/" + data[1]["day"]]
                var temp_par = []
                for (var i = 0; i < data.length; ++i) {
                    var temp_child = [];
                    for (var j = 0; j < data[i]["data"].length; ++j) {
                        temp_child.push([data[i]["data"][j][0] + 8 * 3600 * 1000, data[i]["data"][j][1]]);
                    }
                    temp_par.push(temp_child)
                }
                this.setState({
                    title: this.mapCfg[k]['title'],
                    forcastTime: forcastTime,
                    data: temp_par
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
                            "series": this.state.chartData,
                            "xAxis": {
                                type: 'datetime',
                                dateTimeLabelFormats: { // don't display the dummy year
                                    hour: '%H时',
                                    day: '%m月%e日'
                                },
                                title: {
                                    text: '时间'
                                },
                                // categories: [1,2,3,4]
                            },
                            tooltip: {
                                formatter: function () {
                                    var time = new Date(parseInt(this.x - 8 * 3600 * 1000)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                                    return '<b>' + this.series.name + '</b><br/><b>时间：' + time +
                                        ' </b><b><br/>潮高：' + this.y / 100 + ' m</b>';
                                }
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
            pubTime: '-',
            data: null,
            currentIndex: 0
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 226, y: 130, title: "厦门大嶝海域" },
            { x: 312, y: 120, title: "厦门小嶝海域" },
            { x: 118, y: 81, title: "厦门同安湾" },
            { x: 36, y: 123, title: "厦门西海域" },
            { x: 190, y: 186, title: "厦门东部海域" },
            { x: 9, y: 240, title: "九龙江口海域" },
            { x: 95, y: 271, title: "厦门南部海域" },
        ]
    }
    componentDidMount() {
        // this.handlerMapCilck(0)
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "xmhaiyu" },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: "海浪预报",
                    pubTime: data.pubTime,
                    data: data.data
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    handlerMapCilck(i) {
        this.setState({ currentIndex: i })
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo={this.state.forcastInfo} />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            {/*<div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1"><img src="./images/lg_icon.png"/>浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>*/}
                            <Table data={this.state.data} currentIndex={this.state.currentIndex} />
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
            swimingtime: { name: "-", info: "-" },
            swimming: { name: "-", info: "-" },
            "stylzs": "-",
            "jsymsd": ["00:00-10:53", "14:19-23:59"]

        }
        this.mapCfg = this.props.mapCfg || [
            { x: 250, y: 148, title: "观音山" },
            { x: 222, y: 210, title: "黄厝" },
            { x: 139, y: 237, title: "曾厝垵" },
            { x: 75, y: 226, title: "港仔后" },
            { x: 78, y: 201, title: "大德记" },
            { x: 186, y: 234, title: "太阳湾" },

        ]

    }
    componentDidMount() {
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
                                            <td>{this.state.lgInfo+'m'}</td>
                                            <td>{this.state.waterTemp+'℃'}</td>
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
            currentIndex: 0
        }
        this.mapCfg = this.props.mapCfg || [
            { x: 107, y: 191, title: "泉州湾" },
            { x: 82, y: 257, title: "深沪湾" },
            { x: 44, y: 289, title: "围头湾" },
            { x: 160, y: 133, title: "大港湾" },
            { x: 245, y: 82, title: "湄洲湾南部" },
            { x: 207, y: 52, title: "湄洲湾北部" },
        ]
    }
    componentDidMount() {
        $.ajax({
            type: "post",
            url: ctx + "/forcast", //添加自己的接口链接
            timeOut: 5000,
            data: { type: "qzhyyb" },
            before: function () {
            },
            success: function (data) {
                this.setState({
                    title: "海浪预报",
                    pubTime: data.pubTime,
                    data: data.data
                })
            }.bind(this),
            error: function () {
            }
        });
    }
    handlerMapCilck(i) {
        this.setState({ currentIndex: i })
    }
    render() {

        return (
            <div className="c">
                <TabPanelMap mapSrc={this.props.mapSrc} clickCall={this.handlerMapCilck.bind(this)} points={this.mapCfg} />
                <div className={"tab-panel--right " + this.props._className}>
                    <TabPanelTitle2 title={this.state.title} pubTime={this.state.pubTime + "发布"} forcastInfo="未来24小时海洋预报" />
                    <div className="tab-panel-info">
                        <div className="tab-panel-info--container">
                            {/*<div className="tab-panel-info--left">
                                <span className="tab-panel-info--span1"><img src="./images/lg_icon.png"/>浪高</span>
                                <span className="tab-panel-info--span2">{this.state.lgInfo}</span>
                            </div>*/}
                            <Table data={this.state.data} currentIndex={this.state.currentIndex} />
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
export class TabsPanel7 extends React.Component {
    constructor() {
        super();
        this.state = {
            hlybSrc: ''
        }
        this.getImgUrl();
    }
    getImgUrl() {
        $.ajax({
            url: ctx + '/forcast?type=hlyb',
            type: 'post',
            async: true,
            success: function (data) {
                this.setState({ "hlybSrc": ctx + "/" + data })
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    }
    render() {
        return (
            <img src={this.state.hlybSrc} alt="正在加载..." style={{ width: "100%" }} />
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
