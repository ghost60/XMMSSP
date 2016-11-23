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

        ajax({
            type: "get",
            url: "http://localhost:3000/getLunarInfo", //添加自己的接口链接
            timeOut: 5000,
            before: function () {
                console.log("before");
            },
            success: function (data) {
                var data = JSON.parse(data)
                console.log(data)
                this.setState({
                    solarYear: data.solarYear,
                    solarMonth: data.solarMonth,
                    solarDat: data.solarDay,
                    weekDay: data.weekDay,
                    GanZhiYear: data.GanZhiYear,
                    lunarMonthName: data.lunarMonthName,
                    lunarDayName: data.lunarDayName
                })
            }.bind(this),
            error: function () {
                console.log("error");
            }
        });

        // $.get("http://localhost:3000/getLunarInfo", function (data, status) {
        //     alert(22222)
        //     if (status === 'success') {
        //         this.setState({
        //             solarYear: data.solarYear,
        //             solarMonth: data.solarMonth,
        //             solarDat: data.solarDay,
        //             weekDay: data.weekDay,
        //             GanZhiYear: data.GanZhiYear,
        //             lunarMonthName: data.lunarMonthName,
        //             lunarDayName: data.lunarDayName
        //         })
        //     } else {
        //         alert("连接失败，轻检查网络或向管理员报告")
        //     }
        // }.bind(this))

        // $.when($.get("http://localhost:3000/getLunarInfo")).then((data) => {
        //     this.setState({
        //         solarYear: data.solarYear,
        //         solarMonth: data.solarMonth,
        //         solarDat: data.solarDay,
        //         weekDay: data.weekDay,
        //         GanZhiYear: data.GanZhiYear,
        //         lunarMonthName: data.lunarMonthName,
        //         lunarDayName: data.lunarDayName
        //     })
        // }).fail(function () {
        //     alert("连接服务器失败！")
        // })
    }
    SetHome() {
        var vrl = window.location;
        var obj = document.body;
        try {
            obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
        }
        catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', vrl);
            } else {
                alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
            }
        }
    }
    AddFavorite() {
        var sURL = encodeURI(window.location)
        var sTitle = document.title;
        try {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }

    render() {
        return (
            <div>
                <div className="header-bg1"></div>
                <div className="header-bg2">
                    <div className="header-date">
                        {this.state.solarYear}年{this.state.solarMonth}月{this.state.solarDat}日 {this.state.weekDay} {this.state.GanZhiYear} {this.state.lunarMonthName + this.state.lunarDayName}
                    </div>
                    <div className="header-right">
                        <button className="header-right--btn" onClick={this.SetHome}>设为首页</button>
                        <span className="header-right--split"></span>
                        <button className="header-right--btn" onClick={this.AddFavorite}>加入收藏</button>
                    </div>
                </div>
            </div>
        )
    }
}
