import axios from "axios";

const BASE_URL = "http://localhost:8084/Intermercado3WS/api/sts";

export const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCZXJuYXJkbyBUb3JyZXMgTWVkaW5hIiwiaXNzIjoiQmVybmFyZG8gVG9ycmVzIE1lZGluYSIsImlhdCI6MTcyOTYyMDQ2NCwiZXhwIjoxNzI5Njg1MjY0LCJpZHVzdWFyaW8iOjE4MDg4LCJpZHJvbCI6MX0.sLblFt-EBS5aPYVVQ2BukeUBw-I99JNFGCjfZbHJOnDnUXZ3oKnhkyzw1G4ggfWTy9FMYye3yhWXY_8Ns_fq4g";
