# NexGen Sales

**Live site:** https://nexgen-sales.vercel.app/

## Overview

NexGen Sales is the public homepage and recruitment portal for a door‑to‑door sales organization. The site advertises sales opportunities, screens applicants through training modules and quizzes, and provides a secure client portal for hosted courses and assessments.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3 w/ SSR), Pinia  
- **Backend & API:** Node.js, Nuxt Server Routes, Mongoose, MongoDB Atlas  
- **Storage:** AWS S3 via `@aws-sdk/client-s3`  
- **Payments:** Square SDK  
- **Authentication:** Google OAuth, JWT, bcrypt  
- **DevOps & Deployment:** Vercel (CI/CD), GitHub  

## Key Features

- Marketing homepage for recruiting door‑to‑door sales reps  
- Secure client portal with courses, video trainings, and quizzes  
- AWS S3 integration for hosting images and assets  
- Square payment sandbox & production for paid training modules  
- Google OAuth for user signup/login  
- JWT‑secured API routes and session management  
- reCAPTCHA v3 anti‑spam on registration forms  
- Auto‑deploy on push to `main`  

## Getting Started

### Prerequisites

- Node.js v16 or higher  
- npm, yarn, or pnpm  
- AWS account with S3 bucket  
- MongoDB Atlas account  
- Square sandbox & production credentials  
- Google OAuth credentials  

### Installation

    git clone https://github.com/hartecho/nexgen-sales.git
    cd nexgen-sales
    npm install

### Configuration

    # AWS S3
    NUXT_AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
    NUXT_AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY
    NUXT_AWS_REGION=YOUR_AWS_REGION
    NUXT_S3_BUCKET=YOUR_S3_BUCKET_NAME

    # MongoDB
    DB_URI=YOUR_MONGODB_CONNECTION_STRING

    # JWT & Auth
    JWT_SECRET=YOUR_JWT_SECRET
    GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

### Running Locally

    npm run dev

### Build & Production

    npm run build
    npm run start

## Demo Login

Use the following credentials to access the client portal at https://nexgen-sales.vercel.app/:

- **Email:** test@gmail.com  
- **Password:** test  

## Deployment

This repository is connected to Vercel. Pushes to the `main` branch auto‑deploy to https://nexgen-sales.vercel.app/

## License

© 2025 HARTECHO LLC. All rights reserved.

## Contact

Thomas Hart  
Email: thomas@hartecho.com  
