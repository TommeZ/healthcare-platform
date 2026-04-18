export async function getPatients() {
  const res = await fetch("http://localhost:8000/patients");
  return res.json();
}
