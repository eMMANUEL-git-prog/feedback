# Feedback Platform

A full-stack feedback collection platform with a separate admin dashboard for managing submissions.

## Project Structure

```
├── /                    # Main feedback form (Next.js - port 3000)
├── /backend             # Express.js API server (port 3001)
├── /admin               # Admin dashboard (Next.js - port 3002)
└── /scripts             # Database migration scripts
```

## Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- PostgreSQL database (Supabase recommended)

## 1. Database Setup

Run the SQL migration script in your Supabase SQL Editor (or any PostgreSQL client):

```sql
-- Located in /scripts/001-create-feedback-table.sql

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
```

## 2. Backend Setup (Express.js API)

```bash
cd backend

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env` with your database credentials:

```env
DATABASE_URL=postgresql://username:password@host:port/database
# Or use individual variables:
DB_HOST=your-supabase-host.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password

PORT=3001
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
```

Start the backend:

```bash
# Development
pnpm dev

# Production
pnpm start
```

The API will be available at `http://localhost:3001`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit new feedback |
| GET | `/api/feedback` | Get all feedback (paginated) |
| GET | `/api/feedback/:id` | Get single feedback by ID |
| DELETE | `/api/feedback/:id` | Delete feedback by ID |
| GET | `/health` | Health check |

## 3. Main App Setup (Feedback Form)

```bash
# From project root
pnpm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the development server:

```bash
pnpm dev
```

The feedback form will be available at `http://localhost:3000`

## 4. Admin Dashboard Setup

```bash
cd admin

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
```

Edit `admin/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the admin dashboard:

```bash
pnpm dev
```

The admin dashboard will be available at `http://localhost:3002`

## Running All Services

Open three terminal windows and run:

```bash
# Terminal 1 - Backend
cd backend && pnpm dev

# Terminal 2 - Main App
pnpm dev

# Terminal 3 - Admin Dashboard
cd admin && pnpm dev
```

## Testing the Setup

### 1. Test Backend Health

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"..."}
```

### 2. Test Submit Feedback

```bash
curl -X POST http://localhost:3001/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test feedback"}'
```

Expected response:
```json
{"success":true,"data":{"id":1,"name":"Test User","email":"test@example.com","message":"This is a test feedback","created_at":"..."}}
```

### 3. Test Get Feedback

```bash
curl http://localhost:3001/api/feedback
```

### 4. Test via UI

1. Open `http://localhost:3000` and submit feedback through the form
2. Open `http://localhost:3002` to view the submitted feedback in the admin dashboard

## Production Deployment

### Deploying to Vercel

**Main App:**
```bash
# From project root
vercel
```

**Admin Dashboard:**
```bash
cd admin
vercel
```

### Deploying Backend

The Express.js backend can be deployed to:
- Vercel (as serverless functions)
- Railway
- Render
- Fly.io
- Any Node.js hosting platform

Remember to set the `NEXT_PUBLIC_API_URL` environment variable in both Vercel projects to point to your deployed backend URL.

## Environment Variables Summary

### Backend (`/backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Full PostgreSQL connection string | Yes (or use individual vars) |
| `DB_HOST` | Database host | If not using DATABASE_URL |
| `DB_PORT` | Database port (default: 5432) | If not using DATABASE_URL |
| `DB_NAME` | Database name | If not using DATABASE_URL |
| `DB_USER` | Database user | If not using DATABASE_URL |
| `DB_PASSWORD` | Database password | If not using DATABASE_URL |
| `PORT` | Server port (default: 3001) | No |
| `CORS_ORIGIN` | Allowed origins for CORS | No |

### Main App (`/.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### Admin Dashboard (`/admin/.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## Troubleshooting

### CORS Errors
Ensure the `CORS_ORIGIN` in your backend `.env` includes the URLs of both the main app and admin dashboard.

### Database Connection Failed
1. Verify your database credentials are correct
2. Ensure your IP is allowlisted in Supabase (if using Supabase)
3. Check that the database is running and accessible

### Port Already in Use
Change the port in the respective `.env` file or kill the process using that port:
```bash
lsof -i :3001  # Find process
kill -9 <PID>  # Kill process
```
# feedback
