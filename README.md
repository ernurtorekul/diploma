# Smart Waste — Intelligent Household Waste Classification System

**Author:** Ernur Torekul
**Project Type:** University Diploma Thesis

## Project Overview

Smart Waste is an intelligent waste management system that combines computer vision, mobile web technology, and real-time notifications to help citizens properly dispose of waste.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite + TailwindCSS + PWA |
| Backend | NestJS + TypeScript + Prisma |
| Database | PostgreSQL |
| AI/ML | OpenAI Vision API (GPT-4o) |
| Storage | Cloudinary |
| Notifications | Telegram Bot API |
| IoT | Python (Raspberry Pi) |

## Project Structure

```
/smart-waste
├── apps/
│   ├── api/          # NestJS REST API
│   ├── web/          # React PWA + Admin Dashboard
│   └── pi-agent/     # Python Raspberry Pi agent
├── docs/             # Project documentation
│   ├── PROJECT_DOCUMENTATION.md
│   ├── ER_DIAGRAM.md
│   ├── ARCHITECTURE.md
│   └── FLOWS_AND_DIAGRAMS.md
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Python 3.9+ (for pi-agent)
- OpenAI API key
- Cloudinary account
- Telegram Bot token

### Installation

```bash
# Install all dependencies
npm run install:all

# Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Run database migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

### Development

```bash
# Run API (http://localhost:3000)
npm run api

# Run Web (http://localhost:5173)
npm run web

# Open Prisma Studio
npm run prisma:studio
```

### Production Build

```bash
# Build API
npm run api:build

# Build Web
npm run web:build
```

## API Endpoints

### Authentication
- `POST /auth/admin/login` - Admin login

### Bins
- `GET /bins` - List all bins
- `POST /bins` - Create bin (admin)
- `GET /bins/:id` - Get bin details
- `PATCH /bins/:id` - Update bin (admin)
- `DELETE /bins/:id` - Delete bin (admin)
- `POST /bins/:id/fullness` - Report bin fullness (Pi agent)

### Classifications
- `POST /classifications` - Classify waste item
- `GET /classifications` - List classifications (admin)

### Users
- `GET /users/leaderboard` - Get top users
- `GET /users/:telegramId` - Get user profile

## Documentation

- [Project Documentation](./docs/PROJECT_DOCUMENTATION.md)
- [ER Diagram](./docs/ER_DIAGRAM.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Flows and Diagrams](./docs/FLOWS_AND_DIAGRAMS.md)

## License

MIT

---

**Developed with ❤️ for a cleaner environment**
