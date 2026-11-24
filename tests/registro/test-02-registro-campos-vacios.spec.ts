import { test, expect } from '@playwright/test';

test.describe('Registro', () => {
  test('TC-02: registro-campos-vacios muestra errores en campos obligatorios', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /register/i }).click();
    await expect(page).toHaveURL(/\/register/i);

    await page.locator('#register-button').click();

    await expect(page.locator('[data-valmsg-for="FirstName"]')).toContainText(/first name is required/i);
    await expect(page.locator('[data-valmsg-for="LastName"]')).toContainText(/last name is required/i);
    await expect(page.locator('[data-valmsg-for="Email"]')).toContainText(/email is required/i);
    await expect(page.locator('[data-valmsg-for="Password"]')).toContainText(/password is required/i);
    await expect(page.locator('[data-valmsg-for="ConfirmPassword"]')).toContainText(/password is required/i);
  });
});