const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/carsRoute.js');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

mongoose
.connect('mongodb+srv://suffix2332:furiouss@test-pro-db.riy9rqa.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db')
.then(() => console.log('mongo db connected'))
.catch((err) => console.log(err))

app.use('/api', routes)

app.listen(PORT, () => console.log(`Listening at ${PORT}`))