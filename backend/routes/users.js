import express from "express"
import passport from "passport";

import { User } from "../database/models/User.js"
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {name, email, username, password} = req.body;
        const user = await User.register({name, email, username, password});
        await new Promise((resolve, reject) => {
            req.login(user, (err) => {
                if (err) {
                    reject(new AppError(err.message, err.status || 500));
                } else {
                    resolve();
                }
            });
        });
        console.log("login successful");
        res.sendStatus(200);
    } catch(e){
        res.status(e.status || 400).json({message: e.message});
    }
})

router.post("/login", passport.authenticate('local'), async (req, res)=>{
    res.status(200).json({message: "Login successful!"});
})

router.post('/logout', async(req, res, next)=>{
    console.log("yup hit me")
    await new Promise((resolve, reject) => {
        req.logout((err) => {
            if (err) {
                reject(new AppError(err.message, err.status || 500));
            } else {
                resolve();
            }
        });
    });
    res.sendStatus(200);
})

export default router;