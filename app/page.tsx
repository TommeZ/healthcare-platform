import { PatientsTable } from "@/components/PatientsTable";
import { getPatients } from "../lib/api";
import { Patient } from "./types";
import { SearchBar } from "@/components/SearchBar";

export default async function Home() {
  const patients: Patient[] = await getPatients();

  return (
    <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-4">
      <SearchBar />
      <PatientsTable patients={patients} />
    </div>
  );
}
