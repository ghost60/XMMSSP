import React from 'react'

class TabPanelTitle2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            pubTime: this.props.pubTime,
            forcastInfo: this.props.forcastInfo
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.title,
            pubTime: nextProps.pubTime,
            forcastInfo: nextProps.forcastInfo
        })
    }
    render() {
        return (<div className="tab-right--title">
            <div className="tab-right--title--left">
                <span>{this.state.title}</span>
            </div>
            <div className="tab-right--title--right">
                <div>
                    <span className="tab-right--title--right-span1">{this.state.pubTime}</span>
                </div>
                <div>
                    <span className="tab-right--title--right-span2">{this.state.forcastInfo}</span>
                </div>
            </div>
        </div>)

    }
}
TabPanelTitle2.defaultProps = {
    title: "",
    pubTime: "",
    forcastInfo: ""
}
export default TabPanelTitle2;