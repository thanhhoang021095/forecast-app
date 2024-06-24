export type LocationType = {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  countryCode: string;
  id: string;
};

export type WindDataType = {
  deg: number;
  speed: number;
};

export type CloudDataType = {
  all: number;
};

export type WeatherDataType = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type WeatherItemType = {
  wind: WindDataType | null;
  weather: WeatherDataType[];
  cloud: CloudDataType | null;
  humidity: number;
  temp: number;
};

export type GroupForecastType = {
  dateTime: {
    key: string;
    date: string;
    time: string;
  };
  data: WeatherItemType;
};
