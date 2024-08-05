import React, { useEffect } from "react";
import {configData, getSymbolInfo} from "../../api/stockData.js"

function Chart(props) { // should add height in props because for some reason full screen mode does not adjust to height for some unknown freaking reason

  useEffect(() => {
    const originalFetch = window.fetch;
 
    window.fetch = async function (url, options) {
      const baseURL = "my-feed-data.tradingview.com";

      const parsedUrl = new URL(url);

      if (parsedUrl.hostname===baseURL) {

        if (parsedUrl.pathname === "/config") {

          return {json: () => Promise.resolve(configData)}

        } else if (parsedUrl.pathname === "/symbols") {

          const queries = new URLSearchParams(parsedUrl.search);
          const symbol = queries.get("symbol");

          return {json: () => Promise.resolve(getSymbolInfo(symbol))}
        } else if (parsedUrl.pathname === "/history") {

          const queries = new URLSearchParams(parsedUrl.search);
          const symbol = queries.get("symbol");
          const resolution = queries.get("resolution");
          const from = queries.get("from");
          const to = queries.get("to");
          const countback = queries.get("countbback")

          //fix it
          // const history = await getHistory(symbol, from, to, resolution, countback);
          // return {json: () => Promise.resolve(history)};
        }
      }

      // For other requests, call the original fetch function
      return originalFetch.apply(this, arguments);
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [])

  useEffect(() => {
  
    const chartCode = document.createElement("script");
    const loadChartingCode = () => {
      chartCode.innerHTML = `
        new TradingView.widget({ 
        container: "chartContainer",
        locale: "en",
        library_path: "charting_library/",
        datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
        symbol: "AAPL",
        interval: "1D",
        theme: "dark",
        fullscreen: ${props.fullScreen},
        debug: false,
      });
      `
      document.body.appendChild(chartCode);
    };
  
    loadChartingCode();

    return () => {
        document.body.removeChild(chartCode);
    }
  }, [props.fullScreen]);
  

  return (
    <div id="chartContainer"></div>
  );
}

Chart.defaultProps = {
  fullScreen: true
}

export default Chart;
