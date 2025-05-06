import { http, HttpResponse } from "msw";

import { areas, deleteArea } from "./db-mock";

export const deleteAreaMock = http.delete<never, never, never>(
  "http://localhost:3000/area/:id",
  async ({ params }) => {
    const { id } = params;

    if (!id) return HttpResponse.json(areas, { status: 200 });

    deleteArea(id);

    return HttpResponse.json(areas, { status: 200 });
  },
);
