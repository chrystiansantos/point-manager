import { http, HttpResponse } from "msw";

import { Area } from "../get-areas";
import { areas } from "./db-mock";

export const getAreasMock = http.get<never, never, Area[]>(
  "http://localhost:3000/area",
  async () => {
    return HttpResponse.json(areas, { status: 200 });
  },
);
