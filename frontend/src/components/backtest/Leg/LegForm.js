import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { incrementTime, decrementTime } from '../../../utils/dateAndTime.mjs';

const schema = yup.object().shape({
    optionType: yup.string().oneOf(["CE", "PE"]).required(),
    tradeAction: yup.string().oneOf(["sell", "buy"]).required(),
    strikeDetails: yup.object().shape({
        strikeCategory: yup.string().oneOf(["ITM", "ATM", "OTM"]).required(),
        pointsOffset: yup.number().transform((value, originalValue)=> originalValue===''?0:value).required().integer().min(0)
    }),
    entryTime: yup.string().required(),
    exitTime: yup.string().required(),
    stopLossPercent: yup.number().required().min(0).max(1)
});

function LegForm({createLeg, setErrorMsg, overallExitTime}) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    //watch's
    const entryTimeWatch = watch("entryTime");
    const exitTimeWatch = watch("exitTime");

    const strikeCategoryWatch = watch("strikeDetails.strikeCategory");

    const onSubmit = function(data){
        try{
            console.log(data)
            createLeg(data);
        }
        catch(e){
            setErrorMsg(e.response?.data?.message || e.message);
        }
    }
    useEffect(()=>{
        console.log(errors)
    }, [errors])

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className='m-3'>
            <label htmlFor="optionType">Type of Option</label>
            <select {...register("optionType")} id="optionType">
                <option value="CE">CE (call)</option>
                <option value="PE">PE (put)</option>
            </select>
        </div>
        <div className='m-3'>
            <label htmlFor="tradeAction">Trade Action (Buy or Sell)</label>
            <select {...register("tradeAction")} id="tradeAction">
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
            </select>
        </div>
        <div className='m-3'>
            <label htmlFor="entryTime">Strategy Entry Time</label>
            <input type="time" id="entryTime" min="09:15" max={exitTimeWatch && decrementTime(exitTimeWatch)} {...register("entryTime")} required/>
        </div>
        <div className='m-3'>
            <label htmlFor="exitTime">Strategy Exit Time</label>
            <input type="time" id="exitTime" min={entryTimeWatch && incrementTime(entryTimeWatch)} max={overallExitTime} {...register("exitTime")} required/>
        </div>
        <div className='m-3'>
            <label htmlFor="stopLoss">Maximum Stop Loss (in Decimal, 1 means 100%)</label>
            <input type="number" {...register("stopLossPercent")} id="stopLoss" min="0" max="1" step="0.001" required/>
        </div>
        <div className='m-2'>
            <label htmlFor="strikeCategory">Strike Details</label>
            <select {...register("strikeDetails.strikeCategory")} id="strikeCategory" required>
                <option value="OTM">Out of the Money</option>
                <option value="ATM">At the Money</option>
                <option value="ITM">In the Money</option>
            </select>
        </div>
        <div className='m-3'>
            <label htmlFor="pointsOffset">Points away from LTP of the Index in the direction of strike category choosen.</label>
            <input type="number" id="pointsOffset" required {...register("strikeDetails.pointsOffset")} disabled={strikeCategoryWatch==="ATM"}/>
        </div>
       <button type="submit" className="btn btn-primary me-3 btn-lg rounded-pill py-3 px-4">Add Position</button>
    </form>
  )
}

export default LegForm