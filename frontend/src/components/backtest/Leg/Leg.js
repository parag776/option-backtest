import React from 'react'
import "./Leg.css"
function Leg({data, eraseLeg}) {
  return (
    <div className="leg mt-3 p-2 rounded d-flex justify-content-between">
      
      <div className={`${data.tradeAction} `}>{data.tradeAction.toUpperCase()}</div>
      <div className={`${data.optionType}`}>{data.optionType}</div>
      <div>{data.strikeDetails.strikeCategory}</div>
      <div>{data.strikeDetails.pointsOffset}</div>
      <div>{data.entryTime}</div>
      <div>{data.exitTime}</div>
      <div>{data.stopLossPercent}</div>
      <div className="cursor-pointer"onClick={()=>{eraseLeg(data.id)}}>&#128465;</div>
    </div>
  )
}

export default Leg