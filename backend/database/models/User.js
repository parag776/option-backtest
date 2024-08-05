import mongoose from 'mongoose';
import dns from 'dns';
import bcrypt from "bcrypt";
import AppError from '../../utils/AppError.js';
import { Friends } from './Friends.js';
const Schema = mongoose.Schema;

const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()-_=+]{8,20}$/;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]+$/;
const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [
            {
                validator: function(value){
                    return emailRegex.test(value);
                },
                message: 'Please enter a valid email address'
            },
            {
                // Validate length
                validator: function(value) {
                return value.length >= 5 && value.length <= 254;
                },
                message: 'Please enter a valid email address'
            },
            {
                // Validate domain
                validator: async function(value) {
                    return new Promise((resolve, reject) => {
                        const domain = value.split('@')[1];
                        dns.resolveMx(domain, (err, addresses) => {
                        if (err || addresses.length === 0) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                        });
                    });
                },
                message: 'Please enter a valid email'
            }
        ]
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Username is required'],
        unique: true,
        match: [usernameRegex, 'Username can only contain lowercase letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot be more than 20 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        match: [nameRegex, 'Please fill a valid name'],
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate:{
            validator: function(value){
                if(this.isModified('password')){
                    return passwordRegex.test(value);
                }
                return true;
            },
            message: 'Password must be 8-20 characters long, include letters, numbers, and special characters'
        }
    },
    role: {
        type: Number,
        required: true,
        enum: [4,3,2,1],
        default: 1
    },
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

// static variables
userSchema.statics.SUPER_ADMIN = 4;
userSchema.statics.ADMIN = 3;
userSchema.statics.PROBLEM_SETTER = 2;
userSchema.statics.REGISTERED_USER = 1;

// static methods
// for next 3 functions i am returning null in case of errors, then later i am returning proper errors
userSchema.statics.findByUsernameOrEmail = async function(usernameOrEmail){
    try{
        const user = await User.findOne({"$or": [{username:usernameOrEmail}, {email:usernameOrEmail}]});
        return user;
    } catch(e){
        return null;
    }
}

const saltRounds = 12;
userSchema.statics.hashPassword = async function(password){
    try{
        return await bcrypt.hash(password, saltRounds);
    } catch(e){
        throw new AppError("Oops! Something went wrong. Please try again later.", 500);
    }
}

// parse mongoose error before proceeding

userSchema.statics.register = async function(details){
    try{
        const {name, username, email, password} = details;
        const user = new User({name, username, email, password});
        const userFriends = new Friends({_id: user._id});
        await userFriends.save();
        await user.save();
        console.log(user);
        return user;
    } catch(e){
        if (e.code === 11000) {
            if(e.keyPattern && e.keyPattern.email){
                e.message = 'Email already exists';
                e.status = 409;
                
            } else if (e.keyPattern && e.keyPattern.username){
                e.message = 'Username already exists';
                e.status = 409;
            } else {
                e.message = "Oops! Something went wrong. Please try again later.";
                e.status = 500;
            }
        }
        throw new AppError(e.message, e.status);
    }
}

// mongoose middlewares
userSchema.pre('save', async function(next) {
    const user = this;
  
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next();
    }
    try{
        user.password = await User.hashPassword(user.password);
        return next();
    } catch(error){
        return next(error);
    }
})



export const User = mongoose.model('User', userSchema);