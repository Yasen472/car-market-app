const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    color: String,
    image: String, //here this can cause problems so I have to be careful when using it.
    year: Number,
    transmission: String,
    power: String,
    price: Number,
    location: String,
    publishedBy: String,
    coupe: String,
    fuelType: String,
    kilometres: Number,
    horsepower: Number,
    engineCapacity: String, //I am not sure how would it be possible to type down on third degree for example
    euroStatus: String, //here I am not sure
    doorsCount: Number,
    type: String, //here it is brand new, used
    contact: Number, //phone number
    extras: String, //I am not sure how they would be stored here because it might be an array instead of a string
    description: String
})

module.exports = mongoose.model('Car', carSchema);

// all mongoose variable types available:
// String: Used to store textual data.

// Number: Used to store numerical data (both integers and floating-point numbers).

// Date: Used to store dates.

// Boolean: Used to store true/false values.

// Buffer: Used to store binary data, such as images or files.

// Mixed: Used to store data of mixed types. It can hold arbitrary data structures.

// ObjectId: Used to store MongoDB ObjectId values, typically used for referencing other documents in MongoDB.

// Array: Used to store arrays of data. You can specify the type of elements in the array by nesting schema types (e.g., [String], [Number], etc.).

// Schema.Types.Embedded: Used to define embedded schemas within documents.