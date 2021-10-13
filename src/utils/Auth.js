export const login = (user) => {
    console.log(user);
    localStorage.setItem("USER", user.email);
};

export const logout = () => {
    localStorage.removeItem("USER");
};

export const isLogin = () => {
    if (localStorage.getItem("USER")) {
        return true;
    }
    return false;
};