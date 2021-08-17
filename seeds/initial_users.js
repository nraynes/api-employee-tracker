
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: `Billy-Bob`, last_name: `Thorton`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '4.50', is_manager: true, business_id: 1},
        {first_name: `Chuck`, last_name: `Norris`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '22.50', is_manager: false, business_id: 1},
        {first_name: `Dick`, last_name: `Cheney`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '0.50', is_manager: false, business_id: 1},
        {first_name: `Tom`, last_name: `Brady`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '2.50', is_manager: true, business_id: 2},
        {first_name: `Jack`, last_name: `Bauer`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '2.10', is_manager: false, business_id: 2},
        {first_name: `George`, last_name: `Bush`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '3.50', is_manager: false, business_id: 2},
        {first_name: `John`, last_name: `Matrix`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '2.60', is_manager: true, business_id: 3},
        {first_name: `Neo`, last_name: `The-One`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '2.70', is_manager: false, business_id: 3},
        {first_name: `Frank`, last_name: `Castle`, auth_hash: 'secret', is_clocked_in: false, pay_rate: '0.70', is_manager: false, business_id: 3}
      ]);
    });
};
