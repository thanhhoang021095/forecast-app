"use client";
import { useGetLocation } from "@/hooks/useGetLocation";
import { useAppStore } from "@/store/appStore";
import { MagnifyingGlassIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Card,
  Flex,
  ScrollArea,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDebounceCallback, useOnClickOutside, useToggle } from "usehooks-ts";
import LocationItem from "../LocationItem";
import { getLocalStorage } from "@/libs/utils";
import { historyLocationsKey } from "@/libs/constants";
import { LocationType } from "@/types";

type SearchLocationProps = {};

const SearchLocation: React.FC<SearchLocationProps> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [openPanel, , setOpenPanel] = useToggle(false);

  const { fetchLocations } = useGetLocation();
  const locations = useAppStore((state) => state.locations);
  const historyLocations = useAppStore((state) => state.historyLocations);
  const setHistoryLocations = useAppStore((state) => state.setHistoryLocations);
  const setSearchLoading = useAppStore((state) => state.setSearchLoading);
  const searchLoading = useAppStore((state) => state.searchLoading);

  const panelRef = useRef<HTMLDivElement>(null);

  const handleSearchLocation = useCallback((query: string) => {
    setOpenPanel(true);
    fetchLocations(query);
  }, []);

  const debouncedHandleSearchLocation = useDebounceCallback(
    handleSearchLocation,
    500
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value;
    setSearchText(txt);
    debouncedHandleSearchLocation(txt);
    setSearchLoading(true);
  };

  const handleClosePanel = () => setOpenPanel(false);

  const handleClearSearch = () => setSearchText("");

  const showHistoryLocations = () => {
    const historyLocations = getLocalStorage(
      historyLocationsKey
    ) as LocationType[];

    if (!historyLocations?.length) return;

    setOpenPanel(true);
    setHistoryLocations(historyLocations);
  };

  useOnClickOutside(panelRef, handleClosePanel);

  return (
    <>
      <TextField.Root
        placeholder="Search your location…"
        size="3"
        onChange={handleChange}
        value={searchText}
        onFocus={showHistoryLocations}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        {searchText && (
          <TextField.Slot>
            <button onClick={handleClearSearch}>
              <CrossCircledIcon height="16" width="16" />
            </button>
          </TextField.Slot>
        )}
      </TextField.Root>

      {openPanel ? (
        <ScrollArea type="auto" scrollbars="vertical" style={{ height: 180 }}>
          <Card ref={panelRef}>
            {searchLoading ? (
              <Flex justify="center" align="center" style={{ height: 80 }}>
                <Spinner />
              </Flex>
            ) : (
              <Flex direction="column" gap="4">
                {historyLocations.length ? (
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="bold" color="indigo">
                      History Locations
                    </Text>
                    <Flex direction="column" align="start" gap="2">
                      {historyLocations.map((l) => (
                        <LocationItem
                          {...l}
                          key={l.id}
                          fromStorage
                          onClosePanel={handleClosePanel}
                        />
                      ))}
                    </Flex>
                  </Flex>
                ) : null}

                {searchText.length ? (
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="bold" color="indigo">
                      Suggest Locations
                    </Text>
                    {locations.length ? (
                      <Flex direction="column" align="start" gap="2">
                        {locations.map((l) => (
                          <LocationItem
                            {...l}
                            key={l.id}
                            onClosePanel={handleClosePanel}
                          />
                        ))}
                      </Flex>
                    ) : (
                      <Flex direction="column" align="center" justify="center">
                        Cannot find any matched location
                      </Flex>
                    )}
                  </Flex>
                ) : null}
              </Flex>
            )}
          </Card>
        </ScrollArea>
      ) : null}
    </>
  );
};

export default SearchLocation;
