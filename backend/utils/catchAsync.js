import AppError from "./AppError.js";

// fix catchAsync
export default function(func){
    return async function(req, res, next){
        try{
            await func(req, res, next);
        } catch(e){
            const customError = new AppError(e.message, e.status);
            return next(customError); 
        }
    }
}