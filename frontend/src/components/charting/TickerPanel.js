import React, { useRef, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import { Popover} from "react-tiny-popover";


import TickerSearch from "./TickerSearch";
import TickerCard from "./TickerCard";
import StrategySummary from "./StrategySummary";
import "./TickerPanel.css";
import { Gear } from "../../utils/svg";

// notes for this component
// 1. i have coded such that tradingSymbol for all the available tickers are different - see code insert ticker fix it later if adding nse and bse both.

function TickerPanel() {

    const [watchlistArray, setWatchlistArray] = useState([
        {
            tickerArray: ["asdf", "asdd", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
            strategy: "basic strategy",
            strategyOptions: {},
            key: uuidv4()
        },
        {
            tickerArray: [],
            strategy: "basic strategy",
            strategyOptions: {},
            key: uuidv4()
        }
    ]); 
    const [watchlistPos, setWatchlistPos] = useState(0);
    const [draggedTicker, setDraggedTicker] = useState("");
    const [isWatchlistSettingsOpen, setIsWatchlistSettingsOpen] = useState(false);
    const tickerPanelRef = useRef(null);

    const runForTicker = function(ticker){

    }

    const insertTicker = function(lastestTicker){
        if(!(lastestTicker.tradingsymbol==="" || watchlistArray[watchlistPos].tickerArray.includes(lastestTicker.tradingsymbol))) {  // this is giving me a warning i have to memoize or something
            const newArray = [];

            for(let i=0;i<watchlistArray.length;i++){
                if(i===watchlistPos){

                    const innerArray = [...watchlistArray[i].tickerArray, lastestTicker.tradingsymbol];
                    const curWatchlist = {};
                    for(let key of Object.keys(watchlistArray[i])){
                        if(key!=="tickerArray") curWatchlist[key] = watchlistArray[i][key];
                    }
                    curWatchlist.tickerArray = innerArray;
                    newArray.push(curWatchlist);
                } else {    
                    newArray.push(watchlistArray[i]);
                }
            }
            setWatchlistArray(newArray)
        }

        runForTicker(lastestTicker.tradingsymbol)
    }

    const deleteTicker = function(cardToDelete){
        if(cardToDelete!==""){
            const newArray = [];

            for(let i=0;i<watchlistArray.length;i++){
                if(i===watchlistPos){

                    const innerArray = watchlistArray[i].tickerArray.filter((ticker)=>ticker!==cardToDelete)
                    const curWatchlist = {};
                    for(let key of Object.keys(watchlistArray[i])){
                        if(key!=="tickerArray") curWatchlist[key] = watchlistArray[i][key];
                    }
                    curWatchlist.tickerArray = innerArray;
                    newArray.push(curWatchlist);
                } else {    
                    newArray.push(watchlistArray[i]);
                }
            }
            setWatchlistArray(newArray)
        }
    }

    // not creating and deleting watchlist currently if will do it later then i will add the below functions
    

    // const createWatchlist = function(){
    //     const newWatchlist = {
    //         tickerArray: [],
    //         strategy: "basic strategy",
    //         strategyOptions: {},
    //         key: uuidv4()
    //     }
    //     setWatchlistArray([...watchlistArray, newWatchlist])
    // }

    // const deleteWatchlist = function(e){
    //     e.stopPropagation();
    //     setWatchlistArray(watchlistArray.filter((watchlist, index)=>{
    //         const isReqWatchlist = watchlist.key===e.target.getAttribute("ticker");
    //         if(watchlistPos!==0 && isReqWatchlist && index<=watchlistPos){
    //             setWatchlistPos(watchlistPos-1);
    //         }
    //         return !isReqWatchlist
    //     }))
    // }

    const onDragStartCard = function(e){
        const curTicker = e.target.getAttribute("ticker");
        setDraggedTicker(curTicker)
        setTimeout(() => {
            e.target.classList.add("invisible")
        }, 0);
        
    }

    const onDragEndCard = function(e){
        e.target.classList.remove("invisible");
        setDraggedTicker("");
    }

    // these are individual codes and are meant to be looked individually.

    const onDragEnterCard = function(e){


        const mainTicker = e.currentTarget.getAttribute("ticker")
        setWatchlistArray(watchlistArray.map((watchlist, index)=>{
            if(index===watchlistPos){

                const curTickerArray = watchlist.tickerArray;

                const newTickerArray = [];
                let foundDraggedTicker = false;
                for(const curTicker of curTickerArray){
                    if(curTicker!==draggedTicker) {
                        if(!foundDraggedTicker && curTicker===mainTicker) newTickerArray.push(draggedTicker);
                        newTickerArray.push(curTicker);
                    } else {
                        foundDraggedTicker = true;
                    }
                    if(mainTicker===curTicker){
                        if(foundDraggedTicker) newTickerArray.push(draggedTicker);
                    }
                }

                const curWatchlist = {};
                    for(let key of Object.keys(watchlist)){
                        if(key!=="tickerArray") curWatchlist[key] = watchlist[key];
                    }
                curWatchlist.tickerArray = newTickerArray;
                return curWatchlist;

            }
            return watchlist;
        }))
    }

    const onDragOverHandler = function(e){
        e.preventDefault();
    }

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
      }, []);

  return (
    <>

        <div className="bg-raisin-black" style={{height: "100%"}} >

            <div className="z-1 position-relative" style={{height: "45px"}}>
                <TickerSearch insertTicker={insertTicker}/>
            </div>

            <div onDragOver={onDragOverHandler} className="overflow-auto small-scroll " style={{height: "calc(100% - 150px - 90px)", borderCollapse: "collapse"}} ref={tickerPanelRef}>
                {watchlistArray[watchlistPos].tickerArray.map((ticker)=>{
                    // update ticker card outside look and feel here
                    return <div className="ticker-card-wrapper" draggable="true" onDragStart={onDragStartCard} onDragEnter={onDragEnterCard} onDragEnd={onDragEndCard} ticker={ticker} key={ticker}>
                        <TickerCard deleteTicker={deleteTicker} ticker={ticker} />
                    </div>
                })}
            </div>

            <div className="strategy-summary-wrapper" style={{height: "150px"}}>

                <h4 className="text-center color-light-secondary">Key Results</h4>
                <StrategySummary values={[{heading:"yello", text:"123", textColor:"white", headingColor:"#bebebe"}, {heading:"hello", text:"123", textColor:"white", headingColor:"#bebebe"}]}/>
            </div>

            <div className="d-flex justify-content-between watchlist-button-parent">
                <div className="cursor-pointer">
                    {watchlistArray.map((item, index)=>{
                        return  (
                            <div key={item.key} className={`watchlist-button d-inline-block ${(watchlistPos===index)?"color-primary bg-watchlist-active":"color-mid-secondary bg-watchlist"}`} onClick={()=>setWatchlistPos(index)}>
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {index+1}
                                </div>
                                
                                {/* {watchlistArray.length>1 && 
                                    <div ticker={item.key} onClick={deleteWatchlist} className="d-inline-block btn btn-danger">
                                        x
                                    </div>
                                    onClick={createWatchlist} imppp don't forget
                                } */}
                            </div>
                        )
                    })}
                </div>
                {isMounted && <Popover
                    isOpen={isWatchlistSettingsOpen}
                    positions={["top", "left"]}
                    padding={2}
                    reposition={false}
                    onClickOutside={() => setIsWatchlistSettingsOpen(false)}
                    align="end"
                    parentElement={tickerPanelRef.current}
                    content={() => (
                        <div className="watchlist-settings-popover">
                            <div>
                                Sort
                            </div>
                        </div>
                      )}
                >
                    <div onClick={()=>setIsWatchlistSettingsOpen(!isWatchlistSettingsOpen)} className="cursor-pointer watchlist-settings-gear">
                        <Gear color={"#CCCCCC"}/>
                    </div>
                </Popover>}
            </div>
        </div>
        
        
        
    </>
  );
}

export default TickerPanel;
