import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyODYwMDU4MiwiZXhwIjoxNzI4NjY1MzgyLCJpZHVzdWFyaW8iOjE4MjQ2LCJpZHJvbCI6MX0.64J-__kbef2SL4MBgXvsktCvADxh7D293Ybq1sQi2_8gFiEd_S5YTbDUeCG6Jej8Ej6BedOAGf5-BSXRfdp2Tg";
