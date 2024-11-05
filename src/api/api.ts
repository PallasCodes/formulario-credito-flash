import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export const api = axios.create({ baseURL: BASE_URL })

export const api3 = axios.create({
  baseURL: 'http://localhost:8084/Intermercado3WS/api/sts',
})

api3.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJCZXJuYXJkbyBUb3JyZXMgTWVkaW5hIiwiaXNzIjoiQmVybmFyZG8gVG9ycmVzIE1lZGluYSIsImlhdCI6MTczMDgyODg5MSwiZXhwIjoxNzMwODkzNjkxLCJpZHVzdWFyaW8iOjE4MDg4LCJpZHJvbCI6MX0.I2OeOcIlyqSxmrmKCgfVxM08p6GDpLcw3CZupVtI748zZ3RbYMftk7ClfWKDKOgzlmtVsyKK2gicjunHwuJN7g'
