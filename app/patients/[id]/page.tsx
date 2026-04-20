"use client";

import { useEffect, useState, use } from "react";
import { Patient } from "@/app/types";
import { PrescriptionsTable } from "@/components/PrescriptionsTable";
import { addPrescription, getPatient } from "@/lib/api";
import { RadioDropdown } from "@/components/RadioDropdown";

export default function PatientDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const patientId = Number(id);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [medication, setMedication] = useState("");
  const [status, setStatus] = useState<string | undefined>();

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

  const filteredPrescriptions =
    status && patient.prescriptions
      ? patient.prescriptions.filter((p) => p.status === status)
      : patient.prescriptions;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>

      {/* Add Prescription */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add Prescription</h3>

        <div className="flex gap-2">
          <input
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="Medication"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleAddPrescription}
            disabled={!medication.trim()}
            className="border px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Prescriptions</h3>

          <RadioDropdown
            value={status || "All"}
            onChange={(value) => setStatus(value === "All" ? undefined : value)}
            options={[
              { label: "All", value: "All" },
              { label: "Pending", value: "Pending" },
              { label: "Approved", value: "Approved" },
              { label: "Dispensed", value: "Dispensed" },
            ]}
          />
        </div>

        {filteredPrescriptions && filteredPrescriptions.length > 0 ? (
          <PrescriptionsTable
            prescriptions={filteredPrescriptions}
            onStatusChange={refreshPatient}
          />
        ) : (
          <p>No prescriptions</p>
        )}
      </div>
    </div>
  );
}
