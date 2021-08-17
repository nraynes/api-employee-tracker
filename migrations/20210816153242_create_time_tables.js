
exports.up = function(knex) {
    return knex.schema.createTable('time_tables', table => {
      table.increments('sign_in_id').notNullable();
      table.integer('employee_id');
      table.timestamps(true, true);
    });
  };

exports.down = function(knex) {
  
};
