import React from 'react';
import './Login.scss';

export default class Login extends React.Component{
	 constructor(props) {
      super(props);
  }

  render(){
  	return <div className="login-body">
  			<h1>用户登录</h1>
  			<form>
  				<div  className="login-info">
  				用户名<input type="text" className="login-name" /><br/>
  				</div>
  				<div  className="login-info">
  				密&nbsp;&nbsp;&nbsp;码<input type="password" className="login-pwd"/><br/>
  				</div>
				<input type="submit" className="login-btn" value="登录"/>
			</form>
  	       </div>
  }
}