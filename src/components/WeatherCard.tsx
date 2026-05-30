import {
  Droplets,
  Wind,
  Thermometer,
  ArrowDown,
  ArrowUp,
  MapPin,
  Eye,
  Cloud,
  Sunrise,
  Sunset,
  Gauge,
  X,
  Navigation,
} from 'lucide-react';
import type { WeatherItem } from '../types/weather';

interface Props {
  data: WeatherItem;
  unit: 'metric' | 'imperial';
  onRemove: (id: number) => void;
}

/** Convert wind degrees to compass direction */
const degToCompass = (deg: number): string => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

const formatTime = (unix: number): string =>
  new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const WeatherCard = ({ data, unit, onRemove }: Props) => {
  const icon = data.weather[0]?.icon;
  const description = data.weather[0]?.description ?? '';
  const capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  const lastUpdated = new Date(data.dt * 1000).toLocaleString();
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityKm = data.visibility != null ? (data.visibility / 1000).toFixed(1) : null;

  return (
    <div className="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Remove button */}
      <button
        onClick={() => onRemove(data.id)}
        aria-label={`Remove ${data.name}`}
        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/40 flex items-center justify-center transition-colors duration-200 z-10 opacity-0 group-hover:opacity-100"
      >
        <X className="w-4 h-4 text-white/70" />
      </button>

      <div>
        {/* Top row: city/country + coordinates */}
        <div className="flex items-start justify-between pr-6">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-5 h-5 text-indigo-300 shrink-0" />
              <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">{data.name}</h2>
            </div>
            <span className="text-sm font-medium text-indigo-200/80 ml-6 uppercase tracking-wider">{data.sys.country}</span>
          </div>
          <div className="text-right text-xs text-indigo-200/60 mt-1.5 space-y-0.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/5 shrink-0">
            <p>Lat: {data.coord.lat.toFixed(2)}</p>
            <p>Lon: {data.coord.lon.toFixed(2)}</p>
          </div>
        </div>

        {/* Icon + temperature */}
        <div className="flex items-center mt-6 mb-1">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              className="w-24 h-24 -ml-4 drop-shadow-lg"
            />
          )}
          <div className="flex flex-col">
            <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">
              {Math.round(data.main.temp)}{tempUnit}
            </span>
            <span className="text-xs text-indigo-200/60 ml-1">
              Feels like {Math.round(data.main.feels_like)}{tempUnit}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-indigo-100/90 text-lg font-medium capitalize mb-4">{capitalizedDescription}</p>

        {/* Stats grid — 2×2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Min/Max */}
          <div className="glass-panel rounded-2xl p-3 flex items-center justify-around">
            <div className="flex flex-col items-center gap-0.5">
              <ArrowDown className="w-4 h-4 text-blue-300" />
              <span className="text-xs text-indigo-200/70">Min</span>
              <span className="text-sm font-semibold text-white">{Math.round(data.main.temp_min)}{tempUnit}</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-0.5">
              <ArrowUp className="w-4 h-4 text-red-300" />
              <span className="text-xs text-indigo-200/70">Max</span>
              <span className="text-sm font-semibold text-white">{Math.round(data.main.temp_max)}{tempUnit}</span>
            </div>
          </div>

          {/* Humidity + Pressure */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span className="text-xs text-indigo-100">Humidity</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.main.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-violet-300 shrink-0" />
                <span className="text-xs text-indigo-100">Pressure</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.main.pressure} hPa</span>
            </div>
          </div>

          {/* Wind */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span className="text-xs text-indigo-100">Wind</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.wind.speed} {speedUnit}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span className="text-xs text-indigo-100">Direction</span>
              </div>
              <span className="text-sm font-semibold text-white">{degToCompass(data.wind.deg)} ({data.wind.deg}°)</span>
            </div>
          </div>

          {/* Visibility + Clouds */}
          <div className="glass-panel rounded-2xl p-3 flex flex-col justify-center gap-2">
            {visibilityKm && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="text-xs text-indigo-100">Visibility</span>
                </div>
                <span className="text-sm font-semibold text-white">{visibilityKm} km</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span className="text-xs text-indigo-100">Clouds</span>
              </div>
              <span className="text-sm font-semibold text-white">{data.clouds.all}%</span>
            </div>
          </div>
        </div>

        {/* Sunrise / Sunset */}
        <div className="flex items-center justify-around mt-3 glass-panel rounded-2xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <p className="text-xs text-indigo-200/60">Sunrise</p>
              <p className="text-sm font-semibold text-white">{formatTime(data.sys.sunrise)}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <Sunset className="w-4 h-4 text-orange-400 shrink-0" />
            <div>
              <p className="text-xs text-indigo-200/60">Sunset</p>
              <p className="text-sm font-semibold text-white">{formatTime(data.sys.sunset)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-indigo-200/40 pt-3 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-3.5 h-3.5" />
          <span>ID: {data.id}</span>
        </div>
        <span>Updated: {lastUpdated}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
