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

export interface CreateAreaDTO {
  id: string;
  name: string;
  position: Position[];
  pins: Pin[];
}

export async function createArea(areas: CreateAreaDTO) {
  return fetch(`${env.VITE_API_URL}/area`, {
    method: "POST",
    body: JSON.stringify({
      ...areas,
    }),
  });
}
