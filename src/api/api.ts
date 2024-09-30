import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKZXNzaWNhIENhbmNlbGEgREVTQVJST0xMTyBISUdIVEVLIiwiaXNzIjoiSmVzc2ljYSBDYW5jZWxhIERFU0FSUk9MTE8gSElHSFRFSyIsImlhdCI6MTcyNzcxODc4OSwiZXhwIjoxNzI3NzgzNTg5LCJpZHVzdWFyaW8iOjE4MjQ2LCJpZHJvbCI6MX0.Ig2t3RuJxkdoaZBHQopT6Y2Bgj9P9NCMXes-CRpqNRNojshjvjNzGlSBXE9lgWw7_TOxOFupR2YgbuDwSONxEQ";
