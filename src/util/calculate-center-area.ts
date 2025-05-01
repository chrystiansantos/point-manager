type Position = {
  lat: number;
  lng: number;
};

export function calculateCenterArea(positions: Position[]) {
  return positions.reduce(
    (acc, { lng, lat }) => {
      acc.lat += lat / positions.length;
      acc.lng += lng / positions.length;
      return acc;
    },
    { lng: 0, lat: 0 },
  );
}
