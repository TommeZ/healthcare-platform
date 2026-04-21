const headers = {
  "Content-Type": "application/json",
  Authorization: "test-token",
};

export async function getPatients(
  name?: string,
  gender?: string,
  age?: number,
  skip: number = 0,
  limit: number = 10,
) {
  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (gender) params.append("gender", gender);
  if (age) params.append("age", String(age));

  params.append("skip", String(skip));
  params.append("limit", String(limit));

  const url = `http://localhost:8000/patients?${params.toString()}`;

  const res = await fetch(url, { headers });

  if (!res.ok) throw new Error("Failed to fetch patients");

  return res.json();
}

export async function createPatient(data: {
  name: string;
  age: number;
  gender: string;
}) {
  const res = await fetch("http://localhost:8000/patients", {
    method: "POST",
    headers,
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
    headers,
  });

  if (!res.ok) {
    throw new Error("Failed to delete patient");
  }

  return res.json();
}

export async function getPatient(id: number) {
  const res = await fetch(`http://localhost:8000/patients/${id}`, {
    headers,
  });

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
      headers,
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
      headers,
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
}

export async function getPrescriptions(status?: string) {
  let url = "http://localhost:8000/patients/prescriptions";

  if (status) {
    url += `?status=${status}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error("Failed to fetch prescriptions");
  }

  return res.json();
}
