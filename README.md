# UnderStand

UnderStand is a reading experience for English learners. Articles can be read at multiple difficulty levels and listened to using the browser's text-to-speech support, helping learners adapt the same subject to their current level.

## Features

- Articles with multiple English difficulty levels
- Keyboard navigation between levels with the up and down arrow keys
- Built-in text-to-speech player
- Light and dark themes
- Responsive reading interface
- REST API for listing, retrieving, and creating posts
- MongoDB persistence on the server

## Tech stack

### Web application

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Base UI and Hugeicons

### API

- Node.js and TypeScript
- Fastify 5
- MongoDB
- Node.js test runner
- Docker Compose for local MongoDB

## Project structure

```text
.
├── main/                 # Next.js web application
│   ├── app/              # Routes, layouts, and global styles
│   ├── components/       # UI and article components
│   ├── hooks/            # Browser text-to-speech hook
│   └── lib/              # Utilities and mock post data
└── server/               # Fastify API
    ├── src/              # Server and route implementation
    ├── test/             # API tests
    └── docker-compose.yml
```

## Requirements

- Node.js 20 or newer
- npm
- Docker and Docker Compose, if you want to run MongoDB locally

## Getting started

### 1. Start MongoDB

```bash
cd server
docker compose up -d
```

The provided Compose configuration starts MongoDB on `localhost:27017` and persists its data in a Docker volume.

### 2. Configure and start the API

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

By default, the API is available at `http://localhost:3001`.

The server supports these environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | Port used by the Fastify server; the example file sets it to `3001` |
| `HOST` | `0.0.0.0` | Host interface used by the server |
| `MONGODB_URI` | Local Compose connection | MongoDB connection string |
| `MONGODB_DATABASE` | `posts` | MongoDB database name |

### 3. Start the web application

In a second terminal:

```bash
cd main
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The web application currently uses the sample content in `main/lib/mock-posts.ts`. The Fastify API is available separately and is not yet connected to the UI.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/posts` | Lists all posts with their authors |
| `GET` | `/posts/:slug` | Returns a single post by slug |
| `POST` | `/posts` | Creates a post |

Example request:

```bash
curl -X POST http://localhost:3001/posts \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Why Animations Matter in UI Design",
    "slug": "why-animations-matter-in-ui-design",
    "authorId": "507f1f77bcf86cd799439011",
    "short_description": "How motion makes interfaces easier to understand.",
    "html": "<p>Article content</p>"
  }'
```

Posts are stored in the `Posts` collection. Author details are resolved from the `Users` collection through the post's `authorId`.

## Available commands

Run commands from the corresponding directory.

### `main/`

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm start` | Runs the production build |

### `server/`

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the API in watch mode |
| `npm start` | Starts the API |
| `npm test` | Runs the API tests |
| `npm run typecheck` | Checks TypeScript types |
| `npm run check` | Runs Biome checks |
| `npm run format` | Formats server files with Biome |

## Testing

```bash
cd server
npm test
```

The test suite exercises post listing, post creation, request validation, and database-client cleanup using an in-memory MongoDB client stub.

## Status

UnderStand is under active development. The reading experience and API are implemented, while API consumption, authentication, search, alternate list layouts, and some audio controls are still being developed.
