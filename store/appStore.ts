import { LocationType } from "@/types";
import { create } from "zustand";

type AppStateType = {
  locations: LocationType[];
  historyLocations: LocationType[];
  selectedLocation: LocationType | null;
  searchLoading: boolean;
};

type AppActionType = {
  setLocations: (payload: AppStateType["locations"]) => void;
  setHistoryLocations: (payload: AppStateType["historyLocations"]) => void;
  setSelectedLocation: (payload: AppStateType["selectedLocation"]) => void;
  setSearchLoading: (payload: AppStateType["searchLoading"]) => void;
};

export const useAppStore = create<AppStateType & AppActionType>((set) => ({
  locations: [],
  historyLocations: [],
  selectedLocation: null,
  searchLoading: false,
  setLocations: (payload: AppStateType["locations"]) =>
    set(() => ({
      locations: payload,
    })),
  setHistoryLocations: (payload: AppStateType["historyLocations"]) =>
    set(() => ({
      historyLocations: payload,
    })),
  setSelectedLocation: (payload: AppStateType["selectedLocation"]) =>
    set(() => ({
      selectedLocation: payload,
    })),
  setSearchLoading: (payload: AppStateType["searchLoading"]) =>
    set(() => ({
      searchLoading: payload,
    })),
}));
