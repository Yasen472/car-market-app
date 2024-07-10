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
    engineCapacity: String, //I am not sure how would it be possible to type down on third degree for example
    euroStatus: String,
    doorsCount: String,
    contact: Number, //phone number
    description: String,
    ownerId: String,
    images: [String]
})

module.exports = mongoose.model('Car', carSchema);