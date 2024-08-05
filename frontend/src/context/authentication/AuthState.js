import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.js";
import axios from "axios";
axios.defaults.withCredentials = true;

const backend = process.env.REACT_APP_BACKEND_URL;
const userAPI = backend + "/api/user";

const AuthState = (props)=>{

    const [user, setUser] = useState(null);

    const fetchUser = async ()=>{
        
        let data = null;
        try{
            data = (await axios({url: userAPI+"/me", method:"GET"})).data;
        } catch(e){
            console.log("user not authenticated")
        }
        setUser(data);
    }

    const logout = async ()=>{
        try{
            console.log("working in logout function")
            console.log(backend+"/logout")
            await axios({url: backend+"/logout", method:"POST"});
            await fetchUser();
        } catch(e){
            console.log("something went wrong, user might or might not be logged out.");
        }
    }

    useEffect(()=>{
        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{user, fetchUser, logout}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;