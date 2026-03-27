# Hamdi's Travel Agency Website

This is a complete, full-stack, production-ready travel agency website built with a modern technology stack. It features a beautiful, professional user interface, a comprehensive booking system, and a full-featured admin panel for managing the site's content.

**Live Demo: https://hamdis-travel.vercel.app

## Features

### Client-Facing Website

*   **Home Page:** Stunning hero section with a slider, featured packages, popular destinations, testimonials, and newsletter subscription.
*   **Destinations Page:** Browse all available travel destinations.
*   **Tour Packages Page:** Filterable list of all tour packages with detailed information.
*   **Package Detail Page:** In-depth view of a single package with image gallery, itinerary, what's included/excluded, and booking options.
*   **Gallery Page:** A beautiful, filterable grid gallery of travel images with a lightbox for enlarged views.
*   **About Us Page:** Tells the story of the agency, its mission, values, and team.
*   **Contact Us Page:** Contact form, business information, and an interactive Google Map.
*   **Booking Page:** A multi-step form for users to book their desired travel package.
*   **Responsive Design:** Fully responsive and optimized for desktop, tablet, and mobile devices.
*   **SEO Optimized:** Complete with sitemaps, robots.txt, and rich metadata for high search engine rankings.

### Admin Panel

*   **Secure Login:** Admin-only access protected by Firebase Authentication.
*   **Dashboard:** An overview of key metrics like total bookings, active packages, and new messages.
*   **Package Management:** Full CRUD (Create, Read, Update, Delete) functionality for tour packages.
*   **Booking Management:** View, manage, and update the status of all customer bookings.
*   **Gallery Management:** Upload new images to AWS S3, manage existing gallery photos, and set categories.

## Technology Stack

*   **Framework:** Next.js 15+ (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authentication:** Firebase Authentication
*   **File Storage:** AWS S3 (for gallery and package images)
*   **Deployment:** Vercel

## Getting Started

To get a local copy up and running, please follow the detailed steps in the [SETUP_GUIDE.md](SETUP_GUIDE.md) file.

## Folder Structure

```
/hamdis-travel
├── /prisma                 # Prisma schema, migrations, and seed script
├── /public                 # Static assets (images, fonts)
├── /src
│   ├── /app                # Next.js App Router pages and API routes
│   │   ├── /admin          # Admin panel pages
│   │   ├── /api            # API routes for all backend logic
│   │   └── ...             # Client-facing pages
│   ├── /components         # Reusable React components
│   │   ├── /layout         # Navbar, Footer, etc.
│   │   ├── /ui             # Generic UI components (buttons, cards)
│   │   └── ...             # Page-specific components
│   └── /lib                # Helper functions and client initializations (Prisma, Firebase, S3)
├── .env.example            # Environment variable template
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
└── vercel.json             # Vercel deployment configuration
```
```
