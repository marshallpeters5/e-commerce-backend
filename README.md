# E-commerce Backend

This is a backend application for an e-commerce website. It provides a RESTful API for managing categories, products, and tags. The application is built using Node.js, Express.js, and Sequelize ORM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this application locally, you need to have the following prerequisites installed:

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

Please follow the steps below to install and set up the application:

1. Clone the repository:

   ```shell
   git clone https://github.com/marshallpeters5/e-commerce-backend.git
   ```

2. Navigate to the project directory:
   cd e-commerce-backend

3. Set up the database:

- Create a new MySQL database.
- Update the database credentials in the .env file.

4. Seed the database with test data:

    ```shell
    node seeds/index.js
    ```

5. Start the application:

    ```shell
    node server.js
    ```

6. The application will be running at http://localhost:3001.

## Usage
The application provides a RESTful API for managing categories, products, and tags. You can use tools like Insomnia or Postman to interact with the API endpoints.

## API Routes
The following API routes are available:

/api/categories: CRUD operations for categories.
/api/products: CRUD operations for products.
/api/tags: CRUD operations for tags.
For detailed information on each route and the expected request/response formats, please refer to the API documentation.

## Database Schema
The application uses a MySQL database to store the data. The database schema consists of four tables: Category, Product, Tag, and ProductTag. The relationships between the tables are as follows:

A category can have many products.
A product belongs to a category.
A product can have multiple tags.
A tag can be associated with multiple products.

## License
MIT

## Credit
Thanks to the entire BCS and UCF team for giving me the support I need to complete this project.
