import Joi from "joi"
import { foIndicesList } from "../data/foIndices.js";

export const parseTime = (time) => {
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3, 5));
};

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const NINE_FIFTEEN_AM = 9 * 60 + 15;
const THREE_THIRTY_PM = 15 * 60 + 30;

export const strategySchema = Joi.object({
    isMockData: Joi.boolean(),
    securityName: Joi.string().valid(...foIndicesList.map((el)=>el.securityName)).insensitive(),
    overallExitTime: Joi.string().pattern(timeRegex).custom((value, helpers) => {
        const minutes = parseTime(value);
        if (minutes <= NINE_FIFTEEN_AM || minutes > THREE_THIRTY_PM) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required(),
    strategyStopLossPercent: Joi.number().greater(0).less(1).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required(),
    positions: Joi.array().items(Joi.object({
        optionType: Joi.string().valid('CE', 'PE').required(),
        tradeAction: Joi.string().valid('buy', 'sell').required(),
        strikeDetails: Joi.object({
            strikeCategory: Joi.string().valid('OTM', 'ATM', 'ITM').required(),
            pointsOffset: Joi.number().min(0).max(300).required()
        }).required(),
        entryTime: Joi.string().pattern(timeRegex).custom((value, helpers) => {
            const overallExitTime = parseTime(helpers.state.ancestors[2].overallExitTime);
            const minutes = parseTime(value);
            if (minutes < NINE_FIFTEEN_AM || minutes >= overallExitTime) {
                return helpers.error('any.invalid');
            }
            return value;
        }).required(),
        exitTime: Joi.string().pattern(timeRegex).custom((value, helpers) => {
            const entryTime = parseTime(helpers.state.ancestors[0].entryTime);
            const overallExitTime = parseTime(helpers.state.ancestors[2].overallExitTime);
            const minutes = parseTime(value);
            if (minutes <= entryTime || minutes > overallExitTime) {
                return helpers.error('any.invalid');
            }
            return value;
        }).required(),
        stopLossPercent: Joi.number().greater(0).less(1).required()
    })).required(),
});

export default (req, res, next) =>{
    try{
        const {value, error} = strategySchema.validate(req.body);
        req.body.startDate = new Date(req.body.startDate);
        req.body.endDate = new Date(req.body.endDate);
        if(error) return next(new Error(error.details[0].message));
        return next();
        
    } catch(e){
        next(e);
    }
}

// const strategyInterface = {
//     positions: [{               
//         optionType: String,     // either CE (Call) or PE (Put)
//         tradeAction: String,    // either "buy" or "sell"
//         strikeDetails: {
//             strikeCategory: String,   // 'strikeCategory' (OTM, ATM, ITM)
//             pointsOffset: Number      // Number of points away if OTM or ITM
//         },
//         entryTime: Date,        // Time of the day when the option is bought
//         exitTime: Date,         // Time of the day when the option is sold
//         stopLossPercent: Number // Stop loss percentage
//     }],
//     overallExitTime: Date,         // Overall sell time
//     strategyStopLossPercent: Number// Strategy stop loss percentage
// }