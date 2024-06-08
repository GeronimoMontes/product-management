import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/',
  },
  env: {
    auth: {
      username: 'test',
      password: '123'
    }
  },
})