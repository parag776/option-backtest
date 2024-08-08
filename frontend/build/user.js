import axios from "axios";

const backendAPI = process.env.REACT_APP_BACKEND_URL + "/api";

export async function getUser(){
    try{
        const user = await axios.get(backendAPI+"/me");
        return user;
    } catch(e){
        return null;
    }
}