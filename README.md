# bike store backend

# Store Backend

This repository contains the backend of a store management application. It provides APIs to manage products, orders, revenue, and other store-related operations. Built with **Node.js**, **Express**, and **MongoDB**, the application follows best practices for scalability and maintainability.

---

## Features

-   **Products Management**:

    -   Add, update, delete, and retrieve products.
    -   Fetch product details by ID or category.

-   **Orders Management**:

    -   Create and manage customer orders.
    -   Calculate total revenue from orders.

-   **Revenue Calculation**:

    -   Aggregate total revenue generated from all orders.

-   **Validation**:

    -   Data validation using **Zod** to ensure consistency.

-   **Database**:
    -   MongoDB as the primary database.
    -   Schema-based modeling with Mongoose.

---

## Tech Stack

-   **Node.js**: Backend runtime.
-   **Express**: Fast, unopinionated web framework.
-   **MongoDB**: NoSQL database for storing data.
-   **Mongoose**: ODM for MongoDB to define schemas and perform database operations.
-   **Zod**: Validation library for handling data integrity.

## Installation

**Clone the repository**:

```bash
git clone https://github.com/apponislam/bike-store-backend.git
cd bike-store-backend
```

Follow these steps to set up and run the project:

```bash
# Install dependencies
npm install

# Setup environment variables
# Create a .env file in the root directory and add the following variables:
# PORT=5000
# MONGODB_URI=your-mongodb-connection-string

# Authentication
# BCRYPT_SALT_ROUNDS=12
# JWT_SECRET=your_jwt_secret
# JWT_REFRESH_SECRET=your_refresh_secret
# JWT_ACCESS_EXPIRE=30d
# JWT_REFRESH_EXPIRE=365d

# Payment Gateway
# SP_ENDPOINT=https://sandbox.shurjopayment.com
# SP_USERNAME=your_sp_username
# SP_PASSWORD=your_sp_password
# SP_PREFIX=SP
# SP_RETURN_URL=https://your-frontend-url/order/verify


# Start the development server
npm run start:dev

# Build the project for production
npm run build

# Start the production server
npm start
```

## API Endpoints

# API Endpoints

## Products

| Method | Endpoint                          | Description                     | Auth Required |
| ------ | --------------------------------- | ------------------------------- | ------------- |
| POST   | `/api/products`                   | Create a new product            | ✅ Yes        |
| GET    | `/api/products`                   | Retrieve all products           | ❌ No         |
| GET    | `/api/productsBrand`              | Retrieve all product brands     | ❌ No         |
| GET    | `/api/products/:productId`        | Retrieve a single product by ID | ❌ No         |
| PUT    | `/api/products/:productId`        | Update a product by ID          | ✅ Yes        |
| PUT    | `/api/products/:productId/delete` | Soft-delete a product by ID     | ✅ Yes        |

---

## Users

| Method | Endpoint                           | Description                     | Auth Required |
| ------ | ---------------------------------- | ------------------------------- | ------------- |
| GET    | `/api/users`                       | Retrieve all users (admin only) | ✅ Yes        |
| POST   | `/api/users/register`              | Register a new user             | ❌ No         |
| POST   | `/api/users/login`                 | Login a user                    | ❌ No         |
| POST   | `/api/users/refresh-token`         | Refresh access token            | ❌ No         |
| POST   | `/api/users/change-password`       | Change password                 | ✅ Yes        |
| PUT    | `/api/users/change-status/:userId` | Toggle user status              | ✅ Yes        |

---

## Orders

| Method | Endpoint                      | Description                             | Auth Required |
| ------ | ----------------------------- | --------------------------------------- | ------------- |
| GET    | `/api/order/verify`           | Verify payment for an order             | ✅ Yes        |
| POST   | `/api/order`                  | Create a new order                      | ✅ Yes        |
| GET    | `/api/order`                  | Retrieve all orders (admin or user)     | ✅ Yes        |
| GET    | `/api/orders`                 | Retrieve all orders for a specific user | ✅ Yes        |
| PATCH  | `/api/orders/:orderId/cancel` | Cancel an order                         | ✅ Yes        |
| PUT    | `/api/orders/:orderId/update` | Update order status by admin            | ✅ Yes        |

---

### Auth Key

✅ = Authentication required  
❌ = No authentication required

---# API Endpoints

## Products

| Method | Endpoint                          | Description                     | Auth Required |
| ------ | --------------------------------- | ------------------------------- | ------------- |
| POST   | `/api/products`                   | Create a new product            | ✅ Yes        |
| GET    | `/api/products`                   | Retrieve all products           | ❌ No         |
| GET    | `/api/productsBrand`              | Retrieve all product brands     | ❌ No         |
| GET    | `/api/products/:productId`        | Retrieve a single product by ID | ❌ No         |
| PUT    | `/api/products/:productId`        | Update a product by ID          | ✅ Yes        |
| PUT    | `/api/products/:productId/delete` | Soft-delete a product by ID     | ✅ Yes        |

---

## Users

| Method | Endpoint                           | Description                     | Auth Required |
| ------ | ---------------------------------- | ------------------------------- | ------------- |
| GET    | `/api/users`                       | Retrieve all users (admin only) | ✅ Yes        |
| POST   | `/api/users/register`              | Register a new user             | ❌ No         |
| POST   | `/api/users/login`                 | Login a user                    | ❌ No         |
| POST   | `/api/users/refresh-token`         | Refresh access token            | ❌ No         |
| POST   | `/api/users/change-password`       | Change password                 | ✅ Yes        |
| PUT    | `/api/users/change-status/:userId` | Toggle user status              | ✅ Yes        |

---

## Orders

| Method | Endpoint                      | Description                             | Auth Required |
| ------ | ----------------------------- | --------------------------------------- | ------------- |
| GET    | `/api/order/verify`           | Verify payment for an order             | ✅ Yes        |
| POST   | `/api/order`                  | Create a new order                      | ✅ Yes        |
| GET    | `/api/order`                  | Retrieve all orders (admin or user)     | ✅ Yes        |
| GET    | `/api/orders`                 | Retrieve all orders for a specific user | ✅ Yes        |
| PATCH  | `/api/orders/:orderId/cancel` | Cancel an order                         | ✅ Yes        |
| PUT    | `/api/orders/:orderId/update` | Update order status by admin            | ✅ Yes        |

---

### Auth Key

✅ = Authentication required  
❌ = No authentication required

---
