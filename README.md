# E-Commerce Fragrance Store

A modern, feature-rich E-Commerce fragrance store built with **React**, **Redux Toolkit**, **GraphQL with Apollo server**, **ExpressJS**, **NodeJS**, **Stripe**, **PayPal**, **JWT**, and **MongoDB**. This project allows users to browse, search, and purchase fragrances, offering a seamless shopping experience with secure payments and advanced features such as promotions, discounts, and wishlist management.

---

## Features

- **Product Catalog**: Browse a wide selection of fragrances with images, descriptions, pricing, and promotional details.
- **Search & Filters**: Filter products by category, brand, price range, and promotional discounts.
- **User Authentication**: Secure registration and login with **JWT** authentication (supports **Google OAuth** and **Facebook OAuth**).
- **Shopping Cart**: Add products to the cart, update quantities, and proceed to checkout.
- **Secure Payments**: Choose between payment methods via **Stripe** or **PayPal**.
- **Order Management**: Track the status of current orders and view order history.
- **Wishlist**: Save favorite products for future purchase.
- **Promotions**: Manage promotional codes and set up discounts for products, categories, or brands.
- **Product Reviews**: Customers can leave reviews and rate fragrances.
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices.
- **Efficient Data Management with Redux Toolkit & GraphQL**: Main application state is managed with **Redux Toolkit**, while **GraphQL** is used selectively for specific data fetching needs, ensuring optimized performance for complex queries or real-time data requirements.
- **Global State Management**: Leverage **Redux Toolkit** and **Context API** for seamless management of cart, wishlist, and user data.
- **Enhanced Search with Elasticsearch**: Enable advanced search capabilities with **Elasticsearch**, ensuring fast and accurate results.

---

## Tech Stack

### Frontend

- **React**: A modern framework for building scalable user interfaces.
- **Redux Toolkit**: For state management of cart, orders, and user authentication.
- **TailwindCSS**: Utility-first CSS framework for responsive design.
- **Material UI**: Pre-built React components for fast development.
- **Jest & RTL (React Testing Library)**: For unit and integration testing of components.
- **Cypress**: End-to-end testing for a seamless user experience.
- **Helmet**: For improving security by setting HTTP headers.

### Backend

- **Node.js**: For server-side logic.
- **Express.js**: Lightweight framework for building API routes.
- **MongoDB**: NoSQL database for storing product data, user information, orders, and promotions.
- **Redis**: For caching frequently accessed data (e.g., products and promotions).
- **GraphQL & Apollo Server**: For efficient data fetching and mutation.
- **Elasticsearch**: For advanced and fast search functionalities.
- **JWT**: JSON Web Tokens for secure user authentication and API protection.
- **Zod**: For request validation and schema enforcement.
- **Express-Rate-Limit**: To prevent abuse of API endpoints.
- **Multer**: For handling file uploads (e.g., product images).
- **Stripe & PayPal**: For secure payment processing.

### CI/CD & DevOps

- **GitHub**: For version control and CI/CD pipelines.
- **Docker**: For containerized application development and deployment.
- **Postman**: For API testing and debugging.

---
