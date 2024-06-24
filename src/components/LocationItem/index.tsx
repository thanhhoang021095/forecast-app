"use client";

import { historyLocationsKey } from "@/libs/constants";
import { getLocalStorage, setLocalStorage } from "@/libs/utils";
import { useAppStore } from "@/store/appStore";
import { LocationType } from "@/types";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type LocationItemProps = {
  onClosePanel: () => void;
  fromStorage?: boolean;
} & LocationType;

const LocationItem: React.FC<LocationItemProps> = ({
  onClosePanel,
  fromStorage = false,
  ...restProps
}) => {
  const { push } = useRouter();
  const setSelectedLocation = useAppStore((state) => state.setSelectedLocation);
  const setHistoryLocations = useAppStore((state) => state.setHistoryLocations);

  const historyLocations = useMemo(
    () => (getLocalStorage(historyLocationsKey) as LocationType[]) || [],
    []
  );

  const isExistLocation = useMemo(
    () => historyLocations.some((l) => l?.id === restProps.id),
    [historyLocations, restProps.id]
  );

  const handleSelectLocation = () => {
    setSelectedLocation(restProps);

    if (!isExistLocation)
      // Maximum store 10 locations
      setLocalStorage(
        historyLocationsKey,
        historyLocations?.length === 10
          ? [
              historyLocations.slice(1, historyLocations.length),
              {
                ...restProps,
              },
            ]
          : [...historyLocations, { ...restProps }]
      );

    onClosePanel();
    push("/");
  };

  const removeFromStorage = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();

    if (isExistLocation) {
      const locationIdx = historyLocations.findIndex(
        (l) => l?.id === restProps.id
      );

      if (locationIdx !== -1) {
        const newHistories = [
          ...historyLocations.slice(0, locationIdx),
          ...historyLocations.slice(locationIdx + 1, historyLocations.length),
        ];

        setHistoryLocations(newHistories);
        setLocalStorage(historyLocationsKey, newHistories);
      }
    }
  };

  return (
    <Button
      color="gray"
      variant="ghost"
      asChild
      radius="small"
      style={{
        width: "100%",
      }}
      onClick={handleSelectLocation}
    >
      <Flex direction="row" justify="between" align="center">
        <Flex direction="row" justify="start" gap="3">
          <Text size="2" weight="bold" as="span">
            {restProps.city}
          </Text>
          ,{" "}
          <Text color="gray" size="2" as="span">
            {restProps.country}
          </Text>
        </Flex>

        {fromStorage && <MinusCircledIcon onClick={removeFromStorage} />}
      </Flex>
    </Button>
  );
};

export default LocationItem;
