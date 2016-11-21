import React from 'react';
import './Summary.css'
export default class Summary extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="news-top">
                <div className="news-top--title">
                    {this.props.data.title}
                </div>
                <div className="news-top--summary">
                     {this.props.data.summary}
                </div>
            </div>
        )
    }
}