from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import patients
from api.database import engine
from api import models

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(patients.router)


