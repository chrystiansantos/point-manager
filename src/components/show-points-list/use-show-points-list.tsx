import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";

type Position = {
  lat: number;
  lng: number;
};

export function useShowPointsList() {
  const {
    isCreateNewArea,
    areas,
    pinSelectId,
    selectAreaAndPinId,
    updateCenterMap,
  } = useAreaMarkersStore();

  function handleSelectPin(areaId: string, pinId: string, position: Position) {
    selectAreaAndPinId(areaId, pinId);
    updateCenterMap(position);
  }

  return {
    isCreateNewArea,
    areas,
    pinSelectId,
    handleSelectPin,
  };
}
