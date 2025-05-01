interface Position {
  lat: number;
  lng: number;
}

interface Pin {
  id: string;
  name: string;
  position: Position;
  createdAt: Date;
}

interface Area {
  id: string;
  name: string;
  position: Position[];
  pins: Pin[];
}

export let areas: Area[] = [];

export const createArea = (area: Area) => {
  areas.push(area);
  return areas;
};

export const deleteArea = (areaId: string) => {
  areas = areas.filter((area) => area.id !== areaId);
  return areas;
};

export const updateAreaWithPins = (area: Area[]) => {
  if (area.length) {
    areas = area;
  }
  return areas;
};
