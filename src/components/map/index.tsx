import { GoogleMap } from "@react-google-maps/api";
import { Fragment, memo } from "react";
import { Loading } from "../loading";
import { Marker } from "../marker";
import { Polygon } from "../polygon";
import { useMap } from "./use-map";

export const Map = memo(function MapMemoization() {
  const {
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
  } = useMap();

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
