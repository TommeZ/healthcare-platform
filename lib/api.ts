export async function getPatients(name?: string) {
  const url = name
    ? `http://localhost:8000/patients?name=${name}`
    : "http://localhost:8000/patients";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch patients");
  }

  return res.json();
}

export async function createPatient(data: {
  name: string;
  age: number;
  gender: string;
}) {
  const res = await fetch("http://localhost:8000/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create patient");
  }

  return res.json();
}

export async function deletePatient(id: number) {
  const res = await fetch(`http://localhost:8000/patients/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete patient");
  }

  return res.json();
}

export async function getPatient(id: number) {
  const res = await fetch(`http://localhost:8000/patients/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch patient");
  }

  return res.json();
}

export async function addPrescription(
  patientId: number,
  data: { medication: string },
) {
  const res = await fetch(
    `http://localhost:8000/patients/${patientId}/prescriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to add prescription");
  }

  return res.json();
}

export async function updatePrescriptionStatus(
  prescriptionId: number,
  status: string,
) {
  const res = await fetch(
    `http://localhost:8000/patients/prescriptions/${prescriptionId}?status=${status}`,
    {
      method: "PATCH",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}
