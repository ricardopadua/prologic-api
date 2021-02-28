import config  from 'config';

module.exports = {
   "type": config.get('typeOrmConfig.type'),
   "host": config.get('typeOrmConfig.host'),
   "port": config.get('typeOrmConfig.port'),
   "username": config.get('typeOrmConfig.username'),
   "password": config.get('typeOrmConfig.password'),
   "database": config.get('typeOrmConfig.database'),
   "synchronize": config.get('typeOrmConfig.synchronize'),
   "logging": config.get('typeOrmConfig.logging'),
   "entities": [
      "src/domain/entities/**/*.ts"
   ],
   "migrations": [
      "src/infra/migrations/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/domain/entities",
      "migrationsDir": "src/infra/migrations",
      "subscribersDir": "src/subscriber"
   }
}