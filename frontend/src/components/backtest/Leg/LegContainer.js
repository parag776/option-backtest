import React from 'react'
import LegForm from './LegForm';
import Leg from './Leg';


function LegContainer({setErrorMsg, overallExitTime, createLeg, eraseLeg, legs}) {

  return (

    <div>
        <LegForm setErrorMsg={setErrorMsg} overallExitTime={overallExitTime} createLeg={createLeg}/>
        <div>
        {legs.map((data)=><Leg data={data} key={data.id} eraseLeg={eraseLeg}/>)}
        </div>
    </div>
  )
}

export default LegContainer