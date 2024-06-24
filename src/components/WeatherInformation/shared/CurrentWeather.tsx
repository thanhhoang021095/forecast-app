"use client";

import { useGetLocationWeather } from "@/hooks/useGetWeather";
import { useScreenSize } from "@/hooks/useScreenSize";
import { formatDisplayDate } from "@/libs/utils";
import { WEATHER_ICON_URL } from "@/services/baseUrls";
import { useAppStore } from "@/store/appStore";
import { WeatherItemType } from "@/types";
import { Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type CurrentWeatherProps = {};

const titleSize = "4";
const contentSize = "3";

const CurrentWeather: React.FC<CurrentWeatherProps> = () => {
  const selectedLocation = useAppStore((state) => state.selectedLocation);
  const [currentWeather, setCurrentWeather] = useState<WeatherItemType>({
    wind: null,
    weather: [],
    cloud: null,
    humidity: 0,
    temp: 0,
  });

  const { fetchWeather } = useGetLocationWeather();
  const { isMobile } = useScreenSize();

  useEffect(() => {
    const getCurrentWeather = async () => {
      if (!selectedLocation) return;

      const res = await fetchWeather(
        `${selectedLocation.latitude}`,
        `${selectedLocation.longitude}`
      );

      if (res) {
        setCurrentWeather({
          wind: res.wind,
          weather: res.weather,
          cloud: res.clouds,
          humidity: res.main?.humidity,
          temp: res.main?.temp,
        });
      }
    };

    getCurrentWeather();
  }, [selectedLocation]);

  if (!selectedLocation) return null;

  return (
    <>
      {/* WEATHER */}
      <Flex direction="column" gap="2" justify="center">
        <Text
          size={titleSize}
          weight="bold"
          align="center"
          style={{
            textTransform: "uppercase",
          }}
        >
          Current Weather
        </Text>
        <Grid
          columns={isMobile ? "1" : "3"}
          gap="3"
          width="auto"
          justify="center"
          align="center"
        >
          <Flex direction="column" gap="2" justify="center">
            <Text size={contentSize} weight="bold" align="center">
              {selectedLocation?.city}, {selectedLocation?.country}
            </Text>
            <Text size={contentSize} align="center">
              {formatDisplayDate(new Date())}
            </Text>
          </Flex>

          <>
            <Flex direction="column" gap="2" justify="center">
              <Text size={contentSize} weight="bold" align="center">
                {currentWeather.temp} °C
              </Text>
              <Text size={contentSize} align="center">
                {currentWeather.weather?.[0]?.description}
              </Text>
            </Flex>

            <Flex direction="row" justify="center" align="center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${WEATHER_ICON_URL}/${currentWeather.weather?.[0]?.icon}.png`}
                alt="weather icon"
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </Flex>
          </>
        </Grid>
      </Flex>
      {/* WEATHER */}

      {/* AIR CONDITION */}
      <Flex direction="column" gap="2" justify="center">
        <Text
          size={titleSize}
          weight="bold"
          align="center"
          style={{
            textTransform: "uppercase",
          }}
        >
          Air Condition
        </Text>
        <Grid
          columns={isMobile ? "1" : "3"}
          gap="3"
          width="auto"
          justify="center"
          align="center"
        >
          <Flex direction="column" gap="2" justify="center">
            {/* WIND */}
            <Flex direction="row" gap="2" justify="center" align="center">
              <Image
                src="/icons/windIcon.svg"
                alt="wind icon"
                width={20}
                height={20}
              />
              <Text size={contentSize} weight="bold" align="center">
                Wind
              </Text>
            </Flex>

            <Text size={contentSize} align="center">
              {currentWeather.wind?.speed}m/s
            </Text>
          </Flex>
          {/* WIND */}

          {/* CLOUD */}
          <Flex direction="column" gap="2" justify="center">
            <Flex direction="row" gap="2" justify="center" align="center">
              <Image
                src="/icons/cloudIcon.svg"
                alt="cloud icon"
                width={20}
                height={20}
              />
              <Text size={contentSize} weight="bold" align="center">
                Cloud
              </Text>
            </Flex>
            <Text size={contentSize} align="center">
              {currentWeather.cloud?.all}%
            </Text>
          </Flex>
          {/* CLOUD */}

          <Flex direction="column" gap="2" justify="center">
            <Flex direction="row" gap="2" justify="center" align="center">
              <Image
                src="/icons/humidityIcon.svg"
                alt="humidity icon"
                width={20}
                height={20}
              />
              <Text size={contentSize} weight="bold" align="center">
                Humidity
              </Text>
            </Flex>

            <Text size={contentSize} align="center">
              {currentWeather.humidity}%
            </Text>
          </Flex>
        </Grid>
      </Flex>
      {/* AIR CONDITION */}
    </>
  );
};

export default CurrentWeather;
