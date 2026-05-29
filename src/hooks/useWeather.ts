import { useState, useEffect } from 'react';
import axios from 'axios';
import type { WeatherItem } from '../types/weather';
import citiesData from '../data/cities.json';

const cityIds = citiesData.List.map((city) => city.CityCode);

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const requests = cityIds.map((id) =>
          axios.get<WeatherItem>('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              id,
              units: 'metric',
              appid: import.meta.env.VITE_WEATHER_API_KEY,
            },
          })
        );

        const responses = await Promise.all(requests);
        setWeatherData(responses.map((res) => res.data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(
              `Failed to fetch weather data: ${err.response.status} ${err.response.statusText}`
            );
          } else if (err.request) {
            setError('Network error — please check your internet connection.');
          } else {
            setError(`Request error: ${err.message}`);
          }
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weatherData, loading, error };
};

export default useWeather;
