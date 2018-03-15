import React from "react";
import ReactDOM from "react-dom";
import ResultView from "./resultView";

class SearchInput extends React.Component{
    constructor(){
        super();
        this.state={
            result: [],
            showSearchView: false
        }
        this.searchInp = "";
        this.getSearchResult = this.getSearchResult.bind(this);
        this.resultOnClickAction = this.resultOnClickAction.bind(this);
        this.resultOnKeyPressAction = this.resultOnKeyPressAction.bind(this);
        this.searchInputTypeTimer = null;
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
        let res, input = e.target.value, that = this;
        input = input.toString().trim();
        
        res = this.props.userData.filter(function(item){
            if(input.length>0 && JSON.stringify(item).toLowerCase().indexOf(input.toLowerCase()) >= 0){
                return item;
            }
        });
        this.setState(
            {
                result: res, 
                showSearchView: true,
                clickedResult: e.target.value
            });
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
                    <input className="search-input" type="text" placeholder="Search here" value={this.state.clickedResult} onChange={that.getSearchResult} />
                    {this.showSearchResult(this.state.result)}
                </div> 
        );
    }
}

export default SearchInput;