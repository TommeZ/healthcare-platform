"use client";

import { useEffect, useState, use } from "react";
import { Patient } from "@/app/types";
import { PrescriptionsTable } from "@/components/PrescriptionsTable";
import { addPrescription, getPatient } from "@/lib/api";

export default function PatientDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const patientId = Number(id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [medication, setMedication] = useState("");

  useEffect(() => {
    getPatient(patientId)
      .then(setPatient)
      .catch(() => setPatient(null));
  }, [patientId]);

  const refreshPatient = async () => {
    const data = await getPatient(patientId);
    setPatient(data);
  };

  const handleAddPrescription = async () => {
    if (!medication.trim()) return;

    await addPrescription(patientId, { medication });

    setMedication("");
    await refreshPatient();
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add Prescription</h3>

        <input
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          placeholder="Medication"
          className="border p-2 mr-2"
        />

        <button onClick={handleAddPrescription} disabled={!medication.trim()}>
          Add
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Prescriptions</h3>

        {patient.prescriptions && patient.prescriptions.length > 0 ? (
          <PrescriptionsTable prescriptions={patient.prescriptions} />
        ) : (
          <p>No prescriptions</p>
        )}
      </div>
    </div>
  );
}
