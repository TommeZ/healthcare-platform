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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const limit = 10;

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPatients(search || undefined, gender, age, page * limit, limit).then(
        setPatients,
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, gender, age, page]);

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
          <SearchBar value={search} onChange={setSearch} />
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

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
        >
          Prev
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
