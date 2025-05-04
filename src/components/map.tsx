import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Fragment, memo, useEffect } from "react";
import { useAreaMarkersStore } from "../store/useAreaMarkers.store";
import { Loading } from "./loading";
import { Marker } from "./marker";
import { Polygon } from "./polygon";

type Position = {
  lat: number;
  lng: number;
};

interface Pin {
  id: string;
  name: string;
  position: Position;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = memo(function MapMemoization() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

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
    } else {
      changePositionPin(areaId, pin.id, pin.position);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, [fetchAreas]);

  if (!isLoaded || !centerMap) return <Loading />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={centerMap}
      zoom={14}
      onClick={handleClickMap}
      options={{
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        cameraControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
      }}
    >
      {areas?.map((area) => (
        <Fragment key={area.id}>
          <Polygon
            path={area.position}
            onClick={() => handleClickArea(area.id)}
            select={area.id === areaSelectId}
          />
          {area.pins.map((pin) => (
            <Marker
              key={pin.id}
              draggable={pinSelectId === pin.id}
              onClick={() => handleSelectArea(area.id, pin.id)}
              onDragEnd={(event) =>
                handleDragEnd(event, area.id, pin, area.position)
              }
              position={pin.position}
            />
          ))}
        </Fragment>
      ))}
      {isCreateNewArea && <Polygon path={createPositionsArea} select={false} />}
    </GoogleMap>
  );
});
