"use client";

import { PatientsTable } from "@/components/PatientsTable";

import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import { deletePatient, getPatients } from "@/lib/api";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { RadioDropdown } from "@/components/RadioDropdown";

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [gender, setGender] = useState<string | undefined>();

  useEffect(() => {
    getPatients(undefined, gender).then(setPatients);
  }, [gender]);

  const handleSearch = async (query: string) => {
    const data = await getPatients(query, gender);
    setPatients(data);
  };

  const refreshPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const handleDelete = async (id: number) => {
    await deletePatient(id);
    await refreshPatients();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-4">
      <div className="flex  justify-between">
        <div className="w-full max-w-sm">
          <SearchBar onSearch={handleSearch} />
        </div>

        <RadioDropdown
          value={gender || "All"}
          onChange={(value) => setGender(value === "All" ? undefined : value)}
          options={[
            { label: "All", value: "All" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />

        <AddPatientDialog onAdd={refreshPatients} />
      </div>
      <PatientsTable patients={patients} onDelete={handleDelete} />
    </div>
  );
}
