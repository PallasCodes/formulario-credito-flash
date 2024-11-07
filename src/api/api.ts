import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export const api = axios.create({ baseURL: BASE_URL })

export const api3 = axios.create({
  baseURL: 'http://localhost:8084/Intermercado3WS/api/sts',
})

api3.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCZXJuYXJkbyBUb3JyZXMgTWVkaW5hIiwiaXNzIjoiQmVybmFyZG8gVG9ycmVzIE1lZGluYSIsImlhdCI6MTczMDkxOTAyOSwiZXhwIjoxNzMwOTgzODI5LCJpZHVzdWFyaW8iOjE4MDg4LCJpZHJvbCI6MX0.dhKkaF_8-VniEQLlRfwJYhurxo3zpGyWTrBfw4h1l9D8NzLl7NHJRFswNXoWCaWzwDIe8LRwSJwEaGkfeUL-gw'
