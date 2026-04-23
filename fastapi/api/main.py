from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.routes import patients
from api.database import engine
from api import models
from api.routes import prescriptions
from fastapi import Request

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

async def auth_middleware(request: Request, call_next):

    if request.method == "OPTIONS":
        return await call_next(request)

    token = request.headers.get("Authorization")

    if not token:
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    return await call_next(request)



app.middleware("http")(auth_middleware)

app.include_router(patients.router)
app.include_router(prescriptions.router)


