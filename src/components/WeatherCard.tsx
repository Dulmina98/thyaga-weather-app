import { Droplets, Wind, Thermometer, ArrowDown, ArrowUp, MapPin } from 'lucide-react';
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
    <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Top row: city/country + coordinates */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-5 h-5 text-indigo-300" />
              <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">{data.name}</h2>
            </div>
            <span className="text-sm font-medium text-indigo-200/80 ml-6 uppercase tracking-wider">{data.sys.country}</span>
          </div>
          <div className="text-right text-xs text-indigo-200/60 mt-1.5 space-y-0.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
            <p>Lat: {data.coord.lat.toFixed(2)}</p>
            <p>Lon: {data.coord.lon.toFixed(2)}</p>
          </div>
        </div>

        {/* Icon + temperature */}
        <div className="flex items-center mt-6 mb-2">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-24 h-24 -ml-4 drop-shadow-lg"
            />
          )}
          <div className="flex flex-col">
            <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">
              {Math.round(data.main.temp)}°
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-indigo-100/90 text-lg font-medium capitalize mb-6">{capitalizedDescription}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          {/* Min/Max Temp */}
          <div className="glass-panel rounded-2xl p-3 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <ArrowDown className="w-4 h-4 text-blue-300 mb-1" />
              <span className="text-sm font-semibold text-white">{Math.round(data.main.temp_min)}°</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <ArrowUp className="w-4 h-4 text-red-300 mb-1" />
              <span className="text-sm font-semibold text-white">{Math.round(data.main.temp_max)}°</span>
            </div>
          </div>

          {/* Other stats */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-xs text-indigo-100">Humidity</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.main.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs text-indigo-100">Wind</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between text-xs text-indigo-200/50 pt-4 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5" />
          <span>{data.main.pressure} hPa</span>
        </div>
        <span>Updated: {lastUpdated}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
