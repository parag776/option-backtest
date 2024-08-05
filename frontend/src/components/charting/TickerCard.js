import React from "react";
import "./TickerCard.css"



function TickerCard({deleteTicker, ticker = "HDFCBANK"}) {

    const handleCardDelete = function(){
        deleteTicker(ticker);
    }

  return <div className="ticker-card">
      <div className="d-flex justify-content-between color-mid-secondary">
        <p>{ticker}</p>
        <div onClick={handleCardDelete}style={{cursor: "pointer"}}>&#128465;</div>
      </div>
    </div>
}

export default TickerCard;
