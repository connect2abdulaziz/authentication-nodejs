# Authentication Restful API with JWT, PostgreSQL, Node.js, and Express.js

This project provides a RESTful API for authentication using JWT (JSON Web Tokens), PostgreSQL for database storage, and is built with Node.js and Express.js. Users can buy and sell their projects online through this API.

## Table of Contents

- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)

## Environment Variables

To run this project, you will need to set up the following environment variables. Create a `.env` file in the root of your project and add these variables with appropriate values:

- `NODE_ENV` - Environment mode (`development`, `production`, etc.)
- `APP_PORT` - Port number for the server (e.g., `3000`)
- `DB_USERNAME` - Username for PostgreSQL database
- `DB_PASSWORD` - Password for PostgreSQL database
- `DB_NAME` - Name of the PostgreSQL database
- `DB_HOST` - Hostname for PostgreSQL database
- `DB_PORT` - Port number for PostgreSQL database
- `JWT_SECRET_KEY` - Secret key for JWT encryption
- `JWT_EXPIRES_IN` - Expiration time for JWT tokens (e.g., `7d` for 7 days)
- `ADMIN_EMAIL` - Email address for the admin user
- `ADMIN_PASSWORD` - Password for the admin user

Example `.env` file:

```plaintext
NODE_ENV=development
APP_PORT=3000
DB_USERNAME=myusername
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET_KEY=mysecretkey
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=adminpassword
```

## Installation
Follow these steps to install and set up the project:

Clone the repository:

## bash
Copy code
git clone <your-repo-url>
cd <your-project>
Install dependencies:

## bash
```
Copy code
npm install
Run database migrations:
```

## bash
```
Copy code
npm run migrate
Seed initial data (if applicable):
```

## bash
```
Copy code
npm run seed:all
```

## Authors

👤 **Abdul Aziz**

Hi, I'm Abdul Aziz! I'm an Associate Software Engineer passionate about building scalable and efficient software solutions.

🔗 Connect with me on [LinkedIn](https://linkedin.com/connect2abdulaziz)

