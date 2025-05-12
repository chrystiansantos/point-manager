import { Fragment } from "react";
import { ListPoints } from "../points-list";
import { useShowPointsList } from "./use-show-points-list";

export function ShowPointsList() {
  const { areas, pinSelectId, isCreateNewArea, handleSelectPin } =
    useShowPointsList();

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
