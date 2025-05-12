import { expect, test } from "@playwright/test";

test.describe("Exibir o mapa com base em diferentes fontes de localização", () => {
  test("Exibir o mapa com base na localização atual do navegador", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: -31.741558, longitude: -52.337988 },
      locale: "pt-BR",
    });

    const page = await context.newPage();

    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await expect(
      page.getByText("Falha ao obter localização"),
    ).not.toBeVisible();
    await expect(page.getByText("Sem pontos de monitoramento")).toBeVisible();
    await context.clearPermissions();
  });

  // O teste foi realizado com sucesso; no entanto, é necessário desativar o
  //  MSW para que o retorno funcione corretamente.
  test("Exibir o mapa com base na localização de uma área cadastrada", async ({
    page,
  }) => {
    await page.route("http://localhost:3333/area", async (route) =>
      route.fulfill({
        json: [
          {
            id: "1746803931627",
            position: [
              {
                lat: -15.179800890708686,
                lng: -53.510631561279304,
              },
              {
                lat: -15.192805735630358,
                lng: -53.510889053344734,
              },
              {
                lat: -15.18767016011894,
                lng: -53.495868682861335,
              },
            ],
            name: "area1",
            pins: [],
          },
        ],
        status: 200,
      }),
    );

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    await expect(
      page.getByText("Falha ao obter localização"),
    ).not.toBeVisible();

    await expect(page.getByText("area1")).toBeVisible();
  });
  test("Exibir o mapa com base na localização padrão do sistema", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "OK" }).nth(1).click();
    await page.getByRole("button", { name: "OK" }).click();

    await expect(page.getByText("Falha ao obter localização")).toBeVisible();
    await expect(page.getByText("Sem pontos de monitoramento")).toBeVisible();
  });
});
