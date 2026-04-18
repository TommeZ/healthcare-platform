import { Patient } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function PatientsTable({ patients }: { patients: Patient[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {patients.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.age}</TableCell>
            <TableCell>{p.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
