"use client";

import { useId } from "react";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from "@/app/types";
import Link from "next/link";

export function PatientsTable({
  patients,
  onDelete,
}: {
  patients: Patient[];
  onDelete: (id: number) => void;
}) {
  const id = useId();

  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <Checkbox id={id} aria-label="select-all" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                className="has-data-[state=checked]:bg-muted/50 "
              >
                <TableCell>
                  <Checkbox
                    id={`table-checkbox-${patient.id}`}
                    aria-label={`product-checkbox-${patient.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Link
                      className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
                      href={`/patients/${patient.id}`}
                    >
                      {patient.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label={`product-${patient.id}-remove`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(patient.id);
                    }}
                  >
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Patient Records
      </p>
    </div>
  );
}

export default PatientsTable;
