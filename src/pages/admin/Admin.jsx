//主面板
import React from 'react';
import {Row,Col} from '../../components/grid/Grid';
import FileInput from '../../components/fileinput/FileInput';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import  './Admin.scss';

class Admin extends React.Component{
  constructor(props) {
      super(props);
      this.state=({link:Upload});
  }
  liselect(){
    if (true) {
      setState({link:Upload});
    }
  }
  render() {
      return  <Row>
                <div className="admin">
                  <div className="admin-title">管理系统</div>
                  <Col width={[1,6]}>
                    <NavList liselect={this.liselect.bind(this)}/>
                  </Col>
                  <Col width={[5,6]}>
                    <this.state.link />
                  </Col>
                </div>
              </Row>
      }
};
export default Admin;

class NavList extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:''});
  }
  render() {
      return  <Row>
                <Col>
                  <div className="navlist">
                    <div className="navli">上传工作动态</div>
                    <div className="navli">查看产品</div>
                    <div className="navli">悬浮框</div>
                  </div>
                </Col>
              </Row>
      }
};


class Upload extends React.Component{
  constructor(props) {
      super(props);
      this.state=({name:'',link:'', data: [], current: 1, total: 1});
      this.data = [
          { key: '0', a: '测试', b:'测试', c: '测试'},
        ]
  }
  handleChange(event) {
    console.log('Selected file:', event.target.files[0]);
  }
  formyz(){
    debugger
      var file = document.getElementById("file");
      var filename = document.getElementById("filename");
      if(file.files.length<1 || filename.value==""){
          alert("上传文件不能为空");
          return false;
      }
      return true;
  }
  upload(){
    var form=document.getElementById("upload");
    var formdata=new FormData(form);
    $.ajax({
          url: './data/gzdt.json',
          dataType: 'json',
          type: 'post',
          async: true,
          data: formdata,
          success: function(data) {
            debugger
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }
  }
  querydata() {
    $.ajax({
          url: './data/gzdt.json',
          dataType: 'json',
          type: 'get',
          async: true,
          success: function(data) {
            var total = Math.ceil(data.list.length/4)*10;
            this.setState({data:data.list,total:total});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
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
                  <form id="upload" encType ="multipart/form-data" action="http://192.168.19.124:8080/XMMSSP/lyb/formupload" method="post" onSubmit={this.formyz}>
                    <div className="form-group"><lable>文件选择</lable><FileInput name="file" accept="application/msword" onChange={this.handleChange} /></div>
                    <div className="form-group"><lable>文件标题</lable><input id="filename" name="filename" type="input"/></div>
                    <div className="form-group"><input className="submit" type="submit" value="上传"/></div>
                  </form>
                </Col>
                <Col offset={[1,6]} width={[4,6]}>
                  <Table
                    columns={columns}
                    data={sdata}
                  />
                  <Pagination onChange={this.onChange.bind(this)} current={this.state.current} total={this.state.total} />;
                </Col>
              </Row>
      }
};
