export const login = (user) => {
    localStorage.setItem("TOKEN", user.access_token);
    localStorage.setItem("RestoId", user.id);
};

export const logout = () => {
    localStorage.removeItem("TOKEN");
};

export const isLogin = () => {
    if (localStorage.getItem("TOKEN")) {
        return true;
    }
    return false;
};