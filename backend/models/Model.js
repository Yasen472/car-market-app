const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    model: String,
    make: String
})

module.exports = mongoose.model('Model', modelSchema);