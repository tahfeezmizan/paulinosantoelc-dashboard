import React from "react";
import { TableCell, TableRow } from "../ui/table";

export default function PaymentTable({ payment }: any) {
  return (
    <div>
      <TableRow key={payment.id}>
        <TableCell className="font-medium">{payment.id}.</TableCell>
        <TableCell>{payment.date}</TableCell>
        <TableCell>{payment.buyer}</TableCell>
        <TableCell>{payment.country}</TableCell>
        <TableCell>{payment.type}</TableCell>
        <TableCell>{payment.method}</TableCell>
        <TableCell>{payment.plan}</TableCell>
      </TableRow>
    </div>
  );
}
