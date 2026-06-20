# Backend Starter Template

Production-ready backend using Bun, Express, Prisma, and more.

## Features
- Bun runtime for fast performance
- Express.js for routing and middleware
- Prisma ORM for PostgreSQL
- Zod for validation
- Swagger UI for API docs
- Winston for logging
- Helmet, CORS, cookie-parser, JWT, and more for security
- Ready-to-use project structure
- Biome for formatting and linting

## Getting Started

### 1. Create a new project
```sh
bunx backend-starter <your-project-name>
```

### 2. Install dependencies
```sh
cd <your-project-name>
# Use your chosen package manager
bun install
```

### 3. Configure environment variables
Edit `.env` with your database credentials and other settings.

### 4. Run the development server
```sh
bun run dev
```

### 5. Access API documentation
Visit `http://localhost:8080/api/v1/docs` for Swagger UI.

## Scripts
- `dev`: Start server with hot reload
- `start`: Start server
- `biome:*`: Format, lint, check, clean code
- `prisma:*`: Prisma ORM commands

## Project Structure
```
├── src/
│   ├── app.js
│   ├── index.js
│   ├── config/
│   ├── constants/
│   ├── core/
│   ├── routes/
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
```

## License
MIT

---
Made by Harshit Ostwal
