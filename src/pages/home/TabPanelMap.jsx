import React from 'react';
import './TabPanelMap.css';

class TabPanelMap extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            currentIndex:-1,
            mapPointClass:"map-pt"
        }
    }
    getMapPointClass(index){
        return this.state.currentIndex === index ? "map-pt map-pt__active":"map-pt"
    }
    removeMapPointClass(){
        this.setState({currentIndex:-1})
    }
    handlerMapClick(index){
        this.setState({currentIndex:index})
        this.props.clickCall(index)
    }
    render() {
        return (
            <div className="tab-panel--left">
                <div className="tab-panel--map" name="mm" >
                    <div>
                        <img src={this.props.mapSrc} className="map1" />
                    </div>
                    <div>
                        {
                            this.props.points.map(function (item, index) {
                                return (<div id={index} onClick={this.handlerMapClick.bind(this,index)} key={index} className={this.getMapPointClass(index)} style={{ left: item.x, top: item.y }}>{item.title}</div>)
                            }.bind(this))
                        }
                    </div>

                </div>
            </div>
        )
    }
}
TabPanelMap.defaultProps = {
    mapSrc: "./images/map1.png"
};
export default TabPanelMap;