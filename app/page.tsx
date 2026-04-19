"use client";

import { PatientsTable } from "@/components/PatientsTable";
import { getPatients } from "../lib/api";
import { Patient } from "./types";
import { SearchBar } from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  const handleSearch = async (query: string) => {
    const data = await getPatients(query);
    setPatients(data);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full flex flex-col gap-4">
      <SearchBar onSearch={handleSearch} />
      <PatientsTable patients={patients} />
    </div>
  );
}
