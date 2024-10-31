import axios from 'axios'

const BASE_URL = 'http://localhost:8084/Intermercado3WS/api/sts'

export const api = axios.create({ baseURL: BASE_URL })

api.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCZXJuYXJkbyBUb3JyZXMgTWVkaW5hIiwiaXNzIjoiQmVybmFyZG8gVG9ycmVzIE1lZGluYSIsImlhdCI6MTczMDMxMDA2MCwiZXhwIjoxNzMwMzc0ODYwLCJpZHVzdWFyaW8iOjE4MDg4LCJpZHJvbCI6MX0.BEG4C90iEMUjP_J-1cHQpEPIu0Z1jyPVeHKQ_aSrVjmmNx2PFBW5rhuOTBXQWbEDP3TdQQQN8teIcwYZFJAVzA'
