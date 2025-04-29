import { useAreaMarkersStore } from "@/store/useAreaMarkers.store";
import { Fragment } from "react";
import { ListPoints } from "./points-list";

type Position = {
  lat: number;
  lng: number;
};

export function ShowPointsList() {
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

  return (
    <div className="absolute top-0 z-10">
      <ListPoints.Root>
        <ListPoints.Title title="Listagem de pontos" />
        {!areas.length ? (
          <ListPoints.Empty description="Sem pontos de monitoramento para exibir no momento." />
        ) : (
          <ListPoints.Group>
            {areas.map((area) => (
              <Fragment key={area.id}>
                <ListPoints.PointNameArea name={area.name} />
                {area.pins.map((pin) => (
                  <ListPoints.PointDetail
                    key={pin.id}
                    name={pin.name}
                    createdAt={pin.createdAt}
                    selected={pin.id === pinSelectId}
                    disabled={isCreateNewArea}
                    selectPoint={() =>
                      handleSelectPin(area.id, pin.id, pin.position)
                    }
                  />
                ))}
              </Fragment>
            ))}
          </ListPoints.Group>
        )}
      </ListPoints.Root>
    </div>
  );
}
