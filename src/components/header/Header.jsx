import React from 'react';
import './Header.css'
export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            solarYear: 2016,
            solarMonth: 1,
            solarDat: 1,
            day: 1,
            GanZhiYear: "",
            lunarMonthName: "",
            lunarDayName: ""
        }
        $.when($.get("http://localhost:3000/getLunarInfo")).then((data) => {
            this.setState({
                solarYear: data.solarYear,
                solarMonth: data.solarMonth,
                solarDat: data.solarDay,
                weekDay: data.weekDay,
                GanZhiYear: data.GanZhiYear,
                lunarMonthName: data.lunarMonthName,
                lunarDayName: data.lunarDayName
            })
        }).fail(function () {
            alert("连接服务器失败！")
        })
    }
    render() {
        return (
            <div>
                <div className="header-bg1"></div>
                <div className="header-bg2">
                    <div className="header-date">
                        {this.state.solarYear}年{this.state.solarMonth}月{this.state.solarDat}日 {this.state.weekDay} {this.state.GanZhiYear} {this.state.lunarMonthName+this.state.lunarDayName}
                    </div>
                    <div className="header-right">
                        <button className="header-right--btn">设为首页</button>
                        <span className="header-right--split"></span>
                        <button className="header-right--btn">加入收藏</button>
                    </div>
                </div>
            </div>
        )
    }
}
