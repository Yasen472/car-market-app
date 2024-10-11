const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/carsRoute.js');
const authRoutes = require('./routes/authRoute.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Car API!');
});

app.use('/api', routes);
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));




