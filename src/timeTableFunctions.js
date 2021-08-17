const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);
var TimeStamp = require('./timeStamp.js');
const TIME_TABLE_NAME = "time_tables";

function getTimeCardByTimecCardID(req, res, timeCardID) {
    if (!timeCardID || typeof timeCardID !== 'number') {
        res.status(400)
            .send(`Received incorrect data to perform requested function`);
    } else {
        return (
            knex.raw(`SELECT * FROM time_tables WHERE sign_in_id = ${timeCardID}`)
                .then((data) => {
                    if (data.rows.length <= 0) {
                        res.status(204).send(`No timecard found with that id`);
                    } else {
                        res.status(200).json(data.rows);
                    }
                })
        );
    }
}

function addTimeCard(req, res, employeeID, timeStampPunchInTime = null, timeStampPunchOutTime = null) {
    if (timeStampPunchInTime === null) {
        timeStampPunchInTime = new TimeStamp();
    }
    if (timeStampPunchOutTime === null) {
        timeStampPunchOutTime = new TimeStamp();
    }
    
    return (
        knex.raw(`INSERT INTO time_tables (employee_id, punch_in_time, punch_out_time) VALUES
            (${employeeID}, '${timeStampPunchInTime.getFormattedDateAndTime()}', '${timeStampPunchOutTime.getFormattedDateAndTime()}')`)
            .then( () => {
                res.status(200).send(`Time Card Added`);
            })
    );
}

function updateTimeCardPunchInByTimeCardID(req, res, id, newPunchInTime) {
    if (!id || typeof id !== 'number' || !newPunchInTime || typeof newPunchInTime !== 'string') {
        res.status(400).send(`Did not receive proper data to perform request`);
    } else {
        return (
            knex(TIME_TABLE_NAME)
                .where('sign_in_id', '=', id)
                .update({
                    punch_in_time: newPunchInTime
                })
                .then((rows) => {
                    if (!rows) {
                        res.status(404).send(`No timecard with that ID could be found`);
                    } else {
                        res.status(200).send(`Timecard with id of ${id} has been updated`);
                    }
                })
        );
    }
}

function getTimeCardsByEmployeeID(req, res, id) {
    console.log(id);
    if (!id || typeof id !== 'number') {
        res.status(400).send(`Did not receive proper data to perform request`);
    } else {
        return (
            knex.raw(`SELECT * FROM ${TIME_TABLE_NAME} WHERE employee_id = ${id}`)
                .then( (data) => {
                    if (data.rows.length <= 0) {
                        res.status(204).send(`No timecards available for that employee ID`);
                    } else {
                        res.status(200).json(data.rows);
                    }
                })
        );
    }
}

function getTimeCardByEmployeeID(req, res, empID) {
    return (
        knex.raw(`SELECT * FROM time_tables WHERE employee_id = ${empID}`)
            .then( (data) => {
                if (data.rows.length <= 0) {
                    res.status(204).send(`No timecard found with that employee ID`);
                } else {
                    res.status(200).json(data.rows);
                }
            })
    );
}

module.exports = {getTimeCardByTimecCardID, addTimeCard, updateTimeCardPunchInByTimeCardID, getTimeCardsByEmployeeID, getTimeCardByEmployeeID};