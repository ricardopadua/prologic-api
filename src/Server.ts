import app from './Startup'

app.server.listen(8433, () => app.log.success('Server started on port 8433!'))
