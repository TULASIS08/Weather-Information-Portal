import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/weather')
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  const handleAddWeather = () => {
    axios.post('http://localhost:5000/weather', { city, temperature, description })
      .then(response => {
        setWeatherData([...weatherData, response.data]);
        setCity('');
        setTemperature('');
        setDescription('');
      })
      .catch(error => console.error('Error adding weather data:', error));
  };

  return (
    <div>
      <h1>Weather Forecasting</h1>
      <div>
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="Temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleAddWeather}>Add Weather</button>
      </div>
      <div>
        <h2>Weather Data</h2>
        <ul>
          {weatherData.map((weather, index) => (
            <li key={index}>{`${weather.city}: ${weather.temperature}°C, ${weather.description}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
