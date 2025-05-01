import { http, HttpResponse } from "msw";

import { areas, deleteArea } from "./db-mock";

export const deleteAreaMock = http.delete<never, never, never>(
  "http://localhost:3000/area",
  async ({ request }) => {
    const url = new URL(request.url);
    const areaId = url.searchParams.get("areaId");
    if (!areaId) return HttpResponse.json(areas, { status: 200 });

    deleteArea(areaId);

    return HttpResponse.json(areas, { status: 200 });
  },
);
