# Setup Guide for Hamdi's Travel Agency Website

This guide will walk you through the process of setting up and running the Hamdi's Travel Agency website on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** Version 18.x or later
*   **npm** or **yarn** or **pnpm**
*   **PostgreSQL:** A running instance of PostgreSQL.
*   **Git**

You will also need accounts for the following services:

*   **Firebase:** For user authentication.
*   **AWS:** For S3 file storage.
*   **Google Cloud Platform:** For Google Maps API.

## 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone <repository-url> # Replace with the actual URL
cd hamdis-travel
```

## 2. Install Dependencies

Install all the necessary project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Now, open `.env.local` and fill in the values for each variable. You will need to get these credentials from your PostgreSQL database, Firebase project, AWS account, and Google Cloud Platform project.

**Example `.env.local`:**

```
# ---- PostgreSQL Database ----
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:5432/hamdis_travel?schema=public"

# ---- Firebase (Client) ----
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
# ... and so on for all variables
```

## 4. Set Up the Database

Run the Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev --name init
```

This command will create the necessary tables in your PostgreSQL database based on the `schema.prisma` file.

Next, seed the database with some initial data (optional but recommended):

```bash
npx prisma db seed
```

## 5. Run the Development Server

Now you are ready to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website live!

## 6. Accessing the Admin Panel

The admin panel is located at `/admin`. To access it, you'll first need to create an admin user. The seed script (`prisma/seed.ts`) creates a default admin user with the credentials you set in your `.env.local` file (`ADMIN_EMAIL` and `ADMIN_PASSWORD`).

1.  Navigate to `/admin/login`.
2.  Use the admin credentials to log in.

## 7. Building for Production

When you are ready to deploy, you can create a production build:

```bash
npm run build
```

This will create an optimized version of your site in the `.next` folder. You can then start the production server:

```bash
npm run start
```

## 8. Deployment

The project is pre-configured for deployment on Vercel. Simply connect your Git repository to a new Vercel project and configure the environment variables in the Vercel project settings. Vercel will automatically detect the Next.js framework and build/deploy your site.
