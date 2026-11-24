import { test, expect } from '@playwright/test';
import { validUser } from '../../config/test-data';

test.describe('Login', () => {
  test('TC-01: login-exitoso con correo y contraseña válidos', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /log in/i }).click();
    await expect(page).toHaveURL(/\/login/i);

    await page.locator('#Email').fill(validUser.email);
    await page.locator('#Password').fill(validUser.password);
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page.locator('.header-links')).toContainText(validUser.email);
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
  });
});