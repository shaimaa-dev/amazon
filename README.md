

# 🛒 Amazon Clone



## Project Overview

**Amazon Clone** is a **full-featured e-commerce web application** built with **React**, **Tailwind CSS**, **Firebase**, and **Stripe**.
It allows users to **browse products, manage basket items, checkout securely, and track past orders**.

---

## Features & Functionalities

### 1️⃣ User Authentication

* Sign Up, Sign In, and Sign Out with **Firebase Authentication**
* User session persistence across pages

### 2️⃣ Product Management

* Browse products dynamically from **Data.js**
* Display product images, title, price, and ratings
* Add, remove, increment, and decrement items in basket

### 3️⃣ Checkout & Payment

* Review basket items and total amount
* Stripe payment integration for secure checkout
* Payment validation with error handling

### 4️⃣ Orders Management

* Store orders in **Firestore**
* Track orders by user and sort by creation date
* Display order details and total price

### 5️⃣ Responsive Design

* Fully mobile-friendly layout
* Tailwind CSS for modern UI

---

## Tech Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| Frontend      | React, Tailwind CSS, React Router DOM |
| Backend       | Firebase Auth & Firestore             |
| Payments      | Stripe API                            |
| HTTP Requests | Axios                                 |
| Utils         | react-currency-format, moment         |

---

## Screenshots

**Home Page**
![Home](screenshots/home.png)

**Checkout Page**
![Checkout](screenshots/checkout.png)

**Payment Page**
![Payment](screenshots/payment.png)

**Orders Page**
![Orders](screenshots/orders.png)

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/shaimaa-dev/amazon.git
cd amazon
```

2. Install dependencies:

```bash
npm install
```
4. Start development server:

```bash
npm start
```

5. Open your browser and go to `http://localhost:3000`

---

## File Structure

```
src/
├─ components/
│  ├─ Header.js
│  ├─ Home.js
│  ├─ LogIn.js
│  ├─ CheckOut.js
│  ├─ Payment.js
│  ├─ Orders.js
│  ├─ Order.js
│  ├─ Product.js
│  ├─ CheckOutProduct.js
│  └─ SubTotal.js
├─ context/
│  ├─ AppReducer.js
│  └─ GlobalContext.js
|  ___ Data.js
├─ firebase/
│  └─ config.js
├─ asstes/
│  └─ images

├─ App.js
└─ index.js
```

---

## Available Scripts

* `npm start` – Runs the app in development mode
* `npm run build` – Builds the app for production
* `npm test` – Launches the test runner

---

## How It Works

1. **User Authentication**: Users can create an account or log in. Firebase keeps track of session.
2. **Adding Products**: Products can be added to the basket with quantity management.
3. **Checkout**: Users can review their basket, see total, and pay with Stripe.
4. **Order Tracking**: Completed orders are saved in Firebase Firestore and displayed on Orders page.

---

## Author

**Shaimaa Metwaly** – [GitHub](https://github.com/shaimaa-dev)
Portfolio ready for Frontend/React Developer opportunities.

---

 
