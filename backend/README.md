# 💻 Backend - Event Booking System

This is the backend API for the Event Booking System. It handles user authentication, event management, and event bookings.

---

## 📁 Project Setup

### Prerequisites

- Node.js (v18 or later)
- MongoDB database

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file in the `backend` directory with the following environment variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## 🚀 Running the Server

Start the development server:

```bash
npm run dev
```

The server will start on:  
📍 `http://localhost:8000`

---

## ⚖️ API Overview

### 🔐 Authentication Routes

- `POST api/auth/register` – Register user  
- `POST api/auth/login` – Login user  

---

### 📅 Event Routes

- `GET api/events/` – Get all events  
- `GET api/events/:eventId` – Get single event by ID  

---

### 📝 Booking Route

- `PUT api/book/:eventId` – Book an event *(Protected)*  

---

### 🛠️ Admin Routes

- `POST api/events/admin/create-event` – Create event *(Admin only)*  
- `PUT api/events/admin/update-event/:eventId` – Update event *(Admin only)*  
- `DELETE api/events/admin/delete-event/:eventId` – Delete event *(Admin only)*  

⚠️ *All admin routes are protected and require valid JWT tokens and admin role.*

---

## 📂 Technologies Used

- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT** - Authentication
- **Multer & Cloudinary** - Image upload
- **dotenv** - Environment variable management
- **cookie-parser**, **cors**

---

## 🌐 Deployment

- Backend is deployed on **Render**
- Base URL (in deployment) : https://event-booking-system-rhka.onrender.com

