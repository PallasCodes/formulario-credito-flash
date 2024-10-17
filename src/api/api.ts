import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyOTA5ODA1OSwiZXhwIjoxNzI5MTYyODU5LCJpZHVzdWFyaW8iOjE4MjQ2LCJpZHJvbCI6MX0.FphtNF1bUS73ffzSMauio8Me02-G4-n8_r-014BuR0nY520TocI7ROjSrwVjAux5se9GwtIA68qrESM0l4b2Ew";
