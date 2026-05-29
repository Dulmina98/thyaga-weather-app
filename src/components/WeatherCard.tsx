import type { WeatherItem } from '../types/weather';

interface Props {
  data: WeatherItem;
}

const WeatherCard = ({ data }: Props) => {
  const icon = data.weather[0]?.icon;
  const description = data.weather[0]?.description ?? '';
  const capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  const lastUpdated = new Date(data.dt * 1000).toLocaleString();

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform duration-200">
      {/* Top row: city/country + coordinates */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-tight">{data.name}</h2>
          <span className="text-sm text-gray-400">{data.sys.country}</span>
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">
          <p>Lat: {data.coord.lat}</p>
          <p>Lon: {data.coord.lon}</p>
        </div>
      </div>

      {/* Icon + temperature */}
      <div className="flex items-center mt-2">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16 -ml-2"
          />
        )}
        <span className="text-5xl font-bold ml-1">
          {Math.round(data.main.temp)}°C
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mt-1">{capitalizedDescription}</p>

      {/* Stats row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-gray-400">
        <span>↓ {Math.round(data.main.temp_min)}°C</span>
        <span>↑ {Math.round(data.main.temp_max)}°C</span>
        <span>💧 {data.main.humidity}%</span>
        <span>💨 {data.wind.speed} m/s</span>
        <span>🌡 {data.main.pressure} hPa</span>
      </div>

      {/* Last updated */}
      <p className="text-xs text-gray-500 mt-3">Updated: {lastUpdated}</p>
    </div>
  );
};

export default WeatherCard;
