const express = require('express');
const User = require('mongoose').model('User');
const Worker = require('mongoose').model('Worker');
const Appointment = require('mongoose').model('Appointment');

const router = new express.Router();

//======== post methods
router.post('/worker', (req, res, next) => {
    const data = req.body;
    const newWorker = new Worker(data);
    newWorker.save((err) => {
        if (err) {
        }
        return res.json({
            success: true,
            message: 'saved',
        });
    });
});

router.post('/appointment', (req, res, next) => {
    const data = req.body;
    const newAppointment = new Appointment(data);
    newAppointment.save((err) => {
        if (err) {
        }
        return res.json({
            success: true,
            message: 'saved',
        });
    });
});

// ============== get methods

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});

router.get('/worker', (req, res) => {
    const item = req.body;
    return Worker.find(item ? item : {}, (err, result) => {
        if (err) {
        }

        res.send(result);

    });


});

router.get('/appointments/:id', (req, res) => {
    const id = req.params.id;
    return Appointment.find({userId:id}, (err, result) => {
        if (err) {
        }

        res.send(result);

    });


});

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    return User.find({_id:id}, (err, result) => {
        if (err) {
        }

        res.send(result);

    });


});

//=========== put methods
router.put('/user', (req, res) => {
    let item = req.body;
    console.log(item)
    return User.update(item, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.put('/worker', (req, res) => {
    let item = req.body;
    console.log(item)
    return Worker.update(item, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.put('/appointment', (req, res) => {
    let item = req.body;
    return Appointment.update(item, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//============ delete methods
router.delete('/user', (req, res) => {
    const item = req.body;
    return User.remove(item, (err, result) => {
        if (err) {
        }
        res.send(result);

    });


});

router.delete('/worker', (req, res) => {
    const item = req.body;
    return Worker.remove(item, (err, result) => {
        if (err) {
        }
        res.send(result);

    });


});

router.delete('/appointment', (req, res) => {
    const item = req.body;
    return Appointment.remove(item, (err, result) => {
        if (err) {
        }
        res.send(result);

    });


});
//////////////



module.exports = router;
