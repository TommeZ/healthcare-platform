# Healthcare Platform

## Running the Frontend (Next.js)

1. Navigate to the frontend folder:

```bash
cd app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open in your browser:

```text
http://localhost:3000
```

---

The frontend will communicate with the backend API running on:

```text
http://localhost:8000
```

## Running the Backed (FastAPI)

1. Navigate to the backend folder:

```bash
cd fastapi
```

2. Start the server:

```bash
uvicorn api.main:app --reload
```

3. Open in your browser:

```
http://localhost:8000/docs
```

## Architecture

![Architecture Diagram](./public/architecture.png)

This diagram shows the flow between the Next.js frontend, FastAPI backend, middleware, and database.
