import { expect, test } from "@playwright/test";
import { createAreaTesting } from "./util/create-area";

test.describe("Cadastro de área no mapa", () => {
  test("Cadastro de uma nova área no mapa", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await createAreaTesting(page, "área 1");

    await expect(
      page.getByText("Sem pontos de monitoramento"),
    ).not.toBeVisible();

    await expect(page.getByText("área 1")).toBeVisible();
  });

  test("Tentativa de cadastro com nome inválido", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await createAreaTesting(page, "A");

    await expect(
      page.getByRole("textbox", { name: "Nome da área" }),
    ).toHaveAttribute("data-error", "true");

    await expect(
      page.getByRole("button", { name: "Cadastrar" }),
    ).toBeDisabled();
  });

  test("Cancelamento do cadastro de uma nova área", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await createAreaTesting(page, "A");

    await page.getByRole("button", { name: "Cancelar" }).click();

    await expect(page.getByText("Sem pontos de monitoramento")).toBeVisible();

    await expect(page.getByRole("button", { name: "Salvar" })).toBeVisible();

    await page.getByRole("button", { name: "Desfazer" }).click();
    await page.getByRole("button", { name: "Desfazer" }).click();
    await page.getByRole("button", { name: "Desfazer" }).click();

    await expect(
      page.getByRole("button", { name: "Add Perímetro" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Cadastrar nova área?" }),
    ).not.toBeVisible();
  });
});
