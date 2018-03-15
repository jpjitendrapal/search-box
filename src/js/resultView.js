import React from "react";
import ReactDOM from "react-dom";

class ResultView extends React.Component {
    constructor(){
        super();
        this.state = {
            isHighlighted: false
        }
        this.onMouseEnterAction = this.onMouseEnterAction.bind(this);
        this.onMouseLeaveAction = this.onMouseLeaveAction.bind(this);
    }
    onMouseEnterAction(e,item){
        e.target.focus();
        this.setState({isHighlighted: true});
    }
    onMouseLeaveAction(e,item){
        this.setState({isHighlighted: false});
    }
    
    render(){
        let item = this.props.data;
        let that = this;
        return (<div onKeyPress={function(e){that.props.resultOnKeyPressAction(e,item.name)}}  onClick={function(e){that.props.resultOnClickAction(e,item.name)}} tabIndex={this.props.tabNum} className={"user-data " + (this.state.isHighlighted ? "highlight" : "")} data-id={item.id} onMouseLeave={function(e){that.onMouseLeaveAction(e,item)}} onMouseEnter={function(e){that.onMouseEnterAction(e,item)}}>
                    <div role="option">
                        <div className="user-id">{item.id}</div>
                        <div className="name">{item.name}</div>
                        <div className="address">{item.address}</div>
                        <hr/>
                    </div>
                </div>)
    }
}

export default ResultView;