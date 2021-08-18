
exports.up = function(knex) {
    return knex.schema.createTable('time_tables', table => {
      table.increments('sign_in_id').notNullable();
      table.integer('employee_id');
      table.string('punch_in_time');
      table.string('punch_out_time');
      table.timestamps(true, true);
    });
  };

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('time_tables');
};
