"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updatePrescriptionStatus } from "@/lib/api";
import { RadioDropdown } from "./RadioDropdown";

type Prescription = {
  id: number;
  medication: string;
  status: string;
};

export function PrescriptionsTable({
  prescriptions,
  onStatusChange,
}: {
  prescriptions: Prescription[];
  onStatusChange: () => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Medication</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.medication}</TableCell>
            <TableCell>
              <RadioDropdown
                value={p.status}
                onChange={async (value) => {
                  await updatePrescriptionStatus(p.id, value);
                  await onStatusChange();
                }}
                options={[
                  { label: "Pending", value: "Pending" },
                  { label: "Approved", value: "Approved" },
                  { label: "Dispensed", value: "Dispensed" },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
