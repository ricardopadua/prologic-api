import app from './Startup';
import environment from '../config/';

app.Server.listen(environment.express.port, () => app.Log.success(environment.express.message));
