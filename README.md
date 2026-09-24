# 🛒 ShopAI — AI-Powered E-Commerce Platform

ShopAI is a full-stack e-commerce web application built with **React**, **FastAPI**, and **MongoDB**. The project is being developed with a modular architecture so that authentication, products, cart, orders, payments, and AI-powered shopping assistance can be added progressively.

> 🚧 **Project Status:** In Development

---

## ✨ Features

### Currently Implemented
- ⚛️ React + Vite frontend
- 🚀 FastAPI backend
- 🍃 MongoDB Atlas database
- 🔐 User registration and login
- 🔑 JWT-based authentication
- 🔒 Argon2 password hashing
- 👤 Protected `/api/auth/me` endpoint
- 🌐 CORS configuration for frontend-backend communication
- 🧪 REST Client API testing

### Planned
- 🛍️ Product management
- 🔎 Product search and filtering
- 🛒 Persistent shopping cart
- 📦 Order management
- 💳 Razorpay payment integration
- 🤖 AI shopping assistant
- 🧠 AI-based product recommendations
- 👨‍💼 Admin dashboard
- 📱 Responsive UI
- ☁️ Production deployment

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Lucide React
- CSS

### Backend
- Python
- FastAPI
- Uvicorn
- PyMongo
- PyJWT
- Pydantic
- pwdlib
- Argon2

### Database
- MongoDB Atlas

### Authentication
- JWT
- Argon2 password hashing

### Development Tools
- VS Code
- REST Client extension
- Git / GitHub

---

## 📁 Project Structure

```text
ECommerce/
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   └── mongodb.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── auth.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── auth.py
│   │   │
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   └── security.py
│   │   │
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── .env
│   ├── api.http
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔐 Authentication Flow

ShopAI uses JWT authentication with Argon2 password hashing.

### Registration

```text
React / REST Client
        ↓
POST /api/auth/register
        ↓
FastAPI
        ↓
Validate request
        ↓
Hash password using Argon2
        ↓
Save user
        ↓
MongoDB Atlas
```

### Login

```text
React
  ↓
POST /api/auth/login
  ↓
Find user in MongoDB
  ↓
Verify password
  ↓
Generate JWT
  ↓
Return access token
```

### Protected Request

```text
React
  ↓
Authorization: Bearer <JWT>
  ↓
FastAPI
  ↓
Verify JWT
  ↓
Extract User ID
  ↓
MongoDB
  ↓
Return authenticated user
```

---

# 🗄️ MongoDB Structure

The current database is:

```text
shopai
├── users
├── products
└── orders
```

### Users

A user document looks approximately like:

```json
{
  "_id": "ObjectId(...)",
  "name": "Pratham",
  "email": "pratham@example.com",
  "password_hash": "$argon2id$..."
}
```

Passwords are never stored as plain text.

---

# ⚙️ Backend Setup

## 1. Clone the repository

```bash
git clone https://github.com/kumarpratham/ECommerce
cd ECommerce
```

## 2. Create and activate virtual environment

Windows PowerShell:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure environment variables

Create:

```text
backend/.env
```

Add:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
DATABASE_NAME=shopai
JWT_SECRET=your_secret_key
```

### Generate a JWT secret

```powershell
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

⚠️ Never commit `.env` to GitHub.

---

## 5. Start FastAPI

From the `backend` directory:

```powershell
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🧪 API Testing

The project uses the **REST Client** extension in VS Code.

Create/open:

```text
backend/api.http
```

### Health Check

```http
GET http://127.0.0.1:8000/api/health
```

### MongoDB Test

```http
GET http://127.0.0.1:8000/api/db-test
```

### Register

```http
POST http://127.0.0.1:8000/api/auth/register
Content-Type: application/json

{
  "name": "Pratham",
  "email": "pratham@example.com",
  "password": "password123"
}
```

### Login

```http
POST http://127.0.0.1:8000/api/auth/login
Content-Type: application/json

{
  "email": "pratham@example.com",
  "password": "password123"
}
```

### Current User

Replace `YOUR_JWT_TOKEN` with the token returned from login:

```http
GET http://127.0.0.1:8000/api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🔌 Current API Endpoints

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/` | API information | No |
| GET | `/api/health` | Health check | No |
| GET | `/api/db-test` | MongoDB connection test | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | JWT |

---

# 🛒 Frontend Architecture

The frontend uses React with reusable components and Context API for shared application state.

Current frontend areas include:

```text
src/
├── components/
├── context/
├── pages/
├── services/
├── data/
├── App.jsx
└── main.jsx
```

The application currently includes pages/features for:

- Home
- Products
- Product details
- Cart
- Login
- Register

The cart currently uses React state. Persistent cart storage will be connected to the backend later.

---

# 🤖 AI Assistant — Planned

ShopAI will eventually include an AI shopping assistant.

Planned flow:

```text
User
  ↓
React Chat Interface
  ↓
FastAPI
  ↓
AI API
  ↓
Understand user request
  ↓
Search/filter products
  ↓
Generate recommendation
  ↓
React
```

Possible capabilities:

- Product recommendations
- Natural-language product search
- Product comparison
- Shopping assistance
- Personalized suggestions

---

# 💳 Payment — Planned

Payment integration is planned using **Razorpay**.

Expected flow:

```text
Cart
 ↓
Checkout
 ↓
Create Order
 ↓
Razorpay
 ↓
Payment
 ↓
Verify Payment
 ↓
Create/Update Order
```

Payment secrets will remain on the backend.

---

# 🔒 Security

Important security practices:

- Passwords are hashed using Argon2.
- JWT is signed using a server-side secret.
- Secrets are stored in `.env`.
- `.env` must not be committed to GitHub.
- Protected APIs require a valid Bearer token.
- MongoDB credentials must remain private.
- Production deployments should use HTTPS.

---

# 🚀 Development Roadmap

```text
[x] Project setup
[x] React + Vite frontend
[x] FastAPI backend
[x] MongoDB Atlas connection
[x] Database collections
[x] User registration
[x] Password hashing
[x] User login
[x] JWT generation
[x] JWT verification
[x] Protected /me endpoint
[ ] Connect React authentication
[ ] Persistent authentication state
[ ] Product API
[ ] MongoDB product data
[ ] Backend cart
[ ] Order API
[ ] Razorpay integration
[ ] AI shopping assistant
[ ] Admin dashboard
[ ] Testing
[ ] Deployment
```

---

# 🧑‍💻 Development Commands

### Backend

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

### Install frontend dependencies

```bash
npm install
```

### Update backend requirements

```powershell
pip freeze > requirements.txt
```

---

# 📌 Environment

Recommended local development setup:

```text
Frontend:  http://localhost:5173
Backend:   http://127.0.0.1:8000
Database:  MongoDB Atlas
```

---

# 🎯 Project Goal

ShopAI aims to combine a modern e-commerce experience with AI-powered shopping assistance.

The long-term architecture is:

```text
                    ┌───────────────┐
                    │ React Frontend│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ FastAPI       │
                    │ Backend       │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ MongoDB  │  │ AI Layer │  │ Payments │
        │ Atlas    │  │          │  │ Razorpay │
        └──────────┘  └──────────┘  └──────────┘
```

---

## 👨‍💻 Author

**Pratham Kumar**

MCA Student | Software Development & AI Enthusiast

---

## 📄 License

This project is currently being developed for learning and portfolio purposes.
