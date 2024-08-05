import React from "react";
import { useMediaQuery } from "react-responsive";


function ChartHeader() {

  const isLargeScreen = useMediaQuery({ minWidth: 992});

  return <>
    {!isLargeScreen && <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Enable both scrolling & backdrop</button>}
  </>;
}

export default ChartHeader;
