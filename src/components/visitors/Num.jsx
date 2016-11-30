import React from 'react';
import './Num.scss';

export default class Num extends React.Component{
	constructor(props) {
        super(props);
        this.state={number:'00000000'};
    }

    render(){
    	var num =this.state.number.replace(/(.)(?=[^$])/g,"$1,").split(",");
    	var li=num.map((n,i)=>{ return <li className="num-div" key={i}>{n}</li>})
    	return <ul className="num-list">
				{li}
    		   </ul>
    }
}