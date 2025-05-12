import { expect, test } from "@playwright/test";
import { createAreaTesting } from "./util/create-area.ts";

test.describe("Remover área cadastrada", () => {
  test("Remover uma área com sucesso", async ({ page }) => {
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

    await page.getByRole("button", { name: "Deletar perímetro" }).click();

    await expect(
      page.getByRole("heading", { name: "Excluir área selecionada?" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Excluir" }).click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: /^área-1$/ })
        .nth(1),
    ).not.toBeVisible();

    await expect(
      page.getByRole("button", { name: "Add Perímetro" }),
    ).toBeVisible();
  });

  test("Cancelar a remoção da área", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await createAreaTesting(page, "área-1");

    await page
      .locator("div")
      .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
      .first()
      .click();

    await page.getByRole("button", { name: "Deletar perímetro" }).click();

    await expect(
      page.getByRole("heading", { name: "Excluir área selecionada?" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Cancelar" }).click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: /^área-1$/ })
        .nth(1),
    ).toBeVisible();
  });
});
