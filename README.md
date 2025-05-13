# NexGen Sales

**Live site:** https://nexgen-sales.vercel.app/

## Overview

NexGen Sales is the public homepage and recruitment portal for a door‑to‑door sales organization. The site advertises sales opportunities, features a blog page for company news and updates, provides a secure application form for candidates, and includes a locked‑down client portal with courses, video trainings, and quizzes to screen and onboard sales reps. It also offers several administrative dashboards for editing all database information, managing user profiles, and handling a support ticket system.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3 with SSR), Pinia  
- **Backend & API:** Node.js, Nuxt Server Routes, Mongoose, MongoDB Atlas  
- **Storage:** AWS S3 via `@aws-sdk/client-s3`  
- **Authentication & Security:** Google OAuth, JWT, bcrypt, reCAPTCHA v3  
- **DevOps & Deployment:** Vercel (CI/CD), GitHub  

## Key Features

- Marketing homepage for recruiting door‑to‑door sales reps  
- Blog page for company news, tips, and updates  
- Secure application form with validation and anti‑spam  
- Client portal with courses, video trainings, and quizzes  
- AWS S3 integration for hosting images and assets
- AWS Lambda functions for sending emails and other operations
- Google OAuth for user signup/login  
- JWT‑secured API routes and session management  
- reCAPTCHA v3 integration to block spam  
- Multiple admin dashboards to:
    - Edit all database records  
    - Manage user profiles  
    - Handle support tickets  
- Automatic deployment on push to `main`  

## Getting Started

### Prerequisites

- Node.js v16 or higher  
- npm, yarn, or pnpm  
- AWS account with S3 bucket  
- MongoDB Atlas account  
- Google OAuth credentials  

### Installation

    git clone https://github.com/hartecho/nexgen-sales.git
    cd nexgen-sales
    npm install

### Configuration

    NUXT_AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
    NUXT_AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY
    NUXT_AWS_REGION=YOUR_AWS_REGION
    NUXT_S3_BUCKET=YOUR_S3_BUCKET_NAME

    DB_URI=YOUR_MONGODB_CONNECTION_STRING

    JWT_SECRET=YOUR_JWT_SECRET
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

### Running Locally

    npm run dev

### Build & Production

    npm run build
    npm run start

## Demo Login

- **Email:** test@gmail.com  
- **Password:** test  

## Deployment

This repository is connected to Vercel. Pushes to the `main` branch auto‑deploy to https://nexgen-sales.vercel.app/

## License

© 2025 HARTECHO LLC. All rights reserved.

## Contact

Thomas Hart  
Email: thomas@hartecho.com  
