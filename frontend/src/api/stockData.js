// configuring /config req.
export const configData = {
    supported_resolutions: ['1', '2', '3', '5', '10', '15', '30', '60', '120', 'D', '1W', '1M'],
    supports_group_request: false,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
    exchanges:[
        {"value":"","name":"All Exchanges","desc":""},
        {"value":"GH","name":"GH","desc":"GH"}
    ],
    symbols_types:[
        {"name":"All types","value":""},
        {"name":"strategy", "value":"strategy"}
    ]
}

// configuring symbolInfo

export function getSymbolInfo(symbol){
    return {
        name: symbol,
        full_name: `GH:${symbol}`,
        description: symbol,
        type: symbol,
        session: "0915-1530",
        exchange: "GH",
        listed_exchange: "GH",
        timezone: "Asia/Kolkata",
        pricescale: 0.05,
        minmov: 1,
        has_intraday: true,
        supported_resolutions: ['1', '2', '3', '5', '10', '15', '30', '60', '120', "D"],
        visible_plots_set: "ohlc",
    }
}

// configuring getting stock data;

function reqHistory(symbol, from, to, resolution, countback){
    // req for data from backEnd
}

// fix it
// export const getHistory = (() => {

//     const data = {};

//     return async (symbol, from, to, resolution, countback)=>{

//         const [tickers, signArr] = codeToTickers(symbol);

//         // getting data from api

//         for(const ticker of tickers){

//             if(data[ticker]){
//                 if(data[ticker][resolution]){

                    

//                 } else {
//                     const curData = reqHistory(symbol, from, to, resolution, countback);
//                     data[ticker][resolution] = curData;
//                 }
//             } else {
//                 const curData = reqHistory(symbol, from, to, resolution, countback);
//                 data[ticker] = {};
//                 data[ticker][resolution] = curData;
//             }

//         }

//         // returning data to the request;


        

//         // getting toIndex of every ticker and counting the candles involved.

//         let candleCount = 9007199254740991; // some max constant
//         const toIndexes = new Array(tickers.length);

//         for(let ticker of tickers){
//             const toI = upper_bound(data[ticker][resolution][0], to) - 1;
//             if(toI==-1) return {s: "no_data"};
//             let fromI;
//             if(countback){ // utilizing countback functionality.
//                 fromI = Math.max(0, toI-countback+1);
//             } else {
//                 fromI = lower_bound(data[ticker][resolution][0], from);
//             }
//             candleCount = Math.min(candleCount, toI-fromI+1);
//         }

//         const resultData = {s: "ok", t: new Array(candleCount), o: new Array(candleCount), h: new Array(candleCount), l: new Array(candleCount), c: new Array(candleCount)};


//         for(let i=toIndexes[0], tempI = candleCount-1;tempI>=0;i--, tempI--){
//             const tempTimeArray = data[tickers[0]][resolution][0];
//             resultData.t[tempI] = tempTimeArray.at(i);
//         }

//         // populating the resultData

//         for(let i=0;i<candleCount;i++){
//             s.o[candleCount-i-1] = 0;
//             s.h[candleCount-i-1] = 0;
//             s.l[candleCount-i-1] = 0;
//             s.c[candleCount-i-1] = 0;
//             for(let j=0;j<tickers.length;j++){
//                 const curToI = toIndexes[j] - i;
//                 s.o[candleCount-i-1] += data[tickers[j]][resolution][0].at(curToI) * ((signArr[j])?1:-1);
//                 s.h[candleCount-i-1] += data[tickers[j]][resolution][1].at(curToI) * ((signArr[j])?1:-1);
//                 s.l[candleCount-i-1] += data[tickers[j]][resolution][2].at(curToI) * ((signArr[j])?1:-1);
//                 s.c[candleCount-i-1] += data[tickers[j]][resolution][3].at(curToI) * ((signArr[j])?1:-1);
//             }
//         }

//         return resultData;

//     }
// })()