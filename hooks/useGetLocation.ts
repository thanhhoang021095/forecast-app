import { GEO_API_URL } from "@/services/baseUrls";
import { useAppStore } from "@/store/appStore";
import { LocationType } from "@/types";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_API_KEY || "",
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_X_API_HOST || "",
  },
};

export const useGetLocation = () => {
  const setLocations = useAppStore((state) => state.setLocations);
  const setSearchLoading = useAppStore((state) => state.setSearchLoading);

  const fetchLocations = async (input: string) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
        GEO_API_OPTIONS
      );

      const data = await response.json();

      if (data && data?.data) {
        const mappedData: LocationType[] =
          data.data?.map(
            ({
              id,
              latitude,
              longitude,
              city,
              country,
              countryCode,
            }: Partial<LocationType>) => ({
              latitude,
              longitude,
              city,
              country,
              countryCode,
              id: `${id}`,
            })
          ) || [];

        setLocations(mappedData);
      }

      return data;
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    fetchLocations,
  };
};
