"use client";

import { useEffect, useState, use } from "react";
import { Patient } from "@/app/types";
import { PrescriptionsTable } from "@/components/PrescriptionsTable";

export default function PatientDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/patients/${id}`)
      .then((res) => res.json())
      .then(setPatient);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>

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
