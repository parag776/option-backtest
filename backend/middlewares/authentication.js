import { User } from "../database/models/User.js";
import AppError from "../utils/AppError.js";
export const isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.role>=User.ADMIN){
        return next();
    }
    throw new AppError("", 401);
}

export const isSuperAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.role>=User.SUPER_ADMIN){
        return next();
    }
    throw new AppError("", 401);
}

export const isProblemSetter = function(req, res, next){
    if(req.isAuthenticated() && req.user.role>=User.PROBLEM_SETTER){
        return next();
    }
    throw new AppError("", 401);
}

export const isRegisteredUser = function(req, res, next){
    if(req.isAuthenticated() && req.user.role>=User.REGISTERED_USER){
        return next();
    }
    throw new AppError("", 401);
}