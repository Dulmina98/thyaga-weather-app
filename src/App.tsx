import { CloudSun, Loader2, AlertCircle } from 'lucide-react';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';

function App() {
  const { weatherData, loading, error } = useWeather();

  const renderContent = () => {
    if (loading) {
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

    if (error) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="glass border-red-500/30 bg-red-950/20 p-8 rounded-3xl max-w-md w-full text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Oops! Something went wrong</h2>
            <p className="text-red-200/80">{error}</p>
            <button 
              onClick={() => window.location.reload()}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {weatherData.map((item) => (
            <WeatherCard key={item.id} data={item} />
          ))}
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 animate-gradient-xy flex flex-col font-sans">
      {/* Sleek Header */}
      <header className="sticky top-0 z-50 glass border-b-white/10 rounded-none border-x-0 border-t-0 mb-8">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-indigo-200/80">
            <div className="px-4 py-2 glass-panel rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Data
            </div>
          </div>
        </div>
      </header>

      {renderContent()}
    </div>
  );
}

export default App;
