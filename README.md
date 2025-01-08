# Content Creator Platform - Backend

A robust Node.js/Express.js backend powering the Content Creator Platform, designed for scalability and performance.

## 🎯 Features

- **Content Management System:** API endpoints for content operations
- **User Authentication:** Secure authentication system
- **Analytics Service:** Track and analyze user engagement
- **Media Processing:** Handle media uploads and processing
- **Caching System:** Optimized performance with caching
- **Azure Integration:** Cloud storage and services integration

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Cloud Platform:** Microsoft Azure
- **Caching:** Redis (optional)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/Risabkshetri/content-creator-backend.git
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Content Management
- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### User Management
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Analytics
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/engagement` - Get engagement metrics

## 📁 Project Structure

```
src/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── services/       # Business logic
├── config/         # Configuration
└── utils/          # Utility functions
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port |
| MONGODB_URI | MongoDB connection string |
| AZURE_STORAGE_CONNECTION_STRING | Azure storage connection |
| JWT_SECRET | JWT secret key |

## 📈 Scaling Considerations

- Implemented caching for frequently accessed data
- Azure autoscaling configuration
- Rate limiting on API endpoints
- Database indexing for optimal performance
