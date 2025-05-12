import { http, HttpResponse } from "msw";

import { env } from "@/env";
import { UpdateAreaDTO } from "../update-pins";
import { updateAreaWithPins } from "./db-mock";

export const updatePinsMock = http.put<never, UpdateAreaDTO[]>(
  `${env.VITE_API_URL}/area`,
  async ({ request }) => {
    const newAreas = await request.json();

    const areas = updateAreaWithPins(newAreas);

    return HttpResponse.json(areas, { status: 201 });
  },
);
