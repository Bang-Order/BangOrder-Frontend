import Cookies from "js-cookie";

export const login = (user) => {
    Cookies.set("BangOrderToken", user.access_token);
    Cookies.set("RestoId", user.id);
};

export const logout = () => {
    Cookies.remove("BangOrderToken");
};

export const isLogin = () => {
    if (Cookies.get("BangOrderToken")) {
        return true;
    }
    return false;
};