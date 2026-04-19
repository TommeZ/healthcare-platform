from pydantic import BaseModel, Field

class PrescriptionCreate(BaseModel):
    medication: str