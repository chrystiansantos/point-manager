import { http, HttpResponse } from "msw";

import { env } from "@/env";
import { Area } from "../get-areas";
import { areas } from "./db-mock";

export const getAreasMock = http.get<never, never, Area[]>(
  `${env.VITE_API_URL}/area`,
  async () => {
    return HttpResponse.json(areas, { status: 200 });
  },
);
