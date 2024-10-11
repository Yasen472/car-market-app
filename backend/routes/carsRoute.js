const { Router } = require('express');

const {getCars, saveCar, updateCar, deleteCar, getModels, getById} = require('../controllers/CarControllers.js')

const router = Router();

router.get('/get', getCars);
router.get('/get/models', getModels);
router.get('/get/:id', getById);
router.post('/save', saveCar);
router.put('/update/:id', updateCar);
router.delete('/delete/:id', deleteCar);


module.exports = router;