const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

function getUsersByBusinessName(req, res, businessName) {
    return (
        knex
            .select('*').from('users')
            .whereIn('business_id', function () {
                this.select('id').from('businesses')
                    .where('name', `${businessName}`)
            })
            .then((data) => {
                if (data.length <= 0) {
                    res.status(204)
                        .send(`No users found with that business name`)
                } else {
                    res.status(200).json(data);
                }
            })
    );
}

function getUserById(req, res, id) {
    return (
        knex.raw(`SELECT * FROM users WHERE id = ${id}`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204)
                        .send(`No User with that ID exists`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function getUsersByFirstName(req, res, firstName) {
    return (
        knex.raw(`SELECT * FROM users WHERE first_name = '${firstName}'`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204)
                        .send(`No User with that name exists`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function getUsersByFullName(req, res, firstName, lastName) {
    return (
        knex.raw(`SELECT * FROM users WHERE first_name = '${firstName}' AND last_name = '${lastName}'`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204)
                        .send(`No User with that name exists`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function getUsersByLastName(req, res, lastName) {
    return (
        knex.raw(`SELECT * FROM users WHERE last_name = '${lastName}'`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204)
                        .send(`No User with that name exists`);
                } else {
                    res.status(200).json(data.rows);
                }

            })
    );
}

function getUsersByClockInStatus(req, res, status) {
    return (
        knex.raw(`SELECT * FROM users WHERE is_clocked_in = ${status}`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204).send(`No users found with that clock-in status`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function getUsersByPayRate(req, res, payRate) {
    return (
        knex.raw(`SELECT * FROM users WHERE pay_rate = '${payRate}'`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204).send(`No user with that pay rate was found`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    )
}

function getUsersByManagerStatus(req, res, status) {
    return (
        knex.raw(`SELECT * FROM users WHERE is_manager = ${status}`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204).send(`No users with that manager status could be found`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function getUsersByBusinessID(req, res, id) {
    return (
        knex.raw(`SELECT * FROM users WHERE business_id = ${id}`)
            .then((data) => {
                if (data.rows.length <= 0) {
                    res.status(204).send(`No users found with that business id`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

function updateUserIDByID(req, res, queryID, newID) {
    return (
        knex.raw(`UPDATE users SET id = ${newID} WHERE id = ${queryID}`)
            .then(() => {
                res.status(200).send(`User ID Updated`);
            })
    );
}

function addUser(req, res, firstName, lastName, password, payRate, isManager, businessID, isClockedIn = false) {
    return (
        knex.raw(`INSERT INTO users (first_name, last_name, auth_hash, is_clocked_in, pay_rate, is_manager, business_id)
                VALUES ('${firstName}', '${lastName}', '${password}', ${isClockedIn}, '${payRate}', ${isManager}, ${businessID})`)
            .then(() => {
                res.status(200).send(`User Added`);
            })
    );
}

module.exports = {getUsersByBusinessName, getUserById, getUsersByFirstName, getUsersByFullName, getUsersByLastName,
    getUsersByClockInStatus, getUsersByPayRate, getUsersByManagerStatus, getUsersByBusinessID, updateUserIDByID, addUser }

