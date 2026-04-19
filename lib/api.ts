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
