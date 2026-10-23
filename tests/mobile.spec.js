const { test, expect } = require("@playwright/test");

async function expectInsideViewport(locator) {
  const box = await locator.boundingBox();
  const viewport = locator.page().viewportSize();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
}

test("Glance tolerates mobile toolbar resizing and pauses on rotation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 640 });
  await page.clock.install();
  await page.goto("/glance.html");
  await page.locator("#practice").click();
  await page.clock.runFor(1500);
  await expect(page.locator("#scene svg")).toBeVisible();
  await page.setViewportSize({ width: 375, height: 700 });
  await page.clock.runFor(100);
  await expect(page.locator("#scene svg")).toBeVisible();
  await page.setViewportSize({ width: 640, height: 375 });
  await page.clock.runFor(100);
  await expect(page.locator("#scene")).toHaveText("Paused");
  await expect(page.locator("#resume")).toBeVisible();
});

for (const viewport of [
  { width: 320, height: 568 },
  { width: 360, height: 640 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
]) {
  test(`portrait play fits at ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.clock.install();
    await page.goto("/");
    if (viewport.height >= 812) {
      await expectInsideViewport(page.locator("#peek"));
    }
    for (const pairs of [4, 6, 8]) {
      await page
        .getByRole("button", { name: `${pairs} pairs`, exact: true })
        .click();
      await page.locator(".play-area").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "Show me the pictures" }).click();
      await expectInsideViewport(page.locator("#board"));
      await expectInsideViewport(page.locator("#peek"));
      for (const card of await page.locator(".card").all()) {
        const box = await card.boundingBox();
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(
          await card.evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
        ).toBe(true);
      }
      await page.getByRole("button", { name: "Hide the pictures" }).click();
    }

    await page.goto("/glance.html");
    await expect(page.locator("#play-guide")).not.toHaveAttribute("open");
    if (viewport.height >= 812)
      await expectInsideViewport(page.locator("#start"));
    await page.locator("#play-guide > summary").click();
    await expect(page.locator("#samples")).toBeVisible();
    await page.locator("#play-guide > summary").click();
    await page.locator("#task").selectOption("both");
    await page.locator("#spread").selectOption("wide");
    await page.getByRole("button", { name: "Practise first" }).click();
    await expect(page.locator(".intro")).toBeHidden();
    await expectInsideViewport(page.locator("#pause"));
    await page.clock.runFor(1500);
    const insect = await page.locator(".insect").boundingBox();
    const scene = await page.locator("#scene").boundingBox();
    expect(insect.x).toBeGreaterThanOrEqual(scene.x);
    expect(insect.y).toBeGreaterThanOrEqual(scene.y);
    expect(insect.x + insect.width).toBeLessThanOrEqual(scene.x + scene.width);
    expect(insect.y + insect.height).toBeLessThanOrEqual(
      scene.y + scene.height,
    );
    await page.clock.runFor(2500);
    await expectInsideViewport(page.locator("#choices"));
    await page.locator(".flower-button").first().click();
    await expectInsideViewport(page.locator(".directions"));
    await page.locator(".directions button").first().click();
    await expectInsideViewport(page.locator("#next"));
    await page.getByRole("button", { name: "Finish practice" }).click();
    await expect(page.locator(".intro")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
