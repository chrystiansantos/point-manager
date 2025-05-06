import { env } from "@/env";
import { getAreas } from "@/services";
import { calculateCenterArea, getPosition } from "@/util";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useNotificationStore } from "./notification.store";

type Position = {
  lat: number;
  lng: number;
};

interface Pin {
  id: string;
  name: string;
  position: Position;
  createdAt: Date;
}

interface AreasResponse {
  id: string;
  name: string;
  position: Position[];
  pins: Pin[];
}

interface Areas {
  id: string;
  name: string;
  position: Position[];
  center: Position;
  pins: Pin[];
}

type AreaMarkersType = {
  isCreateNewArea: boolean;
  areaSelectId: string | null;
  createPositionsArea: Position[];
  areas: Areas[];
  fetchAreas: () => Promise<void>;
  createArea: (isCreateNewArea: boolean) => void;
  addBorderArea: (position: Position) => void;
  removeLastBorder: () => void;
  resetCreateArea: () => void;
  // Pin
  cratePin: (areaId: string) => void;
  pinSelectId: string | null;
  selectAreaAndPinId: (areaId: string | null, id?: string | null) => void;
  changePositionPin: (
    areaId: string,
    pinId: string,
    position: Position,
  ) => void;
  removePin: (areaId: string, pinId: string) => void;
  removeAllPins: (areaId: string) => void;
  centerMap: Position;
  updateCenterMap: (position: Position) => void;
};

export const useAreaMarkersStore = create<AreaMarkersType>()(
  devtools((set) => ({
    isCreateNewArea: false,
    createPositionsArea: [],
    areas: [],
    pinSelectId: null,
    centerMap: null,
    async fetchAreas() {
      const areas = await fetchAreasRequest();
      if (!areas.length) {
        set((state) => {
          if (navigator?.geolocation && !state?.centerMap?.lat) {
            getPosition()
              .then((position) => {
                set((state) => ({
                  ...state,
                  areas: [],
                  centerMap: {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude,
                  },
                }));
              })
              .catch((error) => {
                // nteresting to implement an error observability tool
                console.error(error);
                const { updateNotification } = useNotificationStore.getState();
                updateNotification({
                  open: true,
                  title: "Falha ao obter localização",
                  subtitle:
                    "Falha ao obter dados de localização pelo navegador",
                  type: "ERROR",
                  callbackFunctionName: "close",
                  alertDurationInSeconds: 5,
                });

                set((state) => ({
                  ...state,
                  areas: [],
                  centerMap: {
                    lng: env.VITE_DEFAULT_LNG,
                    lat: env.VITE_DEFAULT_LAT,
                  },
                }));
              });
          }
          return {
            ...state,
            areas: [],
          };
        });
      } else {
        set((state) => ({
          ...state,
          centerMap: areas[0].center,
          areas,
        }));
      }
    },
    createArea(isCreateNewArea) {
      set((state) => ({
        ...state,
        isCreateNewArea,
      }));
    },
    addBorderArea(position) {
      set((state) => ({
        ...state,
        createPositionsArea: [...state.createPositionsArea, position],
      }));
    },
    removeLastBorder() {
      set((state) => {
        state.createPositionsArea.pop();
        return {
          ...state,
          createPositionsArea: [...state.createPositionsArea],
        };
      });
    },
    resetCreateArea() {
      set((state) => ({
        ...state,
        isCreateNewArea: false,
        createPositionsArea: [],
      }));
    },
    cratePin(areaId) {
      set((state) => {
        const updateAreaAfterAddNewPin = state.areas.map((area) => {
          if (area.id === areaId) {
            const { lat, lng } = area.center;

            const pinIds = area.pins
              .reduce((acc: string[], pin) => {
                acc.push(pin.name);
                return acc;
              }, [])
              .sort((a, b) => Number(a) - Number(b));

            const name = String(Number(pinIds.pop() ?? 0) + 1);
            area.pins.push({
              id: new Date().getTime().toString(),
              name,
              position: {
                lat,
                lng,
              },
              createdAt: new Date(),
            });
          }
          return area;
        });

        return {
          ...state,
          areas: updateAreaAfterAddNewPin,
        };
      });
    },
    selectAreaAndPinId(areaId, id = null) {
      set((state) => ({
        ...state,
        areaSelectId: areaId,
        pinSelectId: id,
      }));
    },
    changePositionPin(areaId, pinId, position) {
      set((state) => {
        const updateAreas = state.areas.map((area) => {
          if (area.id === areaId) {
            area.pins = area.pins.map((pin) => {
              if (pin.id === pinId) pin.position = { ...position };
              return pin;
            });
          }
          return area;
        });

        return {
          ...state,
          areas: updateAreas,
        };
      });
    },
    removeAllPins(areaId) {
      set((state) => {
        const removeAllPinsArea = state.areas.map((area) => {
          if (area.id === areaId) area.pins = [];
          return area;
        });

        return {
          ...state,
          pinSelectId: null,
          areas: removeAllPinsArea,
        };
      });
    },
    removePin(areaId, pinId) {
      set((state) => {
        const updateAreas = state.areas.map((area) => {
          if (area.id === areaId) {
            area.pins = area.pins.filter((pin) => pin.id !== pinId);
          }
          return area;
        });

        return {
          ...state,
          pinSelectId: null,
          areas: updateAreas,
        };
      });
    },
    updateCenterMap(position) {
      set((state) => ({
        ...state,
        centerMap: position,
      }));
    },
  })),
);

const fetchAreasRequest = async () => {
  try {
    const areasResponse: AreasResponse[] = await getAreas();

    const areas: Areas[] = areasResponse.map((area) => ({
      id: area.id,
      name: area.name,
      position: area.position,
      pins:
        area?.pins?.map((pin) => ({
          ...pin,
          createdAt: new Date(pin.createdAt),
        })) ?? [],
      center: calculateCenterArea(area.position),
    }));
    return areas;
  } catch (error) {
    console.error(error);
    return [];
  }
};
