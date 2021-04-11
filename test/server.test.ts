import req from 'supertest'
import app from '../src/Startup'

test('[GET] /', async () => {
  const res = await req(app).get('/management/info')
  expect(res).toBe({
    "build": {
      "name": "prologic-api",
      "description": "WebApi application for project prologic-app",
      "version": "0.3.7"
    }
  })
})