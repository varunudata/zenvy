const { test, expect } = require('@playwright/test');

test.describe('Home Page E2E', () => {
  test('should display the hero section and navigate to shop', async ({
    page,
  }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the hero heading is visible
    const heading = page.getByRole('heading', { name: /Define Your/i });
    await expect(heading).toBeVisible();

    // Check if the Explore Collection link is present
    const exploreLink = page.getByRole('link', { name: /Explore Collection/i });
    await expect(exploreLink).toBeVisible();
    await expect(exploreLink).toHaveAttribute('href', '/shop');

    // Click the link and wait for navigation
    // As the /shop page might not be fully implemented or we just want to verify routing,
    // we can just check if clicking works without failing on the destination page errors.
    await exploreLink.click();

    // Verify URL changed to /shop
    await expect(page).toHaveURL(/.*\/shop/);
  });

  test('should display the featured products section', async ({ page }) => {
    await page.goto('/');

    // Check if New Arrivals heading is visible
    const newArrivals = page.getByText(/New Arrivals/i);
    await expect(newArrivals).toBeVisible();

    // Verify there is a View All link
    const viewAllLink = page.getByRole('link', { name: /View All/i });
    await expect(viewAllLink).toBeVisible();
    await expect(viewAllLink).toHaveAttribute('href', '/shop');
  });

  test('should display the editorial section', async ({ page }) => {
    await page.goto('/');

    const editorialHeading = page.getByRole('heading', {
      name: /The Silhouette/i,
    });
    await expect(editorialHeading).toBeVisible();

    const shopEditorial = page.getByRole('link', { name: /Shop Editorial/i });
    await expect(shopEditorial).toBeVisible();
    await expect(shopEditorial).toHaveAttribute('href', '/shop');
  });
});
