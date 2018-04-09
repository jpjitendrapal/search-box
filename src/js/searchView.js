import React from "react";
import ReactDOM from "react-dom";
import ResultView from "./resultView";

class SearchInput extends React.Component{
    constructor(){
        super();
        this.state={
            result: [],
            showSearchView: false,
            clickedResult: ""
        }
        this.searchInp = "";
        this.getSearchResult = this.getSearchResult.bind(this);
        this.resultOnClickAction = this.resultOnClickAction.bind(this);
        this.resultOnKeyPressAction = this.resultOnKeyPressAction.bind(this);
        this.searchInputTypeTimer = null;
        this.timerId = null;
    }
    
    showSearchResult(result){
        let that = this;
        if(result.length == 0){
            result = <div className="no-result">NO result found</div>
        } else {
            result = result.map(function(item, index){
                return <ResultView data={item} key={item.id} tabNum={index+30} resultOnClickAction={that.resultOnClickAction} resultOnKeyPressAction={that.resultOnKeyPressAction} />
            });
        }

        return (this.state.showSearchView ? 
                
                <div className="search-result">
                    <form name="search-form" className="search-form">
                        {result}
                        
                    </form>
                </div> 
                
                : "")
    }
    

    getSearchResult(e){
        e.stopPropagation();

        let res, input = e.target.value, that = this;
        
        that.searchInp = input.toString().trim();
        that.props.closeSearchResult(false);
        this.setState({
            clickedResult: input
        });
        if(that.timerId){
            clearTimeout(that.timerId);
        }
        // not seding request very frequently
        that.timerId = setTimeout(function(){
            let input = that.searchInp;
            res = that.props.userData.filter(function(item){
                if(input.length>0 && JSON.stringify(item).toLowerCase().indexOf(input.toLowerCase()) >= 0){
                    return item;
                }
            });
            that.setState(
                {
                    result: res, 
                    showSearchView: true
                });
        },300);
        
    }
    resultOnClickAction(e,name){
        e.preventDefault();
        
        this.setState({
            clickedResult: name,
            showSearchView: false
        });
    }
    resultOnKeyPressAction(e,name){
        e.preventDefault();
        e.stopPropagation();

        if (e.which === 13 /* Enter */) {
            this.setState({
                clickedResult: name
            });
        }
    }

    render(){
        let that = this;
        return (
                <div className="search-container">
                    <input className="search-input" type="text" placeholder="Search here" value={this.state.clickedResult} onChange={that.getSearchResult} onClick={function(evt){evt.stopPropagation();}} />
                    {that.props.showSearchResult && this.showSearchResult(this.state.result)}
                </div> 
        );
    }
}

export default SearchInput;