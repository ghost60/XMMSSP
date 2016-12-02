import React from 'react';
import './Dtjs.css'
import Summary from '../../components/news/Summary';
import NewsList from '../../components/news/NewsList';


export default class Dtjs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: {},
            newsLists: []
        }
         $.ajax({
            type: "post",
            url: "http://chukui0202.xicp.net/dtjs", //添加自己的接口链接
            timeOut: 5000,
            before: function () {
                console.log("before");
            },
            success: function (data) {
                // var data = JSON.parse(data)
                console.log(data)
                this.setState(
                    {
                        summary: data.summary,
                        newsLists: data.newsLists
                    }
                )
            }.bind(this),
            error: function () {
                console.log("error");
            }
        });
        // $.post("http://localhost:3000/dtjs", {}, (data, status) => {
        //     if (status === 'success') {
        //         this.setState(
        //             {
        //                 summary: data.summary,
        //                 newsLists: data.newsLists
        //             }
        //         )
        //     }else{

        //     }
        // })
        // $.when($.post("http://localhost:3000/dtjs")).then((data) => {
        //     console.log(data);
        //     this.setState(
        //         {
        //             summary: data.summary,
        //             newsLists: data.newsLists
        //         }
        //     )
        // }).fail(function () {

        // })
    }
    render() {
        return (
            <div>
                <div className="dtjs-title"></div>
                <Summary data={{ title: this.state.summary.title, summary: this.state.summary.summary }} />
                {
                    this.state.newsLists.map(function (item, index) {
                        return (<NewsList key={index} data={{ date: item.date, title: item.title }} />)
                    })
                }
            </div>
        )
    }
}