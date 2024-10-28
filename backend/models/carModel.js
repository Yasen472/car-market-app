const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String, 
    model: String,
    color: String, 
    power: Number, 
    year: Number,
    transmission: String, 
    price: Number, 
    location: String, 
    coupe: String, 
    from: String, 
    fuelType: String, 
    kilometres: Number,
    engineCapacity: String, 
    euroStatus: String,
    doorsCount: String, 
    contact: String,
    description: String,
    ownerId: String,
    images: [String],
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

module.exports = mongoose.model('Car', carSchema);
