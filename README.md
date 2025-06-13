# TechLearn Backend

A learning management system backend built with Node.js, Express, and MongoDB.

## Project Structure

```
techlearn-backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── courseController.js  # Course management
│   ├── postController.js    # Post handling
│   └── progressController.js # Progress tracking
├── middlewares/
│   ├── adminmiddleware.js   # Admin authentication
│   └── auth.js              # User authentication
├── models/
│   ├── Course.js           # Course schema
│   ├── Notes.js            # Notes schema
│   ├── Progress.js         # Progress schema
│   └── User.js            # User schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── courseRoute.js     # Course routes
│   ├── postRoute.js       # Post routes
│   └── progressRoutes.js  # Progress routes
└── server.js              # Main application file
```

## Features

- User Authentication & Authorization
- Course Management
- Notes Management
- Progress Tracking
- Admin Dashboard
- Post Management

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id/notes` - Get course notes
- `POST /courses` - Create course (Admin only)
- `PUT /courses/:id` - Update course (Admin only)
- `DELETE /courses/:id` - Delete course (Admin only)

### Notes
- `POST /courses/:id/notes` - Add note (Admin only)
- `PUT /courses/:courseId/notes` - Update note (Admin only)
- `DELETE /courses/:courseId/notes` - Delete note (Admin only)

### Progress
- `POST /progress` - Update user progress
- `GET /progress/:userId` - Get user progress

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd techlearn-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=4000
MONGO_URI=your_mongodb_uri
SECRET_ACCESS_TOKEN=your_secret_key
```

4. Start the server:
```bash
# Development
npm run devAuthServer

# Production
npm start
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGO_URI` - MongoDB connection string
- `SECRET_ACCESS_TOKEN` - JWT secret key

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcrypt - Password hashing
- cors - CORS middleware
- dotenv - Environment variables

## Scripts

- `npm run devStart` - Start development server
- `npm run devAuthServer` - Start auth server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

ISC

## Author

Srinivas