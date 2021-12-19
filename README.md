# Getting Started with BangOrder Frontend
link: bangorder.me

# How to Install

1. pull BangOrder-Backend
2. install project
    > composer install
3. create user in phpmyadmin
  - username : bangorder
  - password : bangorder123
5. migrate database
    > php artisan migrate:fresh --seed
6. start project
    > php artisan serve
8. pull BangOrder-Frontend
9. install project
    > npm install
10. start server
    > npm start

# Available route
    - /order-list
    - /list-menu
    - /login
    - /register
    - /data-meja
    - /kategori-menu
    - /tambah-menu
    - /edit-menu/:menuId
    - /riwayat

# Sprint Backlog
1. Sprint 1
   > Login, Antrian page, Menu page, Detail menu page
2. Sprint 2
   > Tambah menu & Update status menu (Menu page), Edit data menu (Detail menu page), Riwayat pesanan page, Kategori menu page, Data meja page, Generate QR Code for every table in restaurant, Profile page
3. Sprint 3
   > Dashboard, Register, Verify email, Change password, Forget password

# User Flow
- User **login** first
- After that is directed to the **antrian page**
- On the **data meja page**, the user can add new table, download qr code, edit or delete the table data too
- User can add new menu category and edit menu category on **kategori menu page**
- User can also access **menu page**, user can check menu status (available/unavailable/recommended), add new menu list item, and when user click on any menu, it will move to that menu details and user can edit it
- User can view customer order history on **riwayat page**

