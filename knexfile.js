exports.development = {
  client: 'postgresql',
  connection: {
    user: 'Alex',
    database: 'fitnessbot'
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  }
}
