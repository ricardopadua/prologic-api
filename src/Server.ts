import app from './Startup'
import config  from 'config';

const _ = {
    message: `Server started on port ${config.get('express.port')}!`,
    port: config.get('express.port')
}

app.server.listen(_.port, () => app.log.success(_.message))
