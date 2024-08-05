import React from "react";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import "./Footer.css"

function Footer() {

    
    const isXLargeScreen = useMediaQuery({ minWidth: 1200});
    const isSmallScreen = useMediaQuery({minWidth: 576});

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    function emailChangeHandler(e){
        setEmail(e.target.value);
    }

    const isValidEmail = function (email) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    const submitHandler = function(event){
        event.preventDefault();
        if(isValidEmail(email)){
            console.log(email);
            setError(null);
            setEmail("");
        } else {
            setError("invalid Email");
            console.log(error)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submitHandler(event);
        }
    }

  return (
  <footer className="footer row mt-big mb-big">
    <div className="col-xl-8">
        <div className="row">
            <div className="col-sm-4">
                <div className="d-flex">
                    <img src="./images/GreekHunt_logo_1.png" alt="logo" className="img-fluid" style={{maxHeight: "28px"}}/>
                    <h5 className="fs-5 d-inline-block">GREEKHUNT</h5>
                </div>
                <h6 className="fs-6 mt-4 color-light-secondary"> Derivates Expanded</h6>
                <div className="mt-4 d-flex">
                    
                    <a href="http://instagram.com" target="_blank" rel="noreferrer"><img className="inline-block me-2 img-fluid" src="./icons/instagram.png" alt="" /></a>
                    <a href="http://twitter.com" target="_blank" rel="noreferrer"><img className="inline-block img-fluid" src="./icons/twitter.png" alt="" /></a>
                    <a href="http://linkedin.com" target="_blank" rel="noreferrer"><img className="inline-block ms-2 img-fluid" src="./icons/linkedin.png" alt="" /></a> 
                </div>
            </div>
            <div className={`col-sm-4 ${!isSmallScreen && "mt-small"}`}>
                <h1 className="fs-5">Solutions</h1>
                <h6 className="fs-6 color-light-secondary">Responsive Web Design</h6>
                <h6 className="fs-6 color-light-secondary">Responsive Prototypes</h6>
                <h6 className="fs-6 color-light-secondary">Design to Code</h6>
                <h6 className="fs-6 color-light-secondary">Static Website Builder</h6>
                <h6 className="fs-6 color-light-secondary">Static Website Generator</h6>
            </div>
            <div className={`col-sm-4 ${!isSmallScreen && "mt-small"}`}>
                <h1 className="fs-5">Company</h1>
                <h6 className="fs-6 color-light-secondary">About</h6>
                <h6 className="fs-6 color-light-secondary">Team</h6>
                <h6 className="fs-6 color-light-secondary">News</h6>
                <h6 className="fs-6 color-light-secondary">Partners</h6>
                <h6 className="fs-6 color-light-secondary">Careers</h6>
                <h6 className="fs-6 color-light-secondary">Press & Media</h6>
            </div>
        </div>

    </div>
    <div className={`col-xl-4 ${!isXLargeScreen && "mt-small"}`}>
        <h4 className="fs-4">Subscribe to our newsletter</h4>
        <div className="mt-4">
            <div className="bg-secondary rounded-pill py-2 px-2">
                <div className="d-flex justify-content-center">
                    <input onKeyUp={handleKeyPress} onChange={emailChangeHandler} className="w-75" type="email" style={{all:"unset", marginLeft: "1rem", caretColor: "white"}} placeholder="Enter your email" name="email" value={email}/>
                    <button onClick={submitHandler} className="btn btn-primary rounded-pill w-50 py-3" type="button">Submit</button>
                </div>
            </div>
            {error && <div className="bg-primary">{error}</div>}
        </div>
    </div>
  </footer>
  );
}

export default Footer;
