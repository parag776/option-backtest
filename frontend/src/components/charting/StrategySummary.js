import React from "react";

function StrategySummary({values}) {
  return (
    <div className="d-flex flex-wrap">
        {values.map((item)=>{
            return (
                <div key={item.heading} style={{marginLeft: "1em"}}>
                    <h6 style={{color: item.headingColor}}>{item.heading}</h6>
                    <p style={{color: item.textColor}}>{item.text}</p>
                </div>
            )
        })}
    </div>
  )
}

export default StrategySummary;
