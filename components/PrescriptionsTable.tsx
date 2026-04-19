"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Prescription = {
  id: number;
  medication: string;
  status: string;
};

export function PrescriptionsTable({
  prescriptions,
}: {
  prescriptions: Prescription[];
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
            <TableCell>{p.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
