module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || `postgres://${process.env['USER']}@127.0.0.1:5432/chain`,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations',
    },
    searchPath: 'public',
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || `postgres://${process.env['USER']}@127.0.0.1:5432/tabedrone`,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations',
    },
    searchPath: 'public',
    seeds: {
      directory: __dirname + '/seeds',
    },
  },
};
