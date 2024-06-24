"use client";

import { Flex } from "@radix-ui/themes";
import CurrentWeather from "./shared/CurrentWeather";
import HistoryNavigateButton from "../HistoryNavigateButton";
import FiveDaysForecast from "../FiveDaysForecast";

type WeatherInformationProps = {};

const WeatherInformation: React.FC<WeatherInformationProps> = () => {
  return (
    <Flex direction="column" gap="4" justify="center">
      <HistoryNavigateButton />
      <CurrentWeather />
      <FiveDaysForecast />
    </Flex>
  );
};

export default WeatherInformation;
