import Login from "./pages/Login";
import Register from "./pages/Register"
import Antrian from "./pages/Antrian";
import Menu from "./pages/Menu";
import Restoran from "./pages/Restoran";
import DataMeja from "./pages/DataMeja";
import KategoriMenu from "./pages/KategoriMenu";
import Riwayat from "./pages/Riwayat";
import EditMenu from "./pages/EditMenu";
import TambahMenu from "./pages/TambahMenu";
import Akun from "./pages/Akun";
import Form from "./pages/Form";
import UbahSandi from "./pages/UbahSandi";
import VerifikasiEmail from "./pages/VerifikasiEmail";
import VerifikasiSukses from "./pages/VerifikasiSukses";
import VerifikasiExpired from "./pages/VerisikasiExpired";
import Unverified from "./pages/Unverified";

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
        name: "Restoran",
        path: "/",
        exact: true,
        component: Restoran,
        private: true,
        index: 1
    },
    {
        name: "Antrian",
        path: "/order-list",
        exact: true,
        component: Antrian,
        private: true,
        index: 2
    },
    {
        name: "Data Meja",
        path: "/data-meja",
        exact: true,
        component: DataMeja,
        private: true,
        index: 3
    },
    {
        name: "Kategori Menu",
        path: "/kategori-menu",
        exact: true,
        component: KategoriMenu,
        private: true,
        index: 4
    },
    {
        name: "Menu",
        path: "/list-menu",
        exact: true,
        component: Menu,
        private: true,
        index: 5
    },
    {
        name: "Riwayat",
        path: "/riwayat",
        exact: true,
        component: Riwayat,
        private: true,
        index: 6
    },
    {
        name: "Edit Menu",
        path: "/edit-menu/:menuId",
        exact: true,
        component: EditMenu,
        private: true,
    },
    {
        name: "Tambah Menu",
        path: "/tambah-menu",
        exact: true,
        component: TambahMenu,
        private: true,
    },
    {
        name: "Akun",
        path: "/akun",
        exact: true,
        component: Akun,
        private: true,
    },
    {
        name: "Form Register",
        path: "/form",
        exact: true,
        component: Form,
    },
    {
        name: "Ubah Sandi",
        path: "/ubah-sandi",
        exact: true,
        component: UbahSandi,
        private: true,
    },
    {
        name: "Verifikasi Email",
        path: "/verifikasi-email",
        exact: true,
        component: VerifikasiEmail,
        private: true,
    },
    {
        name: "Verifikasi Sukses",
        path: "/verifikasi-sukses",
        exact: true,
        component: VerifikasiSukses,
        private: true,
    },
    {
        name: "Verifikasi Kadaluarsa",
        path: "/verifikasi-kadaluarsa",
        exact: true,
        component: VerifikasiExpired,
        private: true,
    },
    {
        name: "Belum Verifikasi",
        path: "/belum-verifikasi",
        exact: true,
        component: Unverified,
        private: true,
    }
];