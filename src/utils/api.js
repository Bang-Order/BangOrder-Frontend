import axios from "axios";
import Cookies from "js-cookie";
require('dotenv').config();

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "restaurants/"+Cookies.get("RestoId"),
  headers: { Authorization: 'Bearer ' + Cookies.get("BangOrderToken") }
});