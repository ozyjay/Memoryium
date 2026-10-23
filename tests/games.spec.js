const { test, expect } = require("@playwright/test");

test("matching pairs can be revealed and completed without a timer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Memoryium · Matching Pairs");
  await page.getByRole("button", { name: "Show me the pictures" }).click();
  const labels = await page.locator(".card .name").allTextContents();
  const pairs = new Map();
  labels.forEach((name, index) =>
    pairs.set(name, [...(pairs.get(name) || []), index]),
  );
  await page.getByRole("button", { name: "Hide the pictures" }).click();
  for (const indices of pairs.values()) {
    for (const index of indices) await page.locator(".card").nth(index).click();
  }
  await expect(page.locator("#count")).toHaveText("4 of 4 pairs");
  await expect(page.locator(".card.matched")).toHaveCount(8);
  await page.getByRole("button", { name: "Play another game" }).click();
  await expect(page.locator("#count")).toHaveText("0 of 4 pairs");
});

test("mismatches remain visible until the player turns them back", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show me the pictures" }).click();
  const names = await page.locator(".card .name").allTextContents();
  const other = names.findIndex((name) => name !== names[0]);
  await page.getByRole("button", { name: "Hide the pictures" }).click();
  await page.locator(".card").nth(0).click();
  await page.locator(".card").nth(other).click();
  await expect(page.locator(".card.open")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Turn these cards back" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Turn these cards back" })
    .press("Enter");
  await expect(page.locator(".card.open")).toHaveCount(0);
  await expect(page.locator(".card").nth(0)).toBeFocused();
});

test("changing a started game can be cancelled or confirmed", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".card").first().click();
  await page.getByRole("button", { name: "6 pairs", exact: true }).click();
  await page.getByRole("button", { name: "Keep playing" }).click();
  await expect(page.locator(".card.open")).toHaveCount(1);
  await expect(page.locator(".card")).toHaveCount(8);
  await page.getByRole("button", { name: "8 pairs", exact: true }).click();
  await page.getByRole("button", { name: "Start fresh", exact: true }).click();
  await expect(page.locator(".card")).toHaveCount(16);
  await expect(
    page.getByRole("button", { name: "8 pairs", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("Glance samples follow the selected activity and picture theme", async ({
  page,
}) => {
  await page.goto("/glance.html");
  await expect(page.locator("#samples > div")).toHaveCount(4);
  await expect(page.locator("#spread")).toBeDisabled();
  await page.locator("#task").selectOption("both");
  await expect(page.locator("#samples > div")).toHaveCount(5);
  await expect(page.locator("#spread")).toBeEnabled();
  await page.locator("#picture-theme").selectOption("everyday");
  await expect(page.locator("#samples")).toContainText("Clock");
  await page.locator("#task").selectOption("flower");
  await expect(page.locator("#samples")).not.toContainText("Butterfly");
});

test("Glance completes an eight-picture round and starts again", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/glance.html");
  await page.getByRole("button", { name: "Start a short round" }).click();
  for (let i = 0; i < 8; i++) {
    await page.clock.runFor(4000);
    await expect(page.locator("#prompt")).toHaveText(
      "Which picture did you see?",
    );
    await page.locator(".flower-button").first().click();
    await expect(page.locator("#feedback")).toBeVisible();
    await page.locator("#next").click();
  }
  await expect(page.locator("#summary")).toBeVisible();
  await expect(page.locator("#score")).toHaveText(/^[0-8] of 8$/);
  await page.getByRole("button", { name: "Play another round" }).click();
  await expect(page.locator("#round-label")).toHaveText("Picture 1 of 8");
});

test("practice supports butterfly answers and discards interrupted pictures", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/glance.html");
  await page.locator("#task").selectOption("both");
  await page.getByRole("button", { name: "Practise first" }).click();
  await page.clock.runFor(2000);
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.clock.runFor(5000);
  await expect(page.locator("#scene")).toHaveText("Paused");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator("#round-label")).toHaveText("Practice · picture 1");
  await page.clock.runFor(4000);
  await page.locator(".flower-button").first().click();
  await expect(page.locator(".directions button")).toHaveCount(8);
  await page.locator(".directions button").first().click();
  await expect(page.locator("#feedback")).toContainText("butterfly:");
  await page.getByRole("button", { name: "Finish practice" }).click();
  await expect(page.locator("#setup")).toBeVisible();
});

test("navigation and assets work under a hosting subfolder", async ({
  page,
}) => {
  await page.route("**/memoryium/**", async (route) => {
    const target = new URL(route.request().url());
    target.pathname = target.pathname.replace(/^\/memoryium/, "");
    const response = await route.fetch({ url: target.toString() });
    await route.fulfill({ response });
  });
  await page.goto("/memoryium/index.html");
  await expect(page.locator(".card")).toHaveCount(8);
  await page.getByRole("link", { name: "Glance", exact: true }).click();
  await expect(page).toHaveURL(/\/memoryium\/glance.html$/);
  await expect(page.locator("#samples > div")).toHaveCount(4);
  await page.getByRole("link", { name: "Matching Pairs", exact: true }).click();
  await expect(page).toHaveURL(/\/memoryium\/index.html$/);
});

test("both activities fit a narrow phone screen", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ["/", "/glance.html"]) {
    await page.goto(path);
    const fits = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(fits).toBe(true);
    await expect(page.getByRole("navigation", { name: "Games" })).toBeVisible();
  }
});
