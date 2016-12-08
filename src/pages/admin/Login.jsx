import React from 'react';
import './Login.scss';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		// alert(isAdmin)
	}
	LoginHandler(e) {
		e.preventDefault();
		var form = document.getElementById("login-form");
		var formData = new FormData(form);
		$.ajax({
			url: ctx + 'search/identify',
			dataType: 'json',
			type: 'post',
			async: true,
			data: formData,
			processData: false,  // 告诉jQuery不要去处理发送的数据
			contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
			success: function (data) {
				alert(data)
			},
			error: function (xhr, status, err) {
				alert(status);
			}
		});
	}
	render() {
		return (
			<div className="admin">
				<div className="admin-title">管理系统</div>
				<div className="admin-container">
					<div className="login-body">
						<h1>用户登录</h1>
						<form onSubmit={this.LoginHandler.bind(this)} id="login-form">
							<div className="login-info">
								用户名<input type="text" className="login-name" name="user" /><br />
							</div>
							<div className="login-info">
								密&nbsp;&nbsp;&nbsp;码<input type="password" className="login-pwd" name="password" /><br />
							</div>
							<input type="submit" className="login-btn" value="登录" />
						</form>
					</div>
				</div>
			</div>


		)

	}
}
// action={ctx2+"hsearch/identify?user=xmhyybt&password=xmhyy"}