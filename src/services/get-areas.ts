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

export interface Area {
  id: string;
  name: string;
  position: Position[];
  pins: Pin[];
}

export async function getAreas(): Promise<Area[]> {
  return (await fetch("/area")).json();
}
