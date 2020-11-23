const roomFuncs = require('../databaseFunction/roomFunctions');

var express = require('express');
//const { deleteHostRoom, addHostRoom, getHost, updateRoomStatus } = require('../databaseFunction/roomFunctions');
var router = express.Router();

router.get('/checkRoomcode', async (req, res, next) => {
    try {
        if(await roomFuncs.checkRoomcode(req.query.room_id)) {
            res.status(200).send({});
        }
        else {
            res.status(404).send('RoomCode is undefined');
        }
        
    } catch(error) {
        return next(error);
    }   
});

router.get('/fetchHostRooms', async (req, res, next) => {
    try {
        let hostRooms = await roomFuncs.fetchHostRooms(req.query.host_id);
        if(typeof hostRooms !== 'string') {
            res.status(200).send(hostRooms);
        }
        else if(hostRooms) {
            res.status(505).send(hostRooms);
        }
        else {
            res.status(500).send("Failed to fetch host rooms!");
        }
    } catch (error) {
        return next(error);
    }
});

router.put('/setRoomOrder', async (req, res, next) => {
    try {
        let order = await roomFuncs.setRoomOrder(req.body.host_id, req.body.new_order);
        if(order) {
            res.status(200).send(order);
        }
        else {
            res.status(500).send("Failed to set room order");
        }
    } catch(error) {
        return next(error);
    }
});

router.delete('/deleteHostRoom', async (req, res, next) => {
    try {
        let rooms = await roomFuncs.deleteHostRoom(req.body.host_id, req.body.room_id);
        if(rooms) {
            res.status(200).json(rooms);
        }
        else {
            res.status(500).send(`Failed to delete room ${req.body.room_id}`);
        }
    } catch(error) {
        return next(error);
    }
});

router.post('/addHostRoom', async (req, res, next) => {
    try {
        let hostRoom = await roomFuncs.addHostRoom(req.body.host_id, req.body.user);
        if(hostRoom) {
            res.status(200).send(hostRoom);
        }
        else {
            res.status(500).send("Failed to add Room!");
        }
    } catch(error) {
        return next(error);
    }
});

router.put('/updateRoom', async (req, res, next) => {
    try {
        // console.log(req.body)
        let status = await roomFuncs.updateRoom(req.body.host_id, req.body.room_id, req.body.room_state, req.body.user);
        // console.log(status)
        if(typeof status !== 'string') {
            res.status(200).send(status);
        }
        else if(status) {
            res.status(505).send(status);
        }
        else {
            res.status(500).send("Failed to update Room!");
        }
    } catch (error) {
        return next(error);
    }
});

router.put('/setPollOrder', async (req, res, next) => {
    try {
        let order = await roomFuncs.setPollOrder(req.body.host_id, req.body.room_id, req.body.new_order, req.body.user);
        if(typeof order !== 'string') {
            res.status(200).send(order);
        }
        else if(order) {
            res.status(505).send(order);
        }
        else {
            res.status(500).send("Failed to set poll order!");
        }
    } catch (error) {
        return next(error);
    }
});

router.get('/getHost', async (req, res, next) => {
    try {
        let host = await roomFuncs.getHost(req.query.room_id);
        if(host) {
            res.status(200).send(host)
        }
        else {
            res.status(500).send("Failed to get host");
        }
    } catch(error) {
        return next(error);
    }
});

router.put('/updateRoomStatus', async (req, res, next) => {
    try {
        let status = await roomFuncs.updateRoomStatus(req.body.host_id, req.body.room_id, req.body.new_status, req.body.user);
        if(typeof status !== 'string') {
            res.status(200).send(status);
        }
        else if(status) {
            res.status(505).send(status);
        }
        else {
            res.status(500).send("Failed to update room status");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/getRoomResults', async (req, res, next) => {
    try {
        let results = await roomFuncs.getRoomResults(req.query.host_id, req.query.room_id);
        if(results) {
            res.status(200).send(results);
        }
        else {
            res.status(500).send("Failed to get room results");
        }
    } catch(error) {
        return next(error);
    }
});

router.get('/fetchRoomData', async (req, res, next) => {
    try {
        let data = await roomFuncs.fetchRoomData(req.query.host_id, req.query.room_id);
        if(data) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send("Failed to fetch room data");
        }
    } catch (error) {
        return next(error);
    }
});

module.exports = router;