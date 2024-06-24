import { WEATHER_ICON_URL } from "@/services/baseUrls";
import { GroupForecastType } from "@/types";
import { Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

type ForecastItemProps = {
  data: GroupForecastType;
};

const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card>
      <Flex direction="row" justify="between" align="center">
        <Flex direction="row" justify="start" align="center" gap="8">
          <Flex direction="row" align="center" gap="3">
            <Text size="2" weight="bold">
              {data.dateTime.time}
            </Text>

            <Flex direction="row" align="center" gap="2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${WEATHER_ICON_URL}/${data.data.weather?.[0]?.icon}.png`}
                alt="weather icon"
                width={30}
                height={30}
              />
            </Flex>
          </Flex>

          <Flex direction="column" gap="2" justify="center" align="center">
            <Image
              src="/icons/tempIcon.svg"
              alt="temperature icon"
              width={16}
              height={16}
            />
            <Text size="2">{data.data?.temp} °C</Text>
          </Flex>

          <Flex direction="column" gap="2" justify="center" align="center">
            <Image
              src="/icons/windIcon.svg"
              alt="wind icon"
              width={16}
              height={16}
            />
            <Text size="2">{data.data?.wind?.speed}m/s</Text>
          </Flex>

          <Flex direction="column" gap="2" justify="center" align="center">
            <Image
              src="/icons/cloudIcon.svg"
              alt="cloud icon"
              width={16}
              height={16}
            />
            <Text size="2">{data.data?.cloud?.all}%</Text>
          </Flex>

          <Flex direction="column" gap="2" justify="center" align="center">
            <Image
              src="/icons/humidityIcon.svg"
              alt="humidity icon"
              width={16}
              height={16}
            />
            <Text size="2">{data.data?.humidity}%</Text>
          </Flex>
        </Flex>

        <Text size="2">{data.data.weather?.[0].description}</Text>
      </Flex>
    </Card>
  );
};

export default ForecastItem;
