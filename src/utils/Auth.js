import axios from "axios";
import Cookies from "js-cookie";
require('dotenv').config();

export const login = (user, remember) => {
    if (remember){
        Cookies.set("BangOrderToken", user.access_token);
        Cookies.set("RestoId", user.id);
    } else {
        Cookies.set("BangOrderToken", user.access_token,  { expires: 7 });
        Cookies.set("RestoId", user.id,  { expires: 7 });
    }
    return true;
};

export const logout = () => {
    Cookies.remove("BangOrderToken");
};

export const isLogin = () => {
    if (Cookies.get("BangOrderToken")) {
        var auth = axios.post(process.env.REACT_APP_API_URL+"auth", null, {headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") }})
        .then(()=>{
            return true
        })
        .catch(()=>{
            return false
        })
        
        if (auth.then((res) => {return res})){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};