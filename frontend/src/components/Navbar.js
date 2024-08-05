import "./Navbar.css"
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authentication/AuthContext.js";
import axios from "axios";

const userAPI = process.env.REACT_APP_BACKEND_URL + "/api/user";

function Navbar() {

  const auth = useContext(AuthContext)

  async function addCoins(x){
    try{
      await axios({url: userAPI+"/addCoins", method:"POST", data:{coins:x}});
      await auth.fetchUser();
    } catch(e){
      console.log(e.message);
    }
  }

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
                <Link className="nav-link active" aria-current="page" to="/"><span className="navbarTextFont">Home</span></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link " aria-current="page" to="/backtest"><span className="navbarTextFont">Backtest</span></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" aria-current="page" to="/chart"><span className="navbarTextFont">Chart</span></Link>
              </li>
              <div className={"nav-item mx-3 " + (auth.user && "dropdown")}>
                <li 
                  className={auth.user ? "btn btn-secondary dropdown-toggle" : "btn btn-secondary"}
                  type={auth.user ? "button" : undefined}
                  data-bs-toggle={auth.user ? "dropdown" : undefined}
                  aria-expanded={auth.user ? "false" : undefined}
                >
                  {auth.user?auth.user.username:<Link className="nav-link" aria-current="page" to="/Login"><span className="navbarTextFont">Login</span></Link>}
                </li>
                {auth.user && 
                <ul className="dropdown-menu">
                  
                  <li onClick={()=>addCoins(1000)}><p className="dropdown-item cursor-pointer">+1000 coins</p></li> 
                  <li onClick={()=>addCoins(10)}><p className="dropdown-item cursor-pointer">+10 coins</p></li> 
                  <li><p className="dropdown-item">coins: {auth.user.coins}</p></li>
                  <li><button className="btn dropdown-item" onClick={auth.logout}>Logout</button></li>
                </ul>}
              </div>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
