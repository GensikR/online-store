# 🛍️ Online Store Frontend

This is the frontend of a modern e-commerce platform built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Redux Toolkit**, and **React Router**.

It includes routes and setup for home, products, cart, checkout, orders, and more. The UI is styled with utility-first Tailwind and designed to integrate with a backend (Spring Boot, Node, etc.).

---

## 🚀 Tech Stack

- ⚛️ React 19 + TypeScript
- 🧠 Redux Toolkit (for global state)
- 🎯 React Router DOM
- 💅 Tailwind CSS (utility-first styling)
- 📋 React Hook Form (form handling)
- 🌐 Vite (build tool)
- 🔐 Auth-ready architecture
- 📦 Ready for integration with real or mock APIs

---

## 📁 Folder Structure

src/
├── assets/ # Images, logos, etc.
├── components/ # Reusable UI (Navbar, ProductCard, etc.)
├── hooks/ # Custom hooks
├── lib/ # API clients, utilities
├── pages/ # Route views (Home, Cart, Profile, etc.)
│ ├── Home.tsx
│ ├── Products.tsx
│ ├── ProductDetail.tsx
│ ├── Cart.tsx
│ ├── Checkout.tsx
│ ├── Orders.tsx
│ ├── OrderDetail.tsx
│ ├── Profile.tsx
│ ├── Login.tsx / Register.tsx
├── store/ # Redux slices and store config
├── App.tsx # Routing and layout
├── main.tsx # Entry point
└── index.css # Tailwind base layer


---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:yourusername/online-store-frontend.git
cd online-store-frontend

2. Install dependencies

npm install

3. Create a .env file

VITE_API_URL=https://your-api-url.com/api

    For development, you can use a mock API like https://dummyjson.com.

4. Run the app

npm run dev

App runs at http://localhost:5173
📦 Features

    ✅ Fully functional routing (React Router)

    ✅ Global state with Redux Toolkit

    ✅ Tailwind styling ready

    ✅ Form support via React Hook Form

    ✅ Environment-based config via .env

    ✅ Mock API integration compatible

    ✅ Scalable, component-driven structure

    ✅ Mobile-responsive layout

📌 Pages (Planned / Implemented)

    / — Home

    /products — Product listing

    /products/:id — Product detail

    /cart — Shopping cart

    /checkout — Checkout form

    /orders — Order history

    /orders/:id — Order details

    /profile — User profile

    /login, /register — Auth routes

🧪 Testing (Planned)

    Unit + integration tests via vitest

    Form validation tests

    Redux slice unit tests

🛠 TODO

Connect to real backend API

Add authentication

Setup protected routes

Save cart to localStorage

UI polish (animations, transitions)

Loading & error states