from sqlalchemy import Column, ForeignKey, Integer, String
from .database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    role = Column(String)

class Patient(Base):
     __tablename__ = "patients"

     id = Column(Integer, primary_key=True, index=True)
     name = Column(String, nullable=False)
     age = Column(Integer, nullable=False)
     gender = Column(String, nullable=False)

     prescriptions = relationship("Prescription", back_populates="patient")
     reports = relationship("MedicalReport", back_populates="patient")

class Prescription(Base):
    __tablename__ = "prescriptions"

    id = Column(Integer, primary_key=True, index=True)
    medication = Column(String, nullable=False)
    status = Column(String, default="Pending", nullable=False)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    patient = relationship("Patient", back_populates="prescriptions")

class MedicalReport(Base):
    __tablename__ = "medical_reports"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    patient_id = Column(Integer, ForeignKey("patients.id"))

    patient = relationship("Patient", back_populates="reports")