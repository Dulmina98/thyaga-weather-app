import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';

function App() {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-red-400 text-lg text-center px-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white py-8">
          🌤 Weather Dashboard
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Live data from OpenWeatherMap
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-6 pb-12">
        {weatherData.map((item) => (
          <WeatherCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
