import express from "express"
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/AppError.js";
import { isRegisteredUser } from "../../middlewares/authentication.js";
import { addCoins } from "../../controllers/users/userController.js";
import axios from "axios";
import "dotenv/config"

const backtest_api_key = process.env.BACKTEST_API_KEY;
const backtest_uri = process.env.BACKTEST_URI + "/api/backtest";
const router = express.Router();

// backtest cost calculation = backtest rate * no of days * no of legs/positions

router.post("/", isRegisteredUser, async (req, res)=>{
    try{
        const backtestQuery = req.body;
        if(!backtestQuery.positions?.length) throw new AppError("Please add atleast 1 position", 400)
        const startDate = new Date(backtestQuery.startDate);
        const endDate = new Date(backtestQuery.endDate);
        const coinReq = process.env.BACKTEST_RATE*(endDate-startDate)*(backtestQuery.positions.length)/(1000*60*60*24);
        if(req.user.coins<coinReq) throw new AppError("Not enough coins", 400)
        const result = await axios({method: "POST", headers:{"Authorization": backtest_api_key}, url:backtest_uri, data: backtestQuery});
        await addCoins(req.user, -coinReq);
        res.status(200).json(result.data);
    } catch(e){
        res.status(e.response?.status || 400).json({
            message: e.response?.data?.message || e.message || 'An error occurred'
        });
    }
})

export default router