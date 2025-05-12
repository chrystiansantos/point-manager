import { env } from "@/env";
import { useNotificationStore } from "@/store/notification.store";
import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";

interface Pin {
  id: string;
  name: string;
  position: Position;
}

type Position = {
  lat: number;
  lng: number;
};

export function useMap() {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const { updateNotification } = useNotificationStore();

  const {
    fetchAreas,
    areas,
    isCreateNewArea,
    addBorderArea,
    createPositionsArea,
    areaSelectId,
    pinSelectId,
    selectAreaAndPinId,
    changePositionPin,
    centerMap,
  } = useAreaMarkersStore();

  const handleClickMap = (event: google.maps.MapMouseEvent) => {
    if (isCreateNewArea) {
      const position = event.latLng?.toJSON();
      if (position) addBorderArea(position);
    } else {
      if (areaSelectId || pinSelectId) selectAreaAndPinId(null, null);
    }
  };

  const handleClickArea = (id: string) => {
    selectAreaAndPinId(id, null);
  };

  const handleSelectArea = (areaId: string, pinId: string) => {
    selectAreaAndPinId(areaId, pinId);
  };

  const handleDragEnd = (
    event: google.maps.MapMouseEvent,
    areaId: string,
    pin: Pin,
    position: Position[],
  ) => {
    if (!event.latLng || !areaId) return;
    const newPosition = event.latLng.toJSON();
    const polygon = new google.maps.Polygon({ paths: position });
    if (google.maps.geometry.poly.containsLocation(newPosition, polygon)) {
      changePositionPin(areaId, pin.id, newPosition);
      updateNotification({
        open: true,
        callbackFunctionName: "saveAreaAndPins",
        title: "Salvar pontos",
        subtitle: "Para salvar os pontos alterados clique em salvar",
        type: "DEFAULT",
      });
    } else {
      changePositionPin(areaId, pin.id, pin.position);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  return {
    isLoaded,
    centerMap,
    mapContainerStyle,
    handleClickMap,
    areas,
    handleClickArea,
    areaSelectId,
    pinSelectId,
    handleSelectArea,
    handleDragEnd,
    isCreateNewArea,
    createPositionsArea,
  };
}
