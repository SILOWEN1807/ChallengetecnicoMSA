Challenge Tecnico — Playwright + TypeScript

Suite de pruebas automatizadas E2E desarrollada con **Playwright** y **TypeScript** sobre **Tricentis Demo Web Shop**, cubriendo los módulos de **Login**, **Registro** y **Carrito de compras**.

## Estructura del proyecto
- `playwright.config.ts`: Configuración global del runner, `baseURL` (vinculada a `config/env.ts`), capturas en fallo y trazas.
- `config/`: Configuración de entorno (`env.ts`) y datos/helpers de prueba (`test-data.ts`).
- `tests/` (o carpetas por módulo):
  - **Login:** `test-01-login-exitoso`, `test-02-login-campos-vacios`
  - **Registro:** `test-01-registro-exitoso`, `test-02-registro-campos-vacios`
  - **Carrito de compras:** `test-01-agregar-producto`, `test-02-modificar-cantidad`

## Requisitos previos e instalación

1. Tener **Node.js** instalado.
2. Instalar dependencias del proyecto desde PowerShell en la carpeta del challenge:

```powershell
npm install