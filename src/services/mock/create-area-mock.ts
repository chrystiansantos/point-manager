import { http, HttpResponse } from "msw";

import { CreateAreaDTO } from "../create-area";
import { createArea } from "./db-mock";

export const createAreaMock = http.post<never, CreateAreaDTO>(
  "http://localhost:3000/area",
  async ({ request }) => {
    const newArea = await request.json();
    const areas = createArea(newArea);

    return HttpResponse.json(areas, { status: 201 });
  },
);
