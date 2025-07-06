# Roommate Finder Backend

A Node.js/Express backend server for the Roommate Finder application.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/roommate-finder
   NODE_ENV=development
   ```

3. **Run the server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── roommate.js        # Roommate business logic
│   └── analytics.js       # Analytics business logic
├── middleware/
│   ├── errorHandler.js    # Error handling middleware
│   └── validator.js       # Input validation middleware
├── models/
│   └── Roommate.js        # Database schema
├── routes/
│   ├── roommates.js       # Roommate API routes
│   └── analytics.js       # Analytics API routes
├── utils/
│   └── helpers.js         # Utility functions
├── app.js                 # Express app configuration
├── index.js               # Server entry point
└── package.json           # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (auto-restart)
- `npm test` - Run tests

## 📚 API Endpoints

### Roommates
- `GET /api/roommates` - Get all roommates
- `GET /api/roommates/:id` - Get roommate by ID
- `POST /api/roommates` - Create new roommate listing
- `PUT /api/roommates/:id` - Update roommate listing
- `DELETE /api/roommates/:id` - Delete roommate listing
- `PATCH /api/roommates/:id/like` - Like/unlike roommate

### Analytics
- `GET /api/analytics` - Get platform analytics
- `GET /api/dashboard/stats` - Get user dashboard stats
- `GET /api/my-listings` - Get user's listings
- `GET /api/all-items` - Get all items with pagination

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/roommate-finder |
| `NODE_ENV` | Environment mode | development |

## 📦 Dependencies

- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🌐 Deployment

The server is configured for deployment on platforms like:
- Render
- Heroku
- Railway
- DigitalOcean

Make sure to set environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
