import axios from "axios";
axios.defaults.withCredentials = true;
const backendAPI = process.env.REACT_APP_BACKEND_URL + "/api";

export async function getUser(){
    try{
        const user = await axios.get(backendAPI+"/me");
        return user.data;
    } catch(e){
        return null;
    }
}