import React, { useEffect, useState } from "react";
import fetchTickerArray from "../../utils/tickerService.mjs"
import "./TickerSearch.css"
import {Search} from "../../utils/svg";

function TickerSearch({insertTicker}) {

    const [tickerSearch, setTickerSearch] = useState("");
    const [tickerArray, setTickerArray] = useState([]);

    useEffect(()=>{
        fetchTickerArray(setTickerArray);
    }, [])

    const getSearchResultArray = function(searchValue){ // implement api calls, or caching results everything

        searchValue = searchValue.toLowerCase();
        
        function parseSearchQueries(searchString){
            const searchQueries = [];
            let start = 0
            for(let i=0;i<searchValue.length;i++){
                const curCharCode = searchString.charCodeAt(i);
                if(!(curCharCode>=97 && curCharCode<=122) && !(curCharCode>=48 && curCharCode<=57)){
                    if(i!==start){
                        searchQueries.push(searchString.substring(start, i));
                    }
                    start=i+1;
                }
            }
            if(start!==searchValue.length){
                searchQueries.push(searchString.substring(start, searchValue.length));
            }
            return searchQueries;
        }

        const searchQueries = parseSearchQueries(searchValue);

        const searchResultArray = [];

        // for(let i=0;i<10;i++){
        //     let suffix = "";
        //     for(let j=0;j<10;j++){
        //         suffix+=String.fromCharCode(i+98);
        //     }
        //     searchResultArray.push(searchValue+suffix);
        // }
        // return searchResultArray;

        for(let ticker of tickerArray){
            let isValidTicker = true;
            for(let sq of searchQueries){
                isValidTicker&=(ticker.name.toLowerCase().includes(sq) || ticker.tradingsymbol.toLowerCase().includes(sq));
            }
            if(isValidTicker) searchResultArray.push(ticker)
            if(searchResultArray.length>=15) break;
        }
        return searchResultArray;
    }



    const onInputChangeHandler = function (e){
        const searchValue = e.target.value;
        setTickerSearch(searchValue);
    }

    const searchResultJSX = function(tickerSearch){

        if(tickerSearch==="") return;
        // remove the previously retured jsx from this function if exists..

        const searchResultArray = getSearchResultArray(tickerSearch);
        const onClickSearchItem = function(e){

            const clickedTicker = searchResultArray.filter((item)=>{
                return item.instrument_token===e.target.getAttribute("ticker");
            })[0]

            insertTicker(clickedTicker);
            setTickerSearch("");

            // if clicked remove the below returned value and setLatestTicker to the clicked ticker value
        }

        return (
            
            <div style={{cursor:"pointer"}}>
                {searchResultArray.map((item, index)=>{
                    return <div className="searchItem color-mid-secondary prevent-select" key={item.instrument_token} ticker={item.instrument_token} onClick={onClickSearchItem} >{item.tradingsymbol}</div>
                })}
            </div>
        );
    }

  return <div>
    <div className="d-flex search-div">
        <span className="search-icon"><Search color="#bebebe"/></span>
        <input style={{height: "45px"}} className="w-100 bg-raisin-black search-input color-mid-secondary prevent-select" type="text" placeholder="Search eg: hdfcbank, banknifty dec 42000 CE" value = {tickerSearch} onChange={onInputChangeHandler}/>
    </div>
    {searchResultJSX(tickerSearch)}
  </div>;
}

export default TickerSearch;
