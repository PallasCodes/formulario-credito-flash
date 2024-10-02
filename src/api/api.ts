import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyNzg4NjM0MSwiZXhwIjoxNzI3OTUxMTQxLCJpZHVzdWFyaW8iOjE4MjQ2LCJpZHJvbCI6MX0.RLf15kCXPEHGps2Rfsnm69EEy7lYDgS16vaIsYU0t2EOgelkfH4OeC1mwVwkZ9ji88xgw7c7D6I4_pXYEZPAkg";
