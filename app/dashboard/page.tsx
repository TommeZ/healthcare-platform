"use client";

import { PatientsTable } from "@/components/PatientsTable";

import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import { deletePatient, getPatients } from "@/lib/api";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { RadioDropdown } from "@/components/RadioDropdown";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [gender, setGender] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();

  useEffect(() => {
    getPatients(undefined, gender, age).then(setPatients);
  }, [gender, age]);

  const handleSearch = async (query: string) => {
    const data = await getPatients(query, gender, age);
    setPatients(data);
  };

  const refreshPatients = async () => {
    const data = await getPatients(undefined, gender, age);
    setPatients(data);
  };

  const handleDelete = async (id: number) => {
    await deletePatient(id);
    await refreshPatients();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-4">
      <div className="flex gap-2 justify-between">
        <div className="w-full max-w-sm">
          <SearchBar onSearch={handleSearch} />
        </div>

        <Input
          type="number"
          placeholder="Age"
          value={age ?? ""}
          onChange={(e) =>
            setAge(e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-24"
        />

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
