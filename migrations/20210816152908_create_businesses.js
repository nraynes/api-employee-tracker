
exports.up = function(knex) {
    return knex.schema.createTable('businesses', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('name').notNullable();
      table.timestamps(true, true); // adds created_at and updated_at
    });
  };

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('businesses');
};
