import { User } from "../../database/models/User.js";

export async function addCoins(user, coins){
    user.coins+=coins;
    await user.save();
}