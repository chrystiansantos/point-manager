import disableMove from "@/assets/disable_move.svg";
import enableMove from "@/assets/enable_move.svg";
import { Marker as MarkerMap } from "@react-google-maps/api";

interface Position {
  lat: number;
  lng: number;
}

const MarkerIcon = {
  select: enableMove,
  unselect: disableMove,
};

interface MarkerProps {
  draggable: boolean;
  position: Position;
  onClick: () => void;
  onDragEnd: (event: google.maps.MapMouseEvent) => void;
}

export function Marker({
  draggable,
  position,
  onClick,
  onDragEnd,
}: MarkerProps) {
  const icon = draggable ? MarkerIcon.select : MarkerIcon.unselect;

  return (
    <MarkerMap
      draggable={draggable}
      position={position}
      icon={{
        url: icon,
        scaledSize: new window.google.maps.Size(34, 58),
      }}
      onClick={onClick}
      onDragEnd={onDragEnd}
    />
  );
}
