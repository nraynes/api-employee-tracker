const port = 3000
const express = require('express');
const bodyParser = require('body-parser');
const { response, json } = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const URF = require('./src/userRelatedFunctions');
const TTRF = require('./src/timeTableFunctions');
var TimeStamp = require('./src/timeStamp.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));
app.use(express.json());

function validateCredentials(req, res, userID, password) {
    return (
        knex.raw(`SELECT auth_hash FROM users WHERE id = ${userID}`)
            .then( (data) => {
                console.log(data);

                res.status(200).send(`okay`);
            })
    )
}

app.get('/lastEmployee', (req, res) => {
    let input = req.params.id
    knex.raw('SELECT * FROM Users ORDER BY "employee_id" DESC LIMIT 1')
        .then((data) => {
            res.send(data)
        })
        .catch((e) => {
            console.log('ERROR: ', e)
        })
})

app.get('/login', function (req, res) {
    console.log(req.body);
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

app.get('/time-card', function (req, res) {
    let id = req.body.employee_id;

    TTRF.getTimeCardByEmployeeID(req, res, id);
});

app.post('/time-card', function (req, res) {
    let employeeID = parseInt(req.body.employee_id);
    let punchInData = req.body.punch_in_time;
    let punchOutData = req.body.punch_out_time;
    let punchInTimeStamp = null;
    let punchOutTimeStamp = null;

    let problems = [];

    if (punchInData && punchInData.day && punchInData.month && punchInData.year && punchInData.hours && punchInData.minutes) {
        punchInTimeStamp = new TimeStamp(punchInData.day, punchInData.month, punchInData.year, punchInData.hours, punchInData.minutes);
    } else {
        punchInTimeStamp = new TimeStamp();
        problems.push(`No Data or incorrect data was provided for punch-in-time. Using blank values...`)
    }

    if (punchOutData && punchOutData.day && punchOutData.month && punchOutData.year && punchOutData.hours && punchOutData.minutes) {
        punchOutTimeStamp = new TimeStamp(punchOutData.day, punchOutData.month, punchOutData.year, punchOutData.hours, punchOutData.minutes);
    } else {
        punchOutTimeStamp = new TimeStamp();
        problems.push(`No Data or incorrect data was provided for punch-out-time. Using blank values...`)
    }

    if (!employeeID || typeof employeeID !== 'number') {
        res.status(400).send(`Invalid data received for post request`);
    } else {
        TTRF.addTimeCard(req, res, employeeID, punchInTimeStamp, punchOutTimeStamp);
    }
});

app.patch('/time-card', function( req, res) {
    let id = parseInt(req.body.time_card_id);
    let punchIn = req.body.punch_in_time;

    TTRF.updateTimeCardPunchInByTimeCardID(req, res, id, punchIn);
});

app.get('/time-card/employee/:employeeId', function (req, res) {
    let id = parseInt(req.params.employeeId);

    TTRF.getTimeCardsByEmployeeID(req, res, id);
});

app.get('/time-card/time-card-id/:timeCardID', function (req, res) {
    console.log(req.params);
    let id = parseInt(req.params.timeCardID);

    TTRF.getTimeCardByTimecCardID(req, res, id);
});

app.post('/sign-up', function (req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;

    if (first_name && typeof first_name === 'string' &&
        last_name && typeof last_name === 'string' &&
        password && typeof password === 'string'
    ) {
        URF.addUser(req, res, first_name, last_name, password, '1.00', false, 1, false);
        //addUser(req, res, first_name, last_name, password, '1.00', false, 1, false);
    } else {
        res.status(400).send('Incorrect data');
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/ ...`)
});