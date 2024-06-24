import { WEATHER_API_URL } from "@/services/baseUrls";
import { weatherEndpoint } from "@/services/endpoint";

const secretKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const useGetLocationWeather = () => {
  const fetchWeather = async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/${weatherEndpoint}?lat=${latitude}&lon=${longitude}&appid=${secretKey}&units=metric`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return {
    fetchWeather,
  };
};
