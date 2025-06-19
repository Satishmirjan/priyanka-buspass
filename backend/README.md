# Bus Pass Management System - Backend

This is the backend API for the Bus Pass Management System. It provides endpoints for user authentication, pass management, and admin operations.

## Setup

1. Install dependencies:

```bash
npm install
npm i 
```

2. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buspass
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

3. Start the server:

```bash
npm start  or npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Passes

- `POST /api/passes` - Create new pass
- `GET /api/passes/my-passes` - Get user's passes
- `GET /api/passes/:id` - Get single pass
- `PATCH /api/passes/:id/status` - Update pass status (admin only)
- `GET /api/passes` - Get all passes (admin only)

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `GET /api/admin/pending-passes` - Get pending passes
- `GET /api/admin/statistics` - Get pass statistics

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
