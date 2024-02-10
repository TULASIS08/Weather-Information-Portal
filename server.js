const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://root:root@cluster0.vbzgcan.mongodb.net/
`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema and Model (e.g., Weather)
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
});

const Weather = mongoose.model('Weather', weatherSchema);

// CRUD operations
app.get('/weather', async (req, res) => {
  const weatherData = await Weather.find();
  res.json(weatherData);
});

app.post('/weather', async (req, res) => {
  const newWeather = new Weather(req.body);
  await newWeather.save();
  res.json(newWeather);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
