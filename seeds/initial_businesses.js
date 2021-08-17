
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {id: 1, name: `Enron`},
        {id: 2, name: `Microbidness`},
        {id: 3, name: 'Enron-Micro'}
      ]);
    });
};