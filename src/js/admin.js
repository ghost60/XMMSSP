//主面板
import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from '../components/grid/Grid';
import Title from '../components/title/Title';
import FileInput from '../components/fileinput/FileInput';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import Header from '../components/header/Header';
import Footer from '../pages/footer/Footer';
import  "../pages/admin/Login.scss"
import {Router, Route, Link, hashHistory, browserHistory, IndexRoute, Redirect, IndexLink}from 'react-router'
import "../pages/admin/Admin.scss"


let isLogin = 0;
let _nextState;
let _this;
$.ajax({
          url: ctx + '/search/isLogin',
          dataType: 'json',
          type: 'get',
          async: false,
          xhrFields: {
           withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
              isLogin=parseInt(data.islogin)
          }.bind(this),
          error: function(xhr, status, err) {
            debugger
            
          }.bind(this)
      });
const requireAuth = (nextState, replace) => {
    if (isLogin===0) {
      _nextState = nextState      
        console.log(nextState)
        replace({ pathname: '/login' })
    }
    else{
      _nextState = nextState
    }
}
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <div>
      <Header />
    <Grid>
      <Row>
        <Col>
          <Title backimg={'../images/titleback.png'} />
        </Col>
      </Row>
        {this.props.children || <Admin/>}
    </Grid><Footer /></div>
  }
};
//列表
class NavLists extends React.Component{
   constructor(props){
    super(props)
  }
  render() {
      return  <Row>
                <Col>
                  <div className="navlist">
                    <div className="navli"><Link to="admin/gzdt" activeClassName="navLi__active">上传工作动态</Link></div>
                    <div className="navli"><Link to="admin/dtjs" activeClassName="navLi__active">上传党团建设</Link></div>
                    <div className="navli"><Link to="admin/products" activeClassName="navLi__active">查看产品</Link></div>
                    <div className="navli"><Link to="admin/xfk" activeClassName="navLi__active">悬浮框</Link></div>
                  </div>
                </Col>
              </Row>
      }
}
//党团建设
class Dtjs extends React.Component{
 constructor(props){
    super(props)
    this.state=({name:'',link:'', data: [], current: 1, total: 1});

    
  }
  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }
  formyz(){
    debugger
      var file = document.getElementById("file");
      var title = document.getElementById("title");
      if(file.files.length<1 || title.value==""){
          alert("上传文件不能为空");
          return false;
      }
      return true;
  }
  upload(e){
    e.preventDefault();
    var file = document.getElementById("file");
    var title = document.getElementById("title");
      if(file.files.length<1 || title.value==""){
          alert("上传文件不能为空");
          return false;
      }
    var form=document.getElementById("upload");
    var formdata=new FormData(form);
    $.ajax({
          url: ctx + '/pubNews/pubNews',
          dataType: 'json',
          type: 'post',
          async: true,
          processData: false,  // 告诉jQuery不要去处理发送的数据
			    contentType: false, 
          data: formdata,
          success: function(data) {
            debugger
          }.bind(this),
          error: function(xhr, status, err) {
            debugger
              
          }.bind(this)
      });
  }
  querydata() {
   $.ajax({
          url: ctx + '/pubNews/getJsonList',
          dataType: 'json',
          type: 'post',
          async: true,
          success: function(data) {
            debugger
            this.setState({data:data})
          }.bind(this),
          error: function(xhr, status, err) {
            debugger
            
          }.bind(this)
      });
  }
  componentDidMount() {
     this.querydata();
  }
  onChange(page) {
    this.setState({
      current: page,
    });
  }
  onDelete(record, e) {
    debugger
    console.log('Delete', record.name);
    e.preventDefault();
  }
  changeTop(state,filename,e){
    $.ajax({
              url: ctx + '/pubNews/changeTOP',
              dataType: 'json',
              type: 'post',
              async: true,
              data:{state:state,filename:filename},
              success: function(data) {
                if(data==="1"){
                  alert("取消置顶成功！")
                }
              }.bind(this),
              error: function(xhr, status, err) {
                alert("取消失败")
              }.bind(this)
          });
    debugger
  }
  render(){
    const columns = [
        { title: '文件名称', dataIndex: 'fileName', key: 'name', width: 100 },
        { title: '文件标题', dataIndex: 'title', key: 'title', width: 100 },
        { title: '上传时间', dataIndex: 'time', key: 'time', width: 100 },
        {
          title: '删除', dataIndex: 'delete', key: 'delete', width: 100, render: (text, record) =>
          <a onClick={e => this.onDelete(record, e)} href="#">删除</a>,
        },
        {
          title: '置顶', dataIndex: 'istop', key: 'letup', width: 100, render: (text, record) =>{
            if(text==="1"){
              return <a onClick={this.changeTop.bind(this,"0",record["fileName"])} href="">取消置顶</a>
           }
           else{
              return <a onClick={this.changeTop.bind(this,"1",record["fileName"])} href="" >置顶</a>
           }
          }
        }
      ];
      var sdata=this.state.data.slice((this.state.current-1)*4,(this.state.current)*4);
      return  <Row>
                <Col >
                  <form id="upload" encType ="multipart/form-data"  method="post" onSubmit={this.upload.bind(this)}>
                    <div className="form-group"><lable>文件选择</lable><FileInput name="file" accept="application/msword" onChange={this.handleChange} /></div>
                    <div className="form-group"><lable>文章标题</lable><input id="title" name="title" type="input"/></div>
                    <div className="form-group"><lable>文章摘要</lable><input id="summary" name="summary" type="input"/></div>
                    <div className="form-group"><lable>是否置顶</lable><input id="istop" name="istop" type="checkbox"/></div>
                    <div className="form-group"><button className="submit" type="submit" >立即上传</button></div>
                  </form>
                </Col>
                <Col >
                  <Table
                    columns={columns}
                    data={sdata}
                  />
                  <Pagination onChange={this.onChange.bind(this)} current={this.state.current} total={this.state.total} />;
                </Col>
              </Row>
      
  }
}
//工作动态
class Gzdt extends React.Component{
   constructor(props) {
      super(props);
      this.state=({name:'',link:'', data: [], current: 1, total: 1});
      console.log(ctx);
  }
  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }
  formyz(){
    debugger
      var file = document.getElementById("file");
      var title = document.getElementById("title");
      if(file.files.length<1 || title.value==""){
          alert("上传文件不能为空");
          return false;
      }
      return true;
  }
  upload(e){
    e.preventDefault();
    var file = document.getElementById("file");
    var title = document.getElementById("title");
      if(file.files.length<1 || title.value==""){
          alert("上传文件不能为空");
          return false;
      }
    var form=document.getElementById("upload");
    var formdata=new FormData(form);
    $.ajax({
          url: ctx + '/admin/formupload',
          dataType: 'json',
          type: 'post',
          async: true,
          data: formdata,
          processData: false,  // 告诉jQuery不要去处理发送的数据
		    	contentType: false, 
          success: function(data) {
            debugger
          }.bind(this),
          error: function(xhr, status, err) {
            debugger
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  querydata() {
    $.ajax({
          url: ctx + './data/gzdt.json',
          dataType: 'json',
          type: 'get',
          async: true,
          processData: false,  // 告诉jQuery不要去处理发送的数据
			    contentType: false, 
          success: function(data) {
            debugger
            var total = Math.ceil(data.list.length/4)*10;
            this.setState({data:data.list,total:total});
          }.bind(this),
          error: function(xhr, status, err) {
            debugger
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  componentDidMount() {
    // this.querydata();
  }
  onChange(page) {
    this.setState({
      current: page,
    });
  }
  onDelete(record, e) {
    debugger
    console.log('Delete', record.name);
    e.preventDefault();
  }
  render() {
      const columns = [
        { title: '文件名称', dataIndex: 'name', key: 'name', width: 100 },
        { title: '文件标题', dataIndex: 'title', key: 'title', width: 100 },
        { title: '上传时间', dataIndex: 'time', key: 'time', width: 100 },
        {
          title: '删除', dataIndex: 'delete', key: 'delete', width: 100, render: (text, record) =>
          <a onClick={e => this.onDelete(record, e)} href="#">删除</a>,
        },
        {
          title: '置顶', dataIndex: 'letup', key: 'letup', width: 100, render: (text, record) =>
          <a onClick={e => this.onDelete(record, e)} href="#">置顶</a>,
        }
      ];
      var sdata=this.state.data.slice((this.state.current-1)*4,(this.state.current-1)*4+4);
      return  <Row>
                <Col offset={[1,6]} width={[4,6]}>
                  <form id="upload" encType ="multipart/form-data"  method="post" onSubmit={this.upload.bind(this)}>
                    <div className="form-group"><lable>文件选择</lable><FileInput name="file" accept="application/msword" onChange={this.handleChange} /></div>
                    <div className="form-group"><lable>文件标题</lable><input id="title" name="title" type="input"/></div>
                    <div className="form-group"><button className="submit" type="submit" >立即上传</button></div>
                  </form>
                </Col>
                <Col offset={[1,6]} width={[4,6]}>
                  <Table columns={columns} data={sdata}/>
                  <Pagination onChange={this.onChange.bind(this)} current={this.state.current} total={this.state.total} />;
                </Col>
              </Row>
      }

}
//产品
class Products extends React.Component{
    constructor(props){
        super(props);
        this.state={
          name:"西太平洋",
          location:"XMMSSP\\upload\\img\\XTPY",
          remark:"手动上传"
        }
    }
    productsClickHandler(type,e){
      debugger
      if (e.target && e.target.nodeName == "DIV") {
        this.setState({
          name:this.props.lists[type][e.target.id].name,
          location:this.props.lists[type][e.target.id].location,
          remark:this.props.lists[type][e.target.id].remark,
        })
      }
    }
    render(){
        return (<div>
          <div className="products-info-c">
            <div className="product-info--left">
              <div className="product-info--col"><label>党团建设上传地址</label><span>XMMSSP\upload\img\dtword</span></div>
              <div className="product-info--col"><label>首页轮播图上传地址</label><span>XMMSSP\upload\indexPic</span></div>
            </div>
            <div className="product-info--right">
              <div className="product-info--col"><label>产品名</label><span>{this.state.name}</span></div>
              <div className="product-info--col"><label>FTP文件路径</label><span>{this.state.location}</span></div>
              <div className="product-info--col"><label>备注</label><span>{this.state.remark}</span></div>
            </div>
            </div>
            <div className="product-list-c">
              <div className="product-list-col" onClick={this.productsClickHandler.bind(this,"szyb")}>
                 <span>数值预报</span>
                 {
                   this.props.lists.szyb.map((ele,index)=>{
                     return <div key={ele.name} id={index}>{ele.name}</div>
                   })
                 }
              </div>
              <div className="product-list-col" onClick={this.productsClickHandler.bind(this,"hyyb")}>
                 <span>海洋预报</span>
                  {
                   this.props.lists.hyyb.map((ele,index)=>{
                     return <div  key={ele.name} id={index}>{ele.name}</div>
                   })
                 }       
              </div>
              <div className="product-list-col" onClick={this.productsClickHandler.bind(this,"hxyb")}>
                 <span>航线预报</span>                
                 {
                   this.props.lists.hxyb.map((ele,index)=>{
                     return <div key={ele.name} id={index}>{ele.name}</div>
                   })
                 }                   
              </div>
            </div>
          </div>
        
        )
    }
}
Products.defaultProps={
  lists:{
    szyb:[
      {
        name:"西太平洋",
        location:"XMMSSP\\upload\\img\\XTPY",
        remark:"手动上传"
      },
      {
        name:"台湾海峡(海面风)",
        location:"XMMSSP\\upload\\img\\HMFTWHX",
        remark:"手动上传"
      },
      {
        name:"台湾海峡(海浪)",
        location:"XMMSSP\\upload\\img\\HLTWHX",
        remark:"手动上传"
      },
      {
        name:"厦金海域",
        location:"XMMSSP\\upload\\img\\XJHY",
        remark:"手动上传"
      },
      {
        name:"两马海域",
        location:"XMMSSP\\upload\\img\\LMHY",
        remark:"手动上传"
      },
      {
        name:"台湾海峡(海流)",
        location:"XMMSSP\\upload\\img\\HLTWHX",
        remark:"手动上传"
      },
      {
        name:"小区(海流)",
        location:"XMMSSP\\upload\\img\\HLXQ",
        remark:"手动上传"
      },
      {
        name:"台湾海峡(潮汐)",
        location:"XMMSSP\\upload\\img\\CXTWHX",
        remark:"手动上传"
      },
      {
        name:"小区(潮汐)",
        location:"XMMSSP\\upload\\img\\CXXQ",
        remark:"手动上传"
      }
    ],
    hyyb:[
      {
        name:"海浪水温预报",
        location:"数据库",
        remark:"自动上传"
      },
      {
        name:"海浪预报图",
        location:"XMMSSP\\upload\\img\\HLYB",
        remark:"自动上传"
      },
      {
        name:"潮汐预报",
        location:"数据库",
        remark:"自动上传"
      },
      {
        name:"厦门海洋预报",
        location:"数据库",
        remark:"自动上传"
      },
      {
        name:"风暴潮动画示意图",
        location:"XMMSSP\\upload\\img\\FBCDHSYT",
        remark:"自动上传"
      },
      {
        name:"海浪动画示意图",
        location:"XMMSSP\\upload\\img\\HLDHSYT",
        remark:"自动上传"
      },
      {
        name:"滨海旅游区预报",
        location:"数据库",
        remark:"自动上传"
      },
      {
        name:"海浪预警报单",
        location:"XMMSSP\\upload\\img\\yjword",
        remark:"自动上传"
      },
      {
        name:"风暴潮预警报单",
        location:"XMMSSP\\upload\\img\\yjword",
        remark:"自动上传"
      }
    ],
    hxyb:[
      {
        name:"xml",
        location:"XMMSSP\\upload\\download\\xml",
        remark:"手动上传"
      },
       {
        name:"xls",
        location:"XMMSSP\\upload\\download\\xls",
        remark:"手动上传"
      }
    ]
  }
}
//悬浮框
class Xfk extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>悬浮框</div>)
    }
}
//后台管理总页面
class Admin extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="admin">
       <div className="admin-title">后台管理</div>
       <div className="admin-container">
        <div className="admin-aside">
         <NavLists/>
        </div>
        <div className="admin-right-container">
         {this.props.children || <Gzdt/>}
        </div>
        <div>
        </div>
       </div>   
      </div>
    )
  }
}
class Login extends React.Component {
	constructor(props) {
		super(props);
		// alert(isAdmin)
    _this = this;
	}
	LoginHandler(e) {
	  e.preventDefault();
		var user = $("#user").val();
		var password = $("#password").val();
    var _formData = {user:user,password:password};
		$.ajax({
			url: ctx + '/search/identify',
			dataType: 'json',
			type: 'get',
			async: true,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
			data: _formData,
			success: function (data) {
        if(data.type==='fail'){
          alert(data.rows)
          isLogin = 0;
        }
        else if(data.type==='success'){
          isLogin = 1;
          if(_nextState)
            hashHistory.push(_nextState.location.pathname);
            //  _this.context.router.push(_nextState.location.pathname)
          else
           hashHistory.push('admin');
          //  _this.context.router.push('http://127.0.0.1/admin.html#/admin')
        }
			},
			error: function (xhr, status, err) {
				alert(status);
        debugger
        isLogin = 0;
			}
		});
   
}
	render() {
		return (
			<div className="admin">
				<div className="admin-title">用户登录</div>
				<div className="admin-container">
					<div className="login-body">
						<h1>用户登录</h1>
						<form onSubmit={this.LoginHandler.bind(this)} id="loginform">
							<div className="login-info">
								用户名<input type="text" className="login-name" name="user" id="user"/><br />
							</div>
							<div className="login-info">
								密&nbsp;&nbsp;&nbsp;码<input type="password" className="login-pwd" name="password" id="password"/><br />
							</div>
							<input type="submit" className="login-btn" value="登录" />
						</form>
					</div>
				</div>
			</div>
		)
	}
}

// ReactDOM.render((<Header />), document.getElementById('head'));
// ReactDOM.render((<Footer />), document.getElementById('foot'));
// 配置路由
ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App}>
        <Redirect from="admin" to="admin/gzdt" />
        <Route path="login" component={Login}/>
        <Route path="admin" component={Admin} onEnter={requireAuth}>
          
          <Route path="gzdt" component={Gzdt}/>
          <Route path="dtjs" component={Dtjs}/>
          <Route path="products" component={Products}/>
          <Route path="xfk" component={Xfk}/>
        </Route>
      </Route>
  </Router>
), document.getElementById('content'));