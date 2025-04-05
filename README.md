# Wedding Sales Quiz App - Website

This is the React frontend for the Wedding Sales Quiz App.

## Local Development

1. Install dependencies: `npm install`
2. Copy the example environment file: `cp .env.example .env.development`
3. Update the environment variables in `.env.development` with your Firebase configuration
4. Start the development server: `npm start`

## Building for Production

1. Copy the example environment file: `cp .env.example .env.production`
2. Update the environment variables in `.env.production` with your Firebase configuration
3. Build the app: `npm run build`

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Choose your repository
5. Configure the build settings:
   - Base directory: `website`
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables in the Netlify UI (copy from `.env.production`)
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login to Netlify: `netlify login`
3. Initialize Netlify: `netlify init`
4. Deploy: `netlify deploy --prod`

## Environment Variables

The following environment variables are required:

- `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID
- `REACT_APP_FIREBASE_MEASUREMENT_ID`: Your Firebase measurement ID
