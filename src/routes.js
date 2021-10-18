import Login from "./pages/Login";
import Register from "./pages/Register"
import Antrian from "./pages/Antrian";
import Menu from "./pages/Menu";
import EditMenu from "./pages/EditMenu";

export const APP_ROUTE = [
    {
        name: "Login",
        path: "/login",
        exact: true,
        component: Login,
        restricted: true,
    },
    {
        name: "Register",
        path: "/register",
        exact: true,
        component: Register,
        restricted: true,
    },
    {
        name: "Antrian",
        path: "/order-list",
        exact: true,
        component: Antrian,
        private: true,
    },
    {
        name: "Menu",
        path: "/list-menu",
        exact: true,
        component: Menu,
        private: true,
    },
    {
        name: "Edit Menu",
        path: "/edit-menu",
        exact: true,
        component: EditMenu,
        private: true,
    },
];