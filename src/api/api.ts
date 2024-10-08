import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyODMyMzY3NywiZXhwIjoxNzI4Mzg4NDc3LCJpZHVzdWFyaW8iOjE4MjQ2LCJpZHJvbCI6MX0.8PFxe0ZNWI-2XF9mZ5XabSok_GMDJAWU-tZ8ALFXMf9i1HzqC8vDjgG-hlSCqDZApfU76KnLoVS38X5E5goKWw";
