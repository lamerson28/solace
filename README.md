## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:
```bash
npm i
```

Run the development server:
```bash
npm run dev
```

## Database Setup

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you'd like to configure a database, follow these steps:

1. Start Postgres (using Docker or your preferred method):
```bash
docker compose up -d
```

2. Create a `solaceassignment` database

3. Push the database schema:
```bash
npm run db:push    # Applies schema changes directly to database
```

4. Seed the database:
```bash
npm run seed
```

Note: For production environments, use the migration-based approach instead:
```bash
npm run generate   # Generate migration files
# Review migrations in ./drizzle folder
npm run db:push   # Apply migrations
```

## Testing

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests once:
```bash
npm test
```

Generate test coverage report:
```bash
npm run test:coverage
```
