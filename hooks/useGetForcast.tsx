import { WEATHER_API_URL } from "@/services/baseUrls";
import { forecastEndpoint } from "@/services/endpoint";

const secretKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const useGetForecast = () => {
  const fetchForecast = async (latitude: string, longitude: string) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/${forecastEndpoint}?lat=${latitude}&lon=${longitude}&appid=${secretKey}&units=metric`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return {
    fetchForecast,
  };
};
