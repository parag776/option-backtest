import express from "express"
import session from "express-session"
import mongoose from "mongoose";
import path from "path";
import passport from "passport";
import LocalStrategy from "passport-local"
import bcrypt from "bcrypt"
import MongoStore from "connect-mongo";
import cors from "cors"
import "dotenv/config"
import { User } from "./database/models/User.js";

const app = express();

// routes
import apiRoutes from "./routes/api/main.js"
import userRoutes from "./routes/users.js"

//mongo connect
mongoose.connect(process.env.MONGO_URI, {}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log(e)
})

//general uses.
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json());

//session
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7 // 1 week
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collection: 'session'
    })
}

app.use(session(sessionConfig))

//passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: "usernameOrEmail",
    passwordField: "password"
},
async function verify(usernameOrEmail, password, cb){
    try{
        
        const user = await User.findByUsernameOrEmail(usernameOrEmail);
        if(!user) return cb(null, false, {message: 'Incorrect email/username or password'});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return cb(null, false, {message: 'Incorrect email/username or password'});
        return cb(null, user);
    } catch(e){
        return cb(e)
    }
}))

passport.serializeUser(function(user, cb){
    cb(null, user._id)
});
passport.deserializeUser((id, cb) => {
    User.findById(id).then((user)=>{
      cb(null, user);  
    }).catch((e)=>{
        cb(e);
    })
});

// using routes
app.use("/", userRoutes);
app.use("/api", apiRoutes);

app.get("/", (req, res)=>{
    console.log(req.user)
    res.send("hello");
})

app.use((err, req, res, next)=>{
    res.sendStatus(err.status);
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("listening at port 3000");
})