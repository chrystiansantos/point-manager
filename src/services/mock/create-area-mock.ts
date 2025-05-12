import { http, HttpResponse } from "msw";

import { env } from "@/env";
import { CreateAreaDTO } from "../create-area";
import { createArea } from "./db-mock";

export const createAreaMock = http.post<never, CreateAreaDTO>(
  `${env.VITE_API_URL}/area`,
  async ({ request }) => {
    const newArea = await request.json();
    const areas = createArea(newArea);

    return HttpResponse.json(areas, { status: 201 });
  },
);
