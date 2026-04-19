import { useId } from "react";

import { ArchiveIcon, PencilIcon, Trash2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function PatientsTable({ patients }: { patients: Patient[] }) {
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
              <TableHead>Status</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                className="has-data-[state=checked]:bg-muted/50"
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
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label={`product-${patient.id}-remove`}
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
        Patient Table
      </p>
    </div>
  );
}

export default PatientsTable;
