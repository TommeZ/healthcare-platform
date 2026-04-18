from fastapi import APIRouter
from api.schemas.patient import PatientCreate
from api import models
from api.deps import db_dependency
from typing import Optional

router = APIRouter(
    prefix="/patients"
)

@router.get("/")
def get_patients(db: db_dependency, skip: int = 0, limit: int = 10, name: Optional[str] = None):
    
    query = db.query(models.Patient)

    if name:
        query = query.filter(models.Patient.name.contains(name))

    return query.offset(skip).limit(limit).all()


@router.get("/{patient_id}")
def get_patient(patient_id: int, db: db_dependency):
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()

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

@router.put("/{patient_id}")
def update_patient(patient_id: int, patient: PatientCreate, db: db_dependency):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()

    if not db_patient:
        return {"error": "Patient not found"}

    db_patient.name = patient.name
    db_patient.age = patient.age
    db_patient.gender = patient.gender

    db.commit()
    db.refresh(db_patient)

    return db_patient

@router.delete("/{patient_id}")
def delete_patient(patient_id: int, db: db_dependency):
    db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()

    if not db_patient:
        return {"error": "Patient not found"}

    db.delete(db_patient)
    db.commit()

    return {"message": "Patient deleted"}