import React from 'react';
import './NewsList.css'
import CurrentDate from '../../components/date/CurrentDate';

export default class NewsList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{"margin":8}}>
                <CurrentDate date={this.props.data.date} />
                <div className="news-linkTitle">
                    {this.props.data.title}
                </div>
            </div>
        )
    }
}