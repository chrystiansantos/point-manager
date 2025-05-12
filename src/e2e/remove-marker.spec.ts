import { expect, test } from "@playwright/test";
import { createAreaTesting } from "./util/create-area.ts";

test.describe("Remover marcadores", () => {
  test("Remover marcador selecionado", async ({ page }) => {
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

    await page.getByRole("button", { name: "Deletar pin" }).click();

    await page.getByRole("button", { name: "Excluir" }).click();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 1 Criado em" }),
    ).not.toBeVisible();

    await expect(
      page.getByTestId("toast-root").getByRole("button", { name: "Salvar" }),
    ).toBeVisible();
  });

  test("Remover todos os marcadores de uma área", async ({ page }) => {
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
    await page.getByRole("button", { name: "Adicionar Novo" }).click();
    await page.getByRole("button", { name: "Adicionar Novo" }).click();

    await page.getByRole("button", { name: "Deletar todos" }).click();

    await page.getByRole("button", { name: "Excluir" }).click();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 1 Criado em" }),
    ).not.toBeVisible();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 2 Criado em" }),
    ).not.toBeVisible();

    await expect(
      page.getByRole("button", { name: "icon soy Ponto nº 3 Criado em" }),
    ).not.toBeVisible();

    await expect(
      page.getByTestId("toast-root").getByRole("button", { name: "Salvar" }),
    ).toBeVisible();
  });
});
