const CarModel = require('../models/carModel.js');
const Model = require('../models/Model.js');

module.exports.getCars = async (req, res) => {
    const cars = await CarModel.find()
    res.send(cars)
}

module.exports.getById = async(req, res) => {
    const { id }  = req.params;

    try {
        const car = await CarModel.findById(id);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }
        res.send(car);
    } catch (error) {
        console.error('Error fetching car by ID:', error);
        res.status(500).send({ error: 'Server error' });
    }
}

module.exports.saveCar = (req, res) => {

    const car = req.body;

    CarModel.create(car)
        .then((data) => {
            console.log('Saved successfully...');
            res.status(201).send(data)
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' })
        })

}

module.exports.updateCar = (req, res) => {
    const { id } = req.params;

    const car = req.body;

    CarModel.findByIdAndUpdate(id, car )
        .then(() => {
            console.log('Updated')
            res.send("Updated successfully")
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' })
        })

}

module.exports.deleteCar = (req, res) => {
    const { id } = req.params;

    CarModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted successfully"))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' })
        })

}

module.exports.getModels = async (req, res) => {
    try {
        const models = await Model.find();
        res.send(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send({ error: 'Server error' });
    }
}