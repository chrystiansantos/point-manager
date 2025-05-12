import { env } from "@/env";

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

export interface UpdateAreaDTO {
  id: string;
  name: string;
  position: Position[];
  pins: Pin[];
}

export async function updatePins(areasAndPins: UpdateAreaDTO[]) {
  return fetch(`${env.VITE_API_URL}/area`, {
    method: "PUT",
    body: JSON.stringify(areasAndPins),
  });
}
