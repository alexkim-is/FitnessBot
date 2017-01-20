
exports.up = function(knex, Promise) {

  const query = knex.schema.createTable('users', table => {
    table.increments('id')
    table.varchar('name')
    table.smallint('age')
    table.varchar('mobile')
    table.time('schedule')
    table.varchar('status')
  })
  return query;
};

exports.down = function(knex, Promise) {

  const query = knex.schema.dropTable('users')
  return query
};
