import environment from './config/'

module.exports = {
   type: environment.typeorm.type,
   host: environment.typeorm.host,
   port: environment.typeorm.port,
   username: environment.typeorm.username,
   password: environment.typeorm.password,
   database: environment.typeorm.database,
   synchronize: environment.typeorm.synchronize,
   logging: environment.typeorm.logging,
   entities: ["src/domain/entities/**/*.ts"],
   migrations: ["src/infra/migrations/**/*.ts"],
   subscribers: ["src/subscriber/**/*.ts"],
   cli: {
      entitiesDir: "src/domain/entities",
      migrationsDir: "src/infra/migrations",
      subscribersDir: "src/subscriber"
   }
}