## 🚀 Getting Started


## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)
- Cloudinary account (for image upload)



### Installation Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/mahmoud2ali/event-booking-system.git
   cd backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory with the following variables:
   ```env
   PORT=8000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the server in development mode**  
   ```bash
   npm run dev
   ```

---


## 📌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive a JWT token

### 🎫 Public Events
- `GET /api/events/` – Get all events

### 🎟️ Event Booking (Requires Authentication)
- `POST /api/events/book/:eventId` – Book a ticket for an event
- `DELETE /api/events/book/:eventId` – Cancel a booking

### 🛠️ Admin Only (Requires Admin Auth)
- `POST /api/events/admin/create` – Create a new event (with optional image)
- `PUT /api/events/admin/update/:eventId` – Update an event (with optional image)
- `DELETE /api/events/admin/delete/:eventId` – Delete an event

> 🛡️ **Note:** Protected routes require a valid JWT token in the header:
> ```
> Authorization: Bearer <your_token>
> ```



## 📁 Project Structure

```
/event-booking system
├── /dataBase Config
├── /controllers
│   ├── authController.js        # Register, Login
│   ├── eventController.js       # Create, Update, Delete, Get Events
│   └── bookingController.js     # Booking and Cancellation
├── /models
│   └── userModel.js             # user schema
│   └── eventModel.js            # Event schema
├── /middleware
│   ├── authMiddleware.js        # Authentication middleware
│   ├── adminMiddleware.js       # Admin check middleware
│   └── imageUpload.js           # Image upload middleware
├── /utils
│   └── cloudinary.js            # Cloudinary image handling
├── /routes
│   ├── authRoute.js             # Authentication routes
│   ├── eventRoute.js            # Event routes
│   └── bookingRoute.js          # Booking routes
├── /imgs                        # Folder for temporary image storage
├── server.js                    # Main server entry point
├── .env                         # Environment variables
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

---


## 🧪 Development Scripts

- `npm run dev` – Start the server using nodemon