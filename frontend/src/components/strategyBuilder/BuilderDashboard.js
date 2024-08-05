import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./BuilderDashboard.css"
import BuilderIndexSearch from "./BuilderIndexSearch";



function BuilderDashboard() {

    const isLargeScreen = useMediaQuery({ minWidth: 992});
    const [index, setIndex] = useState(null)

  return (
    <>
  <div className="builder">
    <div className={`${(isLargeScreen)?"left-col":"left-col-lg"}`}>
        <div className="index-and-settings-wrapper">
            <div className="index-selector-wrapper">
                <BuilderIndexSearch index={index} setIndex={setIndex}/>
            </div>
            <div className="settings-wrapper" >
                asdf
            </div>
        </div>
        <div className="trades-wrapper">
            asdf
        </div>
        <div className="strategy-trade-box-wrapper">
            asdf
        </div>
        <div className="info-wrapper">
            asdf
        </div>
    </div>
    <div className={`${(isLargeScreen)?"right-col":"right-col-lg"}`}>
        <div className="key-results-wrapper">
            asdf
        </div>
        <div className="builder-chart-wrapper">
            sadf
        </div>
        <div className="strategy-options-wrapper">
            sadf
        </div>
    </div>
</div>
</>
)
}

export default BuilderDashboard;
