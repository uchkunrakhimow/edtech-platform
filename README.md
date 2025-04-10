# EdTech Platform

A comprehensive educational technology platform with a full-stack application built using modern technologies.

## Overview

This application consists of two main parts:

- **API**: Express-based backend with Prisma ORM for database operations
- **Client**: React-based frontend with modern UI components

## Tech Stack

### Backend

- Node.js (v22+)
- Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI documentation

### Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS
- Radix UI components
- React Router v7
- Zustand for state management
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 22 or higher
- PostgreSQL
- npm or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/uchkunrakhimow/edtech-platform
cd edtech-platform
```

2. Install dependencies:

```bash
npm install
cd client
npm install
cd ..
```

3. Configure environment:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials and JWT secret.

4. Set up the database:

```bash
npm run prisma:generate
npm run prisma:migration
npm run prisma:seed
```

### Development

1. Start the backend server:

```bash
npm run start:dev
```

2. In a separate terminal, start the frontend development server:

```bash
cd client
npm run dev
```

### Production Build

1. Build the backend:

```bash
npm run build
```

2. Build the frontend:

```bash
cd client
npm run build
cd ..
```

3. Start the production server:

```bash
npm start
```

## Project Structure

```
├── client/               # Frontend React application
├── docs/                 # API documentation (OpenAPI/Swagger)
├── prisma/               # Prisma schema and migrations
├── src/                  # Backend source code
│   ├── app/              # Express application
│   │   ├── config/       # Application configuration
│   │   ├── helpers/      # Utility functions
│   │   ├── middlewares/  # Express middlewares
│   │   ├── modules/      # Feature modules (auth, course, etc.)
│   │   ├── app.ts        # Express app setup
│   │   └── routes.ts     # API routes
│   └── index.ts          # Entry point
```

## API Documentation

The API is documented using Swagger/OpenAPI. When the server is running, you can access the documentation at:

```
http://localhost:3000/api-docs
```

## Features

- User authentication and authorization
- Course management
- Enrollment system
- Test creation and management
- Test results tracking

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the terms of the license included in the [LICENSE](LICENSE) file.
