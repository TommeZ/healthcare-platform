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

## Architecture Flowchart

![Architecture Flowchart](public/flowchart.png)

This diagram shows the flow between the Next.js frontend, FastAPI backend, middleware, and database.

## Data Model

- Patient
  - id
  - name
  - age
  - gender

- Prescription
  - id
  - medication
  - status
  - patient_id (FK)

- MedicalReport
  - id
  - patient_id (FK)
  - type (blood pressure etc)
  - value
  - created_at

- User
  - id
  - email
  - role (Doctor, Pharmacist, Admin)

### Relationships

- Patient → has many → Prescriptions
- Patient → has many → MedicalReports
- User → can manage → Patients / Prescriptions

## Design Notes

### Authentication & Authorisation

- Implemented middleware to verify Authorization token for API routes.
- Kept authentication lightweight for this task. in production this would use real authentication.
- Role based access (Doctor, Pharmacist, Admin) considered in the data model for future extension.

### Handling Sensitive Health Data

- Input validation is handled using Pydantic schemas
- Sensitive data access is restricted via middleware (authentication middleware)

### Scalability & Performance

- Backend APIs are stateless enabling horizontal scaling.
- Pagination (skip/limit) is used to efficiently handle large datasets.
- Filtering is performed at the database query level to reduce unnecessary data transfer.
- Database relationships are structured to support efficient joins (Patient → Prescriptions).

## Trade-offs & Future Improvements

- Authentication is implemented as lightweight middleware validating the presence of a token. In a production system, this would be replaced with JWT-based authentication and role-based access control.

- The system focuses on core patient and prescription flows. Additional entities like MedicalReport and User/Role are defined at a high level but not fully implemented to prioritise core functionality.

- Filtering and pagination are implemented server-side to ensure scalability. With more time, caching strategies and database indexing would be added to improve performance.

- The frontend focuses on essential user flows (search, filtering, CRUD operations). Additional features like editing patients and more advanced validation could be added.
