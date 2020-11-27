const pollFuncs = require('../databaseFunction/pollFunctions');

var express = require('express');
var router = express.Router();

router.get('/fetchPollData', async function(req, res, next) {
    try {
        let data = await pollFuncs.fetchPollData(req.query.host_id, req.query.room_id, req.query.poll_id);
        if(typeof data !== 'string') {
            res.status(200).send(data);
        }
        else if(data) {
            res.status(505).send(data);
        }
        else {
            res.status(500).send("Failed to fetch poll data");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/closePoll', async function(req, res, next) {
    try {
        let data = await pollFuncs.closePoll(req.query.host_id, req.query.room_id, req.query.poll_id);

        if(data) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send("Failed to fetch poll data");
        }
    } catch(error) {
        return next(error);
    }
});

router.put('/updatePoll', async function(req, res, next) {
    try {
        let new_poll = await pollFuncs.updatePoll(req.body.host_id, req.body.room_id, req.body.poll_id, req.body.poll_state, req.body.user);
        if(typeof new_poll !== 'string') {
            res.status(200).send(new_poll);
        }
        else if(new_poll) {
            res.status(505).send(new_poll);
        }
        else {
            res.status(500).send("Failed to update poll");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/fetchAgenda', async function(req, res, next) {
    try {
        let agenda = await pollFuncs.fetchAgenda(req.query.host_id, req.query.room_id);
        if(typeof agenda !== 'string') {
            res.status(200).send(agenda);
        }
        else if(agenda) {
            res.status(505).send(agenda);
        }
        else {
            res.status(500).send("Failed to fetch agenda");
        }
    } catch(error) {
        return next(error);
    }
});

router.post('/addPoll', async function(req, res, next) {
    try {
        let new_poll = await pollFuncs.addPoll(req.body.host_id, req.body.room_id, req.body.user);
        if(typeof new_poll !== 'string') {
            res.status(200).send(new_poll);
        }
        else if(new_poll) {
            res.status(505).send(new_poll);
        }
        else {
            res.status(500).send("Failed to add poll");
        }
    } catch(error) {
        return next(error);
    }
});

router.put('/updatePollStatus', async (req, res, next) => {
    try {
        let status = await pollFuncs.updatePollStatus(req.body.host_id, req.body.room_id, req.body.poll_id, req.body.new_status, req.body.user);
        if(typeof status !== 'string') {
            res.status(200).send(status);
        }
        else if(status) {
            res.status(505).send(status);
        }
        else {
            res.status(500).send("Failed to update poll status");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/getPollResults', async (req, res, next) => {
    try {
        let results = await pollFuncs.getPollResults(req.query.user_id, req.query.room_id, req.query.poll_id, req.query.host_id);
        if(results) {
            res.status(200).send(results);
        }
        else {
            res.status(500).send("Failed to get poll results");
        }
    } catch(error) {
        return next(error);
    }
});

router.put('/submitVote', async (req, res, next) => {
    try {
        let vote = await pollFuncs.submitVote(req.body.user_id, req.body.room_id, req.body.poll_id, req.body.selection, req.body.submission, req.body.userInput);
        if(typeof vote !== 'string') {
            res.status(200).send(vote);
        }
        else if(vote) {
            res.status(505).send(vote);
        }
        else {
            res.status(500).send("Failed to submit vote");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/getPollOrder', async (req, res, next) => {
    try {
        let order = await pollFuncs.getPollOrder(req.query.host_id, req.query.room_id);
        if(order) {
            res.status(200).send(order);
        }
        else {
            res.status(500).send("Failed to get poll order");
        }
    } catch(error) {
        return next(error);
    }
});

router.delete('/deletePoll', async (req, res, next) => {
    try {
        res.status(200).send(await pollFuncs.deletePoll(req.body.host_id, req.body.room_id, req.body.poll_id));
    } catch(error) {
        return next(error);
    }
});

module.exports = router;