import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { WeatherItem } from '../types/weather';
import citiesData from '../data/cities.json';

const DEFAULT_CITY_IDS = citiesData.List.map((city) => city.CityCode);
const STORAGE_KEY = 'weather_city_ids';

const getStoredIds = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as string[];
  } catch {
    // ignore
  }
  return DEFAULT_CITY_IDS;
};

const saveIds = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

const buildUrl = (path: string) =>
  import.meta.env.DEV
    ? `/weather-api${path}`
    : `https://api.openweathermap.org${path}`;

const useWeather = (unit: 'metric' | 'imperial' = 'metric') => {
  const [cityIds, setCityIds] = useState<string[]>(getStoredIds);
  const [weatherData, setWeatherData] = useState<WeatherItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = useCallback(
    async (ids: string[]) => {
      if (ids.length === 0) {
        setWeatherData([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const requests = ids.map((id) =>
          axios.get<WeatherItem>(buildUrl('/data/2.5/weather'), {
            params: {
              id,
              units: unit,
              appid: import.meta.env.VITE_WEATHER_API_KEY,
            },
          })
        );

        const responses = await Promise.all(requests);
        setWeatherData(responses.map((res) => res.data));
        setLastUpdated(new Date());
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
    },
    [unit]
  );

  // Fetch on mount and whenever cityIds or unit changes
  useEffect(() => {
    fetchWeather(cityIds);
  }, [cityIds, fetchWeather]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather(cityIds);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cityIds, fetchWeather]);

  const refresh = useCallback(() => {
    fetchWeather(cityIds);
  }, [cityIds, fetchWeather]);

  /** Add a city by name. Returns true on success. */
  const addCity = useCallback(
    async (cityName: string): Promise<boolean> => {
      setAddError(null);
      try {
        const res = await axios.get<WeatherItem>(buildUrl('/data/2.5/weather'), {
          params: {
            q: cityName.trim(),
            units: unit,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
          },
        });
        const newId = String(res.data.id);
        if (cityIds.includes(newId)) {
          setAddError(`${res.data.name} is already in your list.`);
          return false;
        }
        const updatedIds = [...cityIds, newId];
        setCityIds(updatedIds);
        saveIds(updatedIds);
        setWeatherData((prev) => [...prev, res.data]);
        setLastUpdated(new Date());
        return true;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setAddError(`City "${cityName}" not found. Try another name.`);
        } else {
          setAddError('Failed to add city. Please try again.');
        }
        return false;
      }
    },
    [cityIds, unit]
  );

  /** Remove a city by its OpenWeatherMap ID */
  const removeCity = useCallback(
    (cityId: number) => {
      const idStr = String(cityId);
      const updatedIds = cityIds.filter((id) => id !== idStr);
      setCityIds(updatedIds);
      saveIds(updatedIds);
      setWeatherData((prev) => prev.filter((item) => item.id !== cityId));
    },
    [cityIds]
  );

  return {
    weatherData,
    loading,
    error,
    addError,
    lastUpdated,
    addCity,
    removeCity,
    refresh,
  };
};

export default useWeather;
