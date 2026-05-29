export interface City {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
}

export interface CityList {
  List: City[];
}

export interface WeatherItem {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  dt: number;
}

export interface WeatherApiResponse {
  list: WeatherItem[];
}
