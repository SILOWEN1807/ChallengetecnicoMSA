import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('TC-02: login-campos-vacios muestra mensaje de error', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /log in/i }).click();
    await expect(page).toHaveURL(/\/login/i);

    await page.locator('#Email').fill('');
    await page.locator('#Password').fill('');
    await page.getByRole('button', { name: /log in/i }).click();

    const validationSummary = page.locator('.validation-summary-errors');
    await expect(validationSummary).toBeVisible();
    await expect(validationSummary).toContainText(
      /login was unsuccessful|no customer account found/i
    );
  });
});