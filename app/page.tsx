import { PatientsTable } from "@/components/patients-table";
import { getPatients } from "./lib/api";
import { Patient } from "./types";

export default async function Home() {
  const patients: Patient[] = await getPatients();

  return (
    <div className="max-w-3xl p-8">
      <PatientsTable patients={patients} />
    </div>
  );
}
