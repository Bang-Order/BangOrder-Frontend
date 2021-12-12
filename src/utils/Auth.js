import axios from "axios";
import Cookies from "js-cookie";
require('dotenv').config();

export const login = (user) => {
    Cookies.set("BangOrderToken", user.access_token);
    Cookies.set("RestoId", user.id);
    return true;
};

export const logout = () => {
    Cookies.remove("BangOrderToken");
};

export const isLogin = () => {
    let auth = axios.post(process.env.REACT_APP_API_URL+"auth", {headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") }})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })

    auth.then((res) => {console.log(res)})
    console.log(auth);
    if (Cookies.get("BangOrderToken")) {
        return true;
    } else {
        return false;
    }
};