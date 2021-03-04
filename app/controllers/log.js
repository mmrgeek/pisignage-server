'use strict;'

const rest = require('../others/restware');
const mongoose = require('mongoose');
const Log = mongoose.model('Log');

exports.index = function (req, res) {
    Log
        .find()
        .exec(function (err, data) {
            if (err) {
                console.log(err);
                return rest.sendError(res, 'Error while retreiving logs', err);
            }
            return rest.sendSuccess(res, 'Logs retreived succesfully', data)
        });
}

exports.getBetweenInterval = function (req, res) {
    const { id, from, to } = req.query;
    if (!id) {
        return rest.sendError(res, 'Please provide player id');
    }

    if (!from) {
        return rest.sendError(res, 'Please provide \"from\" date');
    }

    if (!to) {
        return rest.sendError(res, 'Please provide \"to\" date');
    }

    Log.getPlayerLogs(id, from, to, function (err, data) {
        if (err) {
            console.log(err);
            return rest.sendError(res, 'Error while retreiving player logs', err);
        }
        return rest.sendSuccess(res, 'Player logs retreived successfully', data)
    });
}

exports.getPlayerFrequency = function (req, res) {
    const { id, from, to } = req.query;
    Log.getPlayerLogs(id, from, to, function (err, data) {
        if (err) {
            console.log(err);
            return rest.sendError(res, 'Error while retreiving player logs', err);
        }
        let response = {};
        if (data.length === 0) {
            response.frequency = 0;
            return rest.sendSuccess(res, 'Player logs retreived successfully', response);
        } else {

            if (data[0].status == 'DOWN') {
                data.shift();
            }

            if (data.length < 2) {
                response.frequency = 0;
                return rest.sendSuccess(res, 'Player logs retreived successfully', response);
            }

            const intervalsStack = [];
            for (let index = 0; index < data.length; index++) {
                
            }
            return rest.sendSuccess(res, 'Player logs retreived successfully', response);
        }

    });
}