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
import { useRouter } from "next/navigation";

export function PatientsTable({
  patients,
  onDelete,
}: {
  patients: Patient[];
  onDelete: (id: number) => void;
}) {
  const id = useId();
  const router = useRouter();

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
                className="has-data-[state=checked]:bg-muted/50 cursor-pointer"
                onClick={() => router.push(`/patients/${patient.id}`)}
              >
                <TableCell>
                  <Checkbox
                    id={`table-checkbox-${patient.id}`}
                    aria-label={`product-checkbox-${patient.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">{patient.name}</div>
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
