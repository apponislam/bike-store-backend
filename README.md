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

# Start the development server
npm run start:dev

# Build the project for production
npm run build

# Start the production server
npm start
```

## API Endpoints

### Products

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/products`     | Create a new product.            |
| GET    | `/api/products`     | Retrieve all products.           |
| GET    | `/api/products/:id` | Retrieve a single product by ID. |
| PUT    | `/api/products/:id` | Update a product by ID.          |
| DELETE | `/api/products/:id` | Delete a product by ID.          |

### Orders

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/orders`         | Create a new order.      |
| GET    | `/api/orders`         | Retrieve all orders.     |
| GET    | `/api/orders/revenue` | Calculate total revenue. |
