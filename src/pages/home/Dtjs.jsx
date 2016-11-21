import React from 'react';
import './Dtjs.css'
import Summary from '../../components/news/Summary';
import NewsList from '../../components/news/NewsList';


export default class Dtjs extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            summary:{},
            newsLists:[]
        }
        $.when($.post("http://localhost:3000/dtjs")).then((data)=>{
            console.log(data);
            this.setState(
                {
                    summary:data.summary,
                    newsLists:data.newsLists
                }
            )
        }).fail(function(){

        })
    }
    render(){
        return (
            <div>
                 <div className="dtjs-title"></div>
                 <Summary data={{title:this.state.summary.title,summary:this.state.summary.summary}}/>
                 {
                     this.state.newsLists.map(function(item,index){
                         return ( <NewsList key={index} data={{date:item.date,title:item.title}}/>)
                     })
                 }               
            </div>
        )
    }
}