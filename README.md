# Healthcare Platform (Backend)

## Running the API locally

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

This will open Swagger UI where you can test the API endpoints.

## Available Endpoint

### Create Patient

- **POST** `/patients/`

Example request:

```json
{
  "name": "John",
  "age": 30,
  "gender": "Male"
}
```
