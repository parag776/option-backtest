import "./Navbar.css"
import React from "react";
import { getUser } from "../backend/user.js";
import { Link } from "react-router-dom";
import { useState } from "react";



async function getUserName(){
    const user = getUser();
    console.log(user);
    if(!user) return false;
    return user.username
}

function Navbar() {

  const [isUser, setIsUser] = useState(false)
  getUserName();

  return (

    <nav className="navbar navbar-expand-lg mt-3" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><span className="navbarTextFont"><img src="./images/GreekHunt_logo_1.png" alt="lala" className="img-fluid" style={{maxHeight: "50px"}}/>GREEKHUNT</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link className="nav-link active" aria-current="page" to="/"><span className="navbarTextFont">Features</span></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link " aria-current="page" to="/hello"><span className="navbarTextFont">Why us</span></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" aria-current="page" to="/"><span className="navbarTextFont">Prices</span></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" aria-current="page" to="/"><span className="navbarTextFont">Contact</span></Link>
              </li>
              <div className={"nav-item mx-3 " + (isUser && "dropdown")}>
                <li className={"btn btn-secondary " + (isUser && "dropdown-toggle")} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ()
                </li>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
