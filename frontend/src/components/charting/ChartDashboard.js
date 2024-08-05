import React from "react";
import { useMediaQuery } from 'react-responsive';
import Chart from "./Chart";
import TickerPanel from "./TickerPanel";
import ChartHeader from "./ChartHeader";
import "./ChartDashboard.css"


function ChartDashboard() {

  const isLargeScreen = useMediaQuery({ minWidth: 992});

  return (
    
    <div>
        <div className="position-fixed w-100 chart-header-wrapper">
            <ChartHeader/> 
        </div>
        <div style={{maxWidth:"1600px", margin:"auto"}}>
          <div className={`${(isLargeScreen)?"ticker-panel-wrapper":" ticker-panel-wrapper-lg"} offcanvas-lg offcanvas-start`} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <TickerPanel/>
          </div>
          <div className={`${isLargeScreen?"chart-wrapper":"w-100"} d-inline-block bg-raisin-black`} style={{marginLeft: `${isLargeScreen?"25%":"0%"}`, marginTop: "70px"}}>
              <Chart/>
          </div>
        </div>
    </div>
  )
}

export default ChartDashboard;
