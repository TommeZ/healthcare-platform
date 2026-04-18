from fastapi import APIRouter
from api.schemas.patient import PatientCreate

router = APIRouter(
    prefix="/patients"
)

@router.get("/")
def test_route():
    return {"message": "patients route working"}

@router.post("/")
def create_patient(patient: PatientCreate):
    return patient