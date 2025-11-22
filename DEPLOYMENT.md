# Deployment Guide

This project uses:
- **Aiven** for database hosting
- **Render** for backend hosting
- **Vercel** for frontend hosting

## Setup Instructions

### 1. Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following:
   - **Build Command**: `cd backend && npm install && npx prisma generate`
   - **Start Command**: `cd backend && npm run dev` (or `node server.js` for production)
   - **Environment Variables**:
     - `DATABASE_URL`: Your Aiven database connection string
     - `PORT`: 3001 (or let Render assign it)
     - `NODE_ENV`: production

4. After deployment, note your Render backend URL (e.g., `https://your-app.onrender.com`)

### 2. Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Important**: Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://your-app.onrender.com`)
   - ⚠️ Make sure there's NO trailing slash!

4. Deploy!

### 3. Database Setup (Aiven)

1. Make sure your Aiven database is running
2. Update your backend `.env` file with the Aiven connection string
3. Run migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## Environment Variables Summary

### Backend (Render)
- `DATABASE_URL`: Aiven MySQL connection string
- `PORT`: Server port (optional, Render assigns automatically)
- `NODE_ENV`: production

### Frontend (Vercel)
- `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)

## Testing

After deployment:
1. Test that the frontend can connect to the backend
2. Test API endpoints (login, register, fetch pets, etc.)
3. Check browser console for any CORS errors

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure your backend CORS configuration allows requests from your Vercel domain.

### API Connection Issues
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check that your Render backend is running
- Ensure the backend URL doesn't have a trailing slash

### Database Connection
- Verify `DATABASE_URL` is correct in Render
- Check Aiven database is running and accessible
- Ensure IP whitelisting is configured if needed

