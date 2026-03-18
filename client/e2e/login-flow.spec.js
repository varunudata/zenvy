// @ts-check
const { test, expect } = require('@playwright/test');

test('Login -> Action -> Result user flow', async ({ page }) => {
    // --- 1. LOGIN ---
    await page.goto('/login');

    // Verify Login UI
    await expect(page.locator('h2').first()).toContainText('Welcome Back');

    // Fill credentials and click "Sign In"
    await page.getByPlaceholder('eleanor@example.com').fill('demo@zenvy.com');
    await page.getByPlaceholder('••••••••').fill('devpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // --- 2. ACTION ---
    // Verify successful redirect to Shop
    await expect(page).toHaveURL(/.*\/shop/);

    // Shop page should have products rendered
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();

    // Click on the first product
    await firstProduct.click();

    // --- 3. RESULT ---
    // We should be on the product details page
    await expect(page).toHaveURL(/.*\/product\/\d+/);

    // The title of the product and Add to Cart button should be visible
    await expect(page.locator('h1')).toBeVisible();

    // Select a size (e.g., 'L')
    const sizeButton = page.getByRole('button', { name: 'L', exact: true });
    await sizeButton.click();
    await expect(sizeButton).toHaveClass(/bg-black/); // The class changes on selection

    // Click Add to Cart
    const addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartBtn).toBeEnabled();
    await addToCartBtn.click();
});
