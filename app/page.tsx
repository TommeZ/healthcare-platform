import { getPatients } from "./lib/api";

export default async function Home() {
  const patients = await getPatients();

  return (
    <div>
      <h1>Patients</h1>
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </div>
  );
}
