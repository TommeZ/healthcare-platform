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
