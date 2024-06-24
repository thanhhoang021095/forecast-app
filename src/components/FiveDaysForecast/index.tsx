"use client";

import { useGetForecast } from "@/hooks/useGetForcast";
import {
  formatDateTime,
  formatDisplayDate,
  groupForecastData,
} from "@/libs/utils";
import { useAppStore } from "@/store/appStore";
import { GroupForecastType } from "@/types";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import ForecastItem from "../ForecastItem";

type FiveDaysForecastProps = {};

const FiveDaysForecast: React.FC<FiveDaysForecastProps> = () => {
  const { fetchForecast } = useGetForecast();
  const selectedLocation = useAppStore((state) => state.selectedLocation);

  const [groupForecasts, setGroupForecasts] = useState<
    Record<string, GroupForecastType[]>
  >({});

  useEffect(() => {
    const get5DaysForecast = async () => {
      if (!selectedLocation) return;

      const res = await fetchForecast(
        `${selectedLocation.latitude}`,
        `${selectedLocation.longitude}`
      );

      if (res) {
        const rawList = res.list || [];
        const mappedList = rawList.map((i: any) => ({
          dateTime: formatDateTime(i.dt_txt),
          data: {
            wind: i.wind,
            weather: i.weather,
            cloud: i.clouds,
            humidity: i.main?.humidity,
            temp: i.main?.temp,
          },
        }));

        setGroupForecasts(groupForecastData(mappedList));
      }
    };

    get5DaysForecast();
  }, [selectedLocation]);

  if (!selectedLocation) return null;

  return (
    <Flex direction="column" gap="4" justify="center">
      <Text
        size="4"
        weight="bold"
        align="center"
        style={{
          textTransform: "uppercase",
        }}
      >
        5 Days forecast (3 hours)
      </Text>

      <Flex direction="column" gap="5">
        {Object.keys(groupForecasts).map((k: string) => (
          <Flex direction="column" gap="2" key={k}>
            <Text>{formatDisplayDate(new Date(k))}</Text>
            {groupForecasts[k].map((f, idx) => (
              <ForecastItem key={idx} data={f} />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default FiveDaysForecast;
