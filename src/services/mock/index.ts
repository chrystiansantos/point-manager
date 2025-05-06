import { setupWorker } from "msw/browser";

import { env } from "@/env";
import { createAreaMock } from "./create-area-mock";
import { deleteAreaMock } from "./delete-area-mock";
import { getAreasMock } from "./get-areas-mock";
import { updatePinsMock } from "./update-pins-mock";

const worker = setupWorker(
  createAreaMock,
  getAreasMock,
  updatePinsMock,
  deleteAreaMock,
);

export async function enableMSW() {
  if (env.VITE_ENABLE_MSW)
    return worker.start({
      onUnhandledRequest: "bypass",
    });
}
