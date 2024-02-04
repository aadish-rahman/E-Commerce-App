# E-Commerce App

## Description

This is a full-stack e-commerce application with a backend and frontend. The app allows users to browse products, add them to the cart, and complete the purchase process. It also has Admin features.

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- multer

### Frontend

- React
- Redux
- React Router (for navigation)
- Tailwind CSS

## Project Structure

- `/backend`: Backend server code.

  - `/routes`: API routes.
  - `/models`: Database models.
  - `/controllers`: Request handlers.
  - `/middlewares`: Custom middlewares.
  - `/config`: Configuration files.
  - `/utils`: Utility functions.
  - `index.js`: Entry point for the backend server.

- `/frontend`: Frontend React application.

  - `/src`

    - `/components`: Reusable React components.
    - `/pages`: Individual pages of the app.
    - `/redux`: Redux store, actions, and reducers.
    - `main.jsx`: Entry point for the React app.

## Setup

### Backend

1. Navigate to the `/frontend` directory and Install dependencies:

   ```bash
   cd frontend
   ```

   ```bash
   pnpm install
   ```

2. Navigate to base directory and Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a .env file in the root directory.
   Add necessary environment variables (e.g., database connection twine, JWT secret).

  <img width="340" alt="image" src="https://github.com/aadish-rahman/E-Commerce-App/assets/152465910/6ac6868c-2b3e-45d2-b983-157c3cd5bbbc">

4. Navigate to your base directory
   run `pnpm run backend` or `pnpm run frontend` to run backend or frontend

## Contributing

Feel free to contribute to the development of this project by submitting pull requests.
