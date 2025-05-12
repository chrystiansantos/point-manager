import { Page } from "@playwright/test";

export const createAreaTesting = async (page: Page, areaName: string) => {
  await page.getByRole("button", { name: "Add Perímetro" }).click();
  const map = await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .first();

  const box = await map.boundingBox();

  if (box) {
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.waitForTimeout(500);
    await page.mouse.click(x, y);
    await page.waitForTimeout(500);
    await page.mouse.click(x * 1, y * 0.75);
    await page.waitForTimeout(500);

    await page.mouse.click(x * 1.2, y * 0.75);
    await page.waitForTimeout(500);
    await page.mouse.click(x * 1.2, y * 1);
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Salvar" }).click();
    await page.getByRole("textbox", { name: "Nome da área" }).click();
    await page.getByRole("textbox", { name: "Nome da área" }).fill(areaName);

    if (areaName.length > 2)
      await page.getByRole("button", { name: "Cadastrar" }).click();
  }
};
