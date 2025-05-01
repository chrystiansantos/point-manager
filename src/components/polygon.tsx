import { Polygon as PolygonMap } from "@react-google-maps/api";

interface Position {
  lat: number;
  lng: number;
}

interface PolygonProps {
  path: Position[];
  onClick?: () => void;
  select: boolean;
}

export function Polygon({ path, onClick, select = false }: PolygonProps) {
  const fillColor = select ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)";

  return (
    <PolygonMap
      path={path}
      onClick={onClick}
      options={{
        fillOpacity: 0.3,
        fillColor,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWeight: 2,
      }}
    />
  );
}
