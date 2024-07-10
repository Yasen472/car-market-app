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
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));

mongoose
  .connect('mongodb+srv://suffix2332:furiouss@test-pro-db.riy9rqa.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api', routes);
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));




