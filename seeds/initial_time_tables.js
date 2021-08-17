
var TimeStamp = require('../src/timeStamp.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('time_tables').del()
    .then(function () {
      // Inserts seed entries
      return knex('time_tables').insert([
        {employee_id: 1, punch_in_time: '17AUG21 12:42'},
        {employee_id: 2, punch_in_time: '17AUG21 12:43', punch_out_time: '17AUG21 16:42'},
        {employee_id: 3, punch_in_time: '17AUG21 12:13'}
      ]);
    });
};
