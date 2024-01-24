# E-Commerce App

## Description

This is a full-stack e-commerce application with a backend and frontend. The app allows users to browse products, add them to the cart, and complete the purchase process.

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB (or your preferred database)
- Mongoose (or your preferred ODM)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Other backend-specific dependencies

### Frontend

- React
- Redux (or your state management library)
- React Router (for navigation)
- Tailwind CSS (or your preferred styling solution)
- Axios (or your preferred HTTP client)
- Other frontend-specific dependencies

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
    - `/styles`: Global styles or styling utilities.
    - `/utils`: Utility functions used in the frontend.
    - `/services`: API services for communicating with the backend.
    - `index.js`: Entry point for the React app.

## Setup

### Backend

1. Navigate to the `/frontend` directory:

   ```bash
   cd frontend
2. Install dependencies:
 `pnpm install`

3. Configure environment variables:
  Create a .env file in the root directory.
  Add necessary environment variables (e.g., database connection twine, JWT secret).

  <img width="340" alt="image" src="https://github.com/aadish-rahman/E-Commerce-App/assets/152465910/6ac6868c-2b3e-45d2-b983-157c3cd5bbbc">

4. Navigate to your base directory 
  run `pnpm run backend` or `pnpm run frontend` to run backend or frontend

## Contributing
Feel free to contribute to the development of this project by submitting pull requests.

