import { useState, useRef } from 'react';
import { CloudSun, Loader2, AlertCircle, Plus, RefreshCw, Thermometer, X } from 'lucide-react';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';

function App() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [cityInput, setCityInput] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { weatherData, loading, error, addError, lastUpdated, addCity, removeCity, refresh } =
    useWeather(unit);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setAddLoading(true);
    const success = await addCity(cityInput);
    if (success) setCityInput('');
    setAddLoading(false);
    inputRef.current?.focus();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const renderContent = () => {
    if (loading && weatherData.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-300 animate-spin" />
            <p className="text-indigo-100 font-medium tracking-wide animate-pulse">
              Fetching latest weather data...
            </p>
          </div>
        </div>
      );
    }

    if (error && weatherData.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="glass border-red-500/30 bg-red-950/20 p-8 rounded-3xl max-w-md w-full text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Oops! Something went wrong</h2>
            <p className="text-red-200/80">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-xl font-medium transition-colors border border-red-500/30"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <main className="max-w-[1600px] mx-auto px-6 pb-20">
        {error && (
          <div className="mb-6 glass border-yellow-500/30 bg-yellow-950/20 rounded-2xl px-5 py-3 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-200/80">{error}</p>
          </div>
        )}

        {weatherData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <CloudSun className="w-16 h-16 text-indigo-300/40 mb-4" />
            <p className="text-indigo-200/50 text-lg">No cities added yet. Add one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {weatherData.map((item) => (
              <WeatherCard key={item.id} data={item} unit={unit} onRemove={removeCity} />
            ))}
          </div>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 animate-gradient-xy flex flex-col font-sans">
      <header className="sticky top-0 z-50 glass border-b-white/10 rounded-none border-x-0 border-t-0 mb-8">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <CloudSun className="w-7 h-7 text-indigo-300" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 tracking-tight">
                WeatherSky
              </h1>
              <p className="text-xs font-medium text-indigo-300/70 tracking-widest uppercase mt-0.5">
                Global Overview
              </p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="flex-1 flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <input
                ref={inputRef}
                id="add-city-input"
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Add a city…"
                aria-label="City name to add"
                disabled={addLoading}
                className="w-full glass-panel rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-300/40 outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all disabled:opacity-50"
              />
              {cityInput && (
                <button
                  type="button"
                  onClick={() => setCityInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300/40 hover:text-white transition-colors"
                  aria-label="Clear input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              id="add-city-btn"
              type="submit"
              disabled={addLoading || !cityInput.trim()}
              aria-label="Add city"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-500/80 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shrink-0"
            >
              {addLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Add City</span>
            </button>
          </form>

          <div className="flex items-center gap-3 shrink-0">
            {/* Unit toggle */}
            <button
              id="unit-toggle-btn"
              onClick={() => setUnit((u) => (u === 'metric' ? 'imperial' : 'metric'))}
              aria-label="Toggle temperature unit"
              className="flex items-center gap-1.5 px-3 py-2.5 glass-panel rounded-xl text-sm font-semibold text-indigo-200 hover:text-white transition-colors"
            >
              <Thermometer className="w-4 h-4" />
              {unit === 'metric' ? '°C' : '°F'}
            </button>

            <button
              id="refresh-btn"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              aria-label="Refresh weather data"
              className="flex items-center gap-1.5 px-3 py-2.5 glass-panel rounded-xl text-sm font-medium text-indigo-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing || loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <div className="hidden sm:flex flex-col items-end">
              <div className="px-3 py-1.5 glass-panel rounded-full flex items-center gap-2 text-xs font-medium text-indigo-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Data
              </div>
              {lastUpdated && (
                <span className="text-[10px] text-indigo-300/40 mt-0.5 pr-1">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {addError && (
          <div className="max-w-[1600px] mx-auto px-6 pb-3">
            <div className="glass-panel border border-red-500/30 bg-red-950/20 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-red-200/90">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{addError}</span>
            </div>
          </div>
        )}
      </header>

      {renderContent()}
    </div>
  );
}

export default App;
