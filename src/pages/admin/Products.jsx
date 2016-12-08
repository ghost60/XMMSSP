import React from 'react';
import { Row, Col } from '../../components/grid/Grid';
import FileInput from '../../components/fileinput/FileInput';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import './Admin.scss';

export default class Products extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>Products</div>)
    }
}