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
  console.log(areasAndPins, "area e pins update");
  return fetch(`${env.VITE_API_URL}/area`, {
    method: "PUT",
    body: JSON.stringify(areasAndPins),
  });
}
