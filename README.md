# Fic Service

Microservicio NestJS para la gestión de Fondos de Inversión Colectiva (FIC). Expone catálogos de fondos, órdenes, cuentas, transacciones y perfiles de riesgo sobre una base de datos PostgreSQL mediante Prisma.

## Requisitos

- Node.js 18+
- PostgreSQL
- Variable `DATABASE_URL` apuntando a la instancia con esquema `fic`

## Instalación

```bash
npm install
```

## Prisma

```bash
# Generar cliente
npx prisma generate

# Crear migración (pendiente de ejecutar)
npx prisma migrate dev --name init
```

## Ejecución

```bash
npm run start:dev
```

## Endpoints principales

- `GET /fic/funds` – catálogo de fondos
- `POST /fic/orders` – crear orden FIC
- `PATCH /fic/orders/:id/status` – actualizar estado
- `GET /fic/accounts` / `POST /fic/accounts` – cuentas del inversionista
- `GET /fic/accounts/:accountId/transactions` – movimientos
- `POST /fic/accounts/:accountId/transactions` – registrar movimiento
- `POST /fic/risk-profiles` – gestionar perfil de riesgo

Consulta los DTOs en `src/**/dto` para requisitos de payload.
