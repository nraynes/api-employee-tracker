const port = 3001
const express = require('express');
const bodyParser = require('body-parser');
const { response, json } = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

function postUser( id, firstName, lastName, password) {
    
}

function getUsersByBusinessName(businessName) {
    return (
        knex
            .select('*').from('users')
            .whereIn('business_id', function() {
                this.select('id').from('businesses')
                .where('name', businessName)
            })
            .then( (data) => {
                return data;
            })
    );
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/byBusinessName', function (req, res) {
    let businessName = req.body.businessName;

    if (!businessName) {
        res.status(400)
            .send(`No Business Name provided`);
    } else {
       return getUsersByBusinessName(businessName)
            .then( (data) => {
                res.status(200).send(json(data));
            })
    }
});

app.get('/login', function (req, res) {
    let userID = parseInt(req.body.userId);
    let password = req.body.password;

    if (!userID || typeof userID !== 'number' ||
        !password || typeof password !== 'string') {
        res.status(400).send(`No data or incorrect data received`);
    } else {
        knex
            .select('*')
            .from('users')
            .where('id', userID)
            .then((data) => {
                if (data.length <= 0) {
                    res.status(400).send(`No User with that ID exists`)
                } else {
                    if (password === data[0].auth_hash) {
                        res.status(200).send('Login Successful');
                    } else {
                        res.status(400).send(`Password is Incorrect`);
                    }
                }
            })
    }
});

app.post('/sign-up', function (req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;

    if (first_name && typeof first_name === 'string' &&
        last_name && typeof last_name === 'string' &&
        password && typeof password === 'string'
    ) {
        return knex('users').insert([{
            first_name: first_name,
            last_name: last_name,
            auth_hash: password,
            is_clocked_in: false,
            pay_rate: `1.00`,
            is_manager: false,
            business_id: 1
        }
        ])
            .then(() => {
                res.status(200)
                    .send('Post Completed');
            })
    } else {
        res.status(400).send('Incorrect data');
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/ ...`)
});