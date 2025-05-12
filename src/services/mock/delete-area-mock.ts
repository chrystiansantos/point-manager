import { http, HttpResponse } from "msw";

import { env } from "@/env";
import { areas, deleteArea } from "./db-mock";

export const deleteAreaMock = http.delete<never, never, never>(
  `${env.VITE_API_URL}/area/:id`,
  async ({ params }) => {
    const { id } = params;

    if (!id) return HttpResponse.json(areas, { status: 200 });

    deleteArea(id);

    return HttpResponse.json(areas, { status: 200 });
  },
);
