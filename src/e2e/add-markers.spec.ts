import { expect, test } from "@playwright/test";
import { createAreaTesting } from "./util/create-area.ts";

test.describe("Adicionar marcadores dentro de uma área", () => {
  test("Adicionar um marcador dentro de uma área específica", async ({
    page,
  }) => {
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

    await expect(page.getByText("Salvar pontos")).toBeVisible();

    await expect(
      page.getByTestId("toast-root").getByRole("button", { name: "Salvar" }),
    ).toBeVisible();
  });
});
