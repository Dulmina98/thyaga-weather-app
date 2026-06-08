# 🌤️ WeatherSky — Global Weather Dashboard

A responsive, real-time weather dashboard built with **React + TypeScript + Vite**, powered by the [OpenWeatherMap API](https://openweathermap.org/api). View live weather data for multiple cities worldwide, add your own cities, and switch between metric and imperial units.

---

## ✨ Features

- 🌍 **Multi-city weather overview** — loads cities from `cities.json` on startup
- ➕ **Add any city** by name — searches the OpenWeatherMap API and appends the card
- ❌ **Remove cities** — hover a card and click the ✕ button
- 🌡️ **°C / °F toggle** — switches all cards instantly
- 🔄 **Manual refresh** + **auto-refresh every 10 minutes**
- 💾 **Persistent city list** — added cities survive page refresh (localStorage)
- 📍 **Full weather data per card:**
  - Temperature, feels like, min/max
  - Humidity, pressure
  - Wind speed & compass direction
  - Visibility (km)
  - Cloud coverage (%)
  - Sunrise & sunset times
  - Coordinates (lat/lon)
  - Last data update timestamp
- 📱 **Fully responsive** — adapts from mobile to 4-column desktop grid
- 🎨 **Glassmorphism UI** with smooth animations and hover effects
- 🐳 **Docker-ready** — multi-stage Dockerfile + docker-compose

---

## 🗂️ Project Structure

```
thyaga-weather-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   └── WeatherCard.tsx      # Individual city weather card
│   ├── data/
│   │   └── cities.json          # Default city list (CityCode-based)
│   ├── hooks/
│   │   └── useWeather.ts        # Data fetching, add/remove, refresh logic
│   ├── types/
│   │   └── weather.ts           # TypeScript interfaces
│   ├── App.tsx                  # Root component with header + layout
│   ├── index.css                # Global styles + glassmorphism utilities
│   └── main.tsx                 # React entry point
├── .env.example                 # Environment variable template
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Docker Compose config
├── nginx.conf                   # Nginx config (SPA routing + caching)
├── vite.config.ts               # Vite config with API proxy
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [OpenWeatherMap API key](https://openweathermap.org/appid) (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/thyaga-weather-app.git
cd thyaga-weather-app
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** The Vite dev server proxies `/weather-api` → `https://api.openweathermap.org` to avoid CORS issues during development.

---

## 🐳 Docker Deployment

### Using Docker Compose (recommended)

Create a `.env` file with your API key (see step 2 above), then:

```bash
docker compose up --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Using Docker directly

```bash
docker build \
  --build-arg VITE_WEATHER_API_KEY=your_api_key_here \
  -t thyaga-weather-app .

docker run -p 3000:80 thyaga-weather-app
```

### Docker architecture

| Stage | Base image | Purpose |
|---|---|---|
| `builder` | `node:20-alpine` | Installs deps, builds Vite production bundle |
| `serve` | `nginx:alpine` | Serves static files, handles SPA routing |

---

## 🌐 API Reference

This app uses the [OpenWeatherMap Current Weather API](https://openweathermap.org/current):

```
GET https://api.openweathermap.org/data/2.5/weather
  ?id={cityId}
  &units={metric|imperial}
  &appid={API_KEY}
```

**Default cities** are loaded from `src/data/cities.json`. Each entry requires a `CityCode` (OpenWeatherMap city ID):

```json
{
  "List": [
    { "CityCode": "1248991", "CityName": "Colombo" },
    { "CityCode": "1850147", "CityName": "Tokyo" }
  ]
}
```

**Add City** uses the name-based endpoint:
```
GET /data/2.5/weather?q={cityName}&units=metric&appid={API_KEY}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| HTTP client | Axios |
| Icons | Lucide React |
| Server (prod) | Nginx (Alpine) |
| Container | Docker + Docker Compose |

---

## 🌍 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome (latest) | ✅ |
| Firefox (latest) | ✅ |
| Safari (latest) | ✅ |

---

## 📜 License

This project was created as part of a front-end assignment for [Thyaga](https://thyaga.lk).
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- update 20 -->
<!-- update 21 -->
<!-- update 22 -->
<!-- update 23 -->
