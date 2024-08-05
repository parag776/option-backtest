import React, {useContext, useState} from 'react'
import { useForm } from 'react-hook-form';
import LegContainer from './Leg/LegContainer';
import { v4 as uuidv4 } from 'uuid';
import { parseTime } from '../../utils/dateAndTime.mjs';
import "./Backtest.css"
import axios from 'axios';
import AuthContext from '../../context/authentication/AuthContext';

const foIndicesList = [
    { index: "NIFTY 50", securityName: "NIFTY", securityToken: 26000 },
    { index: "NIFTY BANK", securityName: "BANKNIFTY", securityToken: 26009 },
    { index: "NIFTY IT", securityName: "NIFTYIT", securityToken: 26008 },
    { index: "NIFTY MIDCAP 50", securityName: "NIFTYMIDCAP50", securityToken: 26011 },
    { index: "NIFTY INFRA", securityName: "NIFTYINFRA", securityToken: 26012 },
    { index: "NIFTY PSE", securityName: "NIFTYPSE", securityToken: 26013 },
    { index: "NIFTY CPSE", securityName: "NIFTYCPSE", securityToken: 26014 },
    { index: "NIFTY ENERGY", securityName: "NIFTYENERGY", securityToken: 26015 },
    { index: "NIFTY FMCG", securityName: "NIFTYFMCG", securityToken: 26016 },
    { index: "NIFTY MNC", securityName: "NIFTYMNC", securityToken: 26017 },
    { index: "NIFTY PHARMA", securityName: "NIFTYPHARMA", securityToken: 26018 },
    { index: "NIFTY REALTY", securityName: "NIFTYREALTY", securityToken: 26019 },
    { index: "NIFTY SERV SECTOR", securityName: "NIFTYSERVSECT", securityToken: 26020 },
    { index: "NIFTY AUTO", securityName: "NIFTYAUTO", securityToken: 26021 },
    { index: "NIFTY MEDIA", securityName: "NIFTYMEDIA", securityToken: 26022 }
 ];

const BacktestURI = process.env.REACT_APP_BACKEND_URL + "/api/backtest"
// use form



function Backtest() {  
    const [errorMsg, setErrorMsg] = useState(null);
    const [legs, setLegs] = useState([]);
    const [minOverAllExitTime, setMinOverAllExitTime] = useState("09:16");
    const [result, setResult] = useState(null);
    

    const createLeg = function(data){
        data.id = uuidv4();
        const prevTime = parseTime(minOverAllExitTime);
        const curTime = parseTime(data.exitTime);
        if(prevTime<curTime){
            setMinOverAllExitTime(data.exitTime);
        }
        setLegs([...legs, data]);
    }

    const eraseLeg = function(id){
        const newLegs = legs.filter((item)=>item.id!==id);
        const curTime = newLegs.reduce((curTime, value)=>{
            if(parseTime(curTime)<parseTime(value.exitTime)){
                curTime = value.exitTime;
            }
            return value.exitTime;
        }, "09:16");
        setLegs(newLegs);
        setMinOverAllExitTime(curTime);
    }

    const { register, handleSubmit, watch } = useForm({defaultValues: {
        isMockData: "true", // Set default value here
      }});
    const auth = useContext(AuthContext);

    // watch's
    const startDateWatch = watch("startDate");
    const endDateWatch = watch("endDate");
    const overallExitTimeWatch = watch("overallExitTime");

    const onSubmit = async function(data){
        console.log(result)
        setErrorMsg(null)
        try{
            const positions = legs.map((leg)=>{
                const {id, ...position} = leg;
                return position;
            })
            data = {...data, positions};
            setResult("load")
            const res = await axios({url:BacktestURI, method:"POST", data});
            await auth.fetchUser();
            setResult(res.data);
            console.log(res.data);
        } catch(e){
           setResult(null)
          setErrorMsg(e.response?.data?.message || e.message);
        }
    }

  return (
    <>
    <div className='error'>{errorMsg}</div>
    <div className='mb-5'>
        <h1 className='text-center'>BackTest</h1>
        <form className="options d-flex justify-content-between flex-wrap" onSubmit={handleSubmit(onSubmit)}>
            <div className='m-2'>
                <label htmlFor="securityName">Choose an Index</label>
                <select id="securityName" className="form-select" aria-label="Default select example" {...register("securityName")}>
                    {foIndicesList.map((item, index)=>{
                        return <option key={index} value={item.securityName.toLowerCase()}>{item.index}</option>
                    })}
                </select>
            </div>
            <div className='m-2'>
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" min="2024-01-01" max={endDateWatch?endDateWatch:"2024-07-31"} {...register("startDate")} required/>
            </div>
            <div className='m-2'>
                <label htmlFor="endDate">End Date</label>
                <input type="date" id="endDate" min={startDateWatch?startDateWatch:"2024-01-01"} max="2024-07-31" {...register("endDate")} required/>
            </div>
            <div className='m-2'>
                <label htmlFor="overallExitTime">Strategy Exit Time</label>
                <input type="time" id="overallExitTime" min={minOverAllExitTime} max="15:30" {...register("overallExitTime")} required/>
            </div>
            <div className='m-2'>
                <label htmlFor="strategyStopLossPercent">Strategy Stop Loss Percentage</label>
                <input type="number" className='' {...register("strategyStopLossPercent")} id="strategyStopLossPercent" min="0" max="1" step="0.001" required/>
            </div>
            <div className='m-2'>
                <label htmlFor="isMockData">type of data used</label>
                <select id="isMockData" {...register("isMockData")} disabled>
                    <option value="true">Mock data</option>
                    <option value="false">Actual data</option>
                </select>
            </div>
            <button type="submit" className="m-2 btn btn-primary me-3 btn-lg rounded-pill py-3 px-4">Get Results</button>
        </form>
    </div>
    <div className='mb-5'>
        <h1 className='text-center'>Position Wise Information</h1>
        <LegContainer overallExitTime={overallExitTimeWatch} setErrorMsg={setErrorMsg} createLeg={createLeg} eraseLeg={eraseLeg} legs={legs}/>
    </div>
    <div>
        <h1 className='text-center '>Results will be shown here</h1>
        {result && (result!=="load"?
            <div className='text-center mt-5 placeholder-glow'>
            <div className='m-3 h5'>Total profit: <span>{result.totalProfit}</span></div>
            <div className='m-3'>Average profit: <span>{result.averageProfit}</span></div>
            <div className='m-3'>Maximum drawdown: <span>{result.maxDrawDown}</span></div>
            <div className='m-3'>
                <div>Max profitable day {"->"}</div>
                <div>day: <span>{result.maxProfitDay.day}</span></div>
                <div>profit: <span>{result.maxProfitDay.profit}</span></div>
            </div>
            <div className='m-3'>
                <div>Least profitable day {"->"}</div>
                <div>day: <span>{result.minProfitDay.day}</span></div>
                <div>profit: <span>{result.minProfitDay.profit}</span></div>
            </div>
            <div className='m-3'>Total no of times full strategy stoploss hit: <span>{result.strategyStopLossHitCount}</span></div>
            </div>:
            
            <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
                <span className="placeholder col-8"></span>
            </p>)
        }
    </div>
    
    </>
  )
}

export default Backtest