"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updatePrescriptionStatus } from "@/lib/api";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="border px-2 py-1 rounded">
                    {p.status}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={p.status}
                    onValueChange={async (value) => {
                      await updatePrescriptionStatus(p.id, value);
                      await onStatusChange();
                    }}
                  >
                    <DropdownMenuRadioItem value="Pending">
                      Pending
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Approved">
                      Approved
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Dispensed">
                      Dispensed
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
