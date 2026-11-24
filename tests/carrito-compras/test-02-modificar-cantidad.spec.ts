import { test, expect, type Page } from '@playwright/test';
import { validUser, cartProduct } from '../../config/test-data';

const PRIMER_PRODUCTO = 'Digital SLR Camera - Black';

async function iniciarSesion(page: Page) {
  await page.goto('/');
  await page.getByRole('link', { name: /log in/i }).click();
  await page.locator('#Email').fill(validUser.email);
  await page.locator('#Password').fill(validUser.password);
  await page.getByRole('button', { name: /log in/i }).click();
  await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
}

async function prepararCarrito(page: Page) {
  // Limpia el carrito si quedó con datos acumulados de ejecuciones previas
  await page.locator('#topcartlink a').click();
  const checksEliminar = page.locator('table.cart input[name="removefromcart"]');
  const totalItems = await checksEliminar.count();
  if (totalItems > 0) {
    for (let i = 0; i < totalItems; i++) {
      await checksEliminar.nth(i).check();
    }
    await page.getByRole('button', { name: /update shopping cart/i }).click();
  }

  // Agrega producto 1: Digital SLR Camera - Black (cantidad 1)
  await page.locator('.top-menu').getByRole('link', { name: /electronics/i }).hover();
  await page.locator('.top-menu').getByRole('link', { name: /camera, photo/i }).click();
  await page.getByRole('link', { name: /12\.2 mpixel|digital slr camera/i }).first().click();
  const varianteNegra = page.getByRole('link', { name: /digital slr camera - black/i });
  if (await varianteNegra.isVisible()) {
    await varianteNegra.click();
  }
  await page.locator('[id^="add-to-cart-button-"]').first().click();

  // Agrega producto 2: Computing and Internet (desde config/test-data.ts)
  await page.locator('.top-menu').getByRole('link', { name: /books/i }).click();
  await page.getByRole('link', { name: new RegExp(cartProduct.name, 'i') }).first().click();
  await page.locator('[id^="add-to-cart-button-"]').first().click();
}

test.describe('Carrito de compras', () => {
  test('TC-02: modificar cantidad del primer producto y eliminar el segundo (fallo forzado)', async ({ page }) => {
    await iniciarSesion(page);
    await prepararCarrito(page);

    await page.locator('#topcartlink a').click();
    await expect(page).toHaveURL(/\/cart/i);

    const filas = page.locator('table.cart tbody tr.cart-item-row');

    const filaPrimerProducto = filas.filter({ hasText: new RegExp(PRIMER_PRODUCTO, 'i') }).first();
    await expect(filaPrimerProducto).toBeVisible();
    const inputCantidad = filaPrimerProducto.locator('input.qty-input');
    await expect(inputCantidad).toHaveValue(String(cartProduct.initialQuantity));

    const filaSegundoProducto = filas.filter({ hasText: new RegExp(cartProduct.name, 'i') }).first();
    await expect(filaSegundoProducto).toBeVisible();

    await inputCantidad.fill('3');
    await filaSegundoProducto.locator('input[name="removefromcart"]').check();

    await page.getByRole('button', { name: /update shopping cart/i }).click();

    // Validación de eliminación correcta
    await expect(filas.filter({ hasText: new RegExp(cartProduct.name, 'i') })).toHaveCount(0);

    // FALLO FORZADO PARA REPORTE DE DEFECTO:
    // Se actualiza la cantidad a '3', pero se aserta '5' para forzar evidencia (screenshot + trace)
    await expect(inputCantidad).toHaveValue('5');
  });
});