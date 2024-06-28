import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    projectId: 'af6a31f3-8425-4d2e-8657-82754d0677a3',
    baseUrl: 'http://localhost:4200/',
  },
  env: {
    auth: {
      username: 'test',
      password: '123'
    }
  },
})
