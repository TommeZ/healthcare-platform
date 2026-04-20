from typing import Literal, Optional

from fastapi import APIRouter
from api.schemas.prescription import PrescriptionCreate
from api import models
from api.deps import db_dependency

router = APIRouter(
    prefix="/patients"
)

@router.get("/prescriptions")
def get_prescriptions(db: db_dependency, status: Optional[str] = None):
    query = db.query(models.Prescription)

    if status:
        query = query.filter(models.Prescription.status == status)

    return query.all()

@router.post("/{patient_id}/prescriptions")
def add_prescription(patient_id: int, prescription: PrescriptionCreate, db: db_dependency):
    patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()

    if not patient:
        return {"error": "Patient not found"}

    new_prescription = models.Prescription(
        medication=prescription.medication, 
        patient_id=patient_id
    )

    db.add(new_prescription)
    db.commit()
    db.refresh(new_prescription)

    return new_prescription

@router.patch("/prescriptions/{prescription_id}")
def update_prescription_status(
    prescription_id: int,
    status: Literal["Pending", "Approved", "Dispensed"],
    db: db_dependency
):
    prescription = db.query(models.Prescription).filter(models.Prescription.id == prescription_id).first()

    if not prescription:
        return {"error": "Prescription not found"}

    prescription.status = status

    db.commit()
    db.refresh(prescription)

    return prescription

