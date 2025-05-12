import { env } from "@/env";

export async function deleteArea(areaSelectId: string) {
  return fetch(`${env.VITE_API_URL}/area/${areaSelectId}`, {
    method: "DELETE",
  });
}
