import { test, expect, type Page } from '@playwright/test';
import { validUser } from '../../config/test-data';

async function iniciarSesion(page: Page) {
  await page.goto('/');
  await page.getByRole('link', { name: /log in/i }).click();
  await page.locator('#Email').fill(validUser.email);
  await page.locator('#Password').fill(validUser.password);
  await page.getByRole('button', { name: /log in/i }).click();
  await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
}

test.describe('Carrito de compras', () => {
  test('TC-01: agregar-producto y salir con continuar comprando', async ({ page }) => {
    await iniciarSesion(page);

    await page.locator('.top-menu').getByRole('link', { name: /electronics/i }).hover();
    await page.locator('.top-menu').getByRole('link', { name: /camera, photo/i }).click();

    await page.getByRole('link', { name: /12\.2 mpixel|digital slr camera/i }).first().click();

    const varianteNegra = page.getByRole('link', { name: /digital slr camera - black/i });
    if (await varianteNegra.isVisible()) {
      await varianteNegra.click();
    }
    await page.locator('[id^="add-to-cart-button-"]').first().click();

    await page.locator('#topcartlink a').click();
    await expect(page).toHaveURL(/\/cart/i);

    await expect(page.locator('table.cart')).toContainText(/digital slr camera/i);
    await page.getByRole('button', { name: /continue shopping/i }).click();
    await expect(page).not.toHaveURL(/\/cart/i);
  });
});