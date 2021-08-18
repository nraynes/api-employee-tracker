const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

const app = express();
const PORT = process.env.PORT || 3001;
const URF = require('./src/userRelatedFunctions');
const TTRF = require('./src/timeTableFunctions');
var TimeStamp = require('./src/timeStamp.js');
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));

app.use(express.json());
app.use(cors());

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

app.get('/employee/id/:employeeId', function (req, res) {
    let employeeID = parseInt(req.params.employeeId);

    if (!employeeID || typeof employeeID !== 'number') {
        res.status(400).send(`Did not receive proper data for this request`);
    } else {
        URF.getUserById(res, employeeID);
    }
});

app.post('/login', function (req, res) {
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
                    res.status(404).send(`No User with that ID exists`)
                } else {
                    if (password === data[0].auth_hash) {
                        res.status(200).json('Login Successful');
                    } else {
                        res.status(403).send(`Password is Incorrect`);
                    }
                }
            })
    }
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
        TTRF.addTimeCard(res, employeeID, punchInTimeStamp, punchOutTimeStamp);
    }
});

app.patch('/time-card', function (req, res) {
    let timeCardId = parseInt(req.body.time_card_id);
    let employeeId = parseInt(req.body.employee_id);
    let punchInData = req.body.punch_in_time;
    let punchOutData = req.body.punch_out_time;

    if (timeCardId && typeof timeCardId === 'number' &&
        employeeId && typeof employeeId === 'number' &&
        punchInData.day && punchInData.month && punchInData.year && punchInData.hours && punchInData.minutes &&
        punchOutData.day && punchOutData.month && punchOutData.year && punchOutData.hours && punchOutData.minutes) {

        let punchIn = new TimeStamp(punchInData.day, punchInData.month, punchInData.year, punchInData.hours, punchInData.minutes);
        let punchOut = new TimeStamp(punchOutData.day, punchOutData.month, punchOutData.year, punchOutData.hours, punchOutData.minutes);
        TTRF.updateTimeCard(res, timeCardId, employeeId, punchIn, punchOut);

    } else {
        res.status(400).send(`Did not receive a timecard id or employee id`)
    }
});

app.get('/time-card/employee/:employeeId', function (req, res) {
    let id = parseInt(req.params.employeeId);

    TTRF.getTimeCardsByEmployeeID(res, id);
});

app.get('/time-card/time-card-id/:timeCardID', function (req, res) {
    console.log(req.params);
    let id = parseInt(req.params.timeCardID);

    TTRF.getTimeCardByTimecCardID(res, id);
});

app.post('/sign-up', function (req, res) {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let password = req.body.password;
    
    if (firstName && typeof firstName === 'string' &&
        lastName && typeof lastName === 'string' &&
        password && typeof password === 'string'
    ) {
        URF.addUser(res, firstName, lastName, password, '1.00', false, 1, false);
    } else {
        res.status(400).send('Incorrect data');
    }
});

app.delete('/time-card/:timeCardId', function (req, res) {
    let id = parseInt(req.params.timeCardId);

    TTRF.removeTimeCardByTimeCardID(res, id);
});

app.delete('/employees/:employeeId', function (req, res) {
    let id = parseInt(req.params.employeeId);

    URF.removeUserByEmployeeID(res, id);
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/ ...`)
});