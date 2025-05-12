import { expect, test } from "@playwright/test";
import { createAreaTesting } from "./util/create-area.ts";

test.describe("Mover marcadores", () => {
  test("Mover um marcador dentro de uma área específica", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await createAreaTesting(page, "área-1");

    await page
      .locator("div")
      .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
      .first()
      .click();

    await page.getByRole("button", { name: "Adicionar Novo" }).click();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 1 Criado em" }),
    ).toBeVisible();

    await page
      .getByRole("button", { name: "icon soy Ponto nº 1 Criado em" })
      .click();

    await expect(
      page.getByTestId("toast-root").getByRole("button", { name: "Salvar" }),
    ).toBeVisible();

    await page.waitForTimeout(5000);

    const marker = page.getByRole("button").filter({ hasText: /^$/ }).nth(1);

    await expect(marker).toBeVisible();

    const markerIcon = await marker.boundingBox();

    const initialPosition = {
      x: markerIcon?.x,
      y: markerIcon?.y,
    };

    if (markerIcon) {
      const startX = markerIcon.x + markerIcon.width / 2;
      const startY = markerIcon.y + markerIcon.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 20, startY + 20, { steps: 10 });
      await page.mouse.up();
    }

    const markerIconAfterMove = await marker.boundingBox();

    const finishPosition = {
      x: markerIconAfterMove?.x,
      y: markerIconAfterMove?.y,
    };

    await page.waitForTimeout(1000);

    expect(initialPosition).not.toEqual(finishPosition);

    await expect(
      page.getByTestId("toast-root").getByRole("button", { name: "Salvar" }),
    ).toBeVisible();
  });

  test("Mover um marcador fora de uma área específica", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByRole("button", { name: "Fechar" }).click();

    await createAreaTesting(page, "área-1");

    await page
      .locator("div")
      .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
      .first()
      .click();

    await page.getByRole("button", { name: "Adicionar Novo" }).click();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 1 Criado em" }),
    ).toBeVisible();

    const buttonSaveMarker = page
      .getByTestId("toast-root")
      .getByRole("button", { name: "Salvar" });

    await expect(buttonSaveMarker).toBeVisible();

    await buttonSaveMarker.click();

    await page.waitForLoadState("networkidle");

    await page
      .getByRole("button", { name: "icon soy Ponto nº 1 Criado em" })
      .click();

    const marker = page.getByRole("button").filter({ hasText: /^$/ }).nth(1);

    await expect(marker).toBeVisible();

    const markerIcon = await marker.boundingBox();

    const initialPosition = {
      x: markerIcon?.x,
      y: markerIcon?.y,
    };

    if (markerIcon) {
      const startX = markerIcon.x + markerIcon.width / 2;
      const startY = markerIcon.y + markerIcon.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + 100, startY + 100, { steps: 10 });
      await page.mouse.up();
    }

    const markerIconAfterMove = await marker.boundingBox();

    const finishPosition = {
      x: markerIconAfterMove?.x,
      y: markerIconAfterMove?.y,
    };

    await page.waitForTimeout(1000);

    expect(initialPosition).toEqual(finishPosition);
  });
});
