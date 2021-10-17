# Getting Started with BangOrder Frontend

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

# available route
    - /order-list
    - /list-menu
    - /login
    - /register
