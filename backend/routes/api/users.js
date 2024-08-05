import express from "express"
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/AppError.js";
import { isRegisteredUser } from "../../middlewares/authentication.js";
import { addCoins } from "../../controllers/users/userController.js";


const router = express.Router();

router.get("/me", isRegisteredUser, (req, res)=>{
    res.json(req.user)
})

router.post("/addCoins", isRegisteredUser, catchAsync(async (req, res)=>{
    await addCoins(req.user, req.body.coins);
    res.sendStatus(200);
}))

export default router