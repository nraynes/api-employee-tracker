
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('auth_hash').notNullable();
      table.bool('is_clocked_in');
      table.string('pay_rate');
      table.bool('is_manager').notNullable();
      table.integer('business_id');
      table.timestamps(true, true); // adds created_at and updated_at
    });
  };

exports.down = function(knex) {
   // return knex.schema.dropTableIfExists('users');
};
