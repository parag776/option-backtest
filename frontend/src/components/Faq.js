import React, { useState, useEffect, useRef } from "react";
import "./Faq.css"

function Faq(props) {

    

    const [expanded, setExpanded] = useState(props.expanded);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(()=>{

        const handleResize = function( ){
            if (expanded) {
                setContentHeight(contentRef.current.scrollHeight);
              } else {
                setContentHeight(0);
            }
        }
        
        window.addEventListener("resize", handleResize);

        return () => {window.removeEventListener("resize", handleResize)};

    }, [expanded])

    useEffect(() => {
        if (expanded) {
          setContentHeight(contentRef.current.scrollHeight);
        } else {
          setContentHeight(0);
        }
    }, [expanded]);

    const toggleExpantion = function(){
        setExpanded(!expanded);
    }
    


  return <div onClick={toggleExpantion} className="py-3 faqDiv" style={{borderBottom: "0.5px solid rgb(204, 204, 204, 0.5)"}}>
    <h3 className="fs-3">{props.ques}</h3>
    <div style={{overflow: "hidden", height: `${contentHeight}px`, transition: "height 0.3s ease-in-out"}}>
        <p ref={contentRef} className="fs-6 color-light-secondary">
          {props.ans}
        </p>
    </div>
  </div>;
}

export default Faq;

Faq.defaultProps = {
    ques: "This is the default Question",
    ans: "This is the default Answer",
    expanded: false
}