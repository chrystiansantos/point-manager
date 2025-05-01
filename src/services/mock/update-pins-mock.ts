import { http, HttpResponse } from "msw";

import { UpdateAreaDTO } from "../update-pins";
import { updateAreaWithPins } from "./db-mock";

export const updatePinsMock = http.put<never, UpdateAreaDTO[]>(
  "http://localhost:3000/area",
  async ({ request }) => {
    const newAreas = await request.json();

    const areas = updateAreaWithPins(newAreas);

    return HttpResponse.json(areas, { status: 201 });
  },
);
