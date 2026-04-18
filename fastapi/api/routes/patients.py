from fastapi import APIRouter
from api.schemas.patient import PatientCreate
from api import models
from api.deps import db_dependency

router = APIRouter(
    prefix="/patients"
)

@router.get("/")
def test_route():
    return {"message": "patients route working"}


@router.post("/")
def create_patient(patient: PatientCreate, db: db_dependency):

    new_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    
    return new_patient