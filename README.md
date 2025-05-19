# ecommerce-admin-api

A back-end API project that can power a web admin dashboard for e-commerce managers.

# E-commerce Admin Dashboard API

This is a backend API for managing an e-commerce admin dashboard built using **Node.js**, **Express.js**, **Sequelize**, and **MySQL**.

## Features

### 1. Sales Status

- **GET /api/sales** - Filter sales data by date, product, category.
- **GET /api/sales/revenue** - View aggregated revenue (daily, weekly, monthly, yearly).
- **GET /api/sales/revenue/compare** - Compare revenue between two periods.

### 2. Inventory Management

- **GET /api/inventory** - View current stock levels.
- **GET /api/inventory/low-stock** - View low-stock products.
- **PUT /api/inventory/:productId** - Update inventory and log the reason.
- **GET /api/inventory/logs/:productId** - View inventory logs for a product.
- **POST /api/inventory** - Create an inventory record for a product.

### 3. Product Management

- **POST /api/products** - Create a new product.
- **GET /api/products** - List all products.
- **GET /api/products/:id** - View product details.
- **PUT /api/products/:id** - Update product details.
- **DELETE /api/products/:id** - Delete product and its related inventory/logs.

### 4. Category Management

- **POST /api/categories** - Create a new category.
- **GET /api/categories** - List all categories.
- **GET /api/categories/:id** - View category details.
- **PUT /api/categories/:id** - Update category.
- **DELETE /api/categories/:id** - Delete category.

### 5. Dashboard Overview (Optional)

- **GET /api/stats/overview** - Return total sales, revenue, out-of-stock count, etc.

## Setup Instructions

### Prerequisites

- Node.js & npm
- MySQL Server

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file and provide the following variables:

```
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=ecommerce_dashboard_dev
DB_HOST=localhost
DB_DIALECT=mysql
PORT=8080
NODE_ENV=development
```

### Run Database Setup (Creates DB, Runs Migrations, and Seeds)

```bash
npm run db:setup
```

### Run the Server

```bash
npm run dev
```

## Project Structure

```
├── config/
├── controllers/
├── models/
├── routes/
├── seeders/
├── validators/
├── .sequelizerc
├── .env
├── README.md
└── server.js
└── app.js
```

## Postman Collection

A Postman collection is provided to test all endpoints. [Import from Postman Collection JSON]

---

© 2025 E-commerce Admin Dashboard API
