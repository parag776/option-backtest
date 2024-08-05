import { blackScholes } from "./blackSholes.js";

export function getOnlyDate(date, seperator=""){
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth()+1;
    let dateNum = date.getUTCDate();
    if(month<10){
        return dateNum+seperator+"0"+month+seperator+year;
    } else {
        return dateNum+seperator+""+month+seperator+year;
    }
}
// test getOptionName 
export const getOptionName = function(strike, date, securityName, optionType){
    // get next expiry date
    let expiryDate = new Date(date.getTime());
    while(expiryDate.getUTCDay()!==4) expiryDate.setUTCDate(expiryDate.getUTCDate()+1)
    expiryDate = getOnlyDate(expiryDate);
    //
    return securityName+expiryDate+strike+optionType;
}
export default function(securityName, startDate, endDate, initialPrice = 10000, optionGap = 50, optionCountEachSide = 10){

    // helper functions ->
    function getOHLC(pPrice){
        let open = Math.round(pPrice*(1 + (0.5 - Math.random())*0.001)*100)/100;
        let low = Math.round(open*(1-Math.random()*0.001)*100)/100;
        let high = Math.round(low*(1+Math.random()*0.002)*100)/100;
        let close = Math.round((low + (high-low)*(Math.random()))*100)/100;
        return {open, high, low, close};
    }
    

    
    while(startDate.getUTCDay()!==5) startDate.setUTCDate(startDate.getUTCDate()-1); // setting start date to latest previous thursday.
    // end helper functions ->

    // required variables:-
    const dayWise = [];
    let expiry;
    let prevOptionData = {};

    const vix = 0.14;

    for(let date = startDate; date<=endDate; date.setUTCDate(date.getUTCDate()+1)){
        let startTime = new Date(date.getTime()+33300000);
        let endTime = new Date(date.getTime()+55800000);
        if(date.getUTCDay()==5){
            prevOptionData = {};
            var l = Math.floor(initialPrice/optionGap)*optionGap;
            var r = l+optionGap;
            
            l-=optionGap*(optionCountEachSide - 1); // put min (basically minimum possible strike)
            r+=optionGap*(optionCountEachSide - 1); // call min (basically maximum possible strike)

            expiry = new Date(date.getTime());
            expiry.setUTCDate(date.getUTCDate()+6);
            
            var expiryEndtime = new Date(expiry.getTime()+55800000);

            var callNames = [];
            var putNames = [];

            let expiryDate = getOnlyDate(expiry);
            var strikeArr = []

            for(let i=0;i<2*optionCountEachSide;i++){
                let callName = securityName + expiryDate + (l+i*optionGap) + "CE";
                let putName = securityName + expiryDate + (l+i*optionGap) + "PE";
                strikeArr.push(l+i*optionGap);

                callNames.push(callName);
                putNames.push(putName);

                prevOptionData[callName] = [];
                prevOptionData[putName] = [];
            }
        }
        
        const securityData = [];
        const optionData = JSON.parse(JSON.stringify(prevOptionData)); // deep copy
        const dayOptionNames = {
            strikeArr,
            callNames,
            putNames
        };
        // filling dayOptionNames
       
        for(let time = startTime; time<endTime; time = new Date(time.getTime()+60000)){

            let datum = getOHLC(initialPrice);
            initialPrice = datum.close;
            datum.timestamp = time;
            securityData.push(datum);

            let yearsTillExpiry = (expiryEndtime.getTime()- time.getTime())/31536000000;
            for(let i=0;i<2*optionCountEachSide;i++){
                let callName = callNames[i];
                let putName = putNames[i];
                let curStrike = strikeArr[i];

                let callData = {};
                let putData = {};
                for(let [key, value] of Object.entries(datum)){
                    if(key==="timestamp"){
                        callData[key] = value;
                        putData[key] = value;
                    } else {
                        callData[key] = blackScholes(value, curStrike, yearsTillExpiry, vix, 0.07, "call");
                        putData[key] = blackScholes(value, curStrike, yearsTillExpiry, vix, 0.07, "put");
                    }
                }
                
                optionData[callName].push(callData);
                optionData[putName].push(putData);
            }
        }
        const curDayData = {expiry, tickers: dayOptionNames, tickerWiseData: {[securityName]: securityData, ...optionData}};
        dayWise.push({date: new Date(date.getTime()), data: curDayData});
    }
    return dayWise;
}


// let startDate = new Date(Date.UTC(2024, 0, 3));
// let endDate = new Date(Date.UTC(2024, 0, 1));
// const initialPrice = 10000;
// const optionCountEachSide = 5;
// const optionGap = 50;

// export const data = generateMockData("banknifty", startDate, endDate, initialPrice, optionGap, optionCountEachSide);
// console.log(data)