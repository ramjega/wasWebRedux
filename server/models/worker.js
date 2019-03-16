const mongoose = require('mongoose');

let WorkerSchema = new mongoose.Schema({
    userId: String,
    createdTime: Number,
    modifiedTime: Number,
    status: String,  // initial, active , suspended
    rating: Number,
    job: String,
    experience: String,
    paymentInfo: String,
    notes: String

});

module.exports = mongoose.model('Worker', WorkerSchema);
