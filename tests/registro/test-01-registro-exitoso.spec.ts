import { test, expect } from '@playwright/test';
import { createNewUser } from '../../config/test-data';

test.describe('Registro', () => {
  test('TC-01: registro-exitoso crea una nueva cuenta de usuario', async ({ page }) => {
    const newUser = createNewUser();

    await page.goto('/');
    await page.getByRole('link', { name: /register/i }).click();
    await expect(page).toHaveURL(/\/register/i);

    await page.locator(`#gender-${newUser.gender.toLowerCase()}`).check();
    await page.locator('#FirstName').fill(newUser.firstName);
    await page.locator('#LastName').fill(newUser.lastName);
    await page.locator('#Email').fill(newUser.email);
    await page.locator('#Password').fill(newUser.password);
    await page.locator('#ConfirmPassword').fill(newUser.confirmPassword);

    await page.locator('#register-button').click();

    await expect(page.locator('.result')).toContainText(/your registration completed/i);
    await expect(page.locator('.header-links')).toContainText(newUser.email);
  });
});