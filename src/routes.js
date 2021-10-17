import Login from "./pages/Login";
import Register from "./pages/Register"
import Antrian from "./pages/Antrian";
import Menu from "./pages/Menu";
import Restoran from "./pages/Restoran";
import DataMeja from "./pages/DataMeja";
import KategoriMenu from "./pages/KategoriMenu";
import Riwayat from "./pages/Riwayat";

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
        name: "Restoran",
        path: "/",
        exact: true,
        component: Restoran,
        private: true,
    },
    {
        name: "Data Meja",
        path: "/data-meja",
        exact: true,
        component: DataMeja,
        private: true,
    },
    {
        name: "Kategori Menu",
        path: "/kategori-menu",
        exact: true,
        component: KategoriMenu,
        private: true,
    },
    {
        name: "Riwayat",
        path: "/riwayat",
        exact: true,
        component: Riwayat,
        private: true,
    },
];