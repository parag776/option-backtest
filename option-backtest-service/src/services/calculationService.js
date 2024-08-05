// import dataService from "dataService.js"
import generateMockData, { getOnlyDate } from "../data/generateMockData.js";
import { parseTime } from "../middlewares/validationMiddleware.js";

let mockData;
let mockDataIndex = 0;

const getClosestStrike  = function(securityPrice, strikeArray){
    let strike = strikeArray[0];
    let diff = Math.abs(strike-securityPrice);
    for(const curStrike of strikeArray){
        let curDiff = Math.abs(curStrike-securityPrice);
        if(curDiff<diff){
            diff = curDiff;
            strike = curStrike;
        }
    }
    return strike;
}

const calculateEachDay = async (date, options) => {
    let data;

    if(options.isMockData){
        while(mockData[mockDataIndex].date.getTime()!=date.getTime()) {
            mockDataIndex++;
        }
        data = mockData[mockDataIndex].data;
    } else {
        // data = await dataService.getData(date, token);
    }

    // precalculating some variables
    const dayUnix = date.getTime();
    const endTime = new Date(dayUnix+15.5*60*60*1000)
    const startTime = new Date(dayUnix+9.25*60*60*1000);
    const securityName = options.securityName;
    let TotalCapital = 0;

    // parsing each positions' details
    const positionHelper = options.positions.map((position)=>{
        
        const entryTime = dayUnix+parseTime(position.entryTime)*1000*60
        const exitTime = dayUnix+parseTime(position.exitTime)*1000*60
        const securityEntryPrice = data.tickerWiseData[securityName][(entryTime-dayUnix-9.25*60*60*1000)/60000].open;
        TotalCapital+=securityEntryPrice;
        const strikeCategory = position.strikeDetails.strikeCategory
        let offSet = 0;
        if(strikeCategory==="ATM"){
        } else if(position.optionType==='CE'){
            if(strikeCategory==="OTM"){
                offSet+=position.strikeDetails.pointsOffset;
            } else {
                offSet-=position.strikeDetails.pointsOffset;
            }
        } else if(position.optionType==='PE'){
            if(strikeCategory==="OTM"){
                offSet-=position.strikeDetails.pointsOffset;
            } else {
                offSet+=position.strikeDetails.pointsOffset;
            }
        }
        const strike = getClosestStrike(securityEntryPrice+offSet, data.tickers.strikeArr);
        return {
            entryTime,
            exitTime,
            runningProfit: 0,
            stopLoss: securityEntryPrice*position.stopLossPercent,
            tradeAction: position.tradeAction,
            option: securityName+getOnlyDate(data.expiry)+String(strike)+position.optionType
        }
    });
    
    const strategyStopLoss = options.strategyStopLossPercent*TotalCapital;

    let isStrategyStopLossHit = 0;
    // calculating profit/loss
    let overAllProfit = 0;
    for(let curTime = new Date(date.getTime()+9.25*60*60*1000);curTime<endTime;curTime = new Date(curTime.getTime()+60*1000)){
        const timeUnix = curTime.getTime();
        overAllProfit = 0;
        for(const position of positionHelper){
            if(timeUnix >= position.entryTime && timeUnix < position.exitTime && position.runningProfit>-position.stopLoss){
                position.runningProfit = data.tickerWiseData[position.option][(timeUnix-startTime.getTime())/60000].close - data.tickerWiseData[position.option][(position.entryTime-startTime.getTime())/60000].open
                if(position.tradeAction==="sell") position.runningProfit = -position.runningProfit;
            }
            overAllProfit+=position.runningProfit;
        }
        if(overAllProfit<-strategyStopLoss) {
            isStrategyStopLossHit = 1;
            break;
        }
    }
    return {overAllProfit, isStrategyStopLossHit};
}

export default async (options) => {
    if(options.isMockData) {
        mockData = generateMockData(options.securityName, new Date(options.startDate), new Date(options.endDate));
        mockDataIndex = 0;
    }
    const eachDayResultArr = [];
    const curOptions = {startDate:undefined, endDate:undefined, ...options};
    let strategyStopLossHitCount = 0;
    for(let date=options.startDate; date<=options.endDate; date = new Date(date.getTime() + 24*60*60*1000)){ // +1 each date
        const curDayResult = (await calculateEachDay(date, curOptions));
        strategyStopLossHitCount+=curDayResult.isStrategyStopLossHit;
        eachDayResultArr.push(curDayResult.overAllProfit); // can incorporate mutlithreading here.
    }
  // main result calculation logic
    const result = {
        totalProfit: 0,
        averageProfit: 0,
        maxProfitDay: {
            day: getOnlyDate(options.startDate, "-"),
            profit: eachDayResultArr[0],
        },
        minProfitDay: {
            day: getOnlyDate(options.startDate, "-"),
            profit: eachDayResultArr[0],
        },
        maxDrawDown: 0,
        strategyStopLossHitCount,
    }
    let maxDrawDownHelper = 0;
    for(let i=0;i<eachDayResultArr.length;i++){
        result.totalProfit+=eachDayResultArr[i];
        if(result.maxProfitDay.profit<eachDayResultArr[i]){
            result.maxProfitDay.profit = eachDayResultArr[i];
            result.maxProfitDay.day = getOnlyDate(new Date(options.startDate.getTime()+i*24*60*60*1000), "-");
        }
        if(result.minProfitDay.profit>eachDayResultArr[i]){
            result.minProfitDay.profit = eachDayResultArr[i];
            result.minProfitDay.day = getOnlyDate(new Date(options.startDate.getTime()+i*24*60*60*1000), "-");
        }
        maxDrawDownHelper = Math.min(maxDrawDownHelper+eachDayResultArr[i], 0);
        result.maxDrawDown = Math.min(result.maxDrawDown, maxDrawDownHelper);
    }
    result.averageProfit = result.totalProfit/(eachDayResultArr.length);
    return result;
}