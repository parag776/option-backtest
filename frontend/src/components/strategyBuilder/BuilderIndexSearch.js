import React, {useRef, useState, useEffect} from "react";
import {Search} from "../../utils/svg";


function BuilderIndexSearch({index, setIndex}) {

    const [inputActive, setInputActive] = useState(true);
    const inputContainerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
            setInputActive(false);
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(()=>{
        if(inputRef && inputActive){
            inputRef.current.focus();
        }
    }, [inputActive])

    // input active and inactive content >>>>>>>>>>>>>>>>>>>
    const inputActiveContent = <div>
        <input ref={inputRef} className="search-input bg-raisin-black search-input color-mid-secondary prevent-select" type="text" placeholder="Search eg: nifty, hdfcbank etc."/>  
    </div>

    const inputInactiveContent = <div>

    </div>
    // <<<<<<<<<<<<<<<

  return <div style={{margin:"0.5em 0"}} className="d-flex">
    <span className="search-icon"><Search color="#bebebe"/></span>
    <div ref={inputContainerRef} className="flex-grow-1" onClick={()=>{setInputActive(true);}}>
        {inputActive ? inputActiveContent: inputInactiveContent}
    </div>
  </div>;
}

export default BuilderIndexSearch;
