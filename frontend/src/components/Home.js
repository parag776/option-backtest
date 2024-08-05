import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Faq from './Faq.js';
import ReviewCard from "./ReviewCard.js"
import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {

    const [featureChoice, setFeatureChoice] = useState(0);
    const [priceMonthy, setPriceMonthly] = useState(1);
    const isMediumScreen = useMediaQuery({ minWidth: 768});
    const isLargeScreen = useMediaQuery({ minWidth: 992})

    const primaryColor = "#23B5B5"
    const newGreyColor = "#5A5A5A"

    // function for feature choice underline
    function featureBorderText(value){
        let ans = "";
        if(!(value===featureChoice) && isMediumScreen) return ans;
        if(value===featureChoice) {
            ans+="3px"
        } else {
            ans+="1px"
        }
        ans+=" solid ";
        if(value===featureChoice || isMediumScreen){
            ans+=primaryColor;
        } else {
            ans+=newGreyColor;
        }
        return ans;
    }

    function featureOnClick(event){
        const divIdentifier = event.currentTarget.getAttribute("data-div-identifier");
        setFeatureChoice(Number(divIdentifier));
    }

  return (
    <>
    <section className="mt-5">
        <div className="row">
            <div className="col-lg-6">
                <div style={{fontSize: "4em", fontWeight: "600", lineHeight: "1.1"}}>
                    <p>Wondering how to take your F&O trading to the next level?</p>
                </div>
                <div>
                    <h4>Look no further.</h4>
                </div>
            </div>
            <div className={`col-lg-6 ${!isLargeScreen && "mt-small"} d-flex align-items-center justify-content-lg-center`}>
                <img src="./images/stockImage1.jpg" alt="lala" className="img-fluid" style={{maxHeight: "300px"}}/>
            </div>
        </div>
        <div className="mt-4">
            <Link className="btn btn-primary me-3 btn-lg rounded-pill py-3 px-4" to="/chart">Get Started</Link>
            <Link className="btn btn-secondary btn-lg rounded-pill py-3 " to="/">View Features</Link>
        </div>
        <div className="d-flex align-items-center mt-4">
            <img src="./tempStuffDeleteMe/stock.png" alt="stock" style={{width: "50px"}}/>
            <p className="text-center mt-3 d-block">It's LIVE, built by professional TRADERS and FREE for the time being.</p>
        </div>
    </section>

    <div className="mt-small" style={{borderTop: "2px solid #5A5A5A"}}></div>

    <section className={(isLargeScreen)?"mt-big":"mt-mid"}>
        <h2 className={`d-block mb-5 } text-center`}>All Inclusive Derivatives Analytics Platform</h2>
        <div className="row" style={{cursor: "pointer"}}>
            <div  className="col-md-4" data-div-identifier="0" onClick={featureOnClick}>
                <h3>Option Charts</h3>
                <h5 style={{color: "#5A5A5A"}}>Live & historical</h5>
                <div className="my-4" style={{borderTop: featureBorderText(0)}}></div>
            </div>
            <div className="col-md-4" data-div-identifier="1" onClick={featureOnClick}>
                <h3>OI Analytics</h3>
                <h5 style={{color: "#5A5A5A"}}>Including option chain</h5>
                <div className="my-4" style={{borderTop: featureBorderText(1)}}></div>
            </div>
            <div className="col-md-4" data-div-identifier="2" onClick={featureOnClick}>
                <h3>Strategy builder</h3>
                <h5 style={{color: "#5A5A5A"}}>For all NSE derivatives</h5>
                <div className="my-4" style={{borderTop: featureBorderText(2)}}></div>
            </div>
        </div>
        {isMediumScreen && <div className="" style={{borderTop: `1px solid ${primaryColor}`, marginTop: "-1.5rem"}}></div>}
        <div className='overflow-hidden' >
            <div className="row flex-nowrap" style={{transform: `translateX(-${featureChoice}00%)`, transition: 'transform 0.5s ease'}}>
                <div className="col-12 ">
                    <div className="row align-items-center">
                        <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>

                            <h1 className="mb-3"> Plot 'Straddle' & 'Strangles' Premiums!</h1>
                            <ul className="fs-5 dashed-list">
                                <li>Data is refreshed every one minute</li>
                                <li>Available for all NSE options (indices & stocks)</li>
                                <li>Ability to plot spreads, condors, strangles, straddles</li>
                            </ul>
                            <Link className="fs-5 btn-text-primary" to="/chart">Explore more &rarr;</Link>
                        </div>
                        <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>
                            <img className="img-fluid" src="https://apexcharts.com/wp-content/uploads/2018/05/dashboard-dark.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    
                    <div className="row align-items-center">
                        <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>

                            <h1 className="mb-3"> Plot 'Straddle' & 'Strangles' Premiums!</h1>
                            <ul className="fs-5 dashed-list">
                                <li>Data is refreshed every one minute</li>
                                <li>Available for all NSE options (indices & stocks)</li>
                                <li>Ability to plot spreads, condors, strangles, straddles</li>
                            </ul>
                            </div>
                            <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>
                            <img className="img-fluid" src="https://apexcharts.com/wp-content/uploads/2018/05/dashboard-dark.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row align-items-center">
                        <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>

                            <h1 className="mb-3"> Plot 'Straddle' & 'Strangles' Premiums!</h1>
                            <ul className="fs-5 dashed-list">
                                <li>Data is refreshed every one minute</li>
                                <li>Available for all NSE options (indices & stocks)</li>
                                <li>Ability to plot spreads, condors, strangles, straddles</li>
                            </ul>
                            </div>
                            <div className={`col-lg-6 ${(isMediumScreen)?"mt-big":"mt-small"}`} style={{padding: "0 20px"}}>
                            <img className="img-fluid" src="https://apexcharts.com/wp-content/uploads/2018/05/dashboard-dark.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

   <section className={(isLargeScreen)?"mt-big":"mt-mid"}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className="color-primary fs-6 letter-spacing">PRICING</h1>
            <h1>Start small, think big</h1>
            <p className="color-light-secondary text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolorem qui possimus libero molestiae sunt animi voluptatibus illum praesentium ad.</p>
        </div>
        <div className="d-flex justify-content-center mt-4">
            <div className='d-inline-block bg-secondary rounded-pill p-2'>
                <div onClick={()=>{setPriceMonthly(1)}} className={`btn ${(priceMonthy)?"btn-primary":"btn-dark"} rounded-pill me-3 p-3`}>Monthly</div>
                <div onClick={()=>{setPriceMonthly(0)}} className={`btn ${(!priceMonthy)?"btn-primary":"btn-dark"} rounded-pill py-3 px-4`}>Yearly</div>
            </div>
        </div>
        
        <div className="row mt-small">
            <div className="col-lg-4">
                <div className="bg-secondary rounded-5 m-3 p-4">
                    <h3>Basic</h3>
                    <div><h1 className="d-inline">{(priceMonthy)?"Free":"Free"} </h1><h2 className="d-inline">{(priceMonthy)?"/month":"/year"}</h2></div>
                    <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="btn btn-primary rounded-pill py-3 mt-3" style={{width: "100%"}}>Start Basic</div>
                    <h5 className="mt-3">You will get</h5>
                    <ul className="mt-4">
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="bg-secondary rounded-5 m-3 p-4">
                    <h3>Basic</h3>
                    <div><h1 className="d-inline">{(priceMonthy)?"Free":"Free"} </h1><h2 className="d-inline">{(priceMonthy)?"/month":"/year"}</h2></div>
                    <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="btn btn-primary rounded-pill py-3 mt-3" style={{width: "100%"}}>Start Basic</div>
                    <h5 className="mt-3">You will get</h5>
                    <ul className="mt-4">
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="bg-secondary rounded-5 m-3 p-4">
                    <h3>Basic</h3>
                    <div><h1 className="d-inline">{(priceMonthy)?"Free":"Free"} </h1><h2 className="d-inline">{(priceMonthy)?"/month":"/year"}</h2></div>
                    <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="btn btn-primary rounded-pill py-3 mt-3" style={{width: "100%"}}>Start Basic</div>
                    <h5 className="mt-3">You will get</h5>
                    <ul className="mt-4">
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                        <li>lala</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='text-center mt-5'> 
            <div className="d-inline-block mx-2">Need any help?</div>
            <div className="btn-text-primary d-inline-block mx-2"> contact support &rarr;</div>
        </div>

    </section>

        <div className="mt-big" style={{borderTop: "2px solid #5A5A5A"}}></div>

    <section className="mt-big">
        <div className="text-center">
            <h1 className="fs-6 color-primary letter-spacing">TALES FROM TRADERS</h1>
            <h1>What users say about us</h1>
            <p>We rely on direct feedback - what traders demand is what we build with a hint of ingenious mixed in.</p>
        </div>

        <div>
            
        </div>
        <div className="row">
            <div className="col-lg-4 px-4">
                <div className="mt-small">
                    <ReviewCard comment={"A step in the right direction, especially with a lot of retailers heading towards option selling."}
                                name={"Upanshu"}
                                designation={"IIM Lucknow"}
                    />
                </div>
                <div className="mt-small">
                    <ReviewCard comment={"Derivates especially in India are often left to the bigger players who have access to state of the art tools and cutting edge technology. Greek Hunt looks like a good attempt to provide an insight into the Indian derivates market."}
                                name={"Aachman Jain"}
                                designation={"ISB Hyderabad"}
                    />
                </div>
                
            </div>
            <div className="col-lg-4 px-4">
                <div className="mt-small">
                    <ReviewCard comment={"The idea of having a one stop derivatives resource for NSE is admirable."}
                                name={"Kabir Batra"}
                                designation={"Investment Banker"}
                    />
                </div>
                <div className="mt-small">
                    <ReviewCard comment={"Around 90% of derivative traders lose money. Maybe it's time to change that."}
                                name={"Rachit Gupta"}
                                designation={"ISB Hyderabad"}
                    />
                </div>
            </div>
            <div className="col-lg-4 px-4">
                <div className="mt-small">
                    <ReviewCard comment={"Greek Hunt is an impressive concept that facilitates the break down of derivates, giving retail traders a much needed edge. The execution here seems to be just right."}
                                name={"Daulat Yadav"}
                                designation={"Derivatives Trader"}
                    />
                </div>
                <div className="mt-small">
                    <ReviewCard comment={"Personally using Greek Hunt to trade, it has become a necessity for me to manage quick and complicated trades in a simplistic manner."}
                                name={"Chetna Bhagat"}
                                designation={"JP Morgan"}
                    />
                </div>
            </div>
        </div>

    </section>

    <div className="mt-big" style={{borderTop: "2px solid #5A5A5A"}}></div>

    <section className="mx-auto" style={{maxWidth: "992px"}}>
        
        <h1 className="fs-6 letter-spacing color-primary mt-big text-center">FAQ</h1>
        <h1 className="text-center">Frequently asked questions</h1>

        <div className="mt-small">
            <div className="mt-4">
                <Faq ques="What segments does Greek Hunt deal in?" ans="We right now are only using NSE as the exchange and all derivaties data is based on stock/index derivaties that trade out of NSE." expanded={true}></Faq>
            </div>
            <div className="mt-4">
                <Faq ques="Will the tools provided make me profitable?" ans="Iff we had a money printing machine -  we wouldn't be here. Rest assured, the tools provided should bridge a lot of gap between a novice and a professional trader and provide an important ally in the market."></Faq>
            </div>
            <div className="mt-4">
                <Faq ques="is the data live?" ans="We pull data every 30 seconds from the exchange (time lines may wary with regards to server load or tool being used), hence the data is live and real."></Faq>
            </div>
            <div className="mt-4">
                <Faq ques="Should I base my trades on the basis of what the tools demonstrate?" ans="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id."></Faq>
            </div>
        </div>
      
    </section>
    </>
  );
}

export default Home;
