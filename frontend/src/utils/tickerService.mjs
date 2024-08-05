import csvParser from "./csvParser.mjs";
// import axios from "axios";

// const corsAnywhere = axios.create({
//     baseURL: 'http://localhost:3001'
//   });

// dangerous maybe change the code later


const fetchTickerArray = (() => {
    let curArray = null; // Variable to store the result
    let isDataFetched = false; // Flag to track if data is already fetched

    function compareTicker(a, b){
        let newA = a.tradingsymbol;
        let newB = b.tradingsymbol;
        let i = 0;
        while(i<newA.length && i<newB.length){
            if(newA[i]!==newB[i]) {
                return (newA[i]<newB[i])?-1:1;
            }
            i++;
        }
        
        return (newA.length<newB.length)?-1:1;
    }
  
    return async (setArrayCallback) => {
      if (!isDataFetched) {
        let textData = await fetch("./instruments.csv");
        textData = await textData.text();
        curArray = csvParser(textData).filter((item) => {
          return item.exchange === "NSE" || item.exchange === "NFO";
        }).map((item, index)=>{
            item.index = index;
            return item;
        });
        curArray.sort(compareTicker);
        setArrayCallback(curArray);
        isDataFetched = true; // Update the flag after data is fetched
      }
  
      return curArray; // Return the stored result
    };
})();

export default fetchTickerArray;

// fix it
// export async function codeToTickers(tickerCode){

//     const tickerArray = await fetchTickerArray();
//     const [tickerPositions, signArr] = codeToTickerPositions(tickerCode, tickerArray.length);

//     const tickers = new Array(tickerPositions.length);

//     for(let i=0;i<tickerPositions.length;i++){
//         tickers[i] = tickerArray[tickerPositions[i]];
//     }

//     return [tickers, signArr];
// }