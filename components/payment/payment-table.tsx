import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { SubscriptionType } from "@/types/common";

export default function PaymentTable({
  payment,
  index,
}: {
  payment: SubscriptionType;
  index: number;
}) {
  // console.log("Payment Table", payment);
  return (
    <TableRow key={payment.id}>
      <TableCell className="font-medium">{index + 1}.</TableCell>
      <TableCell>
        {payment?.user?.firstName + " " + payment?.user?.lastName}
      </TableCell>
      <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>${payment.plan?.price}</TableCell>
      <TableCell>{payment?.plan?.planName}</TableCell>
      <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{new Date(payment.expiresAt).toLocaleDateString()}</TableCell>
      <TableCell>{payment.plan?.duration}</TableCell>
    </TableRow>
  );
}
