
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {name: `Enron`},
        {name: `Microbidness`},
        {name: 'Enron-Micro'}
      ]);
    });
};