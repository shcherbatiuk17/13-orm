# E-Commerce Backend API

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Database Setup](#database-setup)
- [API Routes](#api-routes)
- [Testing](#testing)
- [License](#license)

## Description
As a manager at an internet retail company, you want a back end for your e-commerce website that utilizes the latest technologies. This backend application is built using Express.js and Sequelize, enabling your company to compete effectively with other e-commerce companies.

## Installation
To install and set up the application, follow these steps:

1. Clone the repository to your local machine.
   git clone https://github.com/shcherbatiuk17/13-orm.git
2.  Install the required dependencies.
3. Create an environment variable file (e.g., .env) and add the following information:
        DB_NAME=your_database_name
        DB_USER=your_mysql_username
        DB_PASSWORD=your_mysql_password
4. Set up your MySQL database. Make sure it matches the DB_NAME you provided in the .env file.
5. Seed the database with test data.

## Usage 
[![Video]](https://drive.google.com/file/d/186vTDiUD0KnoRX8F61S6PfLHCIi7oiZc/view)
1. Start the server by running the following command:
        npm start
2. The sequelize models will be synced with MySQL database.
3. Use a Insomnia to test the API.

## Technologies
This application is built using the following technologies:

Node.js
Express.js
Sequelize
MySQL
JavaScript

## Database Setup 
Create a MySQL database and provide the database name, MySQL username, and MySQL password in the .env file.
Use the provided schema and seed commands to set up the database and seed it with test data.

## API Routes 
The API provides the following routes:

GET routes for categories, products, and tags to retrieve data in JSON format.
POST, PUT, and DELETE routes for creating, updating, and deleting data in the database.
Example API routes:

GET /api/categories - Retrieve all categories.
GET /api/products - Retrieve all products.
GET /api/tags - Retrieve all tags.
POST /api/categories - Create a new category.
PUT /api/categories/:id - Update an existing category.
DELETE /api/categories/:id - Delete a category by ID.

## Testing 
Use Insomnia to test your api-routes and verify that you can successfully interact with the database.

## License 
This project is licensed under the MIT license. See the LICENSE file for details